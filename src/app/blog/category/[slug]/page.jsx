import React from "react";
import { Code, Bolt, Server, Diamond, FileText, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InlineGreenButton } from "@/components/InlineGreenButton";
import CategoryPostsClient from "@/components/CategoryPostsClient";
import api from "@/lib/api";
import { BLOG_CATEGORY_ID_BY_SLUG, BLOG_CATEGORY_SLUG_BY_ID, CATEGORY_IDS } from "@/lib/categoryIds";
import { getCategoryMetaById } from "@/lib/categoryMetadata";
import CategoryBreadcrumbClient from "@/components/CategoryBreadcrumbClient";

export const revalidate = 0;

const normalizeSlug = (value = "") =>
	value
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "") || "category";

const formatDisplaySlug = (value = "") =>
	value
		.replace(/-/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase()) || "This Category";

const isNumericId = (value) => /^\d+$/.test(String(value || "").trim());

const normalizeBlogCategorySlug = (value = "") => {
	const raw = String(value || "").trim().toLowerCase();
	if (!raw) return "";

	// Accept common variations in URLs
	const normalized = raw
		.replace(/\s+/g, "_")
		.replace(/-+/g, "_")
		.replace(/_+/g, "_")
		.replace(/^_+|_+$/g, "");

	// Known aliases
	if (normalized === "digital_solution") return "digital_solutions";
	if (normalized === "digital_solutions") return "digital_solutions";
	if (normalized === "devops") return "devops_server";
	if (normalized === "dev_ops") return "devops_server";
	if (normalized === "devops_server") return "devops_server";

	return normalized;
};

async function resolveCategoryIdFromSlug(slug) {
	try {
		const { data } = await api.get("/categories");
		const rows = data?.data ?? data;
		if (!Array.isArray(rows)) return null;
		const match = rows.find((item) => normalizeSlug(item?.name) === slug);
		return match?.id ?? null;
	} catch {
		return null;
	}
}

async function fetchCategoryMeta({ slug, id }) {
	try {
		const meta = id ? await getCategoryMetaById(id) : null;
		const displayName = meta?.name || (slug ? formatDisplaySlug(slug) : "This Category");
		const title = meta?.metaTitle || `Blog | ${displayName}`;
		const description = meta?.metaDescription || "Explore our latest insights and updates.";
		const indexValue = meta?.indexValue ?? true;
		const robots = indexValue ? undefined : { index: false, follow: false };
		return robots ? { title, description, robots } : { title, description };
	} catch {
		const title = `Blog | ${formatDisplaySlug(slug)}`;
		const description = "Explore our latest insights and updates.";
		return { title, description };
	}
}

const devImg = "/assets/img/devImage.webp";

const SearchOfCategory = [
	{ id: CATEGORY_IDS.BLOG_DEV, title: "Dev", color: "#FFEDEC", iconBg: "#F9E4E3", icon: Code, iconColor: "#7D2F2B" },
	{ id: CATEGORY_IDS.BLOG_DIGITAL_SOLUTIONS, title: "Digital Solutions", color: "#F7EBFF", icon: Bolt, iconBg: "#ECDDF6", iconColor: "#60387A" },
	{ id: CATEGORY_IDS.BLOG_DEVOPS, title: "DevOps", color: "#ECF1FF", icon: Server, iconBg: "#E0E7FB", iconColor: "#354571" },
	{ id: CATEGORY_IDS.BLOG_DESIGN, title: "Design", color: "#D8F9F3", icon: Diamond, iconBg: "#BBE4DD", iconColor: "#256D5B" },
	{ id: CATEGORY_IDS.BLOG_DOCS, title: "Docs", color: "#FFF3CB", icon: FileText, iconBg: "#F9E4E3", iconColor: "#9F8A47" },
];

export async function generateMetadata({ params }) {
	const slugParam = params?.slug || "";
	const rawParam = String(slugParam || "").trim();
	const blogCategorySlug = isNumericId(rawParam)
		? BLOG_CATEGORY_SLUG_BY_ID[Number(rawParam)]
		: normalizeBlogCategorySlug(rawParam);

	const normalizedForResolution = normalizeSlug(rawParam);
	const resolvedId = isNumericId(rawParam)
		? Number(rawParam)
		: (BLOG_CATEGORY_ID_BY_SLUG[blogCategorySlug] ?? (await resolveCategoryIdFromSlug(normalizedForResolution)));

	// Keep the display fallback readable for slug URLs
	const displaySlug = blogCategorySlug || normalizedForResolution;
	return fetchCategoryMeta({ id: resolvedId, slug: displaySlug });
}

async function fetchCategoryRows(slug, page = 1) {
	try {
		const params = { type: "blog_post", blogCategory: slug };
		if (page && page > 1) params.page = page;
		const { data } = await api.get("/posts", { params });
		const rows = data?.data?.rows ?? data?.rows ?? [];
		rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		return rows;
	} catch (e) {
		console.error("fetchCategoryRows error:", e);
		return [];
	}
}

