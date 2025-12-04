"use client";

import dynamic from "next/dynamic";
import React from "react";

const HomePageClient = dynamic(() => import("@/components/HomePageClient"), {
  ssr: false,
  loading: () => <p className="p-4 text-center">Loading homepage…</p>,
});

export default function HomePageHydrator() {
  return <HomePageClient />;
}
