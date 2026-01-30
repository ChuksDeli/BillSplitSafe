"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  IoFastFoodOutline,
  IoCafeOutline,
  IoHomeOutline,
  IoPizzaOutline,
  IoWalletOutline,
} from "react-icons/io5";

export function HeroSection() {
  const [activeExpense, setActiveExpense] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Organic blob - single accent */}
      <motion.div
        className="absolute -top-64 right-0 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #D4A574 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1600px] mx-auto px-8 lg:px-20 min-h-screen">
        {/* Asymmetric grid - 8:4 split */}
        <div className="grid lg:grid-cols-12 gap-16 py-24 lg:py-0 lg:min-h-screen lg:items-center">
          {/* Left column - 8 units */}
          <div className="lg:col-span-8 space-y-14 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Small intro text */}
              <div className="flex items-baseline gap-3 mb-10">
                <div className="w-12 h-[2px] bg-[#5C4B3C]" />
                <span className="text-sm text-[#5C4B3C]/60 tracking-wide">
                  Expense tracking for real people
                </span>
              </div>

              {/* Main headline - relaxed, conversational */}
              <h1 className="text-[clamp(3.5rem,8vw,8.5rem)] font-semibold text-[#2B231C] leading-[0.92] tracking-[-0.03em] mb-10">
                Stop doing
                <br />
                math in your
                <br />
                <span className="relative inline-block font-light italic">
                  head
                  <motion.div
                    className="absolute -bottom-3 left-0 right-0 h-[3px] bg-[#C9955C]"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </span>
              </h1>

              {/* Description - natural language */}
              <p className="text-[21px] text-[#5C4B3C]/80 leading-[1.65] max-w-[580px] mb-12 font-light">
                Track who paid for what. See who owes you. Remind friends
                without being annoying. All the split-bill stuff, none of the
                spreadsheet headaches.
              </p>

              {/* CTAs - different approach */}
              <div className="flex flex-wrap items-center gap-5">
                <Link href="/signup">
                  <motion.button
                    className="px-9 py-[18px] bg-[#2B231C] text-[#FDFBF7] font-medium rounded-md 
                             hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try it free
                  </motion.button>
                </Link>

                <Link href="/login">
                  <button className="px-9 py-[18px] text-[#5C4B3C] font-medium hover:text-[#2B231C] transition-colors">
                    I already have an account →
                  </button>
                </Link>
              </div>

              {/* Simple trust line */}
              <div className="flex items-center gap-6 pt-10 text-[15px] text-[#5C4B3C]/50">
                <span>Free to use</span>
                <span>·</span>
                <span>No card required</span>
                <span>·</span>
                <span>Works on your phone</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - 4 units, pushed down */}
          <div className="lg:col-span-4 lg:pt-32">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {/* Main demo card - simpler, cleaner */}
              <div className="bg-white rounded-2xl p-7 shadow-xl shadow-[#2B231C]/8 border border-[#2B231C]/8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#2B231C]/8">
                  <div>
                    <div className="text-xs text-[#5C4B3C]/50 mb-1.5 uppercase tracking-wider font-medium">
                      This month
                    </div>
                    <div className="text-4xl font-semibold text-[#2B231C]">
                      $438
                    </div>
                  </div>
                  <IoWalletOutline className="text-[#C9955C] text-4xl" />
                </div>

                {/* Expenses list - more realistic */}
                <div className="space-y-3">
                  {[
                    {
                      item: "Tacos on Tuesday",
                      split: "Alex",
                      amount: 28,
                      you: "owe",
                      Icon: IoFastFoodOutline,
                    },
                    {
                      item: "Coffee run",
                      split: "Sarah",
                      amount: 12.5,
                      you: "paid",
                      Icon: IoCafeOutline,
                    },
                    {
                      item: "Rent utilities",
                      split: "3 roommates",
                      amount: 156,
                      you: "owe",
                      Icon: IoHomeOutline,
                    },
                    {
                      item: "Pizza night",
                      split: "Mike & Jordan",
                      amount: 42,
                      you: "paid",
                      Icon: IoPizzaOutline,
                    },
                  ].map((expense, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start justify-between p-3.5 rounded-lg hover:bg-[#FDFBF7] 
                               transition-all cursor-pointer border border-transparent hover:border-[#C9955C]/20"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      onMouseEnter={() => setActiveExpense(i)}
                      onMouseLeave={() => setActiveExpense(null)}
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <expense.Icon className="text-[#C9955C] text-xl mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#2B231C] mb-0.5">
                            {expense.item}
                          </div>
                          <div className="text-xs text-[#5C4B3C]/50">
                            {expense.split}
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-4">
                        <div
                          className={`text-base font-semibold ${
                            expense.you === "owe"
                              ? "text-[#C67B5C]"
                              : "text-[#7A9B76]"
                          }`}
                        >
                          {expense.you === "owe" ? "-" : "+"}${expense.amount}
                        </div>
                        <div className="text-[10px] text-[#5C4B3C]/40 uppercase tracking-wider mt-0.5">
                          {expense.you}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Simple add button */}
                <motion.button
                  className="w-full mt-5 py-3.5 border border-dashed border-[#2B231C]/20 
                           rounded-lg text-sm text-[#5C4B3C]/60 hover:text-[#2B231C] 
                           hover:border-[#C9955C] hover:bg-[#FDFBF7] transition-all font-medium"
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  + Add another expense
                </motion.button>
              </div>

              {/* Small summary cards - different layout */}
              <motion.div
                className="grid grid-cols-2 gap-3 mt-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-[#F4EDE3] rounded-xl p-4 border border-[#C9955C]/20">
                  <div className="text-[10px] text-[#5C4B3C]/60 mb-1.5 uppercase tracking-wider font-medium">
                    Owed to you
                  </div>
                  <div className="text-2xl font-semibold text-[#5C4B3C]">
                    $197
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#2B231C]/8">
                  <div className="text-[10px] text-[#5C4B3C]/60 mb-1.5 uppercase tracking-wider font-medium">
                    You owe
                  </div>
                  <div className="text-2xl font-semibold text-[#C67B5C]">
                    $241
                  </div>
                </div>
              </motion.div>

              {/* Handwritten-style note */}
              <motion.div
                className="mt-5 p-4 bg-[#FFF9E6] border-l-4 border-[#C9955C] rounded-r-lg"
                initial={{ opacity: 0, rotate: -1 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm text-[#5C4B3C]/80 italic">
                  &quot;Finally, no more &apos;I&apos;ll Venmo you later&apos;
                  that never happens&quot; — Sarah
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
