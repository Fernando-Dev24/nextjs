import Link from "next/link";
import { HomeIcon } from "@primer/octicons-react";
import { ActiveLink } from "../";

const navItems = [
   { path: '/about', title: 'About' },
   { path: '/pricing', title: 'Pricing' },
   { path: '/contact', title: 'Contact' },
]

export const Navbar = async () => {

   return (
      <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded">
         <Link href={'/'} className="flex items-center">
            <HomeIcon className="mr-2" />
            <span>Home</span>
         </Link>

         <div className="flex flex-1" />

         {navItems.map(navItem => (
            <ActiveLink key={navItem.path} {...navItem} />
         ))}

         {/* <Link className="mr-2" href="/about">About</Link>
         <Link className="mr-2" href="/pricing">Pricing</Link>
         <Link className="mr-2" href="/contact">Contact</Link> */}
      </nav>
   )
};