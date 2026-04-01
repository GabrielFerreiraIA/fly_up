'use client'

import { useState, useCallback } from 'react'
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { KanbanColumn } from '@/components/kanban-column'
import { LeadCardExpanded } from '@/components/lead-card-expanded'
import { LeadCard } from '@/components/lead-card'
import { useLeadsRealtime } from '@/hooks/use-leads-realtime'
import { updateLeadStatus } from '@/lib/supabase/queries'
import { PIPELINE_COLUMNS, type Lead, type LeadStatus } from '@/lib/types'
import { getLeads } from '@/lib/supabase/queries'
import { useEffect } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLead, setExpandedLead] = useState<Lead | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  async function loadLeads() {
    setLoading(true)
    const data = await getLeads()
    setLeads(data)
    setLoading(false)
  }

  useEffect(() => { loadLeads() }, [])

  // Realtime: novo lead aparece no kanban instantaneamente
  const handleNewLead = useCallback((lead: Lead) => {
    setLeads((prev) => [lead, ...prev])
    toast.success(`🆙 Novo lead: ${lead.nome}`)
  }, [])

  const handleLeadUpdate = useCallback((updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)))
  }, [])

  useLeadsRealtime(handleNewLead, handleLeadUpdate)

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const leadId = active.id as string
    const newStatus = over.id as LeadStatus
    const lead = leads.find((l) => l.id === leadId)
    if (!lead || lead.status === newStatus) return

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    )

    try {
      await updateLeadStatus(leadId, newStatus)
    } catch {
      // reverter em caso de erro
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: lead.status } : l))
      )
      toast.error('Erro ao mover lead.')
    }
  }

  const activeLeadCard = leads.find((l) => l.id === activeId)

  const leadsPerColumn = PIPELINE_COLUMNS.reduce(
    (acc, col) => {
      acc[col.status] = leads.filter((l) => l.status === col.status)
      return acc
    },
    {} as Record<LeadStatus, Lead[]>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-sky-800">
        <div>
          <h1 className="text-xl font-bold text-neutral-100">Pipeline de Leads</h1>
          <p className="text-sky-400 text-xs mt-0.5">{leads.length} leads ativos · Arraste para mover</p>
        </div>
        <button
          onClick={loadLeads}
          className="flex items-center gap-2 text-xs text-sky-400 hover:text-neutral-100 transition-colors"
        >
          <RefreshCw size={14} />
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-accent-primary" size={32} />
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 p-6 min-w-max h-full">
            <DndContext
              sensors={sensors}
              onDragStart={(e) => setActiveId(e.active.id as string)}
              onDragEnd={handleDragEnd}
            >
              {PIPELINE_COLUMNS.map((col) => (
                <KanbanColumn
                  key={col.status}
                  status={col.status}
                  label={col.label}
                  emoji={col.emoji}
                  leads={leadsPerColumn[col.status] ?? []}
                  onExpand={setExpandedLead}
                />
              ))}

              <DragOverlay>
                {activeLeadCard && (
                  <LeadCard
                    lead={activeLeadCard}
                    onExpand={() => {}}
                    isDragging
                  />
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      )}

      {/* Modal expandido */}
      {expandedLead && (
        <LeadCardExpanded
          lead={expandedLead}
          onClose={() => setExpandedLead(null)}
          onUpdate={(updated) => {
            handleLeadUpdate(updated)
            setExpandedLead(updated)
          }}
        />
      )}
    </div>
  )
}
