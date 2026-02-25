"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Transaction, TransactionType } from '@/types';
import { useFinance } from '@/context/FinanceContext';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { categories, cards, addTransaction, editTransaction } = useFinance();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [cardId, setCardId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(Math.abs(transaction.amount).toString());
      setDescription(transaction.description);
      setCategoryId(transaction.categoryId);
      setCardId(transaction.cardId || '');
      setDate(new Date(transaction.date).toISOString().split('T')[0]);
    } else {
      // Reset form
      setType('expense');
      setAmount('');
      setDescription('');
      setCategoryId('');
      setCardId('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const amountValue = parseFloat(amount);
    // Ensure expense is negative if we store it that way, OR store absolute and rely on type.
    // The context/storage logic doesn't strictly enforce sign, but typically Amount is absolute and Type determines sign.
    // Let's check `MetricCard` implementation: it checks type.
    // `IncomeChart` sums amounts. `BudgetChart` sums absolute amounts.
    // `DashboardPage` sums based on type.
    // So storing absolute amount is fine, or storing signed.
    // Let's store absolute amount for simplicity in form, and handle sign in calculations if needed,
    // but looking at `DashboardPage`: `if (t.type === 'income') income += t.amount; else expense += Math.abs(t.amount);`
    // This implies `t.amount` might be negative for expenses.
    // Let's standardise: Store absolute amount. The type dictates the sign logic.
    // Wait, if I store -50 for expense, then `Math.abs(-50)` is 50.
    // If I store 50 for expense, `Math.abs(50)` is 50.
    // Let's store positive numbers always, as `TransactionItem` displays `Math.abs`.
    // So logic depends on `type`.

    const newTransaction: Transaction = {
      id: transaction?.id || crypto.randomUUID(),
      type,
      amount: amountValue,
      description,
      categoryId,
      cardId: cardId || undefined,
      date: new Date(date).toISOString(),
    };

    if (transaction) {
      editTransaction(newTransaction);
    } else {
      addTransaction(newTransaction);
    }

    setIsLoading(false);
    onClose();
  };

  const filteredCategories = categories.filter(c => c.type === type);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={type === 'income' ? 'primary' : 'secondary'}
            onClick={() => setType('income')}
            className="flex-1"
          >
            Income
          </Button>
          <Button
            type="button"
            variant={type === 'expense' ? 'primary' : 'secondary'}
            onClick={() => setType('expense')}
            className="flex-1"
          >
            Expense
          </Button>
        </div>

        <Input
          label="Amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="0.00"
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="e.g. Grocery shopping"
        />

        <div className="grid grid-cols-2 gap-4">
            <Select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={filteredCategories.map(c => ({ value: c.id, label: c.name }))}
            required
            />
            
            <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            />
        </div>

        <Select
          label="Account / Card (Optional)"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          options={cards.map(c => ({ value: c.id, label: c.name }))}
        />

        <div className="pt-4 flex gap-3 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {transaction ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
