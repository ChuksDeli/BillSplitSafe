"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoWalletOutline,
} from "react-icons/io5";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("billsplit_username") || "";
  });

  const isLoggedIn = Boolean(username);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("billsplit_username");
    setUsername("");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    ...(isLoggedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7] border-b border-[#2B231C]/10">
      <div className="max-w-450 mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="group">
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-semibold text-[#2B231C] tracking-tight">
                BillSplitSafe
              </span>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IoWalletOutline className="text-xl text-[#C9955C]" />
              </motion.div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative group">
                <span
                  className={`text-[15px] font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#2B231C]"
                      : "text-[#5C4B3C]/50 hover:text-[#2B231C]"
                  }`}
                >
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-7 left-0 right-0 h-0.75 bg-[#C9955C]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <span className="text-[15px] text-[#5C4B3C]/70">
                  <span className="font-medium text-[#2B231C]">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[15px] text-[#5C4B3C]/70 hover:text-[#2B231C] transition-colors font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-[15px] text-[#5C4B3C]/70 hover:text-[#2B231C] transition-colors font-medium">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-7 py-2.5 bg-[#2B231C] text-white text-[15px] font-medium rounded-lg hover:bg-[#3D332A] transition-all shadow-sm"
                  >
                    Get started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <IoCloseOutline className="h-6 w-6 text-[#2B231C]" />
            ) : (
              <IoMenuOutline className="h-6 w-6 text-[#2B231C]" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#FDFBF7] border-t border-[#2B231C]/10"
        >
          <div className="px-8 py-6 space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  className={`text-base font-medium ${
                    pathname === link.href
                      ? "text-[#2B231C]"
                      : "text-[#5C4B3C]/60"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}

            <div className="pt-5 border-t border-[#2B231C]/10 space-y-4">
              {isLoggedIn ? (
                <>
                  <div className="text-sm text-[#5C4B3C]/70">
                    Signed in as{" "}
                    <span className="font-medium text-[#2B231C]">
                      {username}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-base text-[#5C4B3C]/70 font-medium"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full text-left text-base text-[#5C4B3C]/70 font-medium">
                      Sign in
                    </button>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full px-7 py-3 bg-[#2B231C] text-white text-base font-medium rounded-lg">
                      Get started
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
