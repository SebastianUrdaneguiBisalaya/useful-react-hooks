'use client';

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { hooksList } from "@/constants/constants";
import { ChevronRight, Terminal } from "lucide-react";

export interface HooksListProps {
  title: string;
  hooks: HookProps[];
}

export interface HookProps {
  name: string;
  path: string;
}

export default function Navigation() {
  const listMajorItems = hooksList.map(item => ({
    title: item.title,
    show: false,
  }));
  const [showList, setShowList] = useState<boolean>(false);
  const [listMajorItemsState, setListMajorItemsState] = useState<Record<string, boolean>>(listMajorItems.reduce((acc, item) => ({ ...acc, [item.title]: true }), {}));

  const toggleList = () => {
    setShowList(prev => !prev);
  }

  const toggleMajorItem = (title: string) => {
    setListMajorItemsState(prev => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <div className={cn(
      "hidden fixed bottom-6 md:flex flex-col items-start justify-center left-6 bg-[rgba(255,255,255,0.05)] border-t border-t-[rgba(255,255,255,0.4)] border-l border-l-[rgba(255,255,255,0.3)] shadow-[3px_3px_3px_rgba(0,0,0,0.089)] backdrop-blur-[10px] w-fit h-fit rounded-lg",
    )}>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-out overflow-hidden",
          showList
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 flex flex-col items-start">
          <div className="flex flex-col items-start gap-5 px-6 py-4 overflow-y-auto">
            {
              hooksList.map(item => (
                <div
                  className="w-full flex flex-col items-start gap-2"
                  key={item.title}
                >
                  <button
                    id={`open-${item.title}-hooks-list`}
                    aria-label={`Open ${item.title} hooks list`}
                    className="w-full flex flex-row items-center justify-between gap-2 cursor-pointer group"
                    onClick={() => toggleMajorItem(item.title)}
                  >
                    <span className="font-sora text-sm font-bold text-white/80 group-hover:text-white">{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "w-4.5 text-white/50 transition-all duration-500 ease-out group-hover:text-white",
                        listMajorItemsState[item.title] && "rotate-90",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-400 ease-out overflow-hidden",
                      listMajorItemsState[item.title]
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="w-full flex flex-col items-start min-h-0">
                      {
                        item.hooks.map(hook => (
                          <Link
                              className="font-sora text-xs text-white/60 hover:text-white transition-all duration-500 ease-in-out cursor-pointer px-2 py-2 border-l border-l-white/20 w-full"
                              href={hook.path}
                              key={hook.name}
                            >
                              {hook.name}
                            </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <button
        id="open-modal-to-show-hook-list"
        aria-label="Open modal to show hooks list"
        className={cn(
          "relative w-full flex flex-row items-center gap-2 px-6 py-4 group cursor-pointer",
          showList && "border-t border-white/20",
        )}
        onClick={toggleList}
      >
        <Terminal className="w-5 text-white/50 transition-all duration-500 ease-in-out hover:text-white" />
        <div className="relative w-fit flex">
          <span className={cn(
            "absolute top-1/2 -translate-y-1/2 text-nowrap text-white/70 group-hover:text-white transition-all duration-500 ease-out font-sora text-xs",
            showList ? "opacity-0 scale-50" : "opacity-100 scale-100",
          )}>
            Show hooks
          </span>
          <span className={cn(
            "absolute top-1/2 -translate-y-1/2 text-nowrap text-white/70 group-hover:text-white transition-all duration-500 ease-out font-sora text-xs",
            showList ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}>
            Hidden hooks
          </span>
        </div>
      </button>
    </div>
  )
}
