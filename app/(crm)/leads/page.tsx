'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import { LeadCardExpanded } from '@/components/lead-card-expanded'
import { TemperatureBadge } from '@/components/temperature-badge'
import { TagBadge } from '@/components/tag-badge'
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

  useEffect(() => {
    getLeads().then((data) => {
      setLeads(data)
      setFiltered(data)
    })
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
      <div>
        <h1 className="text-2xl font-bold text-neutral-100">Todos os Leads</h1>
        <p className="text-sky-400 text-sm mt-1">{filtered.length} leads encontrados</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, fonte..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-sky-800 border border-sky-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-100 placeholder-sky-500 focus:outline-none focus:border-accent-primary"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                'px-3 py-2 rounded-lg text-xs font-medium transition-all',
                statusFilter === opt.value
                  ? 'bg-accent-primary text-sky-900'
                  : 'bg-sky-800 text-sky-400 border border-sky-700 hover:bg-sky-700'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-sky-800 border border-sky-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sky-700 text-xs text-sky-400 uppercase tracking-wider">
              <th className="text-left px-4 py-3">Lead</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Experiência</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Fonte</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Valor</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Data</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setExpandedLead(lead)}
                className="border-b border-sky-700/50 hover:bg-sky-700/30 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TemperatureBadge temperatura={lead.temperatura} />
                    <div>
                      <p className="font-medium text-neutral-100">{lead.nome}</p>
                      <p className="text-xs text-sky-400">{formatPhone(lead.telefone)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-sky-300">
                  {lead.experience?.nome ?? '—'}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-sky-400 text-xs max-w-[180px] truncate">
                  {lead.fonte_label ?? lead.fonte}
                </td>
                <td className="px-4 py-3">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', STATUS_COLORS[lead.status])}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-green-400 font-medium">
                  {lead.valor_estimado ? formatCurrency(lead.valor_estimado) : '—'}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-sky-500 text-xs">
                  {formatDateTime(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sky-500">
            <p className="text-lg mb-1">Nenhum lead encontrado</p>
            <p className="text-xs">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {expandedLead && (
        <LeadCardExpanded
          lead={expandedLead}
          onClose={() => setExpandedLead(null)}
          onUpdate={(updated) => {
            setLeads((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)))
            setExpandedLead(updated)
          }}
        />
      )}
    </div>
  )
}
