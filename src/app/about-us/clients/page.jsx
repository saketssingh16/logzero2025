import Clients from "@/components/Clients";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.ABOUT_CLIENTS, {
    title: "Clients",
    description: "This is our \"Clients\"description here.",
  });
}



export default async function ClientsPage() {
  return <Clients />;
}