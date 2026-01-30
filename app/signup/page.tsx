"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoWalletOutline } from "react-icons/io5";

const steps = [
  { id: 1, title: "Username" },
  { id: 2, title: "Email" },
  { id: 3, title: "Password" },
];

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("billsplit_users") || "[]");
    const existingUser = users.find(
      (u: { username: string; email: string }) =>
        u.username === formData.username || u.email === formData.email,
    );

    if (existingUser) {
      setErrors({ email: "Username or email already exists" });
      setIsLoading(false);
      return;
    }

    users.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("billsplit_users", JSON.stringify(users));
    setIsLoading(false);
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/login?registered=true");
    }, 2000);
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };

  return (
    <main className="h-screen flex bg-[#FDFBF7]">
      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2B231C]/90 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-[#7A9B76] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✓</span>
              </div>
              <h2 className="text-4xl font-semibold text-white mb-3">
                You&apos;re all set!
              </h2>
              <p className="text-lg text-white/70">Taking you to sign in...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left side - Info */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F4EDE3] items-center justify-center p-16 overflow-hidden">
        {/* Subtle background */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#C9955C]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
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
              Start splitting
              <br />
              <span className="font-light italic">in 3 steps</span>
            </h2>

            <p className="text-lg text-[#5C4B3C]/80 mb-12 leading-relaxed">
              Create your free account and join people who&apos;ve stopped
              stressing about shared expenses.
            </p>

            {/* Step indicators */}
            <div className="space-y-5">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.id
                        ? "bg-[#7A9B76] text-white"
                        : currentStep === step.id
                          ? "bg-[#C9955C] text-white"
                          : "bg-white border-2 border-[#2B231C]/10 text-[#5C4B3C]/40"
                    }`}
                  >
                    {currentStep > step.id ? "✓" : step.id}
                  </div>
                  <span
                    className={`text-base font-medium ${
                      currentStep >= step.id
                        ? "text-[#2B231C]"
                        : "text-[#5C4B3C]/40"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.div
              className="mt-12 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-[#2B231C]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-[#5C4B3C]/70">
                Takes about 30 seconds. No credit card, no commitments, no spam
                emails.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
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

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-[#C9955C]" />
              <span className="text-sm text-[#5C4B3C]/60">
                Step {currentStep} of 3
              </span>
            </div>
            <div className="h-1.5 bg-[#2B231C]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C9955C]"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-semibold text-[#2B231C] mb-4 tracking-tight">
              {currentStep === 1 && "Pick a username"}
              {currentStep === 2 && "Your email"}
              {currentStep === 3 && "Set a password"}
            </h1>
            <p className="text-lg text-[#5C4B3C]/70">
              {currentStep === 1 && "How should we call you?"}
              {currentStep === 2 && "We'll never spam you"}
              {currentStep === 3 && "Keep it secure"}
            </p>
          </div>

          {/* Form content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Step 1: Username */}
              {currentStep === 1 && (
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
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className={`w-full h-14 px-4 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                      errors.username
                        ? "border-[#C67B5C]"
                        : "border-[#2B231C]/10 focus:border-[#C9955C]"
                    }`}
                    autoFocus
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
              )}

              {/* Step 2: Email */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#5C4B3C]/70"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full h-14 px-4 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                      errors.email
                        ? "border-[#C67B5C]"
                        : "border-[#2B231C]/10 focus:border-[#C9955C]"
                    }`}
                    autoFocus
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#C67B5C]"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Step 3: Password */}
              {currentStep === 3 && (
                <div className="space-y-4">
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
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className={`w-full h-14 px-4 pr-12 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                          errors.password
                            ? "border-[#C67B5C]"
                            : "border-[#2B231C]/10 focus:border-[#C9955C]"
                        }`}
                        autoFocus
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

                  {/* Password strength */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              passwordStrength() >= level
                                ? level === 1
                                  ? "bg-[#C67B5C]"
                                  : level === 2
                                    ? "bg-[#C9955C]"
                                    : "bg-[#7A9B76]"
                                : "bg-[#2B231C]/10"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#5C4B3C]/60">
                        {passwordStrength() === 1 &&
                          "Weak - Add more characters"}
                        {passwordStrength() === 2 && "Good - Getting there"}
                        {passwordStrength() === 3 && "Strong - Nice!"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="w-14 h-14 bg-transparent border-2 border-[#2B231C]/10 rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 text-[#2B231C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex-1 h-14 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20 flex items-center justify-center"
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
                  ) : currentStep === 3 ? (
                    "Create account"
                  ) : (
                    "Continue"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-[#2B231C]/10">
            <p className="text-center text-sm text-[#5C4B3C]/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#2B231C] font-medium hover:text-[#C9955C] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
