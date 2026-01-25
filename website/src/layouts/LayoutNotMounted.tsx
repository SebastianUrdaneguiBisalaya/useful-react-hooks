export default function LayoutNotMounted({ title }: { title: string }) {
  return (
    <div className="w-full max-w-2xl border border-white/20 p-4 flex flex-col items-center justify-center bg-neutral-900 rounded-lg shadow-md">
      <h3 className="text-white/60 text-center font-sora text-lg font-semibold">
        {title}
      </h3>
    </div>
  )
}
