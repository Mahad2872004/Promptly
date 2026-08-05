import { ViewType } from "./types";

// Map ViewType → URL path
export const VIEW_PATHS: Record<ViewType, string> = {
  home: "/",
  services: "/services",
  "ai-solutions": "/services/ai-solutions",
  "software-development": "/services/software-development",
  "digital-transformation": "/services/digital-transformation",
  "startup-support": "/services/startup-support",
  portfolio: "/portfolio",
  "ai-architect": "/ai-architect",
  about: "/about",
  "client-portal": "/client-portal",
  contact: "/contact",
  consultation: "/consultation",
  xsender: "/products/xsender",
  products: "/products",
  startups: "/industries/startups",
  ecommerce: "/industries/ecommerce",
  realestate: "/industries/realestate",
  enterprise: "/industries/enterprise",
};

// Map URL path → ViewType (for header active-state detection)
export const PATH_TO_VIEW: Record<string, ViewType> = Object.entries(VIEW_PATHS).reduce(
  (acc, [view, path]) => ({ ...acc, [path]: view as ViewType }),
  {} as Record<string, ViewType>
);
