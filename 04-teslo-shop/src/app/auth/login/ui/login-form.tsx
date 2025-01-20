"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [actionMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  useEffect(() => {
    if (actionMessage === "success") {
      router.replace("/");
    }
  }, [actionMessage, router]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        id="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        id="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {(actionMessage === "CredentialsSignin" ||
          actionMessage === "Something went wrong") && (
          <div className="flex items-center rounded my-3 p-1 px-3 bg-red-600 text-white fade-in">
            <IoInformationOutline className="h-5 w-5" />
            <p className="text-sm">Verifique las credenciales</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`btn-primary disabled:bg-opacity-70 ${clsx({
          "cursor-wait": isPending,
        })}`}
        disabled={isPending}
      >
        {isPending ? "Iniciando sesión..." : "Ingresar"}
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
