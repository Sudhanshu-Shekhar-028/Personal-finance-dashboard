import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '@/utils/cn';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  amount: number;
  currency?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ElementType;
  className?: string;
  type?: 'neutral' | 'income' | 'expense';
}

export function MetricCard({ 
  title, 
  amount, 
  currency = 'USD', 
  trend, 
  icon: Icon, 
  className,
  type = 'neutral'
}: MetricCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  const colors = {
    neutral: 'bg-background-surface dark:bg-background-surface',
    income: 'bg-background-surface dark:bg-background-surface',
    expense: 'bg-background-surface dark:bg-background-surface',
  };

  const iconColors = {
    neutral: 'text-accent-primary bg-accent-primary/10 dark:bg-accent-primary/20',
    income: 'text-accent-success bg-accent-success/10 dark:bg-accent-success/20',
    expense: 'text-accent-danger bg-accent-danger/10 dark:bg-accent-danger/20',
  };

  return (
    <Card className={cn("relative overflow-hidden group hover:shadow-soft-lg transition-all duration-300", colors[type], className)}>
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300", iconColors[type])}>
          {Icon ? <Icon className="w-6 h-6" /> : <Minus className="w-6 h-6" />}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-bold px-2.5 py-1 rounded-full",
            trend.isPositive 
              ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400" 
              : "text-rose-700 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400"
          )}>
            {trend.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      
      <div className="z-10 relative">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-text-primary tracking-tight">{formattedAmount}</h3>
      </div>
      
      {/* Decorative background element */}
      <div className={cn(
        "absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-5 blur-2xl group-hover:opacity-10 transition-opacity",
        type === 'income' ? 'bg-accent-success' : type === 'expense' ? 'bg-accent-danger' : 'bg-accent-primary'
      )} />
    </Card>
  );
}
