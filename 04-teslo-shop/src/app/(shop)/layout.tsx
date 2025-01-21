import { auth } from "@/auth.config";
import { TopMenu, Sidebar, Footer } from "@/components";
import { SessionProvider } from "../../components/provider/Provider";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <SessionProvider session={session}>
        <TopMenu />
        <Sidebar />
        <div className="px-0 sm:px-10">{children}</div>
        <Footer />
      </SessionProvider>
    </main>
  );
}
