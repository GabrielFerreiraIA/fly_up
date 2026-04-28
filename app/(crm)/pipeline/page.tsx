'use client'

import { useState, useCallback } from 'react'
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { KanbanColumn } from '@/components/crm/kanban-column'
import { LeadCardExpanded } from '@/components/crm/lead-card-expanded'
import { AddLeadModal } from '@/components/crm/add-lead-modal'
import { LeadCard } from '@/components/crm/lead-card'
import { useLeadsRealtime } from '@/hooks/use-leads-realtime'
import { updateLeadStatus } from '@/lib/supabase/queries'
import { PIPELINE_COLUMNS, type Lead, type LeadStatus } from '@/lib/types'
import { getLeads } from '@/lib/supabase/queries'
import { useEffect } from 'react'
import { Loader2, RefreshCw, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLead, setExpandedLead] = useState<Lead | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-surface/30">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-wider">Pipeline de Leads</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">{leads.length} leads ativos · Arraste para mover</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={loadLeads}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-neon transition-colors"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-neon/10 text-neon border border-neon/50 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neon hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all"
          >
            <Plus size={16} />
            Novo Lead
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 relative flex items-center justify-center animate-pulse-neon">
              <div className="absolute inset-0 rounded-full border-t-2 border-neon animate-spin"></div>
              <div className="w-8 h-8 rounded-full bg-neon opacity-20"></div>
            </div>
            <p className="text-neon font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              Carregando Dados...
            </p>
          </div>
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

      {expandedLead && (
        <LeadCardExpanded
          lead={expandedLead}
          onClose={() => setExpandedLead(null)}
          onUpdate={(updated) => {
            if (updated.deleted_at) {
              setLeads((prev) => prev.filter((l) => l.id !== updated.id))
              setExpandedLead(null)
            } else {
              handleLeadUpdate(updated)
              setExpandedLead(updated)
            }
          }}
        />
      )}

      <AddLeadModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={loadLeads}
      />
    </div>
  )
}
