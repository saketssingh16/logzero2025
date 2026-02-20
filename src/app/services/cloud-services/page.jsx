import CloudServiceSection from "@/components/CloudServiceSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_CLOUD_SERVICES, {
    title: "Cloud Services",
    description: "This is our \"Cloud Services\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <CloudServiceSection />;
}