"use client";

import { titleFont } from "@/config/fonts";
import { usedUIStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = usedUIStore((state) => state.openSideMenu);

  return (
    <nav className="flex justify-between items-center w-full px-5">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            E-Games
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className="hidden sm:flex gap-2">
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-200"
          href="/category/playstation"
        >
          PS
        </Link>
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-200"
          href="/category/xbox"
        >
          XBOX
        </Link>
        <Link
          className="p-2 rounded-md transition-all hover:bg-gray-200"
          href="/category/nintendo"
        >
          SWITCH
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <span className="absolute -top-2 -right-2 px-1 rounded-full text-xs font-bold bg-blue-800 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          type="button"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          aria-label="button to menu"
          onClick={() => openMenu()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
