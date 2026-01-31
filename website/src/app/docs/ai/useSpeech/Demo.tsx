'use client';

import { useSpeech } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export default function Demo() {
  const { error, reset, start, status, stop, transcript } = useSpeech({
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
        <Button.Warning onClick={stop}>
          Stop
        </Button.Warning>
        <Button.Destructive onClick={reset}>
          Cancel
        </Button.Destructive>
      </div>
      <TextArea.Primary
        readOnly
        value={transcript}
        placeholder="Transcript will appear here..."
      />
		</LayoutDemo>
	);
}
