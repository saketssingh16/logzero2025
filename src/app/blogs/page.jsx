"use client";
import React, { useState } from "react";

const featuredImage =
  "https://placehold.co/400x300/1E88E5/FFFFFF?text=Featured+Post";
const dentalImage1 =
  "https://placehold.co/100x100/C8E6C9/388E3C?text=Dental+Health";
const dentalImage2 =
  "https://placehold.co/100x100/A5D6A7/000000?text=Dental+Wellness";

const MOCK_POSTS = [
  {
    id: 1,
    title: "When Medical Expert Witnesses Change The Course of Litigation",
    author: "NEHA BHATNAGAR",
    date: "November 16, 2025",
    category: "Mobile App Development",
    summary:
      "High-Stakes Scenarios Meet Medical Expertise A pedestrian struck by a distracted driver suffers internal injuries so complex the courtroom air...",
    imageUrl: featuredImage,
    isFeatured: true,
  },

  {
    id: 2,
    title:
      "Enhancing Your Dental Health with Premier Services from St. George Dentists",
    date: "December 1, 2025",
    imageUrl: dentalImage1,
  },
  {
    id: 3,
    title:
      "Boost Your Dental Wellness with Top-Notch Care from St. George Dental Experts",
    date: "December 1, 2025",
    imageUrl: dentalImage2,
  },
  {
    id: 4,
    title:
      "Boost Your Dental Wellness with Top-notch Care from St. George Dental Experts",
    date: "December 1, 2025",
    imageUrl: dentalImage1,
  },
  {
    id: 5,
    title:
      "Boost Your Dental Wellness with Top-notch Care from St. George Dental Experts",
    date: "December 1, 2025",
    imageUrl: dentalImage2,
  },
];

const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const InfoCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SmallBlogItem = ({ post, onDropdownToggle, isDropdownOpen }) => {
  const isSpecial = post.title.includes("No-Claim Bonus");
  const Icon = isDropdownOpen ? ChevronDownIcon : ChevronRightIcon;
  const SpecialIcon = InfoCircleIcon;

  return (
    <div className="py-2 border-b border-gray-100 last:border-b-0">
      <div
        className={`flex items-start text-sm cursor-pointer transition ${
          isSpecial ? "font-semibold" : "text-gray-800"
        }`}
        onClick={isSpecial ? () => onDropdownToggle(post.id) : null}
      >
        {isSpecial ? (
          <div className="flex items-center text-blue-500 mr-2 hover:text-blue-700 transition">
            <Icon className="w-8 h-8 mt-1" />
          </div>
        ) : (
          <span className="text-blue-500 mr-2 mt-1 text-lg leading-none">
            &raquo;
          </span>
        )}
        <a
          href={`/blog/${post.id}`}
          className="leading-tight hover:text-green-600"
        >
          {post.title}
        </a>
      </div>
      <p className="text-xs text-gray-500 ml-6 mt-1 flex items-center">
        <CalendarIcon className="w-3 h-3 mr-1" />
        {post.date}
      </p>
      {isSpecial && isDropdownOpen && (
        <div className="mt-2 ml-6 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 shadow-inner">
          <h4 className="font-bold mb-1 text-green-700">
            Restore Your NCB: Quick Info
          </h4>
          <p>
            The No-Claim Bonus (NCB) can typically be restored within 90 days of
            policy renewal. However, if you make a claim, the NCB is reset to
            zero. You can protect it using an NCB Protect Add-on.
          </p>
          <a
            href={`/blog/${post.id}`}
            className="text-blue-500 hover:text-blue-700 mt-2 block font-medium"
          >
            View Full Guide →
          </a>
        </div>
      )}
    </div>
  );
};

// Main App Component
export default function App() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [page, setPage] = useState(1);

  const featuredPost = MOCK_POSTS.find((p) => p.isFeatured);
  const mediumPosts = MOCK_POSTS.filter((p) => !p.isFeatured);

  const specialPost = {
    id: 6,
    title: "How to Restore Your No-Claim Bonus After a Car Accident",
    date: "DECEMBER 1, 2025",
  };
  const rightColumnPosts = [
    { ...specialPost, id: 6.1 },
    { ...specialPost, id: 6.2 },
    { ...specialPost, id: 6.3 },
    { ...specialPost, id: 6.4 },
    { ...specialPost, id: 6.5 },
  ];

  const handleDropdownToggle = (id) => {
    if (id === 6.1) {
      setOpenDropdownId(openDropdownId === id ? null : id);
    }
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header and Search */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Blogs
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="search"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm"
            />
            {/* Search Icon */}
            <svg
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </header>

        {/* Main Content: 3-Column Grid */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Featured Post */}
          <div className="md:col-span-1">
            {featuredPost && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
                <div className="relative">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute bottom-4 right-4 px-3 py-2 bg-[#1E8767] text-white text-sm font-medium rounded-lg shadow-md">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <a href={`/blog/${featuredPost.id}`} className=" subtext-6 ">
                    {featuredPost.title}
                  </a>
                  <p className="text-sm text-gray-500 mb-4 flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">
                      BY {featuredPost.author}
                    </span>
                    &bull;
                    <CalendarIcon className="w-4 h-4 mx-1 text-gray-400" />
                    {featuredPost.date}
                  </p>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.summary}
                  </p>
                  <a
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition border-b-2 border-green-200 hover:border-green-600 pb-0.5 mt-auto"
                  >
                    Read More
                    <ChevronRightIcon className="ml-2 h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Stacked Medium Posts */}
          <div className="md:col-span-1 space-y-4">
            {mediumPosts.map((post) => (
              <div
                key={post.id}
                className="flex space-x-4 bg-white p-4 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <a
                    href={`/blog/${post.id}`}
                    className="text-sm font-semibold text-gray-800 hover:text-green-600 transition line-clamp-2 leading-snug"
                  >
                    {post.title}
                  </a>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1 text-gray-400" />
                    {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Right Sidebar (Small List) */}
          <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit">
            <div className="space-y-3">
              {rightColumnPosts.map((post) => (
                <SmallBlogItem
                  key={post.id}
                  post={post}
                  onDropdownToggle={handleDropdownToggle}
                  isDropdownOpen={openDropdownId === 6.1 && post.id === 6.1}
                />
              ))}
            </div>
          </aside>
        </main>

        {/* Pagination (Dynamic Next/Prev Buttons) */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-full transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: page === 1 ? "#e0e0e0" : "#d1fae5",
              color: page === 1 ? "#757575" : "#059669",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronRightIcon className="h-4 w-4 mr-2 transform rotate-180" />
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600">Page {page}</span>
          <button
            onClick={handleNextPage}
            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-full transition duration-150 ease-in-out bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
