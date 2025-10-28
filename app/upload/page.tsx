'use client';

import React, { useState } from 'react';
import { Loader2, Save, FileText } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import DataTable from '@/components/DataTable';
import Toast, { ToastType } from '@/components/Toast';

interface ExtractedItem {
  id: string;
  nome: string;
  quantidade: number;
  custoUnitario: number;
  valorTotal: number;
}

interface ExtractedData {
  fornecedor: string;
  data: string;
  numeroNF: string;
  itens: ExtractedItem[];
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    type: ToastType;
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
  };

  const handleProcessPDF = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      setTimeout(() => {
        setExtractedData(data);
        setProcessing(false);
        setToast({
          show: true,
          type: 'success',
          message: 'PDF processado com sucesso!',
        });
      }, 2000);
    } catch (error) {
      setProcessing(false);
      setToast({
        show: true,
        type: 'error',
        message: 'Erro ao processar PDF. Tente novamente.',
      });
    }
  };

  const handleSave = () => {
    setToast({
      show: true,
      type: 'success',
      message: 'Dados salvos com sucesso! (mock)',
    });
  };

  const columns = [
    {
      key: 'nome',
      label: 'Item',
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      key: 'quantidade',
      label: 'Quantidade',
      render: (value: number) => <span>{value}</span>,
    },
    {
      key: 'custoUnitario',
      label: 'Custo Unitário',
      render: (value: number) => <span>R$ {value.toFixed(2)}</span>,
    },
    {
      key: 'valorTotal',
      label: 'Valor Total',
      render: (value: number) => (
        <span className="font-semibold">R$ {value.toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Upload de Documentos
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Envie NF-e ou espelho de lançamento para extração automática de dados
        </p>
      </div>

      {/* Zona de upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Selecione o Arquivo
        </h3>
        <UploadZone onFileSelect={handleFileSelect} />
      </div>

      {/* Preview do arquivo */}
      {selectedFile && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preview do Documento
          </h3>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <FileText className="h-12 w-12 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
              </p>
            </div>
          </div>
          
          <button
            onClick={handleProcessPDF}
            disabled={processing}
            className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processando PDF...</span>
              </>
            ) : (
              <span className="font-medium">Processar PDF</span>
            )}
          </button>
        </div>
      )}

      {/* Dados extraídos */}
      {extractedData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dados Extraídos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {extractedData.fornecedor}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Data</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {extractedData.data}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Número NF</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {extractedData.numeroNF}
              </p>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={extractedData.itens}
            keyExtractor={(row) => row.id}
          />

          <button
            onClick={handleSave}
            className="mt-4 flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">Salvar Dados</span>
          </button>
        </div>
      )}

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
