'use client';

import { useState, useEffect } from "react";
import { useLocaleNotifications } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";

export default function Demo() {
  const { isSupported, notify, permission, requestPermission } = useLocaleNotifications();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  const handleAlert = () => {
    notify({
      title: 'Local Notification',
      body: 'This a local browser notification.',
    });
  }

  if (!isMounted) return <LayoutNotMounted />;
  if (!isSupported) return <LayoutNotSupported title="Notifications API is not supported in this browser." />;
  return (
    <LayoutDemo
      title="Locale Notifications"
    >
      <div className="w-full flex flex-col items-center gap-4 justify-between">
        <div className="flex flex-row items-center gap-4 w-full">
          <p className="w-full text-white/70 font-reddit-sans text-center">
            Browser Support <b>{isSupported ? "✅" : "❌"}</b>
          </p>
          <p className="w-full text-white/70 font-reddit-sans text-center">
            Permission: <b>{permission}</b>
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
            onClick={requestPermission}
          >
            Request Permission
          </button>
          <button
            className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
            disabled={permission !== "granted"}
            onClick={handleAlert}
          >
            Send Notification
          </button>
        </div>
      </div>
    </LayoutDemo>
  )
}
