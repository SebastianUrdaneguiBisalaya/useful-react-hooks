'use client';

import { usePageVisibility } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
  const { isVisible, visibilityState } = usePageVisibility();
	return (
		<LayoutDemo
      title="Page Visibility"
    >
      <p className="text-sm text-center w-full text-white/60 font-reddit-sans">Document Status: <span className="font-bold text-white">{visibilityState}</span></p>
      <p className="font-reddit-sans text-white/60 w-full text-center text-sm">Is Visible: <span className="font-bold text-white">{isVisible ? '✅' : '❌'}</span></p>
      <p className="text-xs font-reddit-sans text-white/40">
        (Try switching tabs and coming back to see the state change)
      </p>
		</LayoutDemo>
	);
}
