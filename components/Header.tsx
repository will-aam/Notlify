'use client';

import React from 'react';
import { Menu, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Menu hambúrguer (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo (mobile) */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold">Notlify</span>
        </div>

        {/* Título (desktop) */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sistema de Gestão de Custos
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          {/* Avatar do usuário */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Usuário Demo
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
