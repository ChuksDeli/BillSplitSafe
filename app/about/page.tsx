"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiLightBulb, HiLightningBolt, HiShieldCheck } from "react-icons/hi";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const storyNodes = [
  {
    icon: HiLightBulb,
    title: "Born from frustration",
    description:
      "We've all been there - that awkward moment after dinner when someone asks 'who owes what?' The mental math, the forgotten receipts, the 'I'll Venmo you later' that never happens. We built this because we were tired of it.",
    color: "#C9955C",
  },
  {
    icon: HiLightningBolt,
    title: "Built for real life",
    description:
      "No complicated setup. No spreadsheets. No learning curve. Just open the app, add the expense, and move on with your day. It takes 10 seconds because that's all it should take.",
    color: "#7A9B76",
  },
  {
    icon: HiShieldCheck,
    title: "Your data is yours",
    description:
      "We don't sell your information. We don't track your spending. We don't even want to know what you're buying. Your financial data stays private, period. No asterisks, no fine print.",
    color: "#C67B5C",
  },
];

const features = [
  { label: "Setup time", value: "30 sec" },
  { label: "Monthly cost", value: "$0" },
  { label: "Data sold", value: "Never" },
  { label: "Expenses", value: "Unlimited" },
];

export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUsername = localStorage.getItem("billsplit_username");
      const loggedInStatus = localStorage.getItem("billsplit_loggedIn");

      if (storedUsername && loggedInStatus === "true") {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <motion.div
          className="w-12 h-12 border-2 border-[#C9955C]/30 border-t-[#C9955C] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-8">
        <div className="absolute top-0 right-0 w-100 sm:w-150 lg:w-200 h-100 sm:h-150 lg:h-200 bg-[#C9955C]/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="flex items-baseline gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
              <div className="w-8 sm:w-12 h-0.5 bg-[#C9955C]" />
              <span className="text-xs sm:text-sm text-[#5C4B3C]/60 tracking-wide uppercase">
                Our story
              </span>
              <div className="w-8 sm:w-12 h-0.5 bg-[#C9955C]" />
            </div>

            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-semibold text-[#2B231C] leading-[0.9] tracking-tight mb-6 sm:mb-8 px-4">
              Money talk
              <br />
              without the
              <br />
              <span className="font-light italic">awkwardness</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#5C4B3C]/80 max-w-3xl mx-auto leading-relaxed font-light mb-12 sm:mb-16 px-4">
              We believe splitting expenses should strengthen friendships, not
              strain them. So we built something simple, honest, and actually
              helpful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#2B231C]/8 p-4 sm:p-6 shadow-lg"
              >
                <p className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#2B231C] mb-1 sm:mb-2">
                  {feature.value}
                </p>
                <p className="text-xs sm:text-sm text-[#5C4B3C]/70">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-20 bg-[#F4EDE3]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="flex items-baseline gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
              <div className="w-6 sm:w-8 h-0.5 bg-[#C9955C]" />
              <span className="text-xs sm:text-sm text-[#5C4B3C]/60 tracking-wide uppercase">
                Why we exist
              </span>
              <div className="w-6 sm:w-8 h-0.5 bg-[#C9955C]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2B231C] tracking-tight px-4">
              The whole story
            </h2>
          </motion.div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {storyNodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#2B231C]/8 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
                    <div
                      className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${node.color}15` }}
                    >
                      <Icon
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                        style={{ color: node.color }}
                      />
                    </div>
                    <div className="flex-1 pt-0 sm:pt-2">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2B231C] mb-3 sm:mb-4 tracking-tight">
                        {node.title}
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl text-[#5C4B3C]/80 leading-relaxed font-light">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {!isLoggedIn && (
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="flex items-baseline gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
                <div className="w-6 sm:w-8 h-0.5 bg-[#C9955C]" />
                <span className="text-xs sm:text-sm text-[#5C4B3C]/60 tracking-wide uppercase">
                  The process
                </span>
                <div className="w-6 sm:w-8 h-0.5 bg-[#C9955C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2B231C] tracking-tight px-4">
                How it works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: "1",
                  title: "Sign up",
                  description:
                    "Takes 30 seconds. Email and password, that's it.",
                },
                {
                  step: "2",
                  title: "Add expenses",
                  description:
                    "Type what you paid for and who was there. We do the math.",
                },
                {
                  step: "3",
                  title: "Settle up",
                  description:
                    "See who owes what. Send a reminder. Mark it paid. Done.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#2B231C]/8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C9955C] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                    {item.step}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-[#2B231C] mb-2 sm:mb-3 pt-2">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#5C4B3C]/80 leading-relaxed">
                    {item.description}
                  </p>

                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#C9955C]/30 z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!isLoggedIn && (
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-20 bg-[#F4EDE3]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#C9955C]/30 shadow-2xl overflow-hidden"
            >
              <div className="h-1.5 sm:h-2 bg-linear-to-r from-[#C9955C] via-[#C67B5C] to-[#C9955C]" />

              <div className="p-8 sm:p-12 lg:p-16 xl:p-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F4EDE3] rounded-full mb-6 sm:mb-8 border border-[#C9955C]/20">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C9955C]" />
                    <span className="text-xs sm:text-sm font-medium text-[#5C4B3C]">
                      Ready when you are
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#2B231C] tracking-tight mb-4 sm:mb-6 px-4">
                    Start splitting
                    <br />
                    <span className="font-light italic">the smart way</span>
                  </h2>

                  <p className="text-base sm:text-lg lg:text-xl text-[#5C4B3C]/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-4">
                    Join people who&apos;ve stopped stressing about shared
                    expenses. It&apos;s free, it&apos;s simple, and it just
                    works.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                    <Link href="/signup" className="w-full sm:w-auto">
                      <motion.button
                        className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get started free
                      </motion.button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                      <motion.button
                        className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-[#2B231C]/20 text-[#2B231C] font-medium rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign in
                      </motion.button>
                    </Link>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C4B3C]/60 mt-6 sm:mt-8 px-4">
                    No credit card · No commitment · No spam
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
