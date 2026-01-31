'use client';

import { useState } from "react";

import { useTraceUpdates } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  }

  useTraceUpdates({
    count,
    text,
  }, 'TraceDemoComponent');

	return (
		<LayoutDemo
      title="Check Console for Logs"
    >
      <button
        className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950"
        onClick={() => handleClick()}
      >
        Change count: {count}
      </button>
      <input
        className="w-full focus:outline-none border border-white/40 px-4 py-3 rounded-md font-reddit-sans text-sm"
        onChange={handleChangeText}
        placeholder="Type to trigger trace..."
        type="text"
        value={text}
      />
		</LayoutDemo>
	);
}
