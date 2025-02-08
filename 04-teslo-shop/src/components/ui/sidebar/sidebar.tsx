"use client";

// import { useSession } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
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
import { useSessionProviders } from "@/components/providers/Providers";

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore((state) => state);
  const { session } = useSessionProviders();
  const isAuthenticated = !!session?.user;

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
        {isAuthenticated && (
          <div className="relative mt-14">
            <IoSearchOutline size={20} className="absolute top-2 left-2" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* OPCIONES DEL MENU */}
        {isAuthenticated && (
          <>
            <Link
              href={"/profile"}
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href={"/orders"}
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              signOut();
              closeSideMenu();
            }}
            className="w-full flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        ) : (
          <Link
            href={"/auth/login"}
            onClick={closeSideMenu}
            className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {/* LINE SEPARATOR */}

        {/* OPCIONES DE ADMINISTRADOR */}
        {session?.user.role.includes("admin") && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />
            <Link
              href={"/admin/products"}
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href={"/admin/orders"}
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href={"/admin/users"}
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2 rounded-md hover:bg-gray-100 rounded-transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
