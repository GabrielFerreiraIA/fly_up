'use client'

import { MessageCircle, Phone, ChevronRight } from 'lucide-react'
import { TemperatureBadge } from './temperature-badge'
import { TagBadge } from './tag-badge'
import { formatRelativeDate, formatCurrency } from '@/lib/utils/date'
import { phoneToWhatsApp } from '@/lib/utils/phone'
import { cn } from '@/lib/utils/cn'
import type { Lead } from '@/lib/types'

interface LeadCardProps {
  lead: Lead
  onExpand: (lead: Lead) => void
  isDragging?: boolean
}

export function LeadCard({ lead, onExpand, isDragging }: LeadCardProps) {
  return (
    <div
      className={cn(
        'bg-sky-800 rounded-lg p-3 cursor-pointer border border-sky-700',
        'hover:bg-sky-700 hover:border-sky-500 transition-all duration-150',
        'shadow-sm group animate-fade-in',
        isDragging && 'opacity-50 rotate-2 scale-105 shadow-xl'
      )}
      onClick={() => onExpand(lead)}
    >
      {/* Header: temperatura + experiência */}
      <div className="flex items-center justify-between mb-2">
        <TemperatureBadge temperatura={lead.temperatura} showLabel />
        <ChevronRight
          size={14}
          className="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Nome */}
      <h3 className="font-semibold text-neutral-100 text-sm leading-tight truncate">
        {lead.nome}
      </h3>

      {/* Experiência */}
      {lead.experience && (
        <p className="text-xs text-sky-300 mt-0.5 truncate">
          🪂 {lead.experience.nome}
        </p>
      )}

      {/* Valor + Data */}
      <div className="flex items-center justify-between mt-2 text-xs text-sky-400">
        {lead.valor_estimado && (
          <span className="text-green-400 font-medium">
            {formatCurrency(lead.valor_estimado)}
          </span>
        )}
        <span className="ml-auto">{formatRelativeDate(lead.created_at)}</span>
      </div>

      {/* Fonte */}
      {lead.fonte_label && (
        <p className="text-xs text-sky-500 mt-1 truncate">
          🔗 {lead.fonte_label}
        </p>
      )}

      {/* Tags */}
      {lead.tags && lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {lead.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
          {lead.tags.length > 3 && (
            <span className="text-xs text-sky-500">+{lead.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Ações rápidas */}
      <div className="flex gap-2 mt-3 pt-2 border-t border-sky-700/50">
        <a
          href={phoneToWhatsApp(lead.telefone)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
        >
          <MessageCircle size={12} />
          WhatsApp
        </a>
        <a
          href={`tel:${lead.telefone_normalizado}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors"
        >
          <Phone size={12} />
          Ligar
        </a>
      </div>
    </div>
  )
}
