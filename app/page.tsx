"use client";

import React, { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { MetricCard } from '@/components/features/MetricCard';
import { WalletCard } from '@/components/features/WalletCard';
import { ChartContainer } from '@/components/features/ChartContainer';
import { TransactionItem } from '@/components/features/TransactionItem';
import { IncomeChart } from '@/components/features/charts/IncomeChart';
import { BudgetChart } from '@/components/features/charts/BudgetChart';
import { EmptyState } from '@/components/ui/EmptyState';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
  const { transactions, categories, user } = useFinance();

  const metrics = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += Math.abs(t.amount);
    });

    const balance = income - expense;
    // Mock savings calculation (e.g. 20% of income or explicit savings goal contributions)
    // For MVP, simple Balance is "Savings" if positive, or we can track transfers to savings accounts.
    // Let's use Balance as "Total Balance" and maybe Income - Expense as "Net Savings" for the period?
    // "Savings" could also be sum of balances in Savings accounts.
    // Let's stick to simple cash flow for now.
    
    return {
      totalBalance: balance, // This might need to come from Accounts if we tracked opening balances. 
                             // Context: We have `cards` with balance. Summing them is better for "Total Balance".
                             // But let's calculate cash flow for this period or all time.
      totalIncome: income,
      totalExpense: expense,
      netSavings: income - expense, 
    };
  }, [transactions]);
  
  const { cards } = useFinance();
  const totalAccountBalance = useMemo(() => {
      return cards.reduce((sum, card) => sum + card.balance, 0);
  }, [cards]);


  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-2">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-[#e6e9ef] tracking-tight">Dashboard</h1>
           <p className="text-sm text-gray-500 dark:text-[#aab1c0] mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WalletCard
          balance={totalAccountBalance}
          className="md:col-span-2 lg:col-span-1 shadow-glow"
        />
        <MetricCard
          title="Total Income"
          amount={metrics.totalIncome}
          icon={TrendingUp}
          type="income"
        />
        <MetricCard
          title="Total Expense"
          amount={metrics.totalExpense}
          icon={TrendingDown}
          type="expense"
        />
        <MetricCard
          title="Net Savings"
          amount={metrics.netSavings}
          icon={PiggyBank}
          type="neutral"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer title="Income Analysis">
          <IncomeChart transactions={transactions} categories={categories} />
        </ChartContainer>
        <ChartContainer title="Expense Breakdown">
           <BudgetChart transactions={transactions} categories={categories} />
        </ChartContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-background-surface dark:bg-background-elevated rounded-3xl shadow-soft dark:shadow-soft-lg border border-gray-100 dark:border-gray-800 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">Recent Transactions</h3>
          <Link href="/transactions">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">View All</Button>
          </Link>
        </div>

        <div className="space-y-2">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                category={getCategory(transaction.categoryId)}
              />
            ))
          ) : (
            <EmptyState 
              title="No recent transactions" 
              description="Start adding transactions to see them here."
              className="py-12"
            />
          )}
        </div>
      </div>
    </div>
  );
}
