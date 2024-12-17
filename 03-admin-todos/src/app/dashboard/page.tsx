import { WidgetItem } from "@/components";
import { auth } from "@/config/auth";

export default async function DashboardPage() {
  // Obtener informacion del usuario
  const session = await auth();

  return (
    <div /* className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" */>
      <WidgetItem title="Informacion del usuario">
        <div className="flex flex-col">
          <span>{JSON.stringify(session, null, 4)}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
