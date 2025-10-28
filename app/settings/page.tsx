'use client';

import React, { useState } from 'react';
import { Save, Bell, Percent } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Toast, { ToastType } from '@/components/Toast';

export default function SettingsPage() {
  const [defaultMarkup, setDefaultMarkup] = useState(30);
  const [notifications, setNotifications] = useState({
    emailCostIncrease: true,
    emailLowMarkup: true,
    emailNewDocument: false,
    pushCostIncrease: true,
    pushLowMarkup: false,
  });
  
  const [toast, setToast] = useState<{
    show: boolean;
    type: ToastType;
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({
      show: true,
      type: 'success',
      message: 'Configurações salvas com sucesso! (mock)',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configurações
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Personalize as preferências do sistema
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Aparência */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aparência
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Tema do Sistema
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Alterne entre tema claro e escuro
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Configurações de Negócio */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Percent className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configurações de Negócio
            </h3>
          </div>
          
          <div>
            <label
              htmlFor="defaultMarkup"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Markup Padrão (%)
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="defaultMarkup"
                type="number"
                step="0.1"
                min="0"
                max="1000"
                value={defaultMarkup}
                onChange={(e) => setDefaultMarkup(Number(e.target.value))}
                className="w-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Este valor será usado como padrão para novos itens
              </span>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preferências de Notificação
            </h3>
          </div>

          <div className="space-y-4">
            {/* Notificações por Email */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Notificações por Email
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Aumento de Custo
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba email quando um item tiver aumento de custo maior que 10%
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailCostIncrease}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailCostIncrease: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Markup Baixo
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba email quando um item tiver markup abaixo do desejado
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailLowMarkup}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailLowMarkup: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Novos Documentos
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba email quando um novo documento for processado
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNewDocument}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailNewDocument: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {/* Notificações Push */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Notificações Push (no navegador)
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Aumento de Custo
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba notificação no navegador para aumentos de custo
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushCostIncrease}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        pushCostIncrease: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Markup Baixo
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba notificação no navegador para markup abaixo do desejado
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushLowMarkup}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        pushLowMarkup: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">Salvar Configurações</span>
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
