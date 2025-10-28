'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartLineProps {
  data: any[];
  xKey: string;
  lines: {
    key: string;
    name: string;
    color: string;
  }[];
}

export default function ChartLine({ data, xKey, lines }: ChartLineProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
        <XAxis
          dataKey={xKey}
          className="text-xs"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis className="text-xs" tick={{ fill: 'currentColor' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            borderRadius: '0.5rem',
          }}
        />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
