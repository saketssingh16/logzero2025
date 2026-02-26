"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "@/context/BreadcrumbsContext";

export default function CategoryBreadcrumbClient({ label }) {
  const { setBreadcrumb } = useBreadcrumbs();

  useEffect(() => {
    if (label) {
      setBreadcrumb({ label });
    }
  }, [label, setBreadcrumb]);

  return null;
}
