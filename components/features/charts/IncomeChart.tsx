"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Transaction, Category } from '@/types';
import './setup'; // Import registration

interface IncomeChartProps {
  transactions: Transaction[];
  categories: Category[];
}

import { useTheme } from 'next-themes';

export function IncomeChart({ transactions, categories }: IncomeChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#94A3B8' : '#64748B'; // Slate 400 : Slate 500
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9'; // Subtle white vs Slate 100

  const incomeCategories = categories.filter(c => c.type === 'income');
  
  const dataMap = new Map<string, number>();
  incomeCategories.forEach(c => dataMap.set(c.id, 0));

  transactions.filter(t => t.type === 'income').forEach(t => {
    const current = dataMap.get(t.categoryId) || 0;
    dataMap.set(t.categoryId, current + t.amount);
  });

  const labels = incomeCategories.map(c => c.name);
  const data = incomeCategories.map(c => dataMap.get(c.id) || 0);
  const backgroundColors = incomeCategories.map(c => c.color);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data,
        backgroundColor: backgroundColors,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1F2530' : '#FFFFFF',
        titleColor: isDark ? '#E6E9EF' : '#1E293B',
        bodyColor: isDark ? '#E6E9EF' : '#1E293B',
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter', size: 13, weight: 'bold' as const }, // Fix type error if needed, but 'bold' string is usually fine or cast
        bodyFont: { family: 'Inter', size: 12 },
        displayColors: false,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { display: false },
        ticks: {
          color: textColor,
          font: { family: 'Inter', size: 11 },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(value: any) {
            return '$' + value;
          }
        },
        grid: {
          color: gridColor,
        }
      },
      x: {
        border: { display: false },
        ticks: {
          color: textColor,
          font: { family: 'Inter', size: 12 },
        },
        grid: {
          display: false,
        }
      }
    },
  };

  return <Bar data={chartData} options={options} />;
}
