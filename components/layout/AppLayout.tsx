"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FinanceProvider } from '@/context/FinanceContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FinanceProvider>
      <div className="flex min-h-screen justify-center lg:p-6 bg-background-primary transition-colors duration-300 dark:bg-[#0F1115] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-[#12151b] dark:to-[#0f1115]">
        <div className="flex w-full bg-background-elevated lg:rounded-3xl lg:shadow-soft-lg overflow-hidden min-h-screen lg:min-h-[calc(100vh-3rem)] border-0 lg:border border-white/50 dark:border-white/5 relative shadow-soft">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col min-w-0 bg-background-surface/50 dark:bg-background-surface/20">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
              <div className="flex-1 min-w-0 p-8 space-y-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
}
