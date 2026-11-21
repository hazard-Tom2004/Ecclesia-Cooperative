"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>([
      "[data-reveal]",
      "main h1, main h2, main h3, main h4",
      "main p:not(.eyebrow)",
      "main a, main button",
      "main img, main article, main li, main form, main label",
      "main input, main textarea, main select",
      "main small, main strong, main summary, main figure, main blockquote",
      ".site-header .brand, .site-header nav a",
      ".site-footer h3, .site-footer p, .site-footer a, .site-footer .footer-bottom",
      ".site-footer .footer-main > div",
    ].join(","));
    const animations: Array<{ stop: () => void }> = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const index = Number(target.dataset.revealIndex ?? 0);
          target.classList.remove("reveal-pending");
          target.classList.add("is-visible");
          animations.push(animate(target, { opacity: [0, 1], y: [18, 0], filter: ["blur(4px)", "blur(0px)"] }, {
            duration: 0.7,
            delay: (index % 4) * 0.07,
            ease: [0.22, 0.7, 0.2, 1],
          }));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    targets.forEach((el, index) => {
      el.dataset.revealIndex = String(index);
      el.classList.remove("is-visible");
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("filter");
      el.classList.add("reveal-pending");
      observer.observe(el);
    });
    const onScroll = () => {
      document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      animations.forEach((animation) => animation.stop());
      targets.forEach((el) => {
        el.classList.remove("reveal-pending", "is-visible");
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("filter");
      });
    };
  }, [pathname]);
  return null;
}
