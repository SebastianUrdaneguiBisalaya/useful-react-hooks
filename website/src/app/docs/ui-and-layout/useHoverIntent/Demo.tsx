'use client';

import { useHoverIntent } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const hover = useHoverIntent({
    delay: 150,
    tolerance: 8,
  });
  return (
    <LayoutDemo
      title="Hover Intent"
    >
      <div className="flex flex-col items-center relative w-full">
        <Button.Primary
          {...hover.handlers}
        >
          Hover me
        </Button.Primary>
        {
          hover.isIntent && (
            <div className="bg-neutral-900 absolute top-full mt-2 rounded-xl border border-white/20 px-3 py-2">
              <span className="font-reddit-sans font-semibold text-sm text-white">
                Tooltip content 👌
              </span>
            </div>
          )
        }
      </div>
    </LayoutDemo>
  )
}
