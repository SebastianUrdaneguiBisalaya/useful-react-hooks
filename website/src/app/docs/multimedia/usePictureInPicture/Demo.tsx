'use client';

import { useState, useEffect } from "react";
import { usePictureInPicture } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { enter, exit, isActive, isSupported, videoRef } = usePictureInPicture();

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  if (!isMounted) return <LayoutNotMounted />;
  if (!isSupported) return <LayoutNotSupported title="The Picture-in-Picture API is not supported in this browser."/>;

  return (
    <LayoutDemo
      title="Picture in Picture"
    >
      <div className="flex flex-col items-center gap-2">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="aspect-video rounded-md w-full"
          controls
        />
        <div className="flex flex-row items-center gap-2">
          <Button.Primary
            onClick={enter}
            disabled={!isSupported || isActive}
          >
            Enter PiP
          </Button.Primary>
          <Button.Secondary
            onClick={exit}
            disabled={!isActive}
          >
            Exit PiP
          </Button.Secondary>
        </div>
        <p className="mt-2 text-sm font-reddit-sans text-white/40 text-center">
          Picture-in-Picture is {isActive ? 'active' : 'inactive'}.
        </p>
      </div>
    </LayoutDemo>
  )
}
