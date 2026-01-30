'use client';

import { useSpeech } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";

export default function Demo() {
  const { error, start, status, stop, transcript } = useSpeech({
    lang: 'en-PE',
    continuous: true,
    interimResults: true,
  });
	return (
		<LayoutDemo
      title="Speech AI"
    >
      <p className="text-center font-reddit-sans text-white/70">
        Status: <span className="font-black text-white/80">{status}</span>
      </p>
      {
        error && (
          <p className="text-center font-reddit-sans text-white/70">
            Error: <span className="font-black text-red-500">{error?.message}</span>
          </p>
        )
      }
      <div className="flex flex-row gap-2">
        <Button.Primary onClick={start}>
          Start
        </Button.Primary>
        <Button.Destructive onClick={stop}>
          Stop
        </Button.Destructive>
      </div>
      <textarea
        readOnly
        value={transcript}
        placeholder="Transcript will appear here..."
        className="w-full p-4 border border-white/20 rounded-md font-reddit-sans text-sm text-white/90 text-left"
      />
		</LayoutDemo>
	);
}
