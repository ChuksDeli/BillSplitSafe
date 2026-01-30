"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import type { Expense } from "@/types/expense";

interface AddExpensePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string;
  onAddExpense: (expense: Expense) => void;
}

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

export function AddExpensePanel({
  isOpen,
  onClose,
  currentUser,
  onAddExpense,
}: AddExpensePanelProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState<string[]>([currentUser]);
  const [paidBy, setPaidBy] = useState(currentUser);
  const [newParticipant, setNewParticipant] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    if (participants.length === 0) {
      newErrors.participants = "Add at least one participant";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddParticipant = () => {
    const trimmed = newParticipant.trim();
    if (!trimmed) return;
    if (participants.includes(trimmed)) {
      setErrors({ ...errors, newParticipant: "Already added" });
      return;
    }
    setParticipants([...participants, trimmed]);
    setNewParticipant("");
    setErrors({ ...errors, newParticipant: "" });
  };

  const handleRemoveParticipant = (name: string) => {
    const newParticipants = participants.filter((p) => p !== name);
    setParticipants(newParticipants);

    if (paidBy === name && newParticipants.length > 0) {
      setPaidBy(newParticipants[0]);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: Number(amount),
      currency: currency,
      paidBy: paidBy,
      splitAmong: participants,
      isPaid: false,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    onAddExpense(newExpense);
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setAmount("");
    setCurrency("USD");
    setDate("");
    setParticipants([currentUser]);
    setPaidBy(currentUser);
    setNewParticipant("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-125 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-[#2B231C]/8 shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#2B231C]">
                  Add Expense
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg hover:bg-[#F4EDE3] transition-colors flex items-center justify-center"
                >
                  <IoClose className="w-5 h-5 text-[#5C4B3C]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                  What was it for?
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Dinner, Rent, Movie tickets"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.description
                      ? "border-[#C67B5C] focus:border-[#C67B5C]"
                      : "border-[#2B231C]/10 focus:border-[#C9955C]"
                  } focus:outline-none`}
                />
                {errors.description && (
                  <p className="text-sm text-[#C67B5C] mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                    How much?
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-[#5C4B3C]/60 pointer-events-none">
                      {selectedCurrency?.symbol}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.amount
                          ? "border-[#C67B5C] focus:border-[#C67B5C]"
                          : "border-[#2B231C]/10 focus:border-[#C9955C]"
                      } focus:outline-none`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-[#C67B5C] mt-1">
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#2B231C]/10 focus:border-[#C9955C] focus:outline-none transition-colors bg-white"
                  >
                    {CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.code} ({curr.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                  When? (optional)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#2B231C]/10 focus:border-[#C9955C] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                  Split with who?
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddParticipant()
                    }
                    placeholder="Add person's name"
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.newParticipant
                        ? "border-[#C67B5C] focus:border-[#C67B5C]"
                        : "border-[#2B231C]/10 focus:border-[#C9955C]"
                    } focus:outline-none`}
                  />
                  <button
                    onClick={handleAddParticipant}
                    className="px-6 py-3 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors"
                  >
                    Add
                  </button>
                </div>

                {errors.newParticipant && (
                  <p className="text-sm text-[#C67B5C] mb-2">
                    {errors.newParticipant}
                  </p>
                )}

                {participants.length > 0 && (
                  <div className="space-y-2">
                    {participants.map((person) => (
                      <div
                        key={person}
                        className="flex items-center justify-between p-3 bg-[#F4EDE3] rounded-lg"
                      >
                        <span className="text-sm font-medium text-[#2B231C]">
                          {person}
                          {person === currentUser && (
                            <span className="ml-2 text-xs text-[#5C4B3C]/60">
                              (You)
                            </span>
                          )}
                        </span>
                        {participants.length > 1 && (
                          <button
                            onClick={() => handleRemoveParticipant(person)}
                            className="text-[#C67B5C] hover:text-[#C67B5C]/80 transition-colors"
                          >
                            <IoClose className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {errors.participants && (
                  <p className="text-sm text-[#C67B5C] mt-2">
                    {errors.participants}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C4B3C] mb-2">
                  Who paid for this?
                </label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#2B231C]/10 focus:border-[#C9955C] focus:outline-none transition-colors bg-white"
                >
                  {participants.map((person) => (
                    <option key={person} value={person}>
                      {person === currentUser ? "Me" : person}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-[#F4EDE3] rounded-lg">
                <p className="text-xs text-[#5C4B3C]/60 mb-1">Split equally:</p>
                <p className="text-lg font-semibold text-[#2B231C]">
                  {selectedCurrency?.symbol}
                  {amount && participants.length > 0
                    ? (Number(amount) / participants.length).toFixed(2)
                    : "0.00"}{" "}
                  <span className="text-sm font-normal text-[#5C4B3C]/70">
                    per person
                  </span>
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-[#2B231C]/8 flex gap-3 shrink-0">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-[#2B231C]/10 text-[#5C4B3C] font-medium rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20"
              >
                Add Expense
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
