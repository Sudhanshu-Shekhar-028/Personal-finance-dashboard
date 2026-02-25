import React from 'react';
import { cn } from '@/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border-0 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner-light appearance-none', 
            error && 'ring-accent-danger focus:ring-accent-danger',
            className
          )}
          {...props}
        >
            <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
         {/* Simple custom arrow could be added here if needed, but keeping it simple for now */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
