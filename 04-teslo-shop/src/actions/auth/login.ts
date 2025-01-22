"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      return "CredentialsSignin";
    }

    return "Something went wrong";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Credenciales incorrectas",
    };
  }
};
