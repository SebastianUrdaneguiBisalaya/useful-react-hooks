import Image from "next/image"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/20 w-full flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-2 p-8">
      <Image src="/vibeHooks.png" alt="vibeHooks logo" width={100} height={100} />
      <span className="font-sora text-[10px] text-white/50 md:leading-2">- developed by <a target="_blank" href="https://sebastianurdanegui.com">Sebastian Marat Urdanegui Bisalaya</a></span>
    </footer>
  )
}
