'use client';

import { useIsDesktop } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";

export default function Demo() {
  const isDesktop = useIsDesktop(1024);
	return (
		<LayoutDemo
      title="Verifying Desktop Environment"
    >
      <p className="font-reddit-sans text-sm text-white/60 w-full text-center">
        Current environment:{' '}
        <span className="font-reddit-sans text-sm text-white/80 font-bold">
          {isDesktop ? "🖥️ Desktop View" : "📱 Mobile/Tablet View"}
        </span>
      </p>
		</LayoutDemo>
	);
}
