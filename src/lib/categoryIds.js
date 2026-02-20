export const CATEGORY_IDS = {
  HOME: 1,
  ABOUT: 2,
  SERVICES: 3,
  SOLUTIONS: 4,
  INDUSTRY: 5,
  DEVELOPER_FOR_HIRE: 6,
  TECHNOLOGY: 7,
  CONTACT_US: 8,

  ABOUT_CLIENTS: 9,
  ABOUT_MISSION: 10,
  ABOUT_PORTFOLIO: 11,
  PRIVACY_POLICY: 12,

  SERVICE_SOFTWARE_DEVELOPMENT: 13,
  SERVICE_WEB_DEVELOPMENT: 14,
  SERVICE_MOBILE_APP_DEVELOPMENT: 15,
  SERVICE_GLOBAL_PARTNER: 16,
  SERVICE_UI_DESIGN: 17,
  SERVICE_UX_DESIGN: 18,
  SERVICE_CLOUD_SERVICES: 19,
  SERVICE_TESTING_QA: 20,

  SOLUTION_DATA_MANAGEMENT: 21,

  TERMS_AND_CONDITIONS: 22,
  BLOG: 23,
  CASE_STUDY: 24,

  BLOG_DEV: 25,
  BLOG_DIGITAL_SOLUTIONS: 26,
  BLOG_DEVOPS: 27,
  BLOG_DESIGN: 28,
  BLOG_DOCS: 29,

  WEB_APPS: 36,
  CUSTOM_ECOMMERCE: 37,
};

// Blog post filtering uses these backend slugs (NOT numeric IDs)
export const BLOG_CATEGORY_SLUG_BY_ID = {
  [CATEGORY_IDS.BLOG_DEV]: "dev",
  [CATEGORY_IDS.BLOG_DOCS]: "docs",
  [CATEGORY_IDS.BLOG_DESIGN]: "design",
  [CATEGORY_IDS.BLOG_DIGITAL_SOLUTIONS]: "digital_solutions",
  [CATEGORY_IDS.BLOG_DEVOPS]: "devops_server",
};

export const BLOG_CATEGORY_ID_BY_SLUG = {
  dev: CATEGORY_IDS.BLOG_DEV,
  docs: CATEGORY_IDS.BLOG_DOCS,
  design: CATEGORY_IDS.BLOG_DESIGN,
  digital_solutions: CATEGORY_IDS.BLOG_DIGITAL_SOLUTIONS,
  devops_server: CATEGORY_IDS.BLOG_DEVOPS,
};

export const BLOG_CATEGORY_CARDS = [
  {
    id: CATEGORY_IDS.BLOG_DEV,
    title: "Dev",
    color: "#FFEDEC",
    iconBg: "#F9E4E3",
    iconColor: "#7D2F2B",
    iconKey: "Code",
  },
  {
    id: CATEGORY_IDS.BLOG_DIGITAL_SOLUTIONS,
    title: "Digital Solutions",
    color: "#F7EBFF",
    iconBg: "#ECDDF6",
    iconColor: "#60387A",
    iconKey: "Bolt",
  },
  {
    id: CATEGORY_IDS.BLOG_DEVOPS,
    title: "DevOps",
    color: "#ECF1FF",
    iconBg: "#E0E7FB",
    iconColor: "#354571",
    iconKey: "Server",
  },
  {
    id: CATEGORY_IDS.BLOG_DESIGN,
    title: "Design",
    color: "#D8F9F3",
    iconBg: "#BBE4DD",
    iconColor: "#256D5B",
    iconKey: "Diamond",
  },
  {
    id: CATEGORY_IDS.BLOG_DOCS,
    title: "Docs",
    color: "#FFF3CB",
    iconBg: "#F9E4E3",
    iconColor: "#9F8A47",
    iconKey: "FileText",
  },
];
