import IndustrySection from "@/components/IndustrySection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.INDUSTRY, {
    title: "Industry",
    description: "This is our \"Industry\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <IndustrySection />;
}