"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import type { Expense } from "@/types/expense";
import { Navbar } from "@/components/navbar";
import { ExpenseStream } from "@/components/dashboard/expense-stream";
import { BalanceGraph } from "@/components/dashboard/balance-graph";
import { FlowDiagram } from "@/components/dashboard/flow-diagram";
import { AddExpensePanel } from "@/components/dashboard/add-expense-panel";
import { SummaryCards } from "@/components/dashboard/summary-cards";

interface Balance {
  from: string;
  to: string;
  amount: number;
  currency: string;
}

interface CurrencyBalance {
  currency: string;
  youOwe: number;
  youAreOwed: number;
  total: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedUsername = localStorage.getItem("billsplit_username");
      const isLoggedIn = localStorage.getItem("billsplit_loggedIn");

      if (typeof storedUsername !== "string" || isLoggedIn !== "true") {
        router.push("/login");
        return;
      }

      setCurrentUser(storedUsername);

      const userExpensesKey = `expenses_${storedUsername}`;
      const savedExpenses = localStorage.getItem(userExpensesKey);
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      const userExpensesKey = `expenses_${currentUser}`;
      localStorage.setItem(userExpensesKey, JSON.stringify(expenses));
    }
  }, [expenses, isLoading, currentUser]);

  const handleAddExpense = useCallback((expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const handleMarkAsPaid = useCallback((id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isPaid: true } : e)),
    );
  }, []);

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("billsplit_username");
    localStorage.removeItem("billsplit_loggedIn");
    router.push("/");
  };

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

  // ===============================
  // Calculations by currency
  // ===============================
  const unpaid = expenses.filter((e) => !e.isPaid);

  const currencyBalances: { [currency: string]: CurrencyBalance } = {};

  unpaid.forEach((expense) => {
    const currency = expense.currency || "USD";

    if (!currencyBalances[currency]) {
      currencyBalances[currency] = {
        currency,
        youOwe: 0,
        youAreOwed: 0,
        total: 0,
      };
    }

    const perPerson = expense.amount / expense.splitAmong.length;

    currencyBalances[currency].total += expense.amount;

    if (expense.paidBy === currentUser) {
      currencyBalances[currency].youAreOwed +=
        expense.amount -
        (expense.splitAmong.includes(currentUser) ? perPerson : 0);
    } else if (expense.splitAmong.includes(currentUser)) {
      currencyBalances[currency].youOwe += perPerson;
    }
  });

  const currencies = Object.keys(currencyBalances);
  const primaryCurrency = currencies[0] || "USD";

  const allParticipants = new Set<string>();
  expenses.forEach((e) => {
    allParticipants.add(e.paidBy);
    e.splitAmong.forEach((p) => allParticipants.add(p));
  });

  const balancesByCurrency: { [currency: string]: Balance[] } = {};

  unpaid.forEach((expense) => {
    const currency = expense.currency || "USD";

    if (!balancesByCurrency[currency]) {
      balancesByCurrency[currency] = [];
    }

    const ledger: Record<string, Record<string, number>> = {};

    allParticipants.forEach((u) => {
      ledger[u] = {};
      allParticipants.forEach((v) => {
        if (u !== v) ledger[u][v] = 0;
      });
    });

    const perPerson = expense.amount / expense.splitAmong.length;
    expense.splitAmong.forEach((person) => {
      if (person !== expense.paidBy) {
        ledger[person][expense.paidBy] += perPerson;
      }
    });

    const seen = new Set<string>();

    allParticipants.forEach((from) => {
      allParticipants.forEach((to) => {
        if (from === to) return;

        const key = [from, to].sort().join("-");
        if (seen.has(key)) return;
        seen.add(key);

        const net = ledger[from][to] - ledger[to][from];

        if (net > 0.01) {
          const existing = balancesByCurrency[currency].find(
            (b) => b.from === from && b.to === to,
          );
          if (existing) {
            existing.amount += net;
          } else {
            balancesByCurrency[currency].push({
              from,
              to,
              amount: net,
              currency,
            });
          }
        }
        if (net < -0.01) {
          const existing = balancesByCurrency[currency].find(
            (b) => b.from === to && b.to === from,
          );
          if (existing) {
            existing.amount += -net;
          } else {
            balancesByCurrency[currency].push({
              from: to,
              to: from,
              amount: -net,
              currency,
            });
          }
        }
      });
    });
  });

  const allBalances: Balance[] = [];
  Object.values(balancesByCurrency).forEach((balances) => {
    allBalances.push(...balances);
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <div className="pt-32 px-8 lg:px-20 max-w-[1800px] mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#C9955C]" />
                <span className="text-sm text-[#5C4B3C]/60 tracking-wide">
                  Your dashboard
                </span>
              </div>
              <h1 className="text-5xl font-semibold text-[#2B231C] tracking-tight">
                Hey, {currentUser}
              </h1>
              <p className="text-lg text-[#5C4B3C]/70 mt-2">
                {expenses.length === 0
                  ? "Ready to add your first expense?"
                  : `You have ${unpaid.length} active ${
                      unpaid.length === 1 ? "expense" : "expenses"
                    }`}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="px-6 py-3 border-2 border-[#2B231C]/10 text-[#5C4B3C] font-medium rounded-lg hover:border-[#C9955C] hover:bg-[#F4EDE3] transition-all"
              >
                Log out
              </button>

              <button
                onClick={() => setIsPanelOpen(true)}
                className="px-6 py-3 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20 flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                <span>Add expense</span>
              </button>
            </div>
          </div>
        </motion.div>

        <SummaryCards currencyBalances={currencyBalances} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <ExpenseStream
              expenses={expenses}
              currentUser={currentUser}
              onMarkAsPaid={handleMarkAsPaid}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>

          <div className="space-y-8">
            <BalanceGraph
              currencyBalances={currencyBalances}
              primaryCurrency={primaryCurrency}
            />
            <FlowDiagram balances={allBalances} currentUser={currentUser} />
          </div>
        </div>
      </div>

      <AddExpensePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        currentUser={currentUser}
        onAddExpense={handleAddExpense}
      />
    </main>
  );
}
