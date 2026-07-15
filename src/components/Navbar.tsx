"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  SearchIcon,
  CartIcon,
  PlusIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  LogoutIcon,
  SettingsIcon,
  ShieldIcon,
  MenuIcon,
  CloseIcon,
} from "./custom-icons";
import { ROLE } from "@/app/constants/role.constant";
import { useLogoutMutation } from "@/app/auth/auth.service";

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [logoutMutation] = useLogoutMutation()
  const handleLogout = async () => {
    await logoutMutation().unwrap();
    setDropdownOpen(false);
    router.push("/auth/login");
  };

  const getInitials = () => {
    if (!user) return "G";
    const first = user.firstname ? user.firstname[0] : "";
    const last = user.lastname ? user.lastname[0] : "";
    return (first + last).toUpperCase() || user.username[0].toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-stone-200/80 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src="/png/EazyTrade.png"
                alt="EazyTrade Logo"
                width={40}
                height={40}
                className="drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
              />
              <span className="font-extrabold text-xl tracking-tight text-[#122c3c]">
                EazyTrade
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search products, brands, shops..."
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-[#122c3c] focus:ring-2 focus:ring-[#122c3c]/10 transition-all duration-150"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-stone-600 hover:text-[#122c3c] transition-colors duration-150"
            >
              Discover
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-stone-600 hover:text-[#122c3c] transition-colors duration-150"
            >
              Categories
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="#"
                  className="text-sm font-semibold text-stone-600 hover:text-[#122c3c] transition-colors duration-150"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-1 text-sm font-bold text-[#122c3c] hover:text-[#1a3f56] px-3 py-1.5 bg-[#122c3c]/5 hover:bg-[#122c3c]/10 rounded-xl transition-all duration-150"
                >
                  <PlusIcon /> Sell Item
                </Link>
              </>
            )}
          </div>

          {/* Right Action Icons & User Control */}
          <div className="flex items-center gap-4 ml-auto lg:ml-6">
            {/* Search Toggle for Mobile & Tablet */}
            <button className="md:hidden p-2 text-stone-500 hover:text-stone-700 rounded-xl hover:bg-stone-50 transition-colors">
              <SearchIcon />
            </button>

            {/* Cart Icon */}
            <Link
              href="#"
              className="relative p-2 text-stone-600 hover:text-[#122c3c] rounded-xl hover:bg-stone-50 transition-all duration-150"
            >
              <CartIcon />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-2xs font-extrabold leading-none text-white bg-blue-600 rounded-full border border-white transform translate-x-1 -translate-y-1 animate-pulse">
                3
              </span>
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 text-stone-600 hover:text-[#122c3c] rounded-xl hover:bg-stone-50 transition-all duration-150">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </button>
            )}

            {/* User Dropdown / Authenticated State */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="flex items-center gap-2 p-1.5 hover:bg-stone-50 rounded-xl transition-all duration-150 cursor-pointer border border-stone-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#122c3c] to-[#0d202c] text-white font-bold text-sm flex items-center justify-center shadow-inner">
                    {getInitials()}
                  </div>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-xs font-bold text-stone-900 leading-tight">
                      {user ? `${user.firstname} ${user.lastname}` : "Guest"}
                    </span>
                    <span className="text-3xs font-extrabold uppercase tracking-wider text-blue-600 leading-none mt-0.5">
                      {user?.role || "user"}
                    </span>
                  </div>
                  <div
                    className={
                      dropdownOpen
                        ? "rotate-180 transition-transform duration-200"
                        : "transition-transform duration-200"
                    }
                  >
                    <ChevronDownIcon />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200/80 rounded-2xl shadow-xl py-2 z-50 transform origin-top-right transition-all duration-200 divide-y divide-stone-100">
                    <div className="px-4 py-3">
                      <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-stone-900 mt-1 truncate">
                        {user
                          ? `${user.firstname} ${user.lastname}`
                          : "Default User"}
                      </p>
                      <p className="text-xs font-medium text-stone-500 truncate mt-0.5">
                        {user?.email || "user@eazytrade.com"}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors"
                      >
                        <UserIcon /> My Profile
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors"
                      >
                        <SettingsIcon />
                        Settings
                      </Link>
                      {user?.role === ROLE.ADMIN && (
                        <Link
                          href="#"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-bold transition-colors"
                        >
                          <ShieldIcon />
                          Admin Console
                        </Link>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-semibold text-left transition-colors cursor-pointer"
                      >
                        <LogoutIcon /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-[#122c3c] hover:text-[#1a3f56] px-4 py-2 rounded-xl transition-colors duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-white bg-[#122c3c] hover:bg-[#1a3f56] px-4 py-2 rounded-xl shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-150"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-500 hover:text-[#122c3c] hover:bg-stone-50 transition-colors"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {/* Mobile Search */}
            <div className="relative w-full py-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search products, brands..."
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white"
              />
            </div>

            <Link
              href="/"
              className="block px-3 py-2.5 text-base font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#122c3c] rounded-xl transition-all"
            >
              Discover
            </Link>
            <Link
              href="#"
              className="block px-3 py-2.5 text-base font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#122c3c] rounded-xl transition-all"
            >
              Categories
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="#"
                  className="block px-3 py-2.5 text-base font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#122c3c] rounded-xl transition-all"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-1 px-3 py-2.5 text-base font-bold text-white bg-[#122c3c] hover:bg-[#1a3f56] rounded-xl transition-all shadow-md"
                >
                  <PlusIcon /> Sell Item
                </Link>
                <div className="border-t border-stone-100 my-2 pt-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#122c3c] to-[#0d202c] text-white font-bold flex items-center justify-center">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900 leading-tight">
                        {user
                          ? `${user.firstname} ${user.lastname}`
                          : "Guest user"}
                      </p>
                      <p className="text-xs text-stone-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="block px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-lg"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg font-bold text-left cursor-pointer"
                  >
                    <LogoutIcon /> Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/auth/login"
                  className="text-center text-sm font-bold text-[#122c3c] border border-stone-200 px-4 py-2.5 rounded-xl hover:bg-stone-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="text-center text-sm font-bold text-white bg-[#122c3c] px-4 py-2.5 rounded-xl shadow-md transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
