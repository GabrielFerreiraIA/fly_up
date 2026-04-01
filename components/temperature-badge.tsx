'use client'

import { TEMPERATURA_CONFIG, type LeadTemperatura } from '@/lib/types'
import { cn } from '@/lib/utils/cn'

interface TemperatureBadgeProps {
  temperatura: LeadTemperatura
  showLabel?: boolean
  className?: string
}

export function TemperatureBadge({
  temperatura,
  showLabel = false,
  className,
}: TemperatureBadgeProps) {
  const config = TEMPERATURA_CONFIG[temperatura]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        className
      )}
      style={{ backgroundColor: `${config.color}20`, color: config.color }}
    >
      {config.emoji}
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}
