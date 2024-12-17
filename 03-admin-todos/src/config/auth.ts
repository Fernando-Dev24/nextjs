import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter
  adapter: PrismaAdapter(prisma),

  // providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "email",
          placeholder: "usuario@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async ({ email, password }) => {
        const user = await signInEmailPassword(
          email as string,
          password as string
        );

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],

  // Estrategia de la sesion y adjuntar roles del usuario que se esta iniciando
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "",
        },
      });

      if (!dbUser?.isActive) {
        throw Error("Usuario inactivo");
      }

      // Mutando el token para agregar los roles, en caso que no tenga solamente agregamos uno hardcodeando el codigo
      token.roles = dbUser.roles ?? ["no-roles"];
      token.id = dbUser.id ?? "no-uuid";

      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.roles = token.roles as string[];
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
