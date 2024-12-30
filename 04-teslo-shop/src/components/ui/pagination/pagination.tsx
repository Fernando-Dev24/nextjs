"use client";

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;

  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  const allPages = generatePagination(currentPage, totalPages);

  if (currentPage <= 0 || isNaN(+pageString)) redirect("/?page=1");

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathName}?${params.toString()}`;
    }

    if (currentPage > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              href={createPageURL(currentPage - 1)}
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-30 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={`${page} - ${index}`} className="page-item">
              <a
                href={createPageURL(page)}
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-500 shadow-md text-white hover:bg-blue-400 hover:text-white":
                      page === currentPage,
                  }
                )}
              >
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <Link
              href={createPageURL(currentPage + 1)}
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-30 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
