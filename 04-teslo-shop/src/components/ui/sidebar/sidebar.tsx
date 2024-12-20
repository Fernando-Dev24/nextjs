"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore((state) => state);

  return (
    <div>
      {/* BACKGROUND */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
      )}

      {/* BLUR */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}

      {/* NAVBAR */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto scrollbar",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* CLOSE ICON */}
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* INPUT */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* OPCIONES DEL MENU */}
        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        {/* LINE SEPARATOR */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
};