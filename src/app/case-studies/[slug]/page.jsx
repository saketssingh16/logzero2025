import { Suspense } from "react";
import BlogDetailsClient from "../../blog/blog-details/BlogDetailsClient";
import api from "@/lib/api";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) {
    return {
      title: "Blog Details | LogZero Technologies",
      description:
        "Discover insights, updates, and stories from LogZero Technologies.",
    };
  }

  try {
    const res = await api.get(`/posts/${encodeURIComponent(slug)}`);
    const data = res?.data?.data ?? {};
    const title = data.metaTitle || "Blog Details | LogZero Technologies";
    const description =
      data.metaDescription ||
      "Discover insights, updates, and stories from LogZero Technologies.";
    const indexValue = data.indexValue ?? true;
    const robots = indexValue ? undefined : { index: false, follow: false };

    return robots ? { title, description, robots } : { title, description };
  } catch (error) {
    const title = "Blog Details | LogZero Technologies";
    const description =
      "Discover insights, updates, and stories from LogZero Technologies.";
    return { title, description };
  }
}

const BlogDetailsFallback = () => (
  <div className="bg-white min-h-screen">
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="h-[320px] w-full rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-6 w-1/2 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>
);

export default function BlogDetailsPage({ params }) {
  return (
    <Suspense fallback={<BlogDetailsFallback />}>
      <BlogDetailsClient identifier={params.slug} />
    </Suspense>
  );
}

