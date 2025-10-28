'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import Toast, { ToastType } from '@/components/Toast';

interface ManualItem {
  id: string;
  nome: string;
  fornecedor: string;
  quantidade: number;
  custoUnitario: number;
  precoVenda: number;
  markupDesejado: number;
  markupPraticado: number;
}

export default function ManualPage() {
  const [items, setItems] = useState<ManualItem[]>([
    {
      id: '1',
      nome: '',
      fornecedor: '',
      quantidade: 0,
      custoUnitario: 0,
      precoVenda: 0,
      markupDesejado: 30,
      markupPraticado: 0,
    },
  ]);
  
  const [toast, setToast] = useState<{
    show: boolean;
    type: ToastType;
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const calcularMarkup = (custoUnitario: number, precoVenda: number): number => {
    if (custoUnitario === 0) return 0;
    return ((precoVenda - custoUnitario) / custoUnitario) * 100;
  };

  const handleItemChange = (
    id: string,
    field: keyof ManualItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value };

        if (field === 'custoUnitario' || field === 'precoVenda') {
          updated.markupPraticado = calcularMarkup(
            Number(updated.custoUnitario),
            Number(updated.precoVenda)
          );
        }

        return updated;
      })
    );
  };

  const addItem = () => {
    const newItem: ManualItem = {
      id: Date.now().toString(),
      nome: '',
      fornecedor: '',
      quantidade: 0,
      custoUnitario: 0,
      precoVenda: 0,
      markupDesejado: 30,
      markupPraticado: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasEmptyFields = items.some(
      (item) => !item.nome || !item.fornecedor || item.quantidade === 0
    );

    if (hasEmptyFields) {
      setToast({
        show: true,
        type: 'error',
        message: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    setToast({
      show: true,
      type: 'success',
      message: `${items.length} item(ns) salvo(s) com sucesso! (mock)`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Entrada Manual de Itens
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Adicione itens manualmente e calcule o markup automaticamente
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabela de itens */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Nome do Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Fornecedor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Qtd
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Custo Unit.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Preço Venda
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Markup Desejado (%)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Markup Praticado (%)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.nome}
                      onChange={(e) =>
                        handleItemChange(item.id, 'nome', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: Parafuso M8"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.fornecedor}
                      onChange={(e) =>
                        handleItemChange(item.id, 'fornecedor', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nome do fornecedor"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.quantidade || ''}
                      onChange={(e) =>
                        handleItemChange(item.id, 'quantidade', Number(e.target.value))
                      }
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      value={item.custoUnitario || ''}
                      onChange={(e) =>
                        handleItemChange(item.id, 'custoUnitario', Number(e.target.value))
                      }
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      placeholder="0.00"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      value={item.precoVenda || ''}
                      onChange={(e) =>
                        handleItemChange(item.id, 'precoVenda', Number(e.target.value))
                      }
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      placeholder="0.00"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      value={item.markupDesejado || ''}
                      onChange={(e) =>
                        handleItemChange(item.id, 'markupDesejado', Number(e.target.value))
                      }
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      placeholder="30"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`px-3 py-2 rounded-md text-center font-semibold ${
                        item.markupPraticado < item.markupDesejado
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      }`}
                    >
                      {item.markupPraticado.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={addItem}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Adicionar Item</span>
          </button>

          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">Salvar Todos os Itens</span>
          </button>
        </div>
      </form>

      {/* Toast */}
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}
