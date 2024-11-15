'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";
import style from '../active-link/active-link.module.css';

interface Props {
   path: string;
   title: string;
}

export const ActiveLink = ({ path, title }: Props) => {

   // usePathName
   const pathname = usePathname(); // retorna el nombre del path en el que nos encontremos

   return (
      <Link
         href={path}
         className={`${style.link} ${(pathname === path) && style['active-link']}`}>
         {title}
      </Link>
   )
};