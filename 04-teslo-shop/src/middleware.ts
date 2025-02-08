import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/checkout/:path", // Protege todo lo que esta bajo checkout
    "/admin/:path", // Protege todo lo que esta bajo admin
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
