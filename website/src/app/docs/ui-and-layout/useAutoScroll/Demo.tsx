'use client';

import { useState, useEffect } from "react";
import { useAutoScroll } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface Message {
  content: string;
  from: 'user' | 'bot';
}

export default function Demo() {
  const { ref, isAtBottom, enableAutoScroll } = useAutoScroll({
    threshold: 80,
    behavior: 'smooth'
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed >= 30_000) {
        clearInterval(id);
        return;
      }
      setMessages(prev => [
        ...prev,
        {
          content: `Message ${prev.length + 1}`,
          from: prev.length % 2 === 0 ? 'user' : 'bot',
        },
      ]);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <LayoutDemo
      className="overflow-hidden"
      title="Auto Scroll"
    >
      <div
        className="w-full flex flex-col items-center h-52 gap-0.5 overflow-y-auto"
        ref={ref}
      >
        {messages.map((msg, idx) => (
          <div
            className={cn(
              'max-w-40 rounded-lg px-6 py-2 w-full flex',
              msg.from === 'user' ? 'self-end bg-neutral-950' : 'self-start'
            )}
            key={idx}
          >
            <span
              className={cn(
                'font-reddit-sans text-sm text-white/80 w-full',
                msg.from === 'user' ? 'text-right' : 'text-left'
              )}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      {
        !isAtBottom && (
          <Button.Primary
            onClick={enableAutoScroll}
          >
            Go to bottom
          </Button.Primary>
        )
      }
    </LayoutDemo>
  )
}
