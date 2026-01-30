"use client";

import { motion } from "framer-motion";
import { HiEmojiHappy, HiCash } from "react-icons/hi";
import { RiHandHeartLine } from "react-icons/ri";

interface CurrencyBalance {
  currency: string;
  youOwe: number;
  youAreOwed: number;
  total: number;
}

interface BalanceGraphProps {
  currencyBalances: { [currency: string]: CurrencyBalance };
  primaryCurrency: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  NGN: "₦",
  CAD: "C$",
  AUD: "A$",
};

export function BalanceGraph({
  currencyBalances,
  primaryCurrency,
}: BalanceGraphProps) {
  const currencies = Object.keys(currencyBalances);
  const primary = currencyBalances[primaryCurrency] || {
    youOwe: 0,
    youAreOwed: 0,
  };

  const youOwe = primary.youOwe;
  const youAreOwed = primary.youAreOwed;
  const total = youOwe + youAreOwed;
  const owedPercentage = total > 0 ? (youAreOwed / total) * 100 : 50;
  const owePercentage = total > 0 ? (youOwe / total) * 100 : 50;
  const netBalance = youAreOwed - youOwe;
  const symbol = CURRENCY_SYMBOLS[primaryCurrency] || "$";

  const getBalanceIcon = () => {
    if (netBalance > 0)
      return <HiEmojiHappy className="w-10 h-10 text-[#7A9B76]" />;
    if (netBalance < 0) return <HiCash className="w-10 h-10 text-[#C67B5C]" />;
    return <RiHandHeartLine className="w-10 h-10 text-[#2B231C]" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#2B231C]/8 p-8">
      <h3 className="text-xl font-semibold text-[#2B231C] mb-2">
        Balance Overview
      </h3>
      {currencies.length > 1 && (
        <p className="text-xs text-[#5C4B3C]/60 mb-6">
          Showing {primaryCurrency} · {currencies.length} currencies total
        </p>
      )}

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#5C4B3C]/70">
              You&apos;re owed
            </span>
            <span className="text-lg font-semibold text-[#7A9B76]">
              +{symbol}
              {youAreOwed.toFixed(2)}
            </span>
          </div>
          <div className="h-3 bg-[#2B231C]/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#7A9B76] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${owedPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#5C4B3C]/70">
              You owe
            </span>
            <span className="text-lg font-semibold text-[#C67B5C]">
              -{symbol}
              {youOwe.toFixed(2)}
            </span>
          </div>
          <div className="h-3 bg-[#2B231C]/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#C67B5C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${owePercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-[#F4EDE3] rounded-xl border-2 border-[#C9955C]/20"
      >
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#5C4B3C]/60 mb-1">
              Net Balance
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className={`text-4xl font-bold ${
                netBalance > 0
                  ? "text-[#7A9B76]"
                  : netBalance < 0
                    ? "text-[#C67B5C]"
                    : "text-[#2B231C]"
              }`}
            >
              {netBalance >= 0 ? "+" : ""}
              {symbol}
              {Math.abs(netBalance).toFixed(2)}
            </motion.div>
          </div>
          <div>{getBalanceIcon()}</div>
        </div>
        <p className="text-xs text-[#5C4B3C]/60 mt-3">
          {netBalance > 0
            ? "You're ahead! Nice."
            : netBalance < 0
              ? "Time to settle up"
              : "All even"}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-4 rounded-xl bg-[#7A9B76]/5 border border-[#7A9B76]/10"
        >
          <div className="text-xs text-[#5C4B3C]/60 mb-1">Owed</div>
          <div className="text-2xl font-bold text-[#7A9B76]">
            {symbol}
            {youAreOwed.toFixed(2)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="p-4 rounded-xl bg-[#C67B5C]/5 border border-[#C67B5C]/10"
        >
          <div className="text-xs text-[#5C4B3C]/60 mb-1">Owe</div>
          <div className="text-2xl font-bold text-[#C67B5C]">
            {symbol}
            {youOwe.toFixed(2)}
          </div>
        </motion.div>
      </div>

      {currencies.length > 1 && (
        <div className="mt-6 p-4 bg-[#F4EDE3]/50 rounded-lg">
          <p className="text-xs font-medium text-[#5C4B3C]/70 mb-2">
            Other currencies:
          </p>
          <div className="space-y-1">
            {currencies
              .filter((c) => c !== primaryCurrency)
              .map((curr) => (
                <p key={curr} className="text-xs text-[#5C4B3C]/60">
                  {curr}: {CURRENCY_SYMBOLS[curr] || "$"}
                  {currencyBalances[curr].youAreOwed.toFixed(2)} owed, -
                  {CURRENCY_SYMBOLS[curr] || "$"}
                  {currencyBalances[curr].youOwe.toFixed(2)} owe
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
