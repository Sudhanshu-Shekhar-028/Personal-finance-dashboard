import React from 'react';
import { Goal } from '@/types';
import { Card } from '../ui/Card';
import { cn } from '@/utils/cn';
import { Target, Trophy, Trash2 } from 'lucide-react';

interface GoalItemProps {
  goal: Goal;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export function GoalItem({ goal, onClick, onDelete }: GoalItemProps) {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <Card 
      className="cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 group relative flex flex-col items-center text-center p-6 bg-background-surface dark:bg-background-elevated"
      onClick={onClick}
    >
      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(goal.id);
          }}
          className="absolute top-3 right-3 p-1.5 text-text-secondary/50 hover:text-accent-danger hover:bg-accent-danger/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
          title="Delete Goal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="mb-4 p-3 rounded-full bg-accent-primary/10 dark:bg-accent-primary/20 text-accent-primary group-hover:scale-110 transition-transform duration-300">
        <Target className="w-6 h-6" />
      </div>

      <h3 className="font-bold text-text-primary mb-1">{goal.name}</h3>
      <p className="text-xs text-text-secondary mb-4 font-medium uppercase tracking-wide">
        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
      </p>

      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden mb-3 ring-1 ring-gray-200 dark:ring-gray-700">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
            progress >= 100 ? "bg-accent-success" : "bg-accent-primary"
          )}
          style={{ width: `${progress}%` }}
        >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
         {progress >= 100 ? (
           <span className="inline-flex items-center text-xs font-bold text-accent-success bg-accent-success/10 px-2 py-1 rounded-full">
             <Trophy className="w-3 h-3 mr-1" />
             Completed
           </span>
         ) : (
           <span className="text-xs font-medium text-text-secondary">
             {progress.toFixed(0)}% Achieved
           </span>
         )}
      </div>
    </Card>
  );
}
