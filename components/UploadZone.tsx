'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

export default function UploadZone({
  onFileSelect,
  accept = { 'application/pdf': ['.pdf'] },
  maxSize = 10485760, // 10MB
}: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors duration-200
        ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        {acceptedFiles.length > 0 ? (
          <>
            <FileText className="h-16 w-16 text-primary" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {acceptedFiles[0].name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Clique ou arraste outro arquivo para substituir
            </p>
          </>
        ) : (
          <>
            <Upload className="h-16 w-16 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {isDragActive
                  ? 'Solte o arquivo aqui'
                  : 'Arraste e solte um arquivo PDF aqui'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ou clique para selecionar
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Máximo 10MB • Apenas arquivos PDF
            </p>
          </>
        )}
      </div>
    </div>
  );
}
