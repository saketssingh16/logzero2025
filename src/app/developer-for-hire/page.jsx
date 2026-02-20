import DeveloperForHireSection from "@/components/DeveloperForHireSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.DEVELOPER_FOR_HIRE, {
    title: "Developer For Hire",
    description: "This is our \"Developer For Hire\" description here.",
  });
}



export default async function DeveloperForHirePage() {
  return <DeveloperForHireSection />;
}