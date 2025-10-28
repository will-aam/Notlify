'use client';

import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { mockItems, exportToCSV } from '@/lib/mockData';

const ITEMS_PER_PAGE = 10;

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const suppliers = Array.from(
    new Set(mockItems.map((item) => item.fornecedor))
  ).sort();

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSearch =
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSupplier =
        !selectedSupplier || item.fornecedor === selectedSupplier;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      return matchesSearch && matchesSupplier && matchesStatus;
    });
  }, [searchTerm, selectedSupplier, selectedStatus]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    exportToCSV(filteredItems, 'itens_notlify.csv');
  };

  const columns = [
    {
      key: 'nome',
      label: 'Item',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      key: 'fornecedor',
      label: 'Fornecedor',
      sortable: true,
    },
    {
      key: 'quantidade',
      label: 'Qtd',
      sortable: true,
    },
    {
      key: 'custoUnitario',
      label: 'Custo Atual',
      sortable: true,
      render: (value: number) => <span>R$ {value.toFixed(2)}</span>,
    },
    {
      key: 'custoAnterior',
      label: 'Custo Anterior',
      sortable: true,
      render: (value: number) => <span>R$ {value.toFixed(2)}</span>,
    },
    {
      key: 'variacao',
      label: 'Variação %',
      sortable: true,
      render: (value: number) => (
        <span
          className={
            value > 10
              ? 'text-red-600 dark:text-red-400 font-semibold'
              : value < 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-600 dark:text-gray-400'
          }
        >
          {value > 0 ? '+' : ''}
          {value.toFixed(2)}%
        </span>
      ),
    },
    {
      key: 'markupPraticado',
      label: 'Markup %',
      sortable: true,
      render: (value: number, row: any) => (
        <span
          className={
            value < row.markupDesejado
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-gray-600 dark:text-gray-400'
          }
        >
          {value.toFixed(2)}%
        </span>
      ),
    },
    {
      key: 'valorTotal',
      label: 'Valor Total',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold">R$ {value.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${
              value === 'critico'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                : value === 'alerta'
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            }
          `}
        >
          {value === 'critico' ? 'Crítico' : value === 'alerta' ? 'Alerta' : 'Normal'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Lista Completa de Itens
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Gerencie e visualize todos os itens cadastrados
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar por nome ou fornecedor..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro de fornecedor */}
          <div>
            <label
              htmlFor="supplier"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Fornecedor
            </label>
            <select
              id="supplier"
              value={selectedSupplier}
              onChange={(e) => {
                setSelectedSupplier(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Todos</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="normal">Normal</option>
              <option value="alerta">Alerta</option>
              <option value="critico">Crítico</option>
            </select>
          </div>
        </div>

        {/* Ações */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{filteredItems.length}</span> item(ns)
            encontrado(s)
          </p>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="font-medium">Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <DataTable
          columns={columns}
          data={paginatedItems}
          keyExtractor={(row) => row.id}
        />

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Próxima página"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
