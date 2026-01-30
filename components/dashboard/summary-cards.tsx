"use client";

import { motion } from "framer-motion";
import { HiChartBar, HiCash, HiCurrencyDollar } from "react-icons/hi";

interface CurrencyBalance {
  currency: string;
  youOwe: number;
  youAreOwed: number;
  total: number;
}

interface SummaryCardsProps {
  currencyBalances: { [currency: string]: CurrencyBalance };
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  NGN: "₦",
  CAD: "C$",
  AUD: "A$",
};

type CardType = "total" | "owe" | "owed";

export function SummaryCards({ currencyBalances }: SummaryCardsProps) {
  const currencies = Object.keys(currencyBalances);
  const hasCurrencies = currencies.length > 0;

  const cards: Array<{
    title: string;
    type: CardType;
    icon: typeof HiChartBar;
    bgColor: string;
    iconColor: string;
  }> = [
    {
      title: "Total Expenses",
      type: "total",
      icon: HiChartBar,
      bgColor: "bg-[#F4EDE3]",
      iconColor: "text-[#2B231C]",
    },
    {
      title: "You Owe",
      type: "owe",
      icon: HiCash,
      bgColor: "bg-[#C67B5C]/10",
      iconColor: "text-[#C67B5C]",
    },
    {
      title: "You're Owed",
      type: "owed",
      icon: HiCurrencyDollar,
      bgColor: "bg-[#7A9B76]/10",
      iconColor: "text-[#7A9B76]",
    },
  ];

  const getCardValue = (balance: CurrencyBalance, type: CardType): number => {
    if (type === "total") return balance.total;
    if (type === "owe") return balance.youOwe;
    return balance.youAreOwed;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-[#2B231C]/8 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-[#5C4B3C]/70">
                {card.title}
              </p>
              <div
                className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>

            {!hasCurrencies ? (
              <div>
                <p className="text-4xl font-bold text-[#2B231C]">$0.00</p>
                <p className="text-xs text-[#5C4B3C]/50 mt-2">
                  {card.type === "total"
                    ? "All shared costs"
                    : card.type === "owe"
                      ? "To be paid"
                      : "To be collected"}
                </p>
              </div>
            ) : currencies.length === 1 ? (
              <div>
                <motion.p
                  key={getCardValue(currencyBalances[currencies[0]], card.type)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className={`text-4xl font-bold ${
                    card.type === "owe" &&
                    currencyBalances[currencies[0]].youOwe > 0
                      ? "text-[#C67B5C]"
                      : card.type === "owed" &&
                          currencyBalances[currencies[0]].youAreOwed > 0
                        ? "text-[#7A9B76]"
                        : "text-[#2B231C]"
                  }`}
                >
                  {CURRENCY_SYMBOLS[currencies[0]] || "$"}
                  {getCardValue(
                    currencyBalances[currencies[0]],
                    card.type,
                  ).toFixed(2)}
                </motion.p>
                <p className="text-xs text-[#5C4B3C]/50 mt-2">
                  {card.type === "total"
                    ? "All shared costs"
                    : card.type === "owe"
                      ? "To be paid"
                      : "To be collected"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {currencies.slice(0, 2).map((curr) => (
                  <div key={curr} className="flex items-baseline gap-2">
                    <p
                      className={`text-2xl font-bold ${
                        card.type === "owe" && currencyBalances[curr].youOwe > 0
                          ? "text-[#C67B5C]"
                          : card.type === "owed" &&
                              currencyBalances[curr].youAreOwed > 0
                            ? "text-[#7A9B76]"
                            : "text-[#2B231C]"
                      }`}
                    >
                      {CURRENCY_SYMBOLS[curr] || "$"}
                      {getCardValue(currencyBalances[curr], card.type).toFixed(
                        2,
                      )}
                    </p>
                    <span className="text-xs text-[#5C4B3C]/50">{curr}</span>
                  </div>
                ))}
                {currencies.length > 2 && (
                  <p className="text-xs text-[#5C4B3C]/50">
                    +{currencies.length - 2} more
                  </p>
                )}
                <p className="text-xs text-[#5C4B3C]/50 mt-2">
                  {card.type === "total"
                    ? "Mixed currencies"
                    : card.type === "owe"
                      ? "To be paid"
                      : "To be collected"}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
