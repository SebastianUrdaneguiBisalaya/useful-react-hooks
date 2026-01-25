'use client';

import Link from "next/link";
import { CodeBlock } from "@/components/shared/Codeblock";
import Slider from "@/components/landing/Slider";
import { ArrowRight } from "lucide-react";
import { cn } from '@/lib/cn';

export default function Page() {
	return (
    <main className="w-full grow h-full p-6 md:p-8 flex flex-col items-center justify-start gap-8">
      <div className="w-full flex flex-row items-center justify-between md:justify-end gap-4">
        <Link className="group flex flex-row items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:scale-[1.05] transition-all duration-500 ease-in-out border border-white/20 px-3 py-1.5 rounded-2xl" href='https://github.com/SebastianUrdaneguiBisalaya/vibehooks' target="_blank">
          <svg height="20" viewBox="0 0 1024 1024" width="20" fill=""><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"/></svg>
          <div className="flex flex-row items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="star-icon relative"><title>Star</title><defs><linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)"></stop><stop offset="50%" stopColor="rgba(251, 191, 36, 1)"></stop><stop offset="100%" stopColor="rgba(251, 191, 36, 0.8)"></stop></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#starGradient)"></polygon></svg>
            <span className="font-sora text-sm text-white/70 pt-0.5 group-hover:text-white transition-all duration-500 ease-in-out">1</span>
          </div>
        </Link>
        <button className="block md:hidden cursor-pointer text-white/70 hover:text-white hover:scale-[1.05] transition-all duration-500 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"/></svg>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center grow w-full h-full gap-10">
        <div className="flex flex-col items-center">
          <div>
            <span className="font-jersey-15 text-7xl md:text-8xl lg:text-9xl">vibe</span>
            <span className="font-jersey-15 text-purple-500 text-7xl md:text-8xl lg:text-9xl">Hooks</span>
          </div>
          <p className="font-sora text-sm max-w-xs text-center self-center text-white/70">Modern and unopinionated React hooks with a focus on developer experience.</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <CodeBlock
            code="npm install @vibehooks/react"
            language="bash"
          />
          <p className="text-white/50 font-sora text-[10px] self-center text-center">
            All hooks are fully typed with TypeScript and commented with JSDocs.
          </p>
        </div>
        <Slider />
        <Link
          className="relative group flex flex-row items-center font-sora text-sm text-white/80 overflow-hidden hover:text-black cursor-pointer transition-all duration-500 ease-in-out border border-white/40 hover:border-white px-4 py-3 rounded-xl"
          href="/docs/useDebouncedState"
        >
          <span className="z-20">Get Started</span>
          <ArrowRight className="z-20 w-4 h-4 ml-2 text-white/80 group-hover:text-black transition-all duration-500 ease-in-out group-hover:translate-x-0.5" />
          <span className='pointer-events-none absolute inset-0 z-0' />
          <span
            className={cn(
              'pointer-events-none absolute inset-0 z-0 block h-full w-full bg-white',
              'opacity-0 transition-opacity',
              'group-focus-visible:opacity-100 group-active:opacity-100',
              'origin-left lg:scale-x-0 lg:opacity-100 lg:transition-transform',
              'lg:group-hover:origin-left lg:group-hover:scale-x-100',
              'lg:group-focus-visible:origin-left lg:group-focus-visible:scale-x-100',
              'lg:group-active:origin-left lg:group-active:scale-x-100',
              'motion-safe:transition-transform motion-safe:ease-in-out',
              'lg:motion-safe:duration-500 lg:motion-reduce:duration-0'
            )}
          />
        </Link>
      </div>
    </main>
  )
}
