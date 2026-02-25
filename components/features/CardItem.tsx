import React from 'react';
import { Card as CardType } from '@/types';
import { cn } from '@/utils/cn';
import { CreditCard, Wifi, Trash2 } from 'lucide-react';

interface CardItemProps {
  card: CardType;
  className?: string;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export function CardItem({ card, className, onClick, onDelete }: CardItemProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer aspect-[1.586/1] group",
        className
      )}
      style={{ backgroundColor: card.color }}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-8">
        <CreditCard className="w-8 h-8 opacity-80" />
        <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 opacity-60 rotate-90" />
            {onDelete && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(card.id);
                    }}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Card"
                >
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
            )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">Current Balance</p>
          <h3 className="text-2xl font-bold tracking-tight">
            ${card.balance.toLocaleString()}
          </h3>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-white/60 mb-1">Card Holder</p>
            <p className="font-medium tracking-wide">{(card.name || 'Card Holder').toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-end">
             <p className="text-xs text-white/60 mb-1">Expires</p>
             <p className="font-medium">12/28</p>
          </div>
        </div>
        
        {card.last4Digits && (
            <div className="absolute top-6 right-6 font-mono text-lg opacity-80 tracking-widest">
                **** {card.last4Digits}
            </div>
        )}
      </div>

       {/* Decoratve circles */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
    </div>
  );
}
