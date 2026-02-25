import React from 'react';
import { cn } from '@/utils/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-background-surface dark:bg-background-surface rounded-3xl shadow-soft dark:shadow-md border border-gray-100 dark:border-gray-800 p-6 md:p-8 transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
