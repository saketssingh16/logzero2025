import Services from "@/components/Services";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.SERVICES, {
    title: "Services",
    description: "Services here.",
  });
}



export default async function ServicesPage() {
  return <Services />;
}