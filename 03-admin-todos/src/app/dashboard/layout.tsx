import { getServerSession } from "next-auth";
import { Sidebar, TopMenu } from "../../components";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) redirect("/api/auth/signin");

  return (
    <>
      <Sidebar />

      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />

        <div className="px-6 pt-6">{children}</div>
      </div>
    </>
  );
}
