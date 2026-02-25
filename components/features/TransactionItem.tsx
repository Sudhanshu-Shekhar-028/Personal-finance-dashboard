import React from 'react';
import { Transaction, Category } from '@/types';
import { cn } from '@/utils/cn';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
  onClick?: () => void;
}

export function TransactionItem({ transaction, category, onClick }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div 
      className="flex items-center justify-between p-4 mb-3 bg-background-surface dark:bg-background-surface rounded-2xl hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
          isIncome 
            ? "bg-accent-success/10 text-accent-success group-hover:bg-accent-success/20" 
            : "bg-accent-danger/10 text-accent-danger group-hover:bg-accent-danger/20"
        )}>
          {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
        </div>
        
        <div>
          <p className="font-semibold text-text-primary text-base mb-0.5">{transaction.description}</p>
          <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">{category?.name || 'Uncategorized'}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <span className={cn(
        "font-bold text-lg",
        isIncome ? "text-accent-success" : "text-text-primary" 
      )}>
        {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
      </span>
    </div>
  );
}
