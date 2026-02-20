import Portfolio from "@/components/Portfolio";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.CASE_STUDY, {
    title: "Portfolio",
    description: "This is our \"Portfolio\"description here.",
  });
}



export default async function PortfolioPage() {
  return <Portfolio />;
}