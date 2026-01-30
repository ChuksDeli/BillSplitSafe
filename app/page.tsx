"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChartBar, HiPlus, HiBookOpen, HiSparkles } from "react-icons/hi";

import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import { Navbar } from "@/components/navbar";
import { FloatingCTA } from "@/components/floatiing-cta";

interface Expense {
  id: string;
  amount: number;
  isPaid: boolean;
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    activeExpenses: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    const checkAuth = () => {
      const storedUsername = localStorage.getItem("billsplit_username");
      const loggedInStatus = localStorage.getItem("billsplit_loggedIn");

      if (storedUsername && loggedInStatus === "true") {
        setIsLoggedIn(true);
        setUsername(storedUsername);

        const userExpensesKey = `expenses_${storedUsername}`;
        const expenses: Expense[] = JSON.parse(
          localStorage.getItem(userExpensesKey) || "[]",
        );
        const activeExpenses = expenses.filter((e) => !e.isPaid);
        const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

        setStats({
          totalExpenses: expenses.length,
          activeExpenses: activeExpenses.length,
          totalAmount: totalAmount,
        });
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

  if (isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#FDFBF7]">
        <Navbar />

        <section className="relative min-h-screen bg-[#FDFBF7] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-[15%] right-[8%] w-125 h-125 rounded-full bg-linear-to-br from-[#C9955C]/8 to-[#C67B5C]/8 blur-3xl"
              animate={{
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4EDE3] rounded-full mb-8 border border-[#C9955C]/20">
                <div className="w-2 h-2 rounded-full bg-[#7A9B76]" />
                <span className="text-sm font-medium text-[#5C4B3C]">
                  You&apos;re logged in
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-semibold text-[#2B231C] leading-tight tracking-tight mb-6">
                Hey, {username}!
              </h1>

              <p className="text-xl text-[#5C4B3C]/70 max-w-2xl mb-8">
                {stats.activeExpenses > 0
                  ? `You have ${stats.activeExpenses} active ${stats.activeExpenses === 1 ? "expense" : "expenses"} to manage.`
                  : "You're all caught up! No active expenses right now."}
              </p>
              <Link href="/dashboard">
                <motion.button
                  className="px-10 py-5 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20 inline-flex items-center gap-3"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Go to Dashboard</span>
                  <span className="text-xl">→</span>
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              <div className="bg-white rounded-2xl p-8 border border-[#2B231C]/8 shadow-lg">
                <div className="text-sm text-[#5C4B3C]/60 mb-2">
                  Total Expenses
                </div>
                <div className="text-4xl font-bold text-[#2B231C] mb-1">
                  {stats.totalExpenses}
                </div>
                <div className="text-xs text-[#5C4B3C]/50">All time</div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#2B231C]/8 shadow-lg">
                <div className="text-sm text-[#5C4B3C]/60 mb-2">Active</div>
                <div className="text-4xl font-bold text-[#C67B5C] mb-1">
                  {stats.activeExpenses}
                </div>
                <div className="text-xs text-[#5C4B3C]/50">Need attention</div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#2B231C]/8 shadow-lg">
                <div className="text-sm text-[#5C4B3C]/60 mb-2">
                  Total Amount
                </div>
                <div className="text-4xl font-bold text-[#7A9B76] mb-1">
                  ${stats.totalAmount.toFixed(2)}
                </div>
                <div className="text-xs text-[#5C4B3C]/50">Tracked</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="bg-white rounded-2xl p-10 border border-[#2B231C]/8 shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-[#2B231C] mb-6">
                Quick Actions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-6 rounded-xl border-2 border-[#2B231C]/10 hover:border-[#C9955C] transition-all cursor-pointer group"
                  >
                    <HiChartBar className="w-8 h-8 text-[#C9955C] mb-3" />
                    <h3 className="text-lg font-semibold text-[#2B231C] mb-2 group-hover:text-[#C9955C] transition-colors">
                      View All Expenses
                    </h3>
                    <p className="text-sm text-[#5C4B3C]/70">
                      See your complete expense history and balances
                    </p>
                  </motion.div>
                </Link>

                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-6 rounded-xl border-2 border-[#2B231C]/10 hover:border-[#7A9B76] transition-all cursor-pointer group"
                  >
                    <HiPlus className="w-8 h-8 text-[#7A9B76] mb-3" />
                    <h3 className="text-lg font-semibold text-[#2B231C] mb-2 group-hover:text-[#7A9B76] transition-colors">
                      Add New Expense
                    </h3>
                    <p className="text-sm text-[#5C4B3C]/70">
                      Log a new shared cost in seconds
                    </p>
                  </motion.div>
                </Link>

                <Link href="/about">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-6 rounded-xl border-2 border-[#2B231C]/10 hover:border-[#C67B5C] transition-all cursor-pointer group"
                  >
                    <HiBookOpen className="w-8 h-8 text-[#C67B5C] mb-3" />
                    <h3 className="text-lg font-semibold text-[#2B231C] mb-2 group-hover:text-[#C67B5C] transition-colors">
                      Learn More
                    </h3>
                    <p className="text-sm text-[#5C4B3C]/70">
                      Discover tips and best practices
                    </p>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-6 rounded-xl border-2 border-[#2B231C]/10 hover:border-[#C9955C] transition-all cursor-pointer group"
                >
                  <HiSparkles className="w-8 h-8 text-[#C9955C] mb-3" />
                  <h3 className="text-lg font-semibold text-[#2B231C] mb-2 group-hover:text-[#C9955C] transition-colors">
                    Share with Friends
                  </h3>
                  <p className="text-sm text-[#5C4B3C]/70">
                    Invite others to join BillSplitSafe
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-16 p-8 bg-[#F4EDE3] rounded-2xl border border-[#C9955C]/20"
            >
              <h3 className="text-lg font-semibold text-[#2B231C] mb-4">
                💡 Pro Tip
              </h3>
              <p className="text-[#5C4B3C]/80 leading-relaxed">
                Add expenses as soon as they happen to avoid forgetting later.
                The quicker you log them, the easier it is to keep track of who
                owes what!
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InteractiveTimeline />
      <FloatingCTA />
      <Footer />
    </main>
  );
}
