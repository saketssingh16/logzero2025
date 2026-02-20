import GlobalPartnerSection from "@/components/GlobalPartnerSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_GLOBAL_PARTNER, {
    title: "Global Partner",
    description: "This is our \"Global Partner\" description here.",
  });
}



export default async function GlobalParnterPage() {
  return <GlobalPartnerSection />;
}