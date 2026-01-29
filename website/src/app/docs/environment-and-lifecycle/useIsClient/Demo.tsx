'use client';

import { useIsClient } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";

export default function Demo() {
  const isClient = useIsClient();
	return (
		<LayoutDemo
      title="Client-side component"
    >
      <p className="font-reddit-sans text-sm text-white/60 w-full text-center">
        Current environment:{' '}
        <span className="font-reddit-sans text-sm text-white/80 font-bold">
          {isClient ? 'Client-side' : 'Server-side'}
        </span>
      </p>
		</LayoutDemo>
	);
}
