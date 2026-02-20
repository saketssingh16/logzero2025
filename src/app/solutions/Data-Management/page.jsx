import DataManagementSection from "@/components/DataManagementSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SOLUTION_DATA_MANAGEMENT, {
    title: "Data Management",
    description: "This is our \"Data Management\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <DataManagementSection />;
}