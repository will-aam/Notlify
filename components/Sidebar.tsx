'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Upload,
  PenSquare,
  Package,
  Users,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/upload', icon: Upload, label: 'Upload PDF' },
  { href: '/manual', icon: PenSquare, label: 'Entrada Manual' },
  { href: '/items', icon: Package, label: 'Itens' },
  { href: '/suppliers', icon: Users, label: 'Fornecedores' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Notlify
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu de navegação */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => onClose()}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-colors duration-200
                        ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Rodapé */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Notlify v1.0.0
              <br />
              Parte do sistema Stock
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
