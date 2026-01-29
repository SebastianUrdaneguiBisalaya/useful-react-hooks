'use client';

import { useState, useEffect } from "react";
import { useExternalNotifications } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";

export default function Demo() {
  const { isSupported, notifications, notify, permission, requestPermission } = useExternalNotifications();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  const handleAlert = () => {
    notify({
      title: 'New Update',
      body: 'External notification triggered!',
    });
  }

  if (!isMounted) return <LayoutNotMounted />;
  if (!isSupported) return <LayoutNotSupported title="Notifications API is not supported in this browser." />;

  return (
    <LayoutDemo
      title="External Notifications"
    >
      <div className="w-full flex flex-row items-center justify-center gap-4">
        <button
          className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
          disabled={permission !== "granted"}
          onClick={requestPermission}
        >
          Grant Permission
        </button>
        <button
          className="w-full font-reddit-sans text-sm text-white/80 hover:text-white/90 transition-colors duration-500 ease-in-out border border-white/40 px-4 py-3 rounded-md cursor-pointer bg-neutral-950 hover:bg-neutral-950"
          onClick={handleAlert}
        >
          Send External Notification
        </button>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <h4 className="font-sora text-sm font-semibol text-white/70">Notification History</h4>
        <ul className="flex flex-col w-full items-center gap-1">
          {
            notifications?.map((n) => (
              <li
                className="font-reddit-sans text-sm text-white/80 text-center w-full"
                key={n.createdAt}
              >
                {n.title} - {new Date(n.createdAt).toLocaleTimeString()}
              </li>
            ))
          }
        </ul>
      </div>
    </LayoutDemo>
  )
}
