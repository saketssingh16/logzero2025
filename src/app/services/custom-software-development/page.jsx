import SoftwareDevelopmentSection from "@/components/SoftwareDevelopmentSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_SOFTWARE_DEVELOPMENT, {
    title: "Custom Software Development",
    description: "This is our \"Custom Software Development\" description here.",
  });
}



export default async function SoftwareDevelopmentPage() {
  return <SoftwareDevelopmentSection />;
}