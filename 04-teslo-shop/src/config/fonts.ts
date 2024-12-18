import { Inter, Montserrat_Alternates } from "next/font/google";

export const interFont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
  variable: "--font-title",
  weight: ["500", "700"],
  subsets: ["latin"],
});
