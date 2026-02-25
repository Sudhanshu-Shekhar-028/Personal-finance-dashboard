export interface User {
  id: string;
  name: string;
  currency: string;
}

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO string
  description: string;
  cardId?: string; // Optional, linking to a card/account
}

export interface Card {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string; // Hex code for card background
  last4Digits?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // ISO string
  color: string;
}

export interface Budget {
  categoryId: string;
  limit: number;
  period: 'monthly' | 'weekly';
}
