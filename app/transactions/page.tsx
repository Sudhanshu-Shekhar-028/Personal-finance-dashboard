"use client";

import React, { useState, useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { TransactionItem } from '@/components/features/TransactionItem';
import { TransactionModal } from '@/components/features/TransactionModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, Search, Trash2 } from 'lucide-react';
import { TransactionType, Transaction } from '@/types';

export default function TransactionsPage() {
  const { transactions, categories, deleteTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || t.type === typeFilter;
        const matchesCategory = categoryFilter === 'all' || t.categoryId === categoryFilter;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e6e9ef]">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-[#aab1c0]">Manage your income and expenses</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-9 bg-white text-black border-black placeholder:text-black/50 dark:bg-white dark:text-black dark:border-black dark:ring-black dark:ring-1 dark:placeholder:text-black/50 dark:caret-black" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select 
            options={[
              { value: 'all', label: 'All Types' }, 
              { value: 'income', label: 'Income' }, 
              { value: 'expense', label: 'Expense' }
            ]}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'all')}
            className="w-full md:w-40 bg-white text-black border-black dark:bg-white dark:text-black dark:border-black dark:ring-black dark:ring-1"
          />
          <Select 
            options={[
              { value: 'all', label: 'All Categories' },
              ...categories.map(c => ({ value: c.id, label: c.name }))
            ]}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-48 bg-white text-black border-black dark:bg-white dark:text-black dark:border-black dark:ring-black dark:ring-1"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="relative group">
                <TransactionItem
                  transaction={transaction}
                  category={getCategory(transaction.categoryId)}
                  onClick={() => handleEdit(transaction)}
                />
                <button
                  onClick={(e) => handleDelete(transaction.id, e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No transactions found" 
            description="Try adjusting your filters or add a new transaction."
            action={
              <Button onClick={handleOpenAdd} variant="secondary" className="mt-4">
                Add Transaction
              </Button>
            }
          />
        )}
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={editingTransaction}
      />
    </div>
  );
}
