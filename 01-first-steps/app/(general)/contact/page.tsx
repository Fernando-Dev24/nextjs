import type { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Contact Page',
   description: 'Get in touch to the creator of this website',
};

export default function ContactPage() {
   return (
      <>
         <span className="text-7xl">Contact Page</span>
      </>
   )
}