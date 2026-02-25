import React from 'react';
import { cn } from '@/utils/cn';
import { Wifi, Copy } from 'lucide-react';

interface WalletCardProps {
  balance: number;
  currency?: string;
  className?: string;
  onAddMoney?: () => void;
}

export function WalletCard({ 
  balance, 
  currency = 'USD', 
  className,
}: WalletCardProps) {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(balance);

  return (
    <div className={cn("relative overflow-hidden rounded-3xl text-white shadow-soft-lg group", className)}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-primary/80 dark:from-accent-primary dark:to-navy z-0" />
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[220px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold tracking-tight">{formattedBalance}</h2>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
            <Wifi className="w-6 h-6 text-white/90" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 p-2 px-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
                <span className="text-white/90 font-mono tracking-widest text-sm">**** **** **** 4289</span>
                <button className="text-white/60 hover:text-white transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
             </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
               <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Card Holder</p>
               <p className="font-medium tracking-wide">ANSHU</p>
            </div>
            <div className="flex flex-col items-end">
               <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Expires</p>
               <p className="font-medium tracking-wide">12/28</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
