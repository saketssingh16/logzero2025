 import React from 'react';
import ContactUsSection from '../../components/ContactUsSection';
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.CONTACT_US, {
    title: "Contact Us",
    description: "Get in touch with LogZero Technologies.",
  });
}

    const ContactUsPage = () => {
        return (
            <ContactUsSection />
        );
    }

    export default ContactUsPage;