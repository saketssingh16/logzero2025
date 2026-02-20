import UiDesignSection from "@/components/UiDesignSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_UI_DESIGN, {
    title: "UI Design",
    description: "This is our \"UI Design\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <UiDesignSection />;
}