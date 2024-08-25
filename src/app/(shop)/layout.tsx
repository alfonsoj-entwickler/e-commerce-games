import { Footer, Sidebar, TopMenu } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - EGames | Shop",
    default: "Home - EGames | Shop",
  },
  description: "Shopping games",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-5">{children}</div>
      <Footer />
    </main>
  );
}
