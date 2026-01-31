'use client';

import { useCopyToClipboard } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout"

export default function Demo() {
  const { copyToClipboard, textCopied } = useCopyToClipboard();
  const sampleText = "Hello world! ✋🏻";
  return (
    <LayoutDemo
      title="Copy to Clipboard"
    >
      <button
        className="font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
        onClick={() => copyToClipboard(sampleText)}
      >
        Copy to clipboard
      </button>
      {
        textCopied && (
          <span className="font-reddit-sans text-sm text-green-500/80">
            Successfully copied: <span className="text-white font-medium">{textCopied}</span>
          </span>
        )
      }
    </LayoutDemo>
  )
}
