import React from 'react';
import { Card } from '../ui/Card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartContainer({ title, children, action }: ChartContainerProps) {
  return (
    <Card className="flex flex-col h-full bg-background-surface dark:bg-background-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-primary tracking-tight">{title}</h3>
        {action}
      </div>
      <div className="flex-1 w-full min-h-[250px] relative">
        {children}
      </div>
    </Card>
  );
}
