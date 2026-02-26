"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const formatFromSlug = (value = "") => {
  const cleaned = String(value || "")
    .replace(/[?#].*$/u, "")
    .replace(/-/gu, " ")
    .replace(/_/gu, " ")
    .trim();

  if (!cleaned) return "Details";

  return cleaned.replace(/\b\w/gu, (c) => c.toUpperCase());
};

function buildBreadcrumbs({ pathname, searchParams, currentLabel }) {
  const items = [{ href: "/", label: "Home" }];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return items;

  // Blog routes
  if (segments[0] === "blog") {
    items.push({ href: "/blog", label: "Blog" });

    // /blog
    if (segments.length === 1) return items;

    // /blog/category/[slug]
    if (segments[1] === "category" && segments[2]) {
      const slug = segments.slice(2).join("/");
      const label = currentLabel || formatFromSlug(slug);
      items.push({ href: `/blog/category/${slug}`, label });
      return items;
    }

    // /blog/searchResult
    if (segments[1] === "searchResult") {
      items.push({ label: "Search" });
      return items;
    }

    // /blog/blogDetails?id=...
    // /blog/[slug]
    const slugOrId =
      segments[1] === "blogDetails"
        ? searchParams.get("id") || ""
        : segments[1];

    const label = currentLabel || formatFromSlug(slugOrId);
    items.push({ label });
    return items;
  }

  // Case studies routes reuse blog data
  if (segments[0] === "case-studies") {
    items.push({ href: "/case-studies", label: "Case Studies" });

    if (segments.length === 1) return items;

    const slug = segments.slice(1).join("/");
    const label = currentLabel || formatFromSlug(slug);
    items.push({ label });
    return items;
  }

  // Generic static routes (services, about, etc.)
  let pathAcc = "";
  const STATIC_LABELS = {
    services: "Services",
    "custom-software-development": "Software Development",
    "contact-us": "Contact Us",
    "about-us": "About Us",
    blog: "Blog",
    "case-studies": "Case Studies",
  };

  segments.forEach((segment, index) => {
    pathAcc += `/${segment}`;
    const isLast = index === segments.length - 1;

    let label = STATIC_LABELS[segment] || formatFromSlug(segment);

    if (!isLast) {
      items.push({ href: pathAcc, label });
    } else {
      items.push({ label: currentLabel || label });
    }
  });

  return items;
}

export default function Breadcrumbs({ currentLabel, items: explicitItems }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const items = explicitItems && explicitItems.length
    ? explicitItems
    : buildBreadcrumbs({ pathname, searchParams, currentLabel });

  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = (
            <span
              className={
                isLast
                  ? "font-semibold text-[#3ca585]"
                  : "hover:text-[#1E8767] transition-colors"
              }
            >
              {item.label}
            </span>
          );

          return (
            <li key={`${item.href || ""}-${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden className="text-gray-400">&gt;</span>}
              {item.href && !isLast ? (
                <Link href={item.href}>{content}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