export default async function CategoryPage(props) {
	const { params } = props;
	const searchParams = props.searchParams || {};
	const slugParam = params?.slug || "";
	const rawParam = String(slugParam || "").trim();
	const blogCategorySlug = isNumericId(rawParam)
		? BLOG_CATEGORY_SLUG_BY_ID[Number(rawParam)]
		: normalizeBlogCategorySlug(rawParam);

	const normalizedForResolution = normalizeSlug(rawParam);
	const categoryId = isNumericId(rawParam)
		? Number(rawParam)
		: (BLOG_CATEGORY_ID_BY_SLUG[blogCategorySlug] ?? (await resolveCategoryIdFromSlug(normalizedForResolution)));

	const categoryMeta = categoryId ? await getCategoryMetaById(categoryId) : null;
	const categoryName = categoryMeta?.name || formatDisplaySlug(blogCategorySlug || rawParam || normalizedForResolution);
	const categorySlugForPosts = blogCategorySlug || normalizeBlogCategorySlug(categoryName) || normalizeBlogCategorySlug(rawParam);
	const page = Number(searchParams?.page ?? 1);
	const displaySlug = categoryName;

	const rows = await fetchCategoryRows(categorySlugForPosts, page);
	const listRows = rows.slice(0, 9);

	return (
		<div className="bg-white font-sans">
			<CategoryBreadcrumbClient label={displaySlug} />
			<section className="mt-16 ">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
					<div className="gap-6 pt-[30px] pb-[30px] pl-6 xl:pl-[80px] lg:pl-[50px] md:pl-8 pr-6 lg:pr-[30px] md:pr-[0px]">
						<h2 className=" lg:!text-[48px] md:!leading-[2rem] lg:!leading-[3rem] font-semibold text-[#1F1F1F]">
							{rawParam ? (
								<>
									{displaySlug}{" "}
									<span className="text-primary">Insights</span>
									{" "}&{" "}
									<span className="text-primary">Best Practices</span>
								</>
							) : (
								"Category"
							)}
						</h2>
						<p className="lg:text-xl text-[#111827] my-2">{`Latest posts for ${displaySlug || "this category"}.`}</p>
						<div className="inline-block">
							<InlineGreenButton text="Schedule Consultation" linkurl="/contact-us" linktarget="_self" MoveRighticon services={[]} />
						</div>
					</div>

					<Image src={devImg} alt="Category image" width={1200} height={800} className="object-cover w-full" />
				</div>
			</section>

			<div className="container mx-auto px-4 lg:px-0 pb-10">
				{/* search by category start */}
				<div className="mt-16">
					<h2 className="text-2xl font-semibold mb-4 text-[#2B2D2F]">Find <span className="text-primary">Blogs</span> by Your <span className="text-primary">Interest</span></h2>
					<div className=" border-b border-[#E5E5E7] mb-8" />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{SearchOfCategory.map((category) => {
							const IconComponent = category.icon;
							const cardSlug = BLOG_CATEGORY_SLUG_BY_ID[category.id];
							const isActive = categoryId
								? String(categoryId) === String(category.id)
								: blogCategorySlug === cardSlug;
							return (
								<Link
									key={category.id}
									href={`/blog/category/${cardSlug}`}
									aria-current={isActive ? "page" : undefined}
									className={`flex flex-col items-center p-4 rounded-lg transition ${
										isActive
											? "category-glow ring-2 ring-[#1E8767] shadow-[0_0_25px_rgba(30,135,103,0.35)]"
											: "hover:shadow-lg"
									}`}
									style={{ backgroundColor: category?.color }}
								>
									<div className=" w-16 h-16 rounded rounded-full flex items-center justify-center" style={{ backgroundColor: category?.iconBg }}>
										<IconComponent className="w-8 h-8" style={{ color: category?.iconColor }} />
									</div>

									<p className="lg:!text-[20px] text-center font-bold mt-4" style={{ color: category.iconColor }}>{category.title}</p>
								</Link>
							);
						})}
						{SearchOfCategory.length === 0 && <p>No categories available.</p>}
					</div>
				</div>
				{/* search by category end */}

				{/* Featured + posts */}
				<section className="mt-16">
					{rows.length === 0 ? (
						<div className="flex flex-col items-center text-center py-20">
							<h3 className="text-3xl font-bold mb-4">No posts yet in {displaySlug}</h3>
							<p className="text-gray-600 max-w-2xl mb-6">
								We're gathering thoughtful, practical articles for this category. Subscribe or schedule a consultation and we'll let you know when new posts go live.
							</p>
							<div className="flex gap-4">
								<InlineGreenButton text="Schedule Consultation" linkurl="/contact-us" linktarget="_self" MoveRighticon={false} services={[]} />
								<a href="/blog" className="inline-flex items-center justify-center px-6 py-3 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Browse all posts</a>
							</div>
              
						</div>
					) : (
						<>
							<h2 className="text-2xl font-semibold mb-4 text-[#2B2D2F]">Latest <span className="text-primary">Posts</span></h2>
							<div className="border-b border-[#E5E5E7] mb-8" />
							<CategoryPostsClient initialPosts={listRows} morePosts={rows.slice(9)} />
						</>
					)}
				</section>
			</div>
		</div>
	);
}
