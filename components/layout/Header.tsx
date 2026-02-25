import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, LogOut, Settings, User, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/Button';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-background-surface/80 backdrop-blur-md px-4 lg:px-6 shadow-soft transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden -ml-2"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6 text-text-secondary" />
        </Button>
        <span className="text-xl font-semibold text-text-primary lg:hidden">My Finances</span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {mounted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-text-secondary hover:text-accent-primary transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        )}
        
        <Button variant="ghost" size="sm" className="text-text-secondary hover:text-accent-primary hidden sm:flex">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-text-secondary hover:text-accent-primary relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-danger ring-2 ring-background-surface" />
        </Button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium border border-blue-200 hover:ring-2 hover:ring-offset-2 hover:ring-primary/20 transition-all focus:outline-none"
          >
            A
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200">
               <div className="px-4 py-2 border-b border-gray-50">
                 <p className="text-sm font-medium text-gray-900">Anshu</p>
                 <p className="text-xs text-gray-500">anshu@example.com</p>
               </div>
               
               <div className="p-1">
                 <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                   <User className="h-4 w-4" />
                   Profile
                 </button>
                 <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                   <Settings className="h-4 w-4" />
                   Settings
                 </button>
               </div>
               
               <div className="border-t border-gray-50 p-1">
                 <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                   <LogOut className="h-4 w-4" />
                   Logout
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
