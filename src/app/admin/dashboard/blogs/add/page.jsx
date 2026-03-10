"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import BlogEditor from "../../../../admin/components/BlogSimpleEditor";
import MultiSelect from "../../../../admin/components/MultiSelect";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

const formatCreatedAtValue = (value) => {
  if (!value) return null;

  let formatted = value;
  if (formatted.includes("T")) {
    formatted = formatted.replace("T", " ");
  }

  if (!/\d{2}:\d{2}:\d{2}$/.test(formatted)) {
    formatted = `${formatted}:00`;
  }

  return formatted;
};

const getLocalDatetimeNow = () => {
  const now = new Date();
  const pad = (num) => num.toString().padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

export default function AddPostPage() {
  const router = useRouter();
  const [filters, setFilters] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [draftId, setDraftId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [autosaveError, setAutosaveError] = useState(null);
  const autosaveTimerRef = useRef(null);
  const createdAtInputRef = useRef(null);

  // ✅ Use ref to avoid stale closures
  const formRef = useRef({
    metaTitle: "",
    slug: "",
    metaDescription: "",
    author: "",
    popular: false,
    created_at: "",
    type: "blog_post",
    status: "draft",
    blogCategory: "",
    recommendations: [],
    portfolioCategoryIds: [],
    solutionIds: [],
    technologyIds: [],
    industryIds: [],
    challenges: "",
    solution: "",
    result: "",
    indexValue: true,
    editorHtml: "<p></p>",
    featuredImageFile: null,
    featuredImageBase64: "",
    featuredImageDesc: "",
  });

  const [form, setForm] = useState(formRef.current);

  const [recommendationOptions, setRecommendationOptions] = useState([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(false);

  // ✅ Update ref whenever form state changes
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await api.get("/posts/filter-options");
        if (res.status >= 200 && res.status < 300) {
          const responseData = res.data.data || res.data;
          setFilters(responseData);
        }
      } catch (error) {
        console.error("Failed to load filters:", error);
      }
    };
    loadFilters();
  }, []);

  const fetchRecommendations = async (categoryValue) => {
    if (!categoryValue) {
      setRecommendationOptions([]);
      setForm((prev) =>
        prev.recommendations && prev.recommendations.length
          ? { ...prev, recommendations: [] }
          : prev
      );
      return;
    }

    setIsRecommendationsLoading(true);
    try {
      const res = await api.get("/posts", {
        params: {
          type: "blog_post",
          blogCategory: categoryValue,
        },
      });

      const rows = res.data?.data?.rows || res.data?.rows || [];

      const options = rows
        .map((post) => ({
          id: post.id,
          name: post.metaTitle,
        }))
        .filter((opt) => opt.id && opt.name);

      setRecommendationOptions(options);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
      setRecommendationOptions([]);
    } finally {
      setIsRecommendationsLoading(false);
    }
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      const nextType = value;
      setForm((prev) => ({
        ...prev,
        type: nextType,
        popular: nextType === "case_study" ? false : prev.popular,
      }));
      setDirty(true);
      return;
    }

    if (name === "blogCategory") {
      const categoryValue = value;
      setForm((prev) => ({
        ...prev,
        blogCategory: categoryValue,
        recommendations: [],
      }));
      setDirty(true);
      fetchRecommendations(categoryValue);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setDirty(true);
  };

  const MAX_BYTES = 2 * 1024 * 1024;
  const OUT_W = 1200;
  const OUT_H = 700;

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target?.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const loadImageFromFile = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      img.src = url;
    });

  const canvasToBlob = (canvas, type, quality) =>
    new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
        type,
        quality
      );
    });

  const resizeFeaturedImageToStandard = async (file) => {
    const img = await loadImageFromFile(file);

    const canvas = document.createElement("canvas");
    canvas.width = OUT_W;
    canvas.height = OUT_H;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    const scale = Math.max(OUT_W / img.width, OUT_H / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (OUT_W - drawW) / 2;
    const dy = (OUT_H - drawH) / 2;

    ctx.drawImage(img, dx, dy, drawW, drawH);

    const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);

    const resizedFile = new File([blob], "featured-1200x700.jpg", {
      type: "image/jpeg",
    });

    const base64 = await blobToBase64(blob);

    return { resizedFile, base64 };
  };

  const handleFeaturedImageChange = async (e) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setForm((prev) => ({
        ...prev,
        featuredImageFile: null,
        featuredImageBase64: "",
      }));
      setDirty(true);
      return;
    }

    if (file.size > MAX_BYTES) {
      toast.error("Featured image is too large. Max size is 2 MB.");
      return;
    }

    try {
      const { resizedFile, base64 } = await resizeFeaturedImageToStandard(file);

      if (resizedFile.size > MAX_BYTES) {
        toast.error("Resized featured image is still above 2MB. Try another image.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        featuredImageFile: resizedFile,
        featuredImageBase64: base64,
      }));
      setDirty(true);
    } catch (err) {
      console.error("Featured image resize failed:", err);
      toast.error("Failed to process featured image.");
    }
  };

  const handleEditorChange = (html) => {
    setForm((prev) => ({ ...prev, editorHtml: html }));
    setDirty(true);
  };

  const toggleIdInArray = (key, id) => {
    setForm((prev) => {
      const arr = prev[key];
      const exists = arr.includes(id);
      return {
        ...prev,
        [key]: exists ? arr.filter((x) => x !== id) : [...arr, id],
      };
    });
    setDirty(true);
  };

  const handleToggleRecommendation = (id) => {
    setForm((prev) => {
      const current = prev.recommendations || [];
      const exists = current.includes(id);
      if (exists) {
        return {
          ...prev,
          recommendations: current.filter((x) => x !== id),
        };
      }

      if (current.length >= 5) {
        toast.error("You can select up to 5 recommended blogs only.");
        return prev;
      }

      return {
        ...prev,
        recommendations: [...current, id],
      };
    });
    setDirty(true);
  };

  const handleTogglePopular = () => {
    setForm((prev) => ({ ...prev, popular: !prev.popular }));
    setDirty(true);
  };

  const handleToggleIndexValue = () => {
    setForm((prev) => ({ ...prev, indexValue: !(prev.indexValue !== false) }));
    setDirty(true);
  };

  const handleSetCreatedAtNow = () => {
    const nowValue = getLocalDatetimeNow();
    setForm((prev) => ({ ...prev, created_at: nowValue }));
    setDirty(true);
  };

  const handleOpenCreatedAtPicker = () => {
    try {
      createdAtInputRef.current?.showPicker?.();
    } catch (err) {
      // ignore if the browser doesn't support showPicker
    }
  };

  const handleClearCreatedAt = () => {
    setForm((prev) => ({ ...prev, created_at: "" }));
    setDirty(true);
    createdAtInputRef.current?.focus?.();
  };

  const buildPayload = useCallback((statusOverride, isAutosave = false) => {
    const currentForm = formRef.current;

    const contentBlocks = {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: currentForm.editorHtml,
            alignment: "left",
            fontSize: "16px",
          },
        },
      ],
    };

    const payload = {
      metaTitle: currentForm.metaTitle || "Untitled Draft", // ✅ Provide default for autosave
      metaDescription: currentForm.metaDescription || "",
      author: currentForm.author || "System", // ✅ Provide default for autosave
      type: currentForm.type,
      status: statusOverride ?? currentForm.status,
      content: contentBlocks,
      solutionIds: currentForm.solutionIds || [],
      popular: currentForm.type === "blog_post" ? currentForm.popular || false : false,
      indexValue: currentForm.indexValue ?? true,
    };

    const trimmedSlug = (currentForm.slug || "").trim();
    if (trimmedSlug) {
      payload.slug = trimmedSlug;
    }

    // ✅ Only include featuredImageBase64 if it exists
    if (currentForm.featuredImageBase64) {
      payload.featuredImageBase64 = currentForm.featuredImageBase64;
    }

    const trimmedFeaturedImageDesc = (currentForm.featuredImageDesc || "").trim();
    if (trimmedFeaturedImageDesc) {
      payload.featuredImageDesc = trimmedFeaturedImageDesc;
    }

    const formattedCreatedAt = formatCreatedAtValue(currentForm.created_at);
    if (formattedCreatedAt) {
      payload.created_at = formattedCreatedAt;
    }

    if (currentForm.type === "blog_post") {
      // ✅ For autosave, use first available category if none selected
      if (currentForm.blogCategory) {
        payload.blogCategory = currentForm.blogCategory;
      } else if (isAutosave && filters?.blogCategories?.[0]?.value) {
        payload.blogCategory = filters.blogCategories[0].value;
      } else {
        payload.blogCategory = "";
      }

      // Backend expects IDs under `recommendedPostIds` and returns
      // full objects under `recommendations` in the response
      payload.recommendedPostIds = currentForm.recommendations || [];
    }

    if (currentForm.type === "case_study") {
      payload.portfolioCategoryIds = currentForm.portfolioCategoryIds || [];
      payload.challenges = currentForm.challenges || "";
      payload.solution = currentForm.solution || "";
      payload.result = currentForm.result || "";
      payload.technologyIds = currentForm.technologyIds || [];
      payload.industryIds = currentForm.industryIds || [];
    }

    return payload;
  }, [filters]);

  const autosave = useCallback(async () => {
    if (isSubmitting) return;

    // ✅ Don't autosave if no meaningful content yet
    const currentForm = formRef.current;
    if (!currentForm.metaTitle && !currentForm.editorHtml && !currentForm.author) {
      console.log("⏭️ Skipping autosave - no content yet");
      return;
    }

    setIsAutoSaving(true);
    setAutosaveError(null);

    try {
      const payload = buildPayload("draft", true); // ✅ Pass isAutosave = true

      if (!draftId) {
        // ✅ Create new draft
        console.log("📝 Creating new draft...");
        const res = await api.post("/posts", payload);
        
        // ✅ Handle different response structures
        const createdId = res.data?.data?.id || res.data?.id;
        
        if (createdId) {
          setDraftId(createdId);
          console.log("✅ Draft created with ID:", createdId);
        } else {
          console.error("⚠️ Draft created but no ID returned:", res.data);
        }
      } else {
        // ✅ Update existing draft
        console.log("💾 Updating draft ID:", draftId);
        await api.put(`/posts/${draftId}`, payload);
        console.log("✅ Draft updated successfully");
      }

      setDirty(false);
    } catch (err) {
      console.error("❌ Autosave failed:", err);
      
      // ✅ Better error handling
      const errorMessage = err.response?.data?.message || err.message || "Unknown error";
      setAutosaveError(errorMessage);
      
      // ✅ Log detailed error for debugging
      if (err.response) {
        console.error("Error response:", {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        });
      }
    } finally {
      setIsAutoSaving(false);
    }
  }, [draftId, isSubmitting, buildPayload]);

  useEffect(() => {
    if (!dirty) return;

    if (autosaveTimerRef.current) {
      window.clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = window.setTimeout(() => {
      autosave();
    }, 15000); // 15 seconds

    return () => {
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [dirty, autosave]);

  useEffect(() => {
    const flushOnExit = () => {
      if (!dirty || !draftId) return;

      const payload = buildPayload("draft", true); // ✅ Pass isAutosave = true

      // ✅ Use sendBeacon for more reliable exit saves
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      
      try {
        navigator.sendBeacon(`/api/posts/${draftId}`, blob);
      } catch (err) {
        // Fallback to regular API call
        api.put(`/posts/${draftId}`, payload).catch(() => {});
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushOnExit();
      }
    };

    window.addEventListener("pagehide", flushOnExit);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pagehide", flushOnExit);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dirty, draftId, buildPayload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (autosaveTimerRef.current) {
      window.clearTimeout(autosaveTimerRef.current);
    }

    try {
      const payload = buildPayload(undefined, false); // ✅ Pass isAutosave = false for final submit

      // ✅ Validate required fields before submission
      if (!payload.metaTitle || payload.metaTitle === "Untitled Draft") {
        toast.error("Please enter a meta title before publishing");
        setIsSubmitting(false);
        return;
      }

      if (!payload.author || payload.author === "System") {
        toast.error("Please enter an author name before publishing");
        setIsSubmitting(false);
        return;
      }

      // ✅ Validate blog category for blog posts
      if (form.type === "blog_post" && !form.blogCategory) {
        toast.error("Please select a blog category before publishing");
        setIsSubmitting(false);
        return;
      }

      let res;
      if (draftId) {
        console.log("📤 Updating post ID:", draftId);
        res = await api.put(`/posts/${draftId}`, payload);
      } else {
        console.log("📤 Creating new post...");
        res = await api.post("/posts", payload);
        const createdId = res.data?.data?.id || res.data?.id;
        if (createdId) {
          setDraftId(createdId);
          console.log("✅ Post created with ID:", createdId);
        }
      }

      if (res.status >= 200 && res.status < 300) {
        toast.success("Post saved successfully!");
        setDirty(false);
        router.push("/admin/dashboard/blogs");
      } else {
        toast.error("Failed to save post");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      toast.error(`Error saving post: ${errorMessage}`);
      
      // ✅ Log detailed error
      if (error.response) {
        console.error("Submit error details:", {
          status: error.response.status,
          data: error.response.data,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const indexValueOn = form.indexValue !== false;

  if (!filters) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-gray-100 flex justify-center">
      <div className="w-full max-w-5xl px-6 py-10 space-y-6">
        <h1 className="text-2xl font-semibold !text-white">Create content</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5 p-5 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <div>
              <label className="block text-sm mb-1">Meta title *</label>
              <input
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleBasicChange}
                required
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                placeholder="Enter a title for your post"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Slug (optional)</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleBasicChange}
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                placeholder="Leave blank to auto-generate from meta title"
              />
              <p className="mt-1 text-xs text-gray-400">
                Changing the slug won’t change the meta title.
              </p>
            </div>

            <div>
              <label className="block text-sm mb-1">Meta description</label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleBasicChange}
                rows={2}
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                placeholder="Brief description for SEO"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[210px]">
                  <label className="block text-sm mb-1">Author *</label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleBasicChange}
                    required
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                    placeholder="Author name"
                  />
                </div>

                {form.type === "blog_post" && (
                  <div>
                    <label className="block text-sm mb-1">Popular</label>
                    <button
                      type="button"
                      onClick={handleTogglePopular}
                      aria-pressed={form.popular}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        form.popular
                          ? "bg-emerald-500 text-black"
                          : "bg-zinc-800 text-gray-200"
                      }`}
                    >
                      {form.popular ? "Popular" : "Mark popular"}
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-1">Allow indexing</label>
                  <button
                    type="button"
                    onClick={handleToggleIndexValue}
                    aria-pressed={form.indexValue}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer ${
                      form.indexValue
                        ? "bg-emerald-500 text-black"
                        : "bg-zinc-800 text-gray-200"
                    }`}
                  >
                    {indexValueOn ? "Indexing on" : "Indexing off"}
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-sm mb-1">Created at (optional)</label>
                <div className="flex flex-wrap gap-3">
                  <input
                    type="datetime-local"
                    name="created_at"
                    value={form.created_at}
                    onChange={handleBasicChange}
                    onFocus={handleOpenCreatedAtPicker}
                    onClick={handleOpenCreatedAtPicker}
                    ref={createdAtInputRef}
                    step="60"
                    className="flex-1 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleSetCreatedAtNow}
                    className="rounded border border-zinc-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-300 transition hover:border-zinc-500"
                  >
                    Use current time
                  </button>
                  <button
                    type="button"
                    onClick={handleClearCreatedAt}
                    aria-label="Clear created at"
                    className="rounded border border-zinc-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-300 transition hover:border-zinc-500"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleBasicChange}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                >
                  {filters.types.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleBasicChange}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                >
                  {filters.statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {form.type === "blog_post" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Blog category</label>
                  <select
                    name="blogCategory"
                    value={form.blogCategory}
                    onChange={handleBasicChange}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                  >
                    <option value="">Select category</option>
                    {filters.blogCategories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {form.blogCategory && (
                  <div className="space-y-2">
                    <MultiSelect
                      label="Recommendations"
                      options={recommendationOptions}
                      selectedIds={form.recommendations || []}
                      onChange={handleToggleRecommendation}
                    />
                    {isRecommendationsLoading && (
                      <p className="text-xs text-blue-400">Loading recommendations...</p>
                    )}
                    {!isRecommendationsLoading &&
                      form.blogCategory &&
                      recommendationOptions.length === 0 && (
                        <p className="text-xs text-gray-400">
                          No recommendations available for this category.
                        </p>
                      )}
                  </div>
                )}
              </div>
            )}

            {form.type === "case_study" && (
              <>
                <div>
                  <MultiSelect
                    label="Portfolio categories"
                    options={filters.portfolioCategories}
                    selectedIds={form.portfolioCategoryIds}
                    onChange={(id) =>
                      toggleIdInArray("portfolioCategoryIds", id)
                    }
                  />
                </div>

                <div>
                  <MultiSelect
                    label="Technologies"
                    options={filters.technologies}
                    selectedIds={form.technologyIds}
                    onChange={(id) => toggleIdInArray("technologyIds", id)}
                  />
                </div>

                <div>
                  <MultiSelect
                    label="Industries"
                    options={filters.industries}
                    selectedIds={form.industryIds}
                    onChange={(id) => toggleIdInArray("industryIds", id)}
                  />
                </div>
              </>
            )}

            <div>
              <MultiSelect
                label="Solutions"
                options={filters.solutions}
                selectedIds={form.solutionIds}
                onChange={(id) => toggleIdInArray("solutionIds", id)}
              />
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm mb-1">Featured image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageChange}
                    className="w-full text-sm text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Featured image alt text (optional)
                  </label>
                  <input
                    name="featuredImageDesc"
                    value={form.featuredImageDesc}
                    onChange={handleBasicChange}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                    placeholder="Describe the featured image for accessibility and SEO"
                  />
                </div>
              </div>

              {form.featuredImageFile && (
                <p className="text-xs text-gray-400 mt-1">
                  Selected: {form.featuredImageFile.name}
                </p>
              )}
              {form.featuredImageBase64 && (
                <p className="text-xs text-gray-500 mt-1">
                  Saved as 1200×700 (JPEG) with 2MB max.
                </p>
              )}
              
              {/* ✅ Enhanced autosave status with error display */}
              <div className="mt-2 space-y-1">
                {isAutoSaving && (
                  <p className="text-xs text-blue-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Autosaving draft...
                  </p>
                )}
                
                {!isAutoSaving && dirty && (
                  <p className="text-xs text-yellow-400">
                    ⚠️ Unsaved changes (will autosave in 15s)
                  </p>
                )}
                
                {!isAutoSaving && !dirty && draftId && (
                  <p className="text-xs text-emerald-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Draft saved (ID: {draftId})
                  </p>
                )}
                
                {autosaveError && (
                  <p className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded px-2 py-1">
                    ❌ Autosave failed: {autosaveError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-gray-900 dark:text-gray-100">
            <label className="block text-sm mb-2 text-gray-100 font-medium">
              Content *
            </label>
            <BlogEditor
              initialContent={form.editorHtml}
              onChange={handleEditorChange}
            />
          </div>

          {form.type === "case_study" && (
            <div className="space-y-5 p-5 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-medium !text-white border-b border-zinc-800 pb-2">
                Case Study Specifics
              </h2>
              <div>
                <label className="block text-sm mb-1">Challenges</label>
                <textarea
                  name="challenges"
                  value={form.challenges}
                  onChange={handleBasicChange}
                  rows={4}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                  placeholder="Describe the challenges..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Solution</label>
                <textarea
                  name="solution"
                  value={form.solution}
                  onChange={handleBasicChange}
                  rows={4}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                  placeholder="Describe the solution..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Result</label>
                <textarea
                  name="result"
                  value={form.result}
                  onChange={handleBasicChange}
                  rows={4}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                  placeholder="Describe the results..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/blogs")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-100 px-3 md:px-4 py-2 text-sm md:text-base rounded-md transition-colors hover:bg-zinc-800 whitespace-nowrap cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Saving..."
                : draftId
                ? "Update Post"
                : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}