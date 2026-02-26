"use client";

import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const BreadcrumbsContext = createContext({
  currentLabel: null,
  currentIcon: null,
  setBreadcrumb: () => {},
  clearBreadcrumb: () => {},
});

export function BreadcrumbsProvider({ children }) {
  const [state, setState] = useState({ currentLabel: null, currentIcon: null });
  const pathname = usePathname();

  // Reset breadcrumb overrides on route change so static pages
  // like /contact-us fall back to their URL-derived labels.
  useEffect(() => {
    setState({ currentLabel: null, currentIcon: null });
  }, [pathname]);

  const setBreadcrumb = useCallback(({ label, icon } = {}) => {
    setState((prev) => ({
      ...prev,
      currentLabel: label ?? prev.currentLabel,
      currentIcon: icon ?? prev.currentIcon,
    }));
  }, []);

  const clearBreadcrumb = useCallback(() => {
    setState({ currentLabel: null, currentIcon: null });
  }, []);

  const value = useMemo(
    () => ({
      currentLabel: state.currentLabel,
      currentIcon: state.currentIcon,
      setBreadcrumb,
      clearBreadcrumb,
    }),
    [state.currentLabel, state.currentIcon, setBreadcrumb, clearBreadcrumb]
  );

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbs() {
  return useContext(BreadcrumbsContext);
}
