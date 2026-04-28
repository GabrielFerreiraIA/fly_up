'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LeadCard } from './lead-card'
import { cn } from '@/lib/utils/cn'
import type { Lead, LeadStatus } from '@/lib/types'

interface SortableLeadCardProps {
  lead: Lead
  onExpand: (lead: Lead) => void
}

function SortableLeadCard({ lead, onExpand }: SortableLeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="crm-fade-in opacity-0">
      <LeadCard lead={lead} onExpand={onExpand} isDragging={isDragging} />
    </div>
  )
}

interface KanbanColumnProps {
  status: LeadStatus
  label: string
  emoji: string
  leads: Lead[]
  onExpand: (lead: Lead) => void
}

export function KanbanColumn({ status, label, emoji, leads, onExpand }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  const totalValue = leads.reduce((sum, l) => sum + (l.valor_estimado ?? 0), 0)

  return (
    <div className="flex flex-col min-w-[260px] w-[260px]">
      {/* Header da coluna */}
      <div className="flex items-center justify-between px-3 py-2 mb-3">
        <div className="flex items-center gap-2 group">
          <span className="group-hover:scale-110 transition-transform">{emoji}</span>
          <span className="font-black text-sm text-white uppercase tracking-wider">{label}</span>
          <span className="bg-white/10 border border-white/20 text-neon text-[10px] rounded-full px-2 py-0.5 font-bold shadow-[0_0_10px_rgba(57,255,20,0.1)]">
            {leads.length}
          </span>
        </div>
        {totalValue > 0 && (
          <span className="text-[10px] text-neon font-black italic tracking-wider bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20">
            R$ {(totalValue / 1000).toFixed(1)}k
          </span>
        )}
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 min-h-[120px] rounded-xl p-2 space-y-3 transition-all duration-300',
          'bg-surface/50 border border-transparent',
          isOver && 'bg-neon/5 border-2 border-dashed border-neon/50 shadow-[inset_0_0_20px_rgba(57,255,20,0.1)] scale-[1.02]'
        )}
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead, index) => (
            <div key={lead.id} style={{ animationDelay: `${index * 50}ms` }}>
              <SortableLeadCard lead={lead} onExpand={onExpand} />
            </div>
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div className="flex items-center justify-center h-24 text-zinc-600 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-zinc-800/50 rounded-xl m-1">
            Solte leads aqui
          </div>
        )}
      </div>
    </div>
  )
}
