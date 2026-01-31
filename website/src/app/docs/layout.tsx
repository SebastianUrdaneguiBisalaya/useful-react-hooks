import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavigationList from "@/components/shared/NavigationList";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
    <div className="max-w-5xl w-full mx-auto self-center p-6 md:p-8">
      <div className="w-full flex flex-row gap-6">
        <div className="transition-transform duration-500 ease-in-out z-50 sticky top-8 w-fit hidden md:flex flex-col items-start justify-start left-6 bg-[rgba(255,255,255,0.05)] border-t border-t-[rgba(255,255,255,0.4)] border-l border-l-[rgba(255,255,255,0.3)] shadow-[3px_3px_3px_rgba(0,0,0,0.089)] backdrop-blur-[10px] h-full rounded-lg max-h-[calc(100vh-4rem)] overflow-hidden">
          <NavigationList />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}
