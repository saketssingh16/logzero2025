import UxDesignSection from "@/components/UxDesignSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_UX_DESIGN, {
    title: "UX Design Services",
    description: "This is our \"UX Design Services\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <UxDesignSection />;
}