export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  splitAmong: string[];
  isPaid: boolean;
  date: string;
  createdAt: string;
}