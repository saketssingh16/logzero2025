import TechnologySection from "@/components/TechnologySection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.TECHNOLOGY, {
    title: "Technology",
    description: "This is our \"Technology\" description here.",
  });
}



export default async function TechnologyPage() {
  return <TechnologySection />;
}