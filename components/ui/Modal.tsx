"use client";

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      <div className={cn(
        "relative w-full max-w-lg transform rounded-xl bg-white p-6 shadow-xl transition-all",
        className
      )}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
