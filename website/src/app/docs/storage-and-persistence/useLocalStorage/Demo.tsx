'use client';

import { useState, useEffect } from "react";

import { useLocalStorage } from "../../../../../../src";
import { Button } from "@/components/ui/Button";
import LayoutDemo from "@/layouts/Layout";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import { cn } from "@/lib/cn";

export interface Preferences {
  compactMode: boolean;
}

export default function Demo() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const storage = useLocalStorage<Preferences>('preferences', {
    fallback: {
      compactMode: false,
    }
  });

  const prefs = storage.value;

  const handleToggle = () => {
    storage.update(prev => ({
      ...prev,
      compactMode: !prev!.compactMode,
    }))
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  if (!isMounted) return <LayoutNotMounted />;
  if (!prefs) return null;

  return (
    <LayoutDemo
      title="Local Storage"
    >
      <div className="w-full flex flex-row items-center gap-4 justify-center">
        <span className="font-reddit-sans text-sm text-white/70">
          Compact mode
        </span>
        <Button.Secondary
          className="rounded-full"
          onClick={handleToggle}
        >
          <div
            className={cn(
              'h-5 w-5 bg-white-100 rounded-full transition-transform duration-500 ease-in-out',
              prefs.compactMode ? 'translate-x-3' : '-translate-x-3'
            )}
          />
        </Button.Secondary>
      </div>
    </LayoutDemo>
  )
}
