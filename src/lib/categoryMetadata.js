import api from "@/lib/api";

const pickMetaObject = (raw) => {
  if (!raw) return null;

  const root = raw?.data ?? raw;

  if (root?.success && root?.data) {
    if (Array.isArray(root.data)) return null;
    // New category-by-id shape:
    // { success: true, data: { category: {...}, details: { metaTitle, metaDescription, indexValue, ... } } }
    if (root.data?.details && typeof root.data.details === "object") {
      const details = root.data.details;
      const category = root.data?.category && typeof root.data.category === "object" ? root.data.category : null;
      return {
        ...details,
        ...(category?.name ? { name: category.name } : null),
        ...(category ? { category } : null),
      };
    }
    return root.data;
  }

  // Alternate shape used by some endpoints
  if (root?.details && typeof root.details === "object") return root.details;

  if (root?.detail && typeof root.detail === "object") return root.detail;

  if (root?.data && typeof root.data === "object" && !Array.isArray(root.data)) {
    return root.data;
  }

  if (typeof root === "object" && !Array.isArray(root)) return root;

  return null;
};

export async function getCategoryMetaById(categoryId) {
  if (!categoryId) return null;

  const id = String(categoryId).trim();
  if (!/^\d+$/.test(id)) return null;

  const res = await api.get(`/categories/${id}`);
  return pickMetaObject(res?.data);
}

export async function generateMetadataFromCategoryId(categoryId, fallback) {
  const titleFallback = fallback?.title || "";
  const descriptionFallback = fallback?.description || "";

  try {
    const meta = await getCategoryMetaById(categoryId);

    const title = meta?.metaTitle || titleFallback;
    const description = meta?.metaDescription || descriptionFallback;

    const indexValue = meta?.indexValue ?? true;
    const robots = indexValue ? undefined : { index: false, follow: false };

    return robots ? { title, description, robots } : { title, description };
  } catch {
    return { title: titleFallback, description: descriptionFallback };
  }
}
