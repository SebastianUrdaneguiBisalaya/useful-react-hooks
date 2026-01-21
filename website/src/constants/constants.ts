import type { HooksListProps } from "@/components/shared/Navigation";

const hooksList: HooksListProps[] = [
  {
    title: "State",
    hooks: [
      {
        name: "useDebouncedState",
        path: "/docs/useDebouncedState",
      },
      {
        name: "useThrottledCallback",
        path: "/docs/useThrottledCallback",
      },
      {
        name: "useResettableState",
        path: "/docs/useResettableState",
      },
      {
        name: "useToggle",
        path: "/docs/useToggle",
      },
      {
        name: "usePreviousDistinct",
        path: "/docs/usePreviousDistinct",
      },
      {
        name: "useList",
        path: "/docs/useList",
      },
      {
        name: "useObjectList",
        path: "/docs/useObjectList",
      },
      {
        name: "useCountDown",
        path: "/docs/useCountDown",
      }
    ]
  },
  {
    title: "Browser & Hardware",
    hooks: [
      {
        name: "useBatteryStatus",
        path: "/docs/useBatteryStatus",
      },
      {
        name: "useGeolocation",
        path: "/docs/useGeolocation",
      },
      {
        name: "useNetworkInformation",
        path: "/docs/useNetworkInformation",
      },
      {
        name: "usePermissions",
        path: "/docs/usePermissions",
      },
      {
        name: "useScreenOrientation",
        path: "/docs/useScreenOrientation",
      },
      {
        name: "useScreenWakeLock",
        path: "/docs/useScreenWakeLock",
      },
      {
        name: "useVibration",
        path: "/docs/useVibration",
      },
      {
        name: "useUserActivation",
        path: "/docs/useUserActivation",
      },
      {
        name: "useBarcode",
        path: "/docs/useBarcode",
      }
    ]
  },
  {
    title: "UI & Layout",
    hooks: [
      {
        name: "useAutoScroll",
        path: "/docs/useAutoScroll",
      },
      {
        name: "useBodyScrollFreeze",
        path: "/docs/useBodyScrollFreeze",
      },
      {
        name: "usePopover",
        path: "/docs/usePopover",
      },
      {
        name: "useFullscreen",
        path: "/docs/useFullscreen",
      },
      {
        name: "useIntersectionObserver",
        path: "/docs/useIntersectionObserver",
      },
      {
        name: "useHoverIntent",
        path: "/docs/useHoverIntent",
      }
    ]
  },
  {
    title: "Connectivity & Async",
    hooks: [
      {
        name: "useAsyncState",
        path: "/docs/useAsyncState",
      },
      {
        name: "useWebsocket",
        path: "/docs/useWebsocket",
      },
      {
        name: "useServerSentEvent",
        path: "/docs/useServerSentEvent",
      },
      {
        name: "useTaskQueue",
        path: "/docs/useTaskQueue",
      },
      {
        name: "useIntervalSafe",
        path: "/docs/useIntervalSafe",
      },
      {
        name: "useTimeout",
        path: "/docs/useTimeout",
      }
    ]
  },
  {
    title: "Storage & Persistence",
    hooks: [
      {
        name: "useLocalStorage",
        path: "/docs/useLocalStorage",
      },
      {
        name: "useIndexedDB",
        path: "/docs/useIndexedDB",
      },
      {
        name: "useCookies",
        path: "/docs/useCookies",
      }
    ]
  },
  {
    title: "Multimedia & AI",
    hooks: [
      {
        name: "useAudio",
        path: "/docs/useAudio",
      },
      {
        name: "useSmartVideo",
        path: "/docs/useSmartVideo",
      },
      {
        name: "usePictureInPicture",
        path: "/docs/usePictureInPicture",
      },
      {
        name: "useSpeech",
        path: "/docs/useSpeech",
      },
      {
        name: "useTranslator",
        path: "/docs/useTranslator",
      },
      {
        name: "useSummarizer",
        path: "/docs/useSummarizer",
      }
    ]
  },
  {
    title: "Environment & Lifecycle",
    hooks: [
      {
        name: "useIsClient",
        path: "/docs/useIsClient",
      },
      {
        name: "useIsDesktop",
        path: "/docs/useIsDesktop",
      },
      {
        name: "useIsFirstRender",
        path: "/docs/useIsFirstRender",
      },
      {
        name: "usePreferredTheme",
        path: "/docs/usePreferredTheme",
      },
      {
        name: "usePreferredLanguage",
        path: "/docs/usePreferredLanguage",
      },
      {
        name: "useScreenSize",
        path: "/docs/useScreenSize",
      },
      {
        name: "usePageVisibility",
        path: "/docs/usePageVisibility",
      },
      {
        name: "useTraceUpdates",
        path: "/docs/useTraceUpdates",
      }
    ]
  },
  {
    title: "Productivity & Utilities",
    hooks: [
      {
        name: "useFile",
        path: "/docs/useFile",
      },
      {
        name: "useCopyToClipboard",
        path: "/docs/useCopyToClipboard",
      },
      {
        name: "useLocalNotifications",
        path: "/docs/useLocalNotifications",
      },
      {
        name: "useExternalNotifications",
        path: "/docs/useExternalNotifications",
      },
      {
        name: "useShoppingCart",
        path: "/docs/useShoppingCart",
      }
    ]
  }
]

export { hooksList };
