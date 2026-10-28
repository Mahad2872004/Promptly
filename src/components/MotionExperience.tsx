import { useEffect } from "react";
import { useLocation } from "react-router-dom";
/** Progressive enhancement: all content is visible without this observer. */
export default function MotionExperience() {
  const { pathname } = useLocation();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading,.capability-row,.story-chapter,.delivery-timeline li,.closing-inner,.hero-copy,.service-capabilities > article,.team-grid > *, .case-story article,.values-grid article,.industry-strengths article,.work-tools article,.workflow-story article,.booking-panel,.product-listing",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    elements.forEach((el) => {
      el.classList.add("motion-reveal");
      observer.observe(el);
    });
    const showAll = () =>
      elements.forEach((el) => el.classList.add("is-revealed"));
    query.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", showAll);
      elements.forEach((el) =>
        el.classList.remove("motion-reveal", "is-revealed"),
      );
    };
  }, [pathname]);
  return null;
}
