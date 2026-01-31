'use client';

import { useAudio } from "../../../../../../src";
import { Button } from "@/components/ui/Button";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
  const audio = useAudio({ src: '/music.mp3' });
  return (
    <LayoutDemo
      title="Audio"
    >
      <h4 className="font-reddit-sans text-white/70 text-center">Audio status: <span className="font-bold text-white">{audio.status}</span></h4>
      {audio.error && <p className="text-red-500 font-semibold">{audio.error.message}</p>}
      <div className="flex flex-row items-center gap-2">
        <Button.Primary onClick={audio.play}>
          Play
        </Button.Primary>
        <Button.Secondary onClick={audio.pause}>
          Pause
        </Button.Secondary>
      </div>
    </LayoutDemo>
  )
}
