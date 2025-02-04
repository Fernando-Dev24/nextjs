import { auth } from "@/auth.config";
import { TopMenu, Sidebar, Footer } from "@/components";
import { SessionProviders } from "../../components/providers/Providers";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <SessionProviders session={session}>
        <TopMenu />
        <Sidebar />
        <div className="px-0 sm:px-10">{children}</div>
        <Footer />
      </SessionProviders>
    </main>
  );
}
