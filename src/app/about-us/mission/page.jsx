import Mission from "@/components/Mission";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.ABOUT_MISSION, {
    title: "Mission",
    description: "This is our \"Mission\"description here.",
  });
}



export default async function MissionPage() {
  return <Mission />;
}