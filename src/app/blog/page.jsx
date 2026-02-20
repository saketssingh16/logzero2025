import BlogSection from "@/components/BlogSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.BLOG, {
    title: "Blog",
    description: "This is our \"Blog\" description here.",
  });
}



export default async function BlogPage() {
  return <BlogSection />;
}