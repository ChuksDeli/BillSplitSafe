"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Expense {
  id: string;
  name?: string;
  description: string;
  date: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  isPaid: boolean;
  createdAt?: string;
}

interface AddExpensePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string;
  users: { id: string; name: string }[];
  onAddExpense: (expense: Expense) => void;
}

export function AddExpensePanel({
  isOpen,
  onClose,
  currentUser,
  users,
  onAddExpense,
}: AddExpensePanelProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(currentUser);
  const [splitAmong, setSplitAmong] = useState<string[]>([currentUser]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggleUser = (userName: string) => {
    setSplitAmong((prev) =>
      prev.includes(userName)
        ? prev.filter((u) => u !== userName)
        : [...prev, userName],
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (splitAmong.length === 0) {
      newErrors.splitAmong = "Select at least one person";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: description.trim(),
      date: new Date().toISOString(),
      amount: Number.parseFloat(amount),
      paidBy,
      splitAmong,
      isPaid: false,
    };

    onAddExpense(newExpense);

    // Reset form
    setDescription("");
    setAmount("");
    setPaidBy(currentUser);
    setSplitAmong([currentUser]);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2B231C]/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FDFBF7] border-l border-[#2B231C]/10 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#2B231C]/10 p-8 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#2B231C]">
                    Add Expense
                  </h2>
                  <p className="text-sm text-[#5C4B3C]/70 mt-1">
                    Track a new shared cost
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-[#2B231C]/5 flex items-center justify-center transition-colors"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 space-y-8">
              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-[#5C4B3C]/70"
                >
                  What was it for?
                </label>
                <input
                  id="description"
                  placeholder="Dinner, rent, coffee..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full h-14 px-4 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all ${
                    errors.description
                      ? "border-[#C67B5C]"
                      : "border-[#2B231C]/10 focus:border-[#C9955C]"
                  }`}
                />
                {errors.description && (
                  <p className="text-sm text-[#C67B5C]">{errors.description}</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-[#5C4B3C]/70"
                >
                  How much?
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full h-14 px-4 bg-white border-2 rounded-lg text-[#2B231C] placeholder:text-[#5C4B3C]/30 focus:outline-none transition-all font-semibold text-lg ${
                    errors.amount
                      ? "border-[#C67B5C]"
                      : "border-[#2B231C]/10 focus:border-[#C9955C]"
                  }`}
                />
                {errors.amount && (
                  <p className="text-sm text-[#C67B5C]">{errors.amount}</p>
                )}
              </div>

              {/* Paid by */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#5C4B3C]/70">
                  Who paid?
                </label>
                <div className="flex flex-wrap gap-2">
                  {users.map((user) => (
                    <motion.button
                      key={user.id}
                      type="button"
                      onClick={() => setPaidBy(user.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                        paidBy === user.name
                          ? "bg-[#2B231C] text-white"
                          : "bg-[#F4EDE3] text-[#5C4B3C] hover:bg-[#C9955C]/20"
                      }`}
                    >
                      {user.name === currentUser ? "You" : user.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Split among */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#5C4B3C]/70">
                    Split between
                  </label>
                  <span className="text-sm text-[#5C4B3C]/50">
                    {splitAmong.length}{" "}
                    {splitAmong.length === 1 ? "person" : "people"}
                  </span>
                </div>
                {errors.splitAmong && (
                  <p className="text-sm text-[#C67B5C]">{errors.splitAmong}</p>
                )}
                <div className="space-y-2">
                  {users.map((user) => {
                    const isSelected = splitAmong.includes(user.name);
                    const perPerson =
                      splitAmong.length > 0 && amount
                        ? Number.parseFloat(amount) / splitAmong.length
                        : 0;

                    return (
                      <motion.button
                        key={user.id}
                        type="button"
                        onClick={() => handleToggleUser(user.name)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? "border-[#7A9B76] bg-[#7A9B76]/5"
                            : "border-[#2B231C]/10 hover:border-[#C9955C]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-[#7A9B76] bg-[#7A9B76]"
                                  : "border-[#2B231C]/20"
                              }`}
                            >
                              {isSelected && (
                                <span className="text-white text-xs">✓</span>
                              )}
                            </div>
                            <span className="font-medium text-[#2B231C]">
                              {user.name === currentUser ? "You" : user.name}
                            </span>
                          </div>
                          {isSelected && perPerson > 0 && (
                            <span className="text-sm font-semibold text-[#7A9B76]">
                              ${perPerson.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#FDFBF7]/95 backdrop-blur-sm border-t border-[#2B231C]/10 p-8">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-12 bg-transparent border-2 border-[#2B231C]/10 text-[#2B231C] font-medium rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20 flex items-center justify-center gap-2"
                >
                  <span className="text-lg">+</span>
                  <span>Add expense</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
