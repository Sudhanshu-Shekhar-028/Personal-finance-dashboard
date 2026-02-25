"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { CardItem } from '@/components/features/CardItem';
import { WalletModal } from '@/components/features/WalletModal';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, CreditCard } from 'lucide-react';

export default function WalletPage() {
  const { cards, deleteCard } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e6e9ef]">My Wallet</h1>
          <p className="text-sm text-gray-500 dark:text-[#aab1c0]">Manage your cards and accounts</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map(card => (
                <CardItem 
                    key={card.id} 
                    card={card} 
                    onDelete={deleteCard}
                />
            ))}
             {/* Add Card Placeholder */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 aspect-[1.586/1] text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all font-medium"
            >
                <Plus className="w-8 h-8 mb-2" />
                Add New Card
            </button>
        </div>
      ) : (
         <EmptyState 
            title="No cards added" 
            description="Add your first card to start tracking balances."
            action={
                <Button onClick={() => setIsModalOpen(true)} className="mt-4">
                    Add Card
                </Button>
            }
            icon={CreditCard}
         />
      )}

      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
