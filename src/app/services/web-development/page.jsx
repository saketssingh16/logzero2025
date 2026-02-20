import WebDevelopmentSection from "@/components/WebDevelopmentSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_WEB_DEVELOPMENT, {
    title: "Web Development",
    description: "This is our \"Web Development\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <WebDevelopmentSection />;
}