'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Plus } from 'lucide-react'
import { LeadCardExpanded } from '@/components/crm/lead-card-expanded'
import { AddLeadModal } from '@/components/crm/add-lead-modal'
import { TemperatureBadge } from '@/components/crm/temperature-badge'
import { TagBadge } from '@/components/crm/tag-badge'
import { getLeads } from '@/lib/supabase/queries'
import { formatDateTime, formatCurrency } from '@/lib/utils/date'
import { formatPhone } from '@/lib/utils/phone'
import { STATUS_LABELS, STATUS_COLORS, type Lead, type LeadStatus } from '@/lib/types'
import { cn } from '@/lib/utils/cn'

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filtered, setFiltered] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'todos'>('todos')
  const [expandedLead, setExpandedLead] = useState<Lead | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchLeads = () => {
    getLeads().then((data) => {
      setLeads(data)
      setFiltered(data)
    })
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    let result = leads
    if (statusFilter !== 'todos') {
      result = result.filter((l) => l.status === statusFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (l) =>
          l.nome.toLowerCase().includes(q) ||
          l.telefone.includes(q) ||
          l.fonte_label?.toLowerCase().includes(q) ||
          l.experience?.nome.toLowerCase().includes(q)
      )
    }
    setFiltered(result)
  }, [search, statusFilter, leads])

  const statusOptions: { value: LeadStatus | 'todos'; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'novo', label: STATUS_LABELS.novo },
    { value: 'a_contactar', label: STATUS_LABELS.a_contactar },
    { value: 'qualificado', label: STATUS_LABELS.qualificado },
    { value: 'convertido', label: STATUS_LABELS.convertido },
    { value: 'perdido', label: STATUS_LABELS.perdido },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-wider uppercase">Todos os Leads</h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{filtered.length} leads encontrados</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-neon/10 text-neon border border-neon/50 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neon hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all"
        >
          <Plus size={16} />
          Novo Lead
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, fonte..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl pl-9 pr-4 py-3 text-xs font-bold uppercase tracking-wider text-white placeholder-zinc-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300',
                statusFilter === opt.value
                  ? 'bg-neon text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                  : 'bg-surface text-zinc-400 border border-white/10 hover:border-neon/50 hover:text-white'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-white/5">
              <th className="text-left px-4 py-3">Lead</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Experiência</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Fonte</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Valor</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Data</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, index) => (
              <tr
                key={lead.id}
                onClick={() => setExpandedLead(lead)}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group crm-fade-in opacity-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TemperatureBadge temperatura={lead.temperatura} />
                    <div>
                      <p className="font-black text-white uppercase tracking-wider text-xs">{lead.nome}</p>
                      <p className="text-[10px] font-bold text-zinc-500 tracking-widest mt-0.5">{formatPhone(lead.telefone)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                  {lead.experience?.nome ?? '—'}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[180px] truncate">
                  {lead.fonte_label ?? lead.fonte}
                </td>
                <td className="px-4 py-3">
                  <span className={cn('px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10', STATUS_COLORS[lead.status])}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-neon font-black italic tracking-wider">
                  {lead.valor_estimado ? formatCurrency(lead.valor_estimado) : '—'}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-zinc-600 font-bold uppercase tracking-widest text-[10px]">
                  {formatDateTime(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-zinc-500">
            <p className="text-sm font-black uppercase tracking-wider mb-1">Nenhum lead encontrado</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {expandedLead && (
        <LeadCardExpanded
          lead={expandedLead}
          onClose={() => setExpandedLead(null)}
          onUpdate={(updated) => {
            if (updated.deleted_at) {
              setLeads((prev) => prev.filter((l) => l.id !== updated.id))
              setExpandedLead(null)
            } else {
              setLeads((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)))
              setExpandedLead(updated)
            }
          }}
        />
      )}

      <AddLeadModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={fetchLeads}
      />
    </div>
  )
}
