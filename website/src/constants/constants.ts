import type { HooksListProps } from "@/components/shared/Navigation";

const hooksList: HooksListProps[] = [
  {
    title: "Configuration",
    hooks: [
      {
        name: "useDebounce",
        path: "/docs/useDebounce"
      },
      {
        name: "useThrottle",
        path: "/docs/useThrottle"
      },
      {
        name: "useDebounceCallback",
        path: "/docs/useDebounceCallback"
      },
    ]
  },
  {
    title: "State",
    hooks: [
      {
        name: "useDebouncedState",
        path: "/docs/useDebouncedState"
      },
      {
        name: "useThrottledState",
        path: "/docs/useThrottledState"
      },
      {
        name: "useDebouncedCallbackState",
        path: "/docs/useDebouncedCallbackState"
      },
    ]
  },
]

export { hooksList };
