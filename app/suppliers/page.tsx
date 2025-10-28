'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Star, Truck, Package, Calendar, X } from 'lucide-react';
import { mockFornecedores, Fornecedor } from '@/lib/mockData';

export default function SuppliersPage() {
  const [selectedSupplier, setSelectedSupplier] = useState<Fornecedor | null>(
    null
  );
  const [favorites, setFavorites] = useState(
    mockFornecedores.filter((f) => f.favorito).map((f) => f.id)
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const sortedSuppliers = [...mockFornecedores].sort((a, b) => {
    const aFav = favorites.includes(a.id) ? 1 : 0;
    const bFav = favorites.includes(b.id) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    return b.totalComprado - a.totalComprado;
  });

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fornecedores
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Gerencie e visualize informações sobre seus fornecedores
        </p>
      </div>

      {/* Grid de fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedSupplier(supplier)}
          >
            {/* Header com nome e favorito */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {supplier.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  CNPJ: {supplier.cnpj}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(supplier.id);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                aria-label={
                  favorites.includes(supplier.id)
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'
                }
              >
                <Star
                  className={`h-5 w-5 ${
                    favorites.includes(supplier.id)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Métricas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Total Comprado</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  R$ {supplier.totalComprado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm">Tempo Médio Entrega</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {supplier.tempoMedioEntrega} dias
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Última Compra</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {format(supplier.ultimaCompra, 'dd/MM/yyyy', { locale: ptBR })}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total de Itens
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {supplier.totalItens}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalhes */}
      {selectedSupplier && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSupplier(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do modal */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedSupplier.nome}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  CNPJ: {selectedSupplier.cnpj}
                </p>
              </div>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Informações detalhadas */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Comprado
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    R$ {selectedSupplier.totalComprado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total de Itens
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {selectedSupplier.totalItens}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tempo Médio de Entrega
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                  {selectedSupplier.tempoMedioEntrega} dias úteis
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Última Compra
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                  {format(selectedSupplier.ultimaCompra, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-primary/10 p-4 rounded-lg">
                <Star
                  className={`h-6 w-6 ${
                    favorites.includes(selectedSupplier.id)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {favorites.includes(selectedSupplier.id)
                      ? 'Fornecedor Favorito'
                      : 'Marcar como Favorito'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {favorites.includes(selectedSupplier.id)
                      ? 'Este fornecedor está marcado como favorito'
                      : 'Adicione aos favoritos para acesso rápido'}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(selectedSupplier.id)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {favorites.includes(selectedSupplier.id) ? 'Remover' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
