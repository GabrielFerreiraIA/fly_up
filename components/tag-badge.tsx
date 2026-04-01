'use client'

import { cn } from '@/lib/utils/cn'
import type { TagDefinition } from '@/lib/types'

interface TagBadgeProps {
  tag: TagDefinition
  onRemove?: () => void
  className?: string
}

export function TagBadge({ tag, onRemove, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        className
      )}
      style={{ backgroundColor: `${tag.cor_hex}20`, color: tag.cor_hex, border: `1px solid ${tag.cor_hex}40` }}
    >
      {tag.icone && <span>{tag.icone}</span>}
      <span>{tag.nome}</span>
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 rounded-full hover:opacity-70 transition-opacity"
          aria-label={`Remover tag ${tag.nome}`}
        >
          ×
        </button>
      )}
    </span>
  )
}
