"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbsProvider, useBreadcrumbs } from "@/context/BreadcrumbsContext";

function GlobalBreadcrumbBar() {
  const { currentLabel, currentIcon } = useBreadcrumbs();
  return (
    // <div className="bg-[#F9FAFB] border-b border-[#E5E5E7]">
    <div className=" absolute left-[30px] pt-[7px] ">
      <div className="container mx-auto px-4 ">
        <Breadcrumbs currentLabel={currentLabel || undefined} />
      </div>
    </div>
  );
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <BreadcrumbsProvider>
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "mt-[77px]" : ""}>
        {!isAdminRoute && (
          <Suspense fallback={null}>
            <GlobalBreadcrumbBar />
          </Suspense>
        )}
        {children}
      </main>
      {!isAdminRoute && <ScrollToTopButton />}
      {!isAdminRoute && <Footer />}
    </BreadcrumbsProvider>
  );
}