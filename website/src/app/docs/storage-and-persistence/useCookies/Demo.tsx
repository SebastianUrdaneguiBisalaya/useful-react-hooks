'use client';

import { useState, useEffect } from "react";
import { useCookies } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";

const COOKIE_NAME = 'cookie-consent';

export default function Demo() {
  const cookies = useCookies();
  const [consent, setConsent] = useState<string | null>(null);

  const handleAccept = () => {
    cookies.set(COOKIE_NAME, 'accepted', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    setConsent('accepted');
  }

  const handleDecline = () => {
    cookies.set(COOKIE_NAME, 'rejected', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    setConsent('rejected');
  }

  useEffect(() => {
    setTimeout(() => {
      setConsent(cookies.get(COOKIE_NAME));
    }, 100);
  }, [cookies]);

  if (consent === 'accepted') return null;

  return (
    <LayoutDemo
      title="🍪 Cookies and Privacy"
    >
      <p className="text-white/70 text-sm text-center w-full font-reddit-sans">
        We use cookies to improve your experience. You can accept or decline the use of cookies by clicking on the button below.
      </p>
      <div className="w-full flex flex-row items-center gap-4">
        <button
          className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950"
          onClick={handleDecline}
        >
          Decline
        </button>
        <button
          className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-900 hover:bg-neutral-950"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </LayoutDemo>
  )
}
