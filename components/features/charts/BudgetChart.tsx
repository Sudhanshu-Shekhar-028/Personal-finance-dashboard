"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Transaction, Category } from '@/types';
import './setup';

interface BudgetChartProps {
  transactions: Transaction[];
  categories: Category[];
}

import { useTheme } from 'next-themes';

export function BudgetChart({ transactions, categories }: BudgetChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94A3B8' : '#64748B';

  // Simple view: Expense Breakdown by Category
  const expenseCategories = categories.filter(c => c.type === 'expense');
  
  const dataMap = new Map<string, number>();
  expenseCategories.forEach(c => dataMap.set(c.id, 0));
  
  transactions.filter(t => t.type === 'expense').forEach(t => {
      const current = dataMap.get(t.categoryId) || 0;
      dataMap.set(t.categoryId, current + Math.abs(t.amount));
  });

  // Filter out zero categories to clean up chart
  const activeCategories = expenseCategories.filter(c => (dataMap.get(c.id) || 0) > 0);
  
  if (activeCategories.length === 0) {
      return <div className="flex items-center justify-center h-full text-text-secondary/50 font-medium">No expenses yet</div>;
  }

  const labels = activeCategories.map(c => c.name);
  const data = activeCategories.map(c => dataMap.get(c.id) || 0);
  const backgroundColors = activeCategories.map(c => c.color);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        hoverOffset: 10,
        borderRadius: 5,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
            usePointStyle: true,
            boxWidth: 8,
            color: textColor,
            font: { family: 'Inter', size: 12 },
            padding: 20,
        }
      },
       tooltip: {
        backgroundColor: isDark ? '#1F2530' : '#FFFFFF',
        titleColor: isDark ? '#E6E9EF' : '#1E293B',
        bodyColor: isDark ? '#E6E9EF' : '#1E293B',
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        bodyFont: { family: 'Inter', size: 12 },
        displayColors: true,
        callbacks: {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
             if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
