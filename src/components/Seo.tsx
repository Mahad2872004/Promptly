import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NOINDEX, ogImage, pageMeta, privateMeta, SITE_URL } from "../seo";
export default function Seo() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    const meta = pageMeta[pathname];
    const [title, description] = meta ?? privateMeta[pathname] ?? [
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
      !meta || NOINDEX.has(pathname)
        ? "noindex,follow"
        : "index,follow",
    );
    set("og:title", document.title, true);
    set("og:description", description, true);
    set("og:url", SITE_URL + pathname, true);
    set("og:type", "website", true);
    set("og:image", ogImage(pathname), true);
    set("og:image:width", "1200", true);
    set("og:image:height", "630", true);
    set("twitter:card", "summary_large_image");
    set("twitter:title", document.title);
    set("twitter:description", description);
    set("twitter:image", ogImage(pathname));
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
