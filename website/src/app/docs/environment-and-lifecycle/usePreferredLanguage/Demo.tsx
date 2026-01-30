'use client';

import { usePreferredLanguage } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";

export default function Demo() {
  const { language , setUserLanguage, systemLanguage, userLanguage } = usePreferredLanguage();

  const handleChangeLanguage = (lang: string) => {
    setUserLanguage(lang);
  }
	return (
		<LayoutDemo
      title="Preferred Language"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <p className="w-full text-center font-reddit-sans text-sm text-white/70">System default: <span className="font-bold font-reddit-sans text-white">{systemLanguage}</span></p>
        <p className="w-full text-center font-reddit-sans text-sm text-white/70">User choise: <span className="font-bold font-reddit-sans text-white">{userLanguage ?? "None"}</span></p>
      </div>
      <p className="font-reddit-sans text-white/60 text-sm">Resolved Language: <span>{language}</span></p>
      <div className="flex flex-row w-full items-center gap-4">
        <button className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950" onClick={() => handleChangeLanguage("en")}>
          English
        </button>
        <button className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950" onClick={() => handleChangeLanguage("es-PE")}>
          Spanish
        </button>
        <button className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950" onClick={() => handleChangeLanguage("")}>
          Clear
        </button>
      </div>
		</LayoutDemo>
	);
}
