"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { GoalItem } from '@/components/features/GoalItem';
import { GoalModal } from '@/components/features/GoalModal';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, Target } from 'lucide-react';
import { Goal } from '@/types';

export default function GoalsPage() {
  const { goals, deleteGoal } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };
  
  // Adding delete functionality via context menu or button in edit modal would be better, 
  // but for MVP let's perhaps add a delete button in the modal or just list view.
  // The GoalItem doesn't have actions. I'll stick to edit for now.
  // Requirement says "Visual progress indicators".

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e6e9ef]">Savings Goals</h1>
          <p className="text-sm text-gray-500 dark:text-[#aab1c0]">Track and achieve your financial targets</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
                <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onClick={() => handleEdit(goal)} 
                    onDelete={deleteGoal}
                />
            ))}
             <button 
                onClick={handleAdd}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 aspect-[1.5/1] text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all font-medium"
            >
                <Plus className="w-8 h-8 mb-2" />
                Create New Goal
            </button>
        </div>
      ) : (
         <EmptyState 
            title="No goals set" 
            description="Set a financial goal to track your progress"
            action={
                <Button onClick={handleAdd} className="mt-4">
                    Create Goal
                </Button>
            }
            icon={Target}
         />
      )}

      <GoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        goal={editingGoal}
      />
    </div>
  );
}
