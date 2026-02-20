 import React from 'react';
import WebApps from '../../components/WebApps';
import { generateMetadataFromCategoryId } from "@/lib/categoryMetadata";
import { CATEGORY_IDS } from "@/lib/categoryIds";
export const revalidate = 0;

export async function generateMetadata() {
  return generateMetadataFromCategoryId(CATEGORY_IDS.WEB_APPS, {
    title: "Web Apps",
    description: "This is our \"Web Apps\" description here.",
  });
}

    const WebAppsPage = () => {
        return (
            <WebApps />
        );
    }

    export default WebAppsPage;