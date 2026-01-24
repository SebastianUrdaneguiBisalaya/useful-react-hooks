import type { HooksListProps } from "@/components/shared/Navigation";

const hooksList: HooksListProps[] = [
  {
    title: "State",
    hooks: [
      {
        name: "useCountDown",
        path: "/docs//state/useCountDown",
      },
      {
        name: "useDebouncedState",
        path: "/docs/state/useDebouncedState",
      },
      {
        name: "useList",
        path: "/docs/state/useList",
      },
      {
        name: "usePreviousDistinct",
        path: "/docs/state/usePreviousDistinct",
      },
      {
        name: "useResettableState",
        path: "/docs/state/useResettableState",
      },
      {
        name: "useThrottledCallback",
        path: "/docs/state/useThrottledCallback",
      },
      {
        name: "useToggle",
        path: "/docs/state/useToggle",
      },
    ]
  },
  {
    title: "Browser & Hardware",
    hooks: [
      {
        name: "useBarcode",
        path: "/docs/browser-and-hardware/useBarcode",
      },
      {
        name: "useBatteryStatus",
        path: "/docs/browser-and-hardware/useBatteryStatus",
      },
      {
        name: "useGeolocation",
        path: "/docs/browser-and-hardware/useGeolocation",
      },
      {
        name: "useNetworkInformation",
        path: "/docs/browser-and-hardware/useNetworkInformation",
      },
      {
        name: "usePermissions",
        path: "/docs/browser-and-hardware/usePermissions",
      },
      {
        name: "useScreenOrientation",
        path: "/docs/browser-and-hardware/useScreenOrientation",
      },
      {
        name: "useScreenWakeLock",
        path: "/docs/browser-and-hardware/useScreenWakeLock",
      },
      {
        name: "useVibration",
        path: "/docs/browser-and-hardware/useVibration",
      },
      {
        name: "useUserActivation",
        path: "/docs/browser-and-hardware/useUserActivation",
      },
    ]
  },
  {
    title: "UI & Layout",
    hooks: [
      {
        name: "useAutoScroll",
        path: "/docs/ui-and-layout/useAutoScroll",
      },
      {
        name: "useBodyScrollFreeze",
        path: "/docs/ui-and-layout/useBodyScrollFreeze",
      },
      {
        name: "usePopover",
        path: "/docs/ui-and-layout/usePopover",
      },
      {
        name: "useFullscreen",
        path: "/docs/ui-and-layout/useFullscreen",
      },
      {
        name: "useIntersectionObserver",
        path: "/docs/ui-and-layout/useIntersectionObserver",
      },
      {
        name: "useHoverIntent",
        path: "/docs/ui-and-layout/useHoverIntent",
      }
    ]
  },
  {
    title: "Connectivity & Async",
    hooks: [
      {
        name: "useAsyncState",
        path: "/docs/connectivity-and-async/useAsyncState",
      },
      {
        name: "useWebsocket",
        path: "/docs/connectivity-and-async/useWebsocket",
      },
      {
        name: "useServerSentEvent",
        path: "/docs/connectivity-and-async/useServerSentEvent",
      },
      {
        name: "useTaskQueue",
        path: "/docs/connectivity-and-async/useTaskQueue",
      },
      {
        name: "useIntervalSafe",
        path: "/docs/connectivity-and-async/useIntervalSafe",
      },
      {
        name: "useTimeout",
        path: "/docs/connectivity-and-async/useTimeout",
      }
    ]
  },
  {
    title: "Storage & Persistence",
    hooks: [
      {
        name: "useLocalStorage",
        path: "/docs/storage-and-persistence/useLocalStorage",
      },
      {
        name: "useIndexedDB",
        path: "/docs/storage-and-persistence/useIndexedDB",
      },
      {
        name: "useCookies",
        path: "/docs/storage-and-persistence/useCookies",
      }
    ]
  },
  {
    title: "Multimedia",
    hooks: [
      {
        name: "useAudio",
        path: "/docs/multimedia/useAudio",
      },
      {
        name: "useSmartVideo",
        path: "/docs/multimedia/useSmartVideo",
      },
      {
        name: "usePictureInPicture",
        path: "/docs/multimedia/usePictureInPicture",
      },
    ]
  },
  {
    title: "Artificial Intelligence",
    hooks: [
      {
        name: "useSpeech",
        path: "/docs/ai/useSpeech",
      },
      {
        name: "useTranslator",
        path: "/docs/ai/useTranslator",
      },
      {
        name: "useSummarizer",
        path: "/docs/ai/useSummarizer",
      }
    ]
  },
  {
    title: "Environment & Lifecycle",
    hooks: [
      {
        name: "useIsClient",
        path: "/docs/environment-and-lifecycle/useIsClient",
      },
      {
        name: "useIsDesktop",
        path: "/docs/environment-and-lifecycle/useIsDesktop",
      },
      {
        name: "useIsFirstRender",
        path: "/docs/environment-and-lifecycle/useIsFirstRender",
      },
      {
        name: "usePreferredTheme",
        path: "/docs/environment-and-lifecycle/usePreferredTheme",
      },
      {
        name: "usePreferredLanguage",
        path: "/docs/environment-and-lifecycle/usePreferredLanguage",
      },
      {
        name: "useScreenSize",
        path: "/docs/environment-and-lifecycle/useScreenSize",
      },
      {
        name: "usePageVisibility",
        path: "/docs/environment-and-lifecycle/usePageVisibility",
      },
      {
        name: "useTraceUpdates",
        path: "/docs/environment-and-lifecycle/useTraceUpdates",
      }
    ]
  },
  {
    title: "Productivity & Utilities",
    hooks: [
      {
        name: "useFile",
        path: "/docs/productivity-and-utilities/useFile",
      },
      {
        name: "useCopyToClipboard",
        path: "/docs/productivity-and-utilities/useCopyToClipboard",
      },
      {
        name: "useLocalNotifications",
        path: "/docs/productivity-and-utilities/useLocalNotifications",
      },
      {
        name: "useExternalNotifications",
        path: "/docs/productivity-and-utilities/useExternalNotifications",
      },
      {
        name: "useShoppingCart",
        path: "/docs/productivity-and-utilities/useShoppingCart",
      }
    ]
  }
]

export { hooksList };
