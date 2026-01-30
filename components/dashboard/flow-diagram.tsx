"use client";

import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

interface Balance {
  from: string;
  to: string;
  amount: number;
  currency: string;
}

interface FlowDiagramProps {
  balances: Balance[];
  currentUser: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "C$",
  AUD: "A$",
};

export function FlowDiagram({ balances, currentUser }: FlowDiagramProps) {
  if (balances.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#2B231C]/8 p-8">
        <h3 className="text-xl font-semibold text-[#2B231C] mb-6">
          Payment Flow
        </h3>
        <div className="flex items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">💚</div>
            <p className="text-xl font-semibold text-[#7A9B76] mb-2">
              All Settled!
            </p>
            <p className="text-sm text-[#5C4B3C]/70">No outstanding payments</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#2B231C]/8 p-6 overflow-hidden">
      <h3 className="text-xl font-semibold text-[#2B231C] mb-2">
        Payment Flow
      </h3>
      <p className="text-sm text-[#5C4B3C]/70 mb-6">Who needs to pay whom</p>

      <div className="space-y-4">
        {balances.map((balance, index) => {
          const isUserFrom = balance.from === currentUser;
          const isUserTo = balance.to === currentUser;
          const symbol = CURRENCY_SYMBOLS[balance.currency] || "$";

          return (
            <motion.div
              key={`${balance.from}-${balance.to}-${balance.currency}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl border-2 ${
                isUserFrom
                  ? "border-[#C67B5C]/30 bg-[#C67B5C]/5"
                  : isUserTo
                    ? "border-[#7A9B76]/30 bg-[#7A9B76]/5"
                    : "border-[#2B231C]/8 bg-[#F4EDE3]/30"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isUserFrom
                        ? "bg-[#C67B5C] text-white"
                        : "bg-[#F4EDE3] text-[#2B231C]"
                    }`}
                  >
                    {(isUserFrom ? "You" : balance.from)
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-[#2B231C] truncate">
                      {isUserFrom ? "You" : balance.from}
                    </p>
                    <p className="text-xs text-[#5C4B3C]/60">owes</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 py-1">
                  <HiArrowDown className="w-4 h-4 text-[#C9955C]" />
                  <div
                    className={`px-4 py-1.5 rounded-lg font-bold text-base ${
                      isUserFrom
                        ? "bg-[#C67B5C] text-white"
                        : isUserTo
                          ? "bg-[#7A9B76] text-white"
                          : "bg-[#C9955C] text-white"
                    }`}
                  >
                    {symbol}
                    {balance.amount.toFixed(2)}
                  </div>
                  <HiArrowDown className="w-4 h-4 text-[#C9955C]" />
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isUserTo
                        ? "bg-[#7A9B76] text-white"
                        : "bg-[#F4EDE3] text-[#2B231C]"
                    }`}
                  >
                    {(isUserTo ? "You" : balance.to).slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-[#2B231C] truncate">
                      {isUserTo ? "You" : balance.to}
                    </p>
                    <p className="text-xs text-[#5C4B3C]/60">receives</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
