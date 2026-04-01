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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
      <div className="flex items-center justify-between px-3 py-2 mb-2">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="font-semibold text-sm text-neutral-100">{label}</span>
          <span className="bg-sky-700 text-sky-300 text-xs rounded-full px-2 py-0.5">
            {leads.length}
          </span>
        </div>
        {totalValue > 0 && (
          <span className="text-xs text-green-400 font-medium">
            R$ {(totalValue / 1000).toFixed(1)}k
          </span>
        )}
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 min-h-[120px] rounded-xl p-2 space-y-2 transition-colors duration-150',
          'bg-sky-900/50',
          isOver && 'bg-accent-primary/10 border-2 border-dashed border-accent-primary/50'
        )}
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onExpand={onExpand} />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div className="flex items-center justify-center h-24 text-sky-600 text-xs">
            Solte leads aqui
          </div>
        )}
      </div>
    </div>
  )
}
