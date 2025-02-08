export const revalidate = 0;

import { redirect } from "next/navigation";
import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import { UsersTable } from "./ui/users-table";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) redirect("/auth/login");

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
