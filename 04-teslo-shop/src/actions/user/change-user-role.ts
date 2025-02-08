"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  const newRole = role === "admin" ? "admin" : "user";

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como administrador",
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
      message: "Usuario actualizado correctamente",
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el rol, verificar los logs del servidor",
    };
  }
};
