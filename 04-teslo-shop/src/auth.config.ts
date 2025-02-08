import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

const protectedRoutes = ["/checkout/address", "/checkout"];
const adminRoutes = [
  "/admin",
  "/admin/users",
  "/admin/orders",
  "/admin/products",
];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        // Comparar credenciales
        if (!user) return null;
        if (!bcrypt.compareSync(password, user.password)) return null;
        if (user.role.includes("banned")) return null;

        // Regresar la informacion del usuario sin el password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
      const isOnAdminRoute = adminRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      /* redirect to users whose not login in and he is on protected route */
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false;
      }

      /* redirect users whose not admin and he is on admin route */
      if (isOnAdminRoute) {
        if (isLoggedIn && auth?.user.role === "admin") return true;
        return false;
      }

      /* redirect users to login when not logged in */
      if (isLoggedIn) {
        if (nextUrl.pathname === "/auth/login") {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
