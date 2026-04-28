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
        'bg-surface border border-white/10 rounded-2xl p-6 hover:border-neon/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-all duration-300 group',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-neon transition-colors">{label}</p>
          <p className="text-3xl font-black text-white mt-1 uppercase italic tracking-wider">{value}</p>
          {sublabel && <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{sublabel}</p>}
        </div>
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{emoji}</span>
      </div>
      {trend && (
        <div
          className={cn(
            'mt-3 text-xs font-medium',
            trend === 'up' && 'text-neon',
            trend === 'down' && 'text-red-500',
            trend === 'neutral' && 'text-zinc-400'
          )}
        >
          {trend === 'up' && '↑ '}
          {trend === 'down' && '↓ '}
        </div>
      )}
    </div>
  )
}
