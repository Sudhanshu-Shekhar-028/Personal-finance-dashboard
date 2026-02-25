"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Goal } from '@/types';
import { useFinance } from '@/context/FinanceContext';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal | null;
}

export function GoalModal({ isOpen, onClose, goal }: GoalModalProps) {
  const { addGoal, updateGoal } = useFinance();
  
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(goal.targetAmount.toString());
      setCurrentAmount(goal.currentAmount.toString());
      setDeadline(goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : '');
    } else {
      setName('');
      setTargetAmount('');
      setCurrentAmount('0');
      setDeadline('');
    }
  }, [goal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newGoal: Goal = {
      id: goal?.id || crypto.randomUUID(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      color: '#2E3A8C', // Default color for MVP
    };

    if (goal) {
      updateGoal(newGoal);
    } else {
      addGoal(newGoal);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={goal ? 'Edit Goal' : 'Create New Goal'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. New Laptop"
        />

        <Input
          label="Target Amount"
          type="number"
          step="0.01"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
          placeholder="0.00"
        />

        <Input
          label="Current Saved Amount"
          type="number"
          step="0.01"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          required
          placeholder="0.00"
        />

        <Input
          label="Deadline (Optional)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="pt-4 flex gap-3 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
             {goal ? 'Save Changes' : 'Create Goal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
