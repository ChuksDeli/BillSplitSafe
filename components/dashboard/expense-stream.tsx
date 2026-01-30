"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCheck } from "react-icons/fi";

import type { Expense } from "@/types/expense";

interface ExpenseStreamProps {
  expenses: Expense[];
  currentUser: string;
  onMarkAsPaid: (id: string) => void;
  onDeleteExpense: (id: string) => void;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  NGN: "₦",
  CAD: "C$",
  AUD: "A$",
};

export function ExpenseStream({
  expenses,
  currentUser,
  onMarkAsPaid,
  onDeleteExpense,
}: ExpenseStreamProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = ["#C9955C", "#7A9B76", "#C67B5C", "#5C4B3C", "#2B231C"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getCurrencySymbol = (currency: string) => {
    return CURRENCY_SYMBOLS[currency] || "$";
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#2B231C]/8 p-8 md:p-12">
        <div className="text-center py-8 md:py-12">
          <div className="text-5xl md:text-6xl mb-4">📋</div>
          <h3 className="text-lg md:text-xl font-semibold text-[#2B231C] mb-2">
            No expenses yet
          </h3>
          <p className="text-sm md:text-base text-[#5C4B3C]/70">
            Add your first expense to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#2B231C]/8 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[#2B231C]/8">
        <h3 className="text-lg md:text-xl font-semibold text-[#2B231C]">
          Activity Feed
        </h3>
        <p className="text-xs md:text-sm text-[#5C4B3C]/70 mt-1">
          Your recent expenses
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-12 top-0 bottom-0 w-0.5 bg-[#2B231C]/8" />

        <div className="py-4 md:py-6">
          <AnimatePresence mode="popLayout">
            {expenses.map((expense, index) => {
              const isPaidByUser = expense.paidBy === currentUser;
              const isUserInSplit = expense.splitAmong.includes(currentUser);
              const perPerson = expense.amount / expense.splitAmong.length;
              const currencySymbol = getCurrencySymbol(expense.currency);

              const userOwesAmount =
                isUserInSplit && !isPaidByUser ? perPerson : 0;
              const userIsOwedAmount =
                isPaidByUser && isUserInSplit
                  ? expense.amount - perPerson
                  : isPaidByUser
                    ? expense.amount
                    : 0;

              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative px-4 md:px-8 py-3 md:py-4"
                >
                  <div
                    className={`hidden md:block absolute left-9 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white z-10 ${
                      expense.isPaid
                        ? "bg-[#2B231C]/20"
                        : isPaidByUser
                          ? "bg-[#7A9B76]"
                          : "bg-[#C9955C]"
                    }`}
                  />

                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className={`md:ml-14 p-4 md:p-6 rounded-xl border transition-all ${
                      expense.isPaid
                        ? "bg-[#F4EDE3]/30 border-[#2B231C]/5 opacity-60"
                        : "bg-white border-[#2B231C]/8 hover:border-[#C9955C] hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                        <div
                          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold"
                          style={{
                            backgroundColor: getAvatarColor(expense.paidBy),
                          }}
                        >
                          {getInitials(expense.paidBy)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start md:items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-semibold text-base md:text-lg text-[#2B231C] break-words">
                              {expense.description}
                            </h4>
                            {expense.isPaid && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#7A9B76]/10 text-[#7A9B76] text-xs font-medium shrink-0">
                                ✓ Paid
                              </span>
                            )}
                          </div>

                          <p className="text-xs md:text-sm text-[#5C4B3C]/70 mb-2 md:mb-3">
                            <span className="font-medium text-[#2B231C]">
                              {expense.paidBy === currentUser
                                ? "You"
                                : expense.paidBy}
                            </span>{" "}
                            paid for {expense.splitAmong.length}{" "}
                            {expense.splitAmong.length === 1
                              ? "person"
                              : "people"}
                          </p>

                          <div className="flex md:hidden items-center justify-between mb-3">
                            <div>
                              <p className="text-xl font-bold text-[#2B231C]">
                                {currencySymbol}
                                {expense.amount.toFixed(2)}
                              </p>
                              <p className="text-xs text-[#5C4B3C]/60">
                                {currencySymbol}
                                {perPerson.toFixed(2)}/person
                              </p>
                            </div>
                            <p className="text-xs text-[#5C4B3C]/50">
                              {formatDate(expense.date)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {expense.splitAmong.slice(0, 3).map((person) => (
                              <span
                                key={person}
                                className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#F4EDE3] text-xs font-medium text-[#5C4B3C]"
                              >
                                <span className="text-xs md:text-sm">👤</span>
                                <span className="truncate max-w-20 md:max-w-none">
                                  {person === currentUser ? "You" : person}
                                </span>
                              </span>
                            ))}
                            {expense.splitAmong.length > 3 && (
                              <span className="text-xs text-[#5C4B3C]/60">
                                +{expense.splitAmong.length - 3} more
                              </span>
                            )}
                          </div>

                          {!expense.isPaid && userOwesAmount > 0 && (
                            <div className="mt-3 p-2 bg-[#C67B5C]/10 rounded-lg border border-[#C67B5C]/20">
                              <p className="text-xs text-[#C67B5C] font-medium">
                                You owe {currencySymbol}
                                {userOwesAmount.toFixed(2)} to {expense.paidBy}
                              </p>
                            </div>
                          )}

                          {!expense.isPaid && userIsOwedAmount > 0 && (
                            <div className="mt-3 p-2 bg-[#7A9B76]/10 rounded-lg border border-[#7A9B76]/20">
                              <p className="text-xs text-[#7A9B76] font-medium">
                                {expense.splitAmong.length -
                                  (isUserInSplit ? 1 : 0)}{" "}
                                {expense.splitAmong.length -
                                  (isUserInSplit ? 1 : 0) ===
                                1
                                  ? "person owes"
                                  : "people owe"}{" "}
                                you {currencySymbol}
                                {userIsOwedAmount.toFixed(2)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="hidden md:block text-right shrink-0">
                        <p className="text-2xl font-bold text-[#2B231C]">
                          {currencySymbol}
                          {expense.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-[#5C4B3C]/60 mt-1">
                          {currencySymbol}
                          {perPerson.toFixed(2)}/person
                        </p>
                        <p className="text-xs text-[#5C4B3C]/50 mt-2">
                          {formatDate(expense.date)}
                        </p>
                      </div>
                    </div>

                    {!expense.isPaid && (
                      <div className="flex items-center justify-end gap-2 mt-4 md:mt-6 pt-4 border-t border-[#2B231C]/8">
                        <button
                          onClick={() => onDeleteExpense(expense.id)}
                          className="px-3 md:px-4 py-2 text-xs md:text-sm text-[#5C4B3C]/70 hover:text-[#C67B5C] hover:bg-[#C67B5C]/10 rounded-lg transition-all flex items-center gap-1.5 md:gap-2"
                        >
                          <FiTrash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                        {(userOwesAmount > 0 || userIsOwedAmount > 0) && (
                          <button
                            onClick={() => onMarkAsPaid(expense.id)}
                            className="px-3 md:px-4 py-2 bg-[#7A9B76] text-white text-xs md:text-sm font-medium rounded-lg hover:bg-[#6B8A68] transition-colors flex items-center gap-1.5 md:gap-2"
                          >
                            <FiCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>
                              {userOwesAmount > 0
                                ? "Mark Paid"
                                : "Mark as Received"}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
