"use client";

import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi";

interface Balance {
  from: string;
  to: string;
  amount: number;
}

interface BalancesSummaryProps {
  balances: Balance[];
  currentUser: string;
}

export function BalancesSummary({
  balances,
  currentUser,
}: BalancesSummaryProps) {
  const relevantBalances = balances.filter(
    (b) => b.from === currentUser || b.to === currentUser,
  );

  if (relevantBalances.length === 0 && balances.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white rounded-2xl border border-[#2B231C]/8 p-8"
      >
        <h2 className="text-xl font-semibold text-[#2B231C] mb-6">
          Who Owes What
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✌️</div>
          <p className="text-lg font-medium text-[#2B231C]">All settled up!</p>
          <p className="text-sm text-[#5C4B3C]/60 mt-2">Nobody owes anyone</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-white rounded-2xl border border-[#2B231C]/8 p-8"
    >
      <h2 className="text-xl font-semibold text-[#2B231C] mb-6">
        Who Owes What
      </h2>

      <div className="space-y-3">
        {balances.map((balance, index) => {
          const isYouOwing = balance.from === currentUser;
          const isYouOwed = balance.to === currentUser;

          return (
            <motion.div
              key={`${balance.from}-${balance.to}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                isYouOwing
                  ? "border-[#C67B5C]/20 bg-[#C67B5C]/5"
                  : isYouOwed
                    ? "border-[#7A9B76]/20 bg-[#7A9B76]/5"
                    : "border-[#2B231C]/8 bg-[#F4EDE3]/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold text-base ${
                    isYouOwing
                      ? "text-[#C67B5C]"
                      : isYouOwed
                        ? "text-[#7A9B76]"
                        : "text-[#2B231C]"
                  }`}
                >
                  {balance.from === currentUser ? "You" : balance.from}
                </span>
                <HiChevronRight className="w-5 h-5 text-[#5C4B3C]/40" />
                <span
                  className={`font-semibold text-base ${
                    isYouOwed
                      ? "text-[#7A9B76]"
                      : isYouOwing
                        ? "text-[#C67B5C]"
                        : "text-[#2B231C]"
                  }`}
                >
                  {balance.to === currentUser ? "You" : balance.to}
                </span>
              </div>
              <span
                className={`font-bold text-xl ${
                  isYouOwing
                    ? "text-[#C67B5C]"
                    : isYouOwed
                      ? "text-[#7A9B76]"
                      : "text-[#2B231C]"
                }`}
              >
                ${balance.amount.toFixed(2)}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-[#2B231C]/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#5C4B3C]/70">Your net balance</span>
          {(() => {
            const youOwe = balances
              .filter((b) => b.from === currentUser)
              .reduce((sum, b) => sum + b.amount, 0);
            const youAreOwed = balances
              .filter((b) => b.to === currentUser)
              .reduce((sum, b) => sum + b.amount, 0);
            const net = youAreOwed - youOwe;

            return (
              <span
                className={`font-bold text-2xl ${
                  net > 0
                    ? "text-[#7A9B76]"
                    : net < 0
                      ? "text-[#C67B5C]"
                      : "text-[#2B231C]"
                }`}
              >
                {net >= 0 ? "+" : ""}${net.toFixed(2)}
              </span>
            );
          })()}
        </div>
      </div>
    </motion.div>
  );
}
