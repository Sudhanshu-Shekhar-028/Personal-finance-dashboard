"use client";

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '@/types';
import { useFinance } from '@/context/FinanceContext';
import { cn } from '@/utils/cn';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  '#2E3A8C', // Primary
  '#4A5FD9', // Secondary
  '#1A2254', // Navy
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#DB2777', // Pink
  '#EA580C', // Orange
  '#111827', // Gray 900
];

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { addCard } = useFinance();
  
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [last4Digits, setLast4Digits] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newCard: Card = {
      id: crypto.randomUUID(),
      name,
      balance: parseFloat(balance),
      currency: 'USD',
      color,
      last4Digits: last4Digits || undefined,
    };

    addCard(newCard);
    
    // Reset form
    setName('');
    setBalance('');
    setLast4Digits('');
    setColor(COLORS[0]);
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Card"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Card Name / Bank"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Chase Sapphire"
        />

        <Input
          label="Initial Balance"
          type="number"
          step="0.01"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
          placeholder="0.00"
        />

        <Input
          label="Last 4 Digits (Optional)"
          value={last4Digits}
          onChange={(e) => {
             if (e.target.value.length <= 4) {
                 setLast4Digits(e.target.value);
             }
          }}
          type="text"
          maxLength={4}
          pattern="\d{4}"
          placeholder="1234"
        />

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
           <div className="flex gap-2 flex-wrap">
               {COLORS.map((c) => (
                   <button
                       key={c}
                       type="button"
                       className={cn(
                           "w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                           color === c ? "ring-2 ring-offset-2 ring-gray-900 scale-110" : ""
                       )}
                       style={{ backgroundColor: c }}
                       onClick={() => setColor(c)}
                   />
               ))}
           </div>
        </div>

        <div className="pt-4 flex gap-3 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Add Card
          </Button>
        </div>
      </form>
    </Modal>
  );
}
