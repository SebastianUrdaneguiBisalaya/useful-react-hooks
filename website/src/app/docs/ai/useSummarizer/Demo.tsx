'use client';

import { useState, useEffect } from "react";
import { useSummarizer } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export default function Demo() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { cancel, checkAvailability, create, summarize, destroy, isAbortError, isSupported } = useSummarizer();

  const run = async () => {
    try {
      setStatus('checking');

      const availability = await checkAvailability({
        length: 'long',
        type: 'tldr',
        inputLanguage: 'en',
        outputLanguage: 'es',
      });

      if (availability !== 'available') {
        setStatus(`unavailable (${availability})`);
        return;
      }

      setStatus('creating');
      await create({ type: 'tldr' });

      setStatus('summarizing');
      const result = await summarize(text);

      setSummary(result);
      setStatus('done');
    } catch (error: unknown) {
      if (isAbortError(error)) {
        setStatus('idle')
        return;
      }
      setStatus('error');
      console.error(error);
    } finally {
      destroy();
    }
  };

  const handleCancel = () => {
    cancel();
    setStatus('idle');
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  if (!isMounted) return <LayoutNotMounted />;
  if (!isSupported) return <LayoutNotSupported title="The Summarizer API is not supported in this browser."/>;

	return (
		<LayoutDemo
      title="Summarizer AI"
    >
      <p className="text-center text-sm border border-white/20 rounded-2xl px-4 py-1.5 font-reddit-sans text-white/70">
        Status: <span className="font-black text-white/80">{status}</span>
      </p>
      <TextArea.Primary
        onChange={handleChangeText}
        placeholder="Enter text here..."
        value={text}
      />
      <div className="flex flex-row items-center gap-2">
        <Button.Primary disabled={!isSupported || status === 'summarizing'} onClick={run}>
          Summarize
        </Button.Primary>
        <Button.Destructive disabled={status !== 'summarizing'} onClick={handleCancel}>
          Cancel
        </Button.Destructive>
      </div>
      {
        summary && (
          <p className="font-reddit-sans text-sm text-center text-white">
            {summary}
          </p>
        )
      }
		</LayoutDemo>
	);
}
