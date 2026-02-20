import PrivacyPolicySection from "@/components/PrivacyPolicySection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.PRIVACY_POLICY, {
    title: "Privacy Policy",
    description: "This is our \"Privacy Policy\" description here.",
  });
}



export default async function PrivacyPolicyPage() {
  return <PrivacyPolicySection />;
}