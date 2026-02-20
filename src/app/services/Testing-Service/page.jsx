import TestingQaSection from "@/components/TestingQaSection";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICE_TESTING_QA, {
    title: "Testing & QA Services",
    description: "This is our \"Testing & QA Services\" description here.",
  });
}



export default async function WebDevelopmentPage() {
  return <TestingQaSection />;
}