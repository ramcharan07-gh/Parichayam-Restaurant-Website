"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

export function ScrollReveal({
  children,
  className,
  ...attributes
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("reveal-visible");
        observer.unobserve(element);
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={className} {...attributes}>{children}</div>;
}
