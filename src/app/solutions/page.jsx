import SolutionsSection from "@/components/SolutionsSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SOLUTIONS, {
    title: "Solutions",
    description: "This is our \"Solutions\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <SolutionsSection />;
}