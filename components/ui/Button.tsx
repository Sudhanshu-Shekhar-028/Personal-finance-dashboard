import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 dark:shadow-primary/10 hover:shadow-primary/40 focus:ring-primary border border-transparent',
      secondary: 'bg-background-surface dark:bg-background-elevated border border-gray-200 dark:border-gray-700 text-text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 focus:ring-gray-200',
      danger: 'bg-accent-danger text-white hover:bg-red-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500 border border-transparent',
      ghost: 'bg-transparent text-text-secondary hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:ring-primary',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-5 py-2.5',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
