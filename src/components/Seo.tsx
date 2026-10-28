import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageMeta, SITE_URL } from "../seo";
export default function Seo() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    const meta = pageMeta[pathname];
    const [title, description] = meta ?? [
      "Page not found",
      "Explore Promptly’s software engineering services and products.",
    ];
    document.title = `${title} | Promptly`;
    const set = (name: string, content: string, property = false) => {
      const key = property ? "property" : "name";
      let el = document.head.querySelector(`meta[${key}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    set("description", description);
    set(
      "robots",
      !meta || pathname === "/client-portal"
        ? "noindex,follow"
        : "index,follow",
    );
    set("og:title", document.title, true);
    set("og:description", description, true);
    set("og:url", SITE_URL + pathname, true);
    set("og:type", "website", true);
    set("twitter:card", "summary");
    set("twitter:title", document.title);
    set("twitter:description", description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SITE_URL + pathname);
  }, [pathname]);
  return null;
}
