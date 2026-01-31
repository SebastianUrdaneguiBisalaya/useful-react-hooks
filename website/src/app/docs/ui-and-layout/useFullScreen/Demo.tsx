'use client';

import { useRef } from "react";

import { useFullscreen } from "../../../../../../src";
import { Button } from "@/components/ui/Button";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggle } = useFullscreen<HTMLDivElement>(ref);

  return (
    <LayoutDemo
      title="Fullscreen"
    >
      <div
        className="w-full flex flex-col items-center justify-center gap-2"
        ref={ref}
      >
        <p className="font-reddit-sans text-sm text-white/70 w-full text-center">
          Status: <span className="font-bold">{isFullscreen ? 'Fullscreen' : 'Normal'}</span>
        </p>
        <Button.Primary onClick={toggle}>
          Toggle Fullscreen
        </Button.Primary>
      </div>
    </LayoutDemo>
  )
}
