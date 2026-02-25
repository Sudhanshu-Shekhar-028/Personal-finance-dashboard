"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Receipt, Wallet, Target } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/transactions', label: 'Transactions', icon: Receipt },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/goals', label: 'Goals', icon: Target },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-20 bg-black/50 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-sidebar-background border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b border-gray-100 dark:border-gray-800 px-6">
          <span className="text-xl font-bold text-primary dark:text-text-primary">My Finances</span>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-blue-50 dark:bg-[#2A3240] text-primary dark:text-text-primary shadow-sm" 
                    : "text-gray-600 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-text-primary"
                )}
                onClick={onClose} // Close sidebar on mobile when link clicked
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-primary dark:text-text-primary" : "text-gray-400 dark:text-text-muted")} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
