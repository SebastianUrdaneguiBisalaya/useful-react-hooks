'use client';

import { useIntersectionObserver } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";
import { cn } from "@/lib/cn";

export default function Demo() {
  const { isVisible, ref } = useIntersectionObserver<HTMLDivElement>({
    once: true,
    threshold: 0.5,
  });

  return (
    <LayoutDemo
      title="Intersection Observer"
    >
      <div
        className={cn(
          'transition-all duration-700 rounded-2xl bg-neutral-900 border border-white/20 p-4',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
        ref={ref}
      >
        <p className="font-reddit-sans text-sm text-white w-full text-center">
          Visible on scroll 👀
        </p>
      </div>
    </LayoutDemo>
  )
}
