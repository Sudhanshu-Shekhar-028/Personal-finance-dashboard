import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner-light',
            error && 'ring-accent-danger focus:ring-accent-danger',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
