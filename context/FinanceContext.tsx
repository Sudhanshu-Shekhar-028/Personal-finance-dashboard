"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Category, Card, Goal, Budget, User } from '@/types';
import { storage } from '@/services/storage';

interface FinanceContextType {
  user: User | null;
  transactions: Transaction[];
  categories: Category[];
  cards: Card[];
  goals: Goal[];
  budgets: Budget[];
  addTransaction: (transaction: Transaction) => void;
  editTransaction: (updatedTransaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (updatedGoal: Goal) => void;
  deleteGoal: (id: string) => void;
  addCard: (card: Card) => void;
  deleteCard: (id: string) => void;
  refreshData: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = () => {
    setUser(storage.getUser());
    setTransactions(storage.getTransactions());
    setCategories(storage.getCategories());
    setCards(storage.getCards());
    setGoals(storage.getGoals());
    setBudgets(storage.getBudgets());
    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTransaction = (transaction: Transaction) => {
    const updated = [...transactions, transaction];
    setTransactions(updated);
    storage.saveTransactions(updated);
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    const updated = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    setTransactions(updated);
    storage.saveTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    storage.saveTransactions(updated);
  };

  const addGoal = (goal: Goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    storage.saveGoals(updated);
  };

  const updateGoal = (updatedGoal: Goal) => {
    const updated = goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g));
    setGoals(updated);
    storage.saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    storage.saveGoals(updated);
  };

  const addCard = (card: Card) => {
    const updated = [...cards, card];
    setCards(updated);
    storage.saveCards(updated);
  };

  return (
    <FinanceContext.Provider
      value={{
        user,
        transactions,
        categories,
        cards,
        goals,
        budgets,
        addTransaction,
        editTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addCard,
        deleteCard: (id: string) => {
          const updated = cards.filter((c) => c.id !== id);
          setCards(updated);
          storage.saveCards(updated);
        },
        refreshData: loadData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
