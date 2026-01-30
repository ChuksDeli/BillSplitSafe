"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  isPaid: boolean;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  currentUser: string;
  onMarkAsPaid: (expenseId: string) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export function ExpenseList({
  expenses,
  currentUser,
  onMarkAsPaid,
  onDeleteExpense,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white rounded-2xl border border-[#2B231C]/8 p-12 text-center"
      >
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-[#2B231C] mb-2">
          No expenses yet
        </h3>
        <p className="text-[#5C4B3C]/70">
          Add your first expense to start tracking
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-2xl border border-[#2B231C]/8 overflow-hidden"
    >
      <div className="p-6 border-b border-[#2B231C]/8">
        <h2 className="text-xl font-semibold text-[#2B231C]">All Expenses</h2>
      </div>

      <div className="divide-y divide-[#2B231C]/8">
        <AnimatePresence mode="popLayout">
          {expenses.map((expense) => {
            const perPerson = expense.amount / expense.splitAmong.length;
            const youOwe =
              expense.paidBy !== currentUser &&
              expense.splitAmong.includes(currentUser)
                ? perPerson
                : 0;
            const youAreOwed =
              expense.paidBy === currentUser
                ? expense.amount -
                  (expense.splitAmong.includes(currentUser) ? perPerson : 0)
                : 0;

            return (
              <motion.div
                key={expense.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-6 hover:bg-[#F4EDE3]/30 transition-colors ${
                  expense.isPaid ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`font-semibold text-lg ${
                          expense.isPaid
                            ? "text-[#5C4B3C]/50 line-through"
                            : "text-[#2B231C]"
                        }`}
                      >
                        {expense.description}
                      </h3>
                      {expense.isPaid && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#7A9B76]/10 text-[#7A9B76]">
                          ✓ Paid
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#5C4B3C]/70">
                      <span className="font-semibold text-[#2B231C] text-base">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <span>•</span>
                      <span>
                        Paid by{" "}
                        {expense.paidBy === currentUser
                          ? "you"
                          : expense.paidBy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#5C4B3C]/60">
                      <span className="text-sm">👥</span>
                      <span>Split: {expense.splitAmong.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {!expense.isPaid && (
                      <>
                        {youOwe > 0 && (
                          <span className="text-sm font-semibold text-[#C67B5C]">
                            You owe ${youOwe.toFixed(2)}
                          </span>
                        )}
                        {youAreOwed > 0 && (
                          <span className="text-sm font-semibold text-[#7A9B76]">
                            You get ${youAreOwed.toFixed(2)}
                          </span>
                        )}
                      </>
                    )}
                    <div className="flex gap-2">
                      {!expense.isPaid && (
                        <button
                          onClick={() => onMarkAsPaid(expense.id)}
                          className="px-4 py-2 bg-[#7A9B76] text-white text-xs font-medium rounded-lg hover:bg-[#6B8A68] transition-colors flex items-center gap-1"
                        >
                          <span>✓</span>
                          <span>Mark paid</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        className="px-3 py-2 text-[#C67B5C] hover:bg-[#C67B5C]/10 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
