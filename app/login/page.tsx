"use client";

import React from "react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoWalletOutline } from "react-icons/io5";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const checkRegistration = () => {
      if (searchParams.get("registered") === "true") {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
      }
    };

    checkRegistration();
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem("billsplit_users") || "[]");
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === formData.username && u.password === formData.password,
    );

    if (!user) {
      setErrors({ password: "Invalid username or password" });
      setIsLoading(false);
      return;
    }

    localStorage.setItem("billsplit_username", user.username);
    localStorage.setItem("billsplit_loggedIn", "true");

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex bg-[#FDFBF7]">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 bg-[#7A9B76] text-white px-6 py-4 rounded-xl shadow-xl border-2 border-[#2B231C]">
              <span className="text-xl">✓</span>
              <div>
                <p className="font-semibold text-sm">Account created!</p>
                <p className="text-xs opacity-90">Sign in to get started</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-semibold text-[#2B231C]">
                BillSplitSafe
              </span>
              <span className="text-xl">
                {" "}
                <IoWalletOutline className="text-xl text-[#C9955C]" />
              </span>
            </Link>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#C9955C]" />
              <span className="text-sm text-[#5C4B3C]/60 tracking-wide">
                Welcome back
              </span>
            </div>
            <h1 className="text-5xl font-semibold text-[#2B231C] mb-4 tracking-tight">
              Sign in
            </h1>
            <p className="text-lg text-[#5C4B3C]/70">
              Pick up where you left off
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-[#5C4B3C]/70"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full h-14 px-4 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                  errors.username
                    ? "border-[#C67B5C]"
                    : "border-[#2B231C]/10 focus:border-[#C9955C]"
                }`}
              />
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#C67B5C]"
                >
                  {errors.username}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#5C4B3C]/70"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full h-14 px-4 pr-12 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                    errors.password
                      ? "border-[#C67B5C]"
                      : "border-[#2B231C]/10 focus:border-[#C9955C]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5C4B3C]/40 hover:text-[#2B231C] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#C67B5C]"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-14 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20 flex items-center justify-center"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : (
                "Sign in"
              )}
            </motion.button>
          </div>

          <div className="mt-10 pt-8 border-t border-[#2B231C]/10">
            <p className="text-center text-sm text-[#5C4B3C]/70 mb-4">
              Don&apos;t have an account yet?
            </p>
            <Link href="/signup">
              <button className="w-full h-12 bg-transparent border-2 border-[#2B231C]/10 text-[#2B231C] font-medium rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all">
                Create account
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F4EDE3] items-center justify-center p-16 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#C9955C]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-12">
              <span className="text-3xl font-semibold text-[#2B231C]">
                BillSplitSafe
              </span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IoWalletOutline className="text-xl text-[#C9955C]" />
              </motion.span>
            </Link>

            <h2 className="text-4xl font-semibold text-[#2B231C] mb-6 leading-tight">
              Track expenses
              <br />
              <span className="font-light italic">without the stress</span>
            </h2>

            <p className="text-lg text-[#5C4B3C]/80 mb-12 leading-relaxed">
              Simple bill splitting for real people. No spreadsheets, no mental
              math, no awkward conversations.
            </p>

            <div className="space-y-4">
              {[
                "Split bills instantly",
                "Track who owes what",
                "Remind friends (nicely)",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#7A9B76] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#2B231C] font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#2B231C]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-[#5C4B3C]/80 italic mb-3">
                &quot;Finally, no more &apos;I&apos;ll Venmo you later&apos;
                that never happens. This thing actually works.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9955C] flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[#2B231C]">Sarah M.</div>
                  <div className="text-[#5C4B3C]/60">Roommate of 3</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
          <motion.div
            className="w-8 h-8 border-2 border-[#C9955C]/30 border-t-[#C9955C] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
