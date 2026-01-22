export default function Footer() {
  return (
    <footer className="px-8 py-4 border-t border-white/20 w-full flex flex-col md:flex-row items-start md:items-center md:gap-2">
      <div>
        <span className="font-jersey-15 text-2xl">vibe</span>
        <span className="font-jersey-15 text-purple-500 text-2xl">Hooks</span>
      </div>
      <span className="font-sora text-[10px] text-white/50 md:leading-2">- developed by <a target="_blank" className="hover:text-white text-white/50 transition-all duration-500 ease-in-out" href="https://sebastianurdanegui.com">Sebastian Marat Urdanegui Bisalaya</a></span>
    </footer>
  )
}
