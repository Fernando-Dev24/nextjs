"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  label: string;
  icon: React.ReactNode;
}

// normal-class px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
// active class px-4 py-3 flex items-center space-x-4 rounded-xl

export const SidebarItem = ({ label, path, icon }: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
          currentPath === path
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{label}</span>
      </Link>
    </li>
  );
};
