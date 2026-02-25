import { Transaction, Category, Card, Goal, Budget, User } from '@/types';

const STORAGE_KEYS = {
  USER: 'finance_dashboard_user',
  TRANSACTIONS: 'finance_dashboard_transactions',
  CATEGORIES: 'finance_dashboard_categories',
  CARDS: 'finance_dashboard_cards',
  GOALS: 'finance_dashboard_goals',
  BUDGETS: 'finance_dashboard_budgets',
};

// Seed data
const DEFAULT_USER: User = {
  id: 'user_1',
  name: 'Anshu',
  currency: 'USD',
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Food', type: 'expense', color: '#FF6B6B' },
  { id: 'cat_2', name: 'Transport', type: 'expense', color: '#4ECDC4' },
  { id: 'cat_3', name: 'Utilities', type: 'expense', color: '#45B7D1' },
  { id: 'cat_4', name: 'Salary', type: 'income', color: '#2ECC71' },
  { id: 'cat_5', name: 'Freelance', type: 'income', color: '#F1C40F' },
];

const DEFAULT_CARDS: Card[] = [
  { id: 'card_1', name: 'Main Account', balance: 5000, currency: 'USD', color: '#1A2254', last4Digits: '1234' },
  { id: 'card_2', name: 'Savings', balance: 12000, currency: 'USD', color: '#4A5FD9', last4Digits: '5678' },
];

const DEFAULT_TRANSACTIONS: Transaction[] = []; // Start empty or add samples if needed
const DEFAULT_GOALS: Goal[] = [];
const DEFAULT_BUDGETS: Budget[] = [];

export const storage = {
  getUser: (): User => {
    if (typeof window === 'undefined') return DEFAULT_USER;
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : DEFAULT_USER;
  },
  
  saveUser: (user: User) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getTransactions: (): Transaction[] => {
    if (typeof window === 'undefined') return DEFAULT_TRANSACTIONS;
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : DEFAULT_TRANSACTIONS;
  },

  saveTransactions: (transactions: Transaction[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getCategories: (): Category[] => {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        return DEFAULT_CATEGORIES;
    }
    return JSON.parse(data);
  },

  saveCategories: (categories: Category[]) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  getCards: (): Card[] => {
    if (typeof window === 'undefined') return DEFAULT_CARDS;
    const data = localStorage.getItem(STORAGE_KEYS.CARDS);
    if (!data) {
         localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(DEFAULT_CARDS));
         return DEFAULT_CARDS;
    }
    return JSON.parse(data);
  },

  saveCards: (cards: Card[]) => {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  },

  getGoals: (): Goal[] => {
    if (typeof window === 'undefined') return DEFAULT_GOALS;
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data) : DEFAULT_GOALS;
  },

  saveGoals: (goals: Goal[]) => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },
  
  getBudgets: (): Budget[] => {
      if (typeof window === 'undefined') return DEFAULT_BUDGETS;
      const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : DEFAULT_BUDGETS;
  },
  
  saveBudgets: (budgets: Budget[]) => {
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  }
};
