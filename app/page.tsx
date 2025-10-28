'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Upload,
  PenSquare,
} from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import DataTable from '@/components/DataTable';
import ChartLine from '@/components/ChartLine';
import {
  mockItems,
  getItensComAumentoCusto,
  getItensComMarkupBaixo,
  getItensRecentes,
  getTopItensParaGrafico,
} from '@/lib/mockData';

export default function Dashboard() {
  const totalItems = mockItems.length;
  const itensComAumento = getItensComAumentoCusto();
  const itensComMarkupBaixo = getItensComMarkupBaixo();
  const itensRecentes = getItensRecentes(10);
  const chartData = getTopItensParaGrafico();

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
      key: 'custoUnitario',
      label: 'Custo Atual',
      sortable: true,
      render: (value: number) => (
        <span>R$ {value.toFixed(2)}</span>
      ),
    },
    {
      key: 'custoAnterior',
      label: 'Custo Anterior',
      sortable: true,
      render: (value: number) => (
        <span>R$ {value.toFixed(2)}</span>
      ),
    },
    {
      key: 'variacao',
      label: '% Variação',
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
      key: 'status',
      label: 'Status',
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          {row.variacao > 10 || row.markupPraticado < row.markupDesejado ? (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          ) : null}
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
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Visão geral do sistema de gestão de custos e markup
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ItemCard
          title="Total de Itens"
          value={totalItems}
          icon={<Package className="h-6 w-6 text-primary" />}
        />
        <ItemCard
          title="Aumento > 10%"
          value={itensComAumento.length}
          icon={<TrendingUp className="h-6 w-6 text-red-500" />}
        />
        <ItemCard
          title="Markup Abaixo do Desejado"
          value={itensComMarkupBaixo.length}
          icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
        />
      </div>

      {/* Botões de ação rápida */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/upload"
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Upload className="h-5 w-5" />
          <span className="font-medium">Upload de PDF</span>
        </Link>
        <Link
          href="/manual"
          className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <PenSquare className="h-5 w-5" />
          <span className="font-medium">Entrada Manual</span>
        </Link>
      </div>

      {/* Gráfico de tendência */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Variação de Custo - Top 5 Itens por Valor
        </h3>
        <div className="h-80">
          <ChartLine
            data={chartData}
            xKey="nome"
            lines={[
              { key: 'custoAtual', name: 'Custo Atual', color: '#00d4ff' },
              { key: 'custoAnterior', name: 'Custo Anterior', color: '#94a3b8' },
            ]}
          />
        </div>
      </div>

      {/* Tabela de itens recentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Itens Atualizados Recentemente
          </h3>
          <Link
            href="/items"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Ver todos →
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={itensRecentes}
          keyExtractor={(row) => row.id}
        />
      </div>
    </div>
  );
}
