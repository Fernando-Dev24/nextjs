import Image from "next/image";
import Link from "next/link";

import { SidebarItem, SidebarLogo, LogoutButton } from "..";
import { CiBookmarkCheck, CiPen, CiDatabase } from "react-icons/ci";
import { IoCart, IoCodeWorkingOutline } from "react-icons/io5";
import { auth } from "@/config/auth";
import { ImProfile } from "react-icons/im";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <CiBookmarkCheck size={30} />,
  },
  {
    label: "Todos",
    path: "/dashboard/rest-todos",
    icon: <CiPen size={30} />,
  },
  {
    label: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <CiDatabase size={30} />,
  },
  {
    label: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={30} />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icon: <IoCart size={30} />,
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: <ImProfile size={30} />,
  },
];

export const Sidebar = async () => {
  const session = await auth();

  const userName = session?.user?.name ?? "No name";
  const avatar = session?.user?.image ?? "https://picsum.photos/200";
  const userRoles = session?.user?.roles?.join(", ");

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* Next/Link hacia dashboard */}
          <Link href="/dashboard" title="home">
            {/* Next/Image */}
            <SidebarLogo />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={avatar}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={40}
            height={40}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {navItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        {/* Next/Link hacia login */}
        <LogoutButton />
      </div>
    </aside>
  );
};
