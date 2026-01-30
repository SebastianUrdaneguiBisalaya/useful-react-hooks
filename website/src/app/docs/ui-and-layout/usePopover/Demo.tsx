'use client';

import { usePopover } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const { isOpen, toggle, anchorRef, popoverRef } = usePopover<HTMLButtonElement, HTMLDivElement>();
  return (
    <LayoutDemo
      title="Popover"
    >
      <div className="relative flex flex-col items-center w-fit">
        <Button.Primary
          ref={anchorRef}
          onClick={toggle}
        >
          Actions
        </Button.Primary>
        {
          isOpen && (
            <div
              className="flex flex-row items-center gap-2 bg-neutral-900 absolute top-full mt-2 rounded-xl border border-white/20 px-3 py-2 shadow-xl"
              ref={popoverRef}
            >
              <Button.Secondary>
                Edit
              </Button.Secondary>
              <Button.Secondary>
                Delete
              </Button.Secondary>
            </div>
          )
        }
      </div>
    </LayoutDemo>
  )
}
