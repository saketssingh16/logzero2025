"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useBreadcrumbs } from "@/context/BreadcrumbsContext";

const DEFAULT_DETAILS_IMAGE = "/assets/img/devImage.webp";

const formatIsoDate = (isoValue) => {
  if (!isoValue) return "";
  try {
    const date = new Date(isoValue);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return isoValue;
  }
};

const formatShortDate = (isoValue) => {
  if (!isoValue) return "";
  try {
    const date = new Date(isoValue);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch (error) {
    return isoValue;
  }
};

const getPostHref = (post) => {
  const slug = post?.slug;
  if (slug) return `/blog/${encodeURIComponent(slug)}`;

  const id = post?.id;
  if (id) return `/blog/blogDetails?id=${encodeURIComponent(id)}`;

  return "/blog";
};

export default function BlogDetailsClient({ identifier }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setBreadcrumb } = useBreadcrumbs();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backTarget, setBackTarget] = useState("/blog");

  useEffect(() => {
    const controller = new AbortController();

    const isCancelError = (err) =>
      err?.name === "CanceledError" ||
      err?.name === "AbortError" ||
      err?.code === "ERR_CANCELED";

    const postIdOrSlug = identifier ?? searchParams.get("id");
    // When navigating to the slug route, identifier can briefly be undefined during hydration.
    // Keep showing the loading skeleton until we have an identifier.
    if (!postIdOrSlug) {
      setLoading(true);
      setError("");
      setPost(null);
      return () => controller.abort();
    }

    const fetchPost = async () => {
      let canceled = false;
      setLoading(true);
      setError("");
      try {
        const { data: payload } = await api.get(`/posts/${encodeURIComponent(postIdOrSlug)}`, {
          signal: controller.signal,
        });
        const data = payload?.data ?? null;
        if (!data) {
          setError("Post not found");
          setPost(null);
          return;
        }
        setPost(data);
        const label =
          data.metaTitle ||
          data.title ||
          data.name ||
          data.slug ||
          "Details";
        setBreadcrumb({ label });
      } catch (err) {
        if (isCancelError(err)) {
          canceled = true;
          return;
        }
        const apiMessage = err?.response?.data?.message || err?.message;
        setError(apiMessage || "Unable to load post");
        setPost(null);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchPost();
    return () => controller.abort();
  }, [searchParams, identifier]);

  

  const imageSrc =
    post?.featuredImageBase64?.trim() || post?.featuredImage || DEFAULT_DETAILS_IMAGE;
  const dateLabel =
    post?.publishedAt ||
    post?.createdAt ||
    post?.created_at ||
    post?.updatedAt ||
    post?.updated_at;
  const formattedDate = formatIsoDate(dateLabel);
  const contentBlocks = Array.isArray(post?.content?.blocks)
    ? post.content.blocks.filter((block) => block?.data?.text)
    : [];

  const isBlogPost = post?.type === "blog_post";
  const recommendationItems =
    isBlogPost && Array.isArray(post?.recommendations)
      ? post.recommendations
          .map((r) => r?.recommendedPost)
          .filter(Boolean)
      : [];
  const hasRecommendations = recommendationItems.length > 0;

 

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href={backTarget}
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1E8767]"
          >
            <span aria-hidden className="text-base">&lt;</span>
            <span>Back to Blog posts</span>
          </Link>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-[320px] w-full rounded-2xl bg-gray-200" />
              <div className="h-6 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              {error}
            </div>
          ) : !post ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700">
              Post not found.
            </div>
          ) : (
            <div
              className={
                isBlogPost && hasRecommendations
                  ? "grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]"
                  : "max-w-3xl mx-auto"
              }
            >
              <article className="overflow-hidden rounded-[32px] border border-[#E5E5E7] bg-white shadow-sm">
                <div className="relative h-[420px] w-full bg-gray-100">
                  <img
                    src={imageSrc}
                    alt={
                      post?.featuredImageBase64?.trim() || post?.featuredImage
                        ? post?.featuredImageDesc || post?.metaTitle || "Blog post image"
                        : ""
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-5 p-6 text-[#1F1F1F] md:p-10">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <CalendarDays className="h-5 w-5" />
                    <span>{formattedDate}</span>
                  </div>
                  {contentBlocks.length > 0 ? (
                    <div className="space-y-4 text-base leading-7 text-[#1F1F1F]">
                      {contentBlocks.map((block, idx) => (
                        <div
                          key={block?.id ?? idx}
                          className="[&_*]:max-w-full"
                          dangerouslySetInnerHTML={{ __html: block.data.text }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg leading-7 text-[#4B5563]">Details coming soon.</p>
                  )}
                </div>
              </article>

              {isBlogPost && hasRecommendations && (
                <aside className="self-start rounded-2xl border border-[#E5E5E7] bg-[#F9FAFB] p-4 md:p-5">
                  <h2 className="text-base md:text-lg font-semibold text-[#111827] mb-3">
                    Recommended posts
                  </h2>
                  <div className="space-y-3">
                    {recommendationItems.map((rec) => {
                      const recImageSrc =
                        rec.featuredImageBase64?.trim() ||
                        rec.featuredImage ||
                        rec.imageUrl ||
                        DEFAULT_DETAILS_IMAGE;
                      const recDate =
                        rec.publishedAt ||
                        rec.createdAt ||
                        rec.created_at ||
                        rec.updatedAt ||
                        rec.updated_at;
                      const recFormattedDate = formatShortDate(recDate);

                      return (
                        <Link
                          key={rec.id}
                          href={getPostHref(rec)}
                          className="flex gap-3 items-center rounded-xl bg-white/80 p-3 hover:bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={recImageSrc}
                              alt={rec?.featuredImageDesc || rec?.metaTitle || "Recommended post image"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-center gap-1">
                            {recFormattedDate && (
                              <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                                <CalendarDays className="h-3.5 w-3.5" />
                                <span>{recFormattedDate}</span>
                              </div>
                            )}
                            <p className="line-clamp-2 text-xs md:text-sm font-semibold text-[#111827]">
                              {rec.metaTitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </aside>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}