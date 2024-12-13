import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  // Obtener informacion del usuario
  const session = await getServerSession(authOptions);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado">
        <div className="flex flex-col">
          <span>{session?.user?.name}</span>
          <span>{session?.user?.email}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
