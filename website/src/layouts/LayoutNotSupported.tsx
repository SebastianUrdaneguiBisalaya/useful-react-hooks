export default function LayoutNotSupported({ title }: { title: string }) {
  return (
    <div className="flex w-full max-w-lg flex-row items-center justify-center rounded-lg border border-white/20 bg-neutral-900 p-4 shadow-md">
      <h3 className="pl-4 font-sora text-left font-medium text-white/60">
        {title} is not supported.
      </h3>
    </div>
  )
}
