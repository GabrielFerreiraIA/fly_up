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
        'bg-surface rounded-xl p-4 cursor-pointer border border-white/5',
        'hover:bg-surface-hover hover:border-neon/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300',
        'shadow-md group crm-fade-in',
        isDragging && 'opacity-50 rotate-3 scale-105 shadow-[0_0_20px_rgba(57,255,20,0.2)] border-neon'
      )}
      onClick={() => onExpand(lead)}
    >
      {/* Header: temperatura + experiência */}
      <div className="flex items-center justify-between mb-2">
        <TemperatureBadge temperatura={lead.temperatura} showLabel />
        <ChevronRight
          size={14}
          className="text-neon opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Nome */}
      <h3 className="font-black text-white text-sm leading-tight truncate uppercase tracking-wider mt-1">
        {lead.nome}
      </h3>

      {/* Experiência */}
      {lead.experience && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1 truncate">
          🪂 {lead.experience.nome}
        </p>
      )}

      {/* Valor + Data */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
        {lead.valor_estimado && (
          <span className="text-neon font-black italic">
            {formatCurrency(lead.valor_estimado)}
          </span>
        )}
        <span className="ml-auto">{formatRelativeDate(lead.created_at)}</span>
      </div>

      {/* Fonte */}
      {lead.fonte_label && (
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2 truncate">
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
            <span className="text-[10px] font-bold text-zinc-500">+{lead.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Ações rápidas */}
      <div className="flex gap-3 mt-4 pt-3 border-t border-white/5">
        <a
          href={phoneToWhatsApp(lead.telefone)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neon hover:text-white transition-colors"
        >
          <MessageCircle size={12} />
          WhatsApp
        </a>
        <a
          href={`tel:${lead.telefone_normalizado}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <Phone size={12} />
          Ligar
        </a>
      </div>
    </div>
  )
}
