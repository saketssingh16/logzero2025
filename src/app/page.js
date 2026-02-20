import HomePageHydrator from "@/components/HomePageHydrator";
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";

export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.HOME, {
    title: "Home | LogZero Technologies",
    description: "Welcome to LogZero – delivering scalable digital solutions.",
  });
}
export default function Page() {
  return <HomePageHydrator />;
}
