import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickySidebar } from "@/components/layout/StickySidebar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <StickySidebar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
