'use client'

import { cn } from '@/lib/utils/cn'

interface DashboardMetricProps {
  label: string
  value: string | number
  emoji: string
  sublabel?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function DashboardMetric({
  label,
  value,
  emoji,
  sublabel,
  trend,
  className,
}: DashboardMetricProps) {
  return (
    <div
      className={cn(
        'bg-sky-800 border border-sky-700 rounded-xl p-5 hover:border-sky-500 transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-sky-400 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-neutral-100 mt-1">{value}</p>
          {sublabel && <p className="text-xs text-sky-500 mt-1">{sublabel}</p>}
        </div>
        <span className="text-2xl">{emoji}</span>
      </div>
      {trend && (
        <div
          className={cn(
            'mt-3 text-xs font-medium',
            trend === 'up' && 'text-green-400',
            trend === 'down' && 'text-red-400',
            trend === 'neutral' && 'text-sky-400'
          )}
        >
          {trend === 'up' && '↑ '}
          {trend === 'down' && '↓ '}
        </div>
      )}
    </div>
  )
}
