import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Navigation from "@/components/shared/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
    <div className="max-w-5xl w-full mx-auto self-center p-6 md:p-8">
      <div className="w-full flex flex-row gap-6">
        <Navigation />
        <div className="flex-1 min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}
