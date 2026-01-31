'use client';

import { useState, useEffect } from "react";
import { useTranslator } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export default function Demo() {
  const { error, isLanguagePairSupported, checkLanguageSupport, isSupported, isTranslating, translation, translate } = useTranslator({
    sourceLanguage: "es",
    targetLanguage: "en-US",
    onLanguageSupportCheck: (supported) => {
      console.log("Language pair supported:", supported);
    },
  });

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [text, setText] = useState<string>('Hola mundo!');

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  useEffect(() => {
    checkLanguageSupport()
      .catch(() => {});
  }, [checkLanguageSupport]);

  const handleTranslate = async () => {
    await translate(text)
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  if (!isMounted) return <LayoutNotMounted />;
  if (!isSupported) return <LayoutNotSupported title="The Translator API is not supported in this browser."/>;
	return (
		<LayoutDemo
      title="Translator AI"
    >
      {
        error && (
          <p className="text-center font-reddit-sans text-white/70">
            Error: <span className="font-black text-red-500">{error?.message}</span>
          </p>
        )
      }
      <TextArea.Primary
        value={text}
        onChange={handleChangeText}
        placeholder="Enter text here..."
      />
      <Button.Primary
        disabled={!isLanguagePairSupported || !isSupported || isTranslating}
        onClick={handleTranslate}
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </Button.Primary>
      {
        translation && (
          <p className="font-reddit-sans text-sm text-center text-white">
            {translation}
          </p>
        )
      }
		</LayoutDemo>
	);
}
