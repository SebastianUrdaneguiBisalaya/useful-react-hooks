'use client';

import { useScreenSize } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
	const { height, width } = useScreenSize();

  return (
		<LayoutDemo
      title="Screen Size"
    >
      <div className="flex flex-col items-center max-w-xs w-full bg-neutral-900 border border-white/50 border-dashed px-2 py-6">
        <p className="font-reddit-sans font-bold text-white/90 text-center w-full">{width} x {height}</p>
      </div>
      <p className="text-xs font-reddit-sans text-white/40">
        Resize your browser to see changes
      </p>
		</LayoutDemo>
	);
}
