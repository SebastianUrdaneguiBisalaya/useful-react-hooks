'use client';

import { useSmartVideo } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const { isPlaying, isVisible, pause, play, reset, stop, videoRef } = useSmartVideo({
    autoPlay: true,
    pauseOnExit: true,
    resetOnExit: true,
    threshold: 0.5,
  });

  return (
    <LayoutDemo
      title="Smart Video"
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        className="aspect-video rounded-md w-full"
        controls
      />
      <div className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-2">
        <Button.Secondary onClick={play}>
          Play
        </Button.Secondary>
        <Button.Secondary onClick={pause}>
          Pause
        </Button.Secondary>
        <Button.Secondary onClick={stop}>
          Stop
        </Button.Secondary>
        <Button.Secondary onClick={reset}>
          Reset
        </Button.Secondary>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-0.5 md:gap-2">
        <p className="mt-2 text-sm font-reddit-sans text-white/40 text-center">
          Video is <span className="font-bold text-white/80">{isPlaying ? 'Playing' : 'Paused'}</span>.
        </p>
        <p className="mt-2 text-sm font-reddit-sans text-white/40 text-center">
          Video is <span className="font-bold text-white/80">{isVisible ? 'Visible' : 'Not visible'}</span>.
        </p>
      </div>
    </LayoutDemo>
  )
}
