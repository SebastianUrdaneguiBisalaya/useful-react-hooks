'use client';

import { useRef } from "react";
import { useFullscreen } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const { toggle, isFullscreen } = useFullscreen<HTMLDivElement>(ref);

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
