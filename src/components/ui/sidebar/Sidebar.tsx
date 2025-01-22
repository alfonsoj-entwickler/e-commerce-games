"use client";

import { logout } from "@/actions";
import { usedUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoGameControllerOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = usedUIStore((state) => state.isSideMenuOpen);
  const closeMenu = usedUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="">
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={closeMenu}
          />
        </>
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-600"
          />
        </div>
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Profil</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>
          </>
        )}
        {isAuthenticated ? (
          <button
            type="button"
            className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => {
              logout();
            }}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Logout</span>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Login</span>
          </Link>
        )}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoGameControllerOutline size={30} />
              <span className="ml-3 text-xl">Games</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
