 import React from 'react';
import CustomEcommerceSection from '../../components/CustomEcommerceSection';
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.CUSTOM_ECOMMERCE, {
    title: "Custom Ecommerce",
    description: "This is our \"Custom Ecommerce\"description here.",
  });
}

    const CustomEcommercePage = () => {
        return (
            <CustomEcommerceSection />
        );
    }

    export default CustomEcommercePage;