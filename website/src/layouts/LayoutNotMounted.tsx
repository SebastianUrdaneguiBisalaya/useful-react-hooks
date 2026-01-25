export default function LayoutNotMounted() {
  return (
    <div className="flex w-full max-w-lg flex-row items-center justify-center rounded-lg border border-white/20 bg-neutral-900 p-4 shadow-md">
      <div className="relative flex items-center">
        <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
      <h3 className="pl-4 font-sora text-left font-medium text-white/60">This component is loading.</h3>
    </div>
  )
}
