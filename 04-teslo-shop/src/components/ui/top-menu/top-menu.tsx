"use client";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {
  const { openSideMenu } = useUIStore((state) => state);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* LOGO */}
      <div className="">
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="hidden sm:block">
        <Link
          href={"/gender/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href={"/gender/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href={"/gender/kid"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>

      {/* SEARCH, CART, MENU */}
      <div className="flex items-center">
        <Link href={"/search"}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={"/cart"} className="mx-4">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
