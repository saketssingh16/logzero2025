import AboutUs from "@/components/AboutUs";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.ABOUT, {
    title: "About Us | LogZero Technologies",
    description: "Learn about LogZero Technologies, our mission, team, and the value we deliver.",
  });
}


  



export default async function AboutUsPage() {
  return <AboutUs />;
}