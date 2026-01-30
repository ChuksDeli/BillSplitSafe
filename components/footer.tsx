"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoLogoGithub, IoLogoTwitter, IoWalletOutline } from "react-icons/io5";

export function Footer() {
  const isLoggedIn =
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("billsplit_username"))
      : false;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "dashboard" },
    ...(!isLoggedIn
      ? [
          { href: "/signup", label: "Sign up" },
          { href: "/login", label: "Sign in" },
        ]
      : []),
  ];

  return (
    <footer className="relative bg-[#FDFBF7] border-t border-[#2B231C]/10">
      <div className="max-w-450 mx-auto px-8 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6 group"
            >
              <span className="text-2xl font-semibold text-[#2B231C] tracking-tight">
                BillSplitSafe
              </span>
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                <IoWalletOutline className="text-xl text-[#C9955C]" />
              </motion.div>
            </Link>

            <p className="text-[17px] text-[#5C4B3C]/70 leading-relaxed max-w-md mb-8">
              Track shared expenses without the awkwardness. Built for real
              people who split bills with friends and roommates.
            </p>

            <div className="flex items-baseline gap-3">
              <div className="w-8 h-0.5 bg-[#C9955C]" />
              <span className="text-sm text-[#5C4B3C]/50 tracking-wide">
                Always free, forever
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-[#2B231C] uppercase tracking-wider mb-6">
              Navigate
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#5C4B3C]/60 hover:text-[#2B231C] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-[#2B231C] uppercase tracking-wider mb-6">
              Get in touch
            </h3>
            <p className="text-[15px] text-[#5C4B3C]/70 leading-relaxed mb-6">
              Questions? Feedback? Just want to say hi? We&apos;d love to hear
              from you.
            </p>

            <a
              href="mailto:hello@billsplitsafe.com"
              className="inline-flex items-center gap-2 text-[15px] text-[#2B231C] font-medium hover:text-[#C9955C] transition-colors"
            >
              hello@billsplitsafe.com
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-[#2B231C]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#5C4B3C]/50">
              <span>© {new Date().getFullYear()} BillSplitSafe</span>
              <span className="hidden sm:inline">·</span>
              <span>Made with care</span>
              <span className="hidden sm:inline">·</span>
              <span>No VC funding needed</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#F4EDE3] flex items-center justify-center text-[#5C4B3C]/60 hover:text-[#2B231C] hover:bg-[#C9955C]/20 transition-all"
                whileHover={{ y: -2 }}
                aria-label="GitHub"
              >
                <IoLogoGithub className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#F4EDE3] flex items-center justify-center text-[#5C4B3C]/60 hover:text-[#2B231C] hover:bg-[#C9955C]/20 transition-all"
                whileHover={{ y: -2 }}
                aria-label="Twitter"
              >
                <IoLogoTwitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
