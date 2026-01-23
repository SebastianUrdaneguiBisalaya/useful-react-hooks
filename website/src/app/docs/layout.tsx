import Navbar from "@/components/shared/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
    <div className="p-8">
      <Navbar />
      <article>
        {children}
      </article>
    </div>
  )
}
