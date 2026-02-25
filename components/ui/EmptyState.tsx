import React from 'react';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  title = "No data available", 
  description = "There is nothing to display here yet.", 
  icon: Icon = FolderOpen, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
