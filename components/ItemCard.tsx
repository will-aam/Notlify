import React from 'react';

interface ItemCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function ItemCard({
  title,
  value,
  icon,
  trend,
  className = '',
}: ItemCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow p-6
        border border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p
              className={`
                mt-2 text-sm font-medium
                ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
              `}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            <div className="p-3 bg-primary/10 rounded-full">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
