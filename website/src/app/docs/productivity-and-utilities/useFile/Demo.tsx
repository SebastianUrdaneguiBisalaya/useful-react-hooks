'use client';

import { useFile } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout"

export default function Demo() {
  const { files, hasFiles, inputProps, reset } = useFile({
    accept: "image/*",
    multiple: true,
  });

  return (
    <LayoutDemo
      title="File"
    >
      <input
        {...inputProps}
        className="cursor-pointer font-reddit-sans text-sm text-white/80 w-full max-w-60 border border-white/40 px-4 py-3 rounded-md"
        placeholder="Click to choose files"
        type="file"
      />
      <button
        className="font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
        disabled={!hasFiles}
        onClick={reset}
      >
        Clear all
      </button>

      <div className="flex flex-col w-full items-center gap-4">
        <h4 className="text-center w-full font-sora text-sm text-white pb-4 border-b border-white/20">List of selected files</h4>
        {
          hasFiles ? (
            <ul className="flex flex-col items-center w-full gap-2">
              {
                files.map(f => (
                  <li
                    className="text-sm text-white/80 w-full text-center"
                    key={f.name}
                  >
                    <span className="font-semibold text-white/90">{f.name}</span> ({(f.size / 1024).toFixed(2)} KB)
                  </li>
                ))
              }
            </ul>
          ) : <p className="font-reddit-sans text-sm text-white/70 w-full text-center">No files selected</p>
        }
      </div>
    </LayoutDemo>
  )
}
