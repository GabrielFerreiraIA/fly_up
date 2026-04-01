'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Phone, Clock, ChevronDown } from 'lucide-react'
import { TemperatureBadge } from './temperature-badge'
import { TagBadge } from './tag-badge'
import { formatDateTime, formatCurrency } from '@/lib/utils/date'
import { formatPhone, phoneToWhatsApp } from '@/lib/utils/phone'
import {
  updateLeadStatus,
  updateLeadNotes,
  assignLeadTag,
  removeLeadTag,
  getLeadHistory,
  getLeadNotifications,
  getTagDefinitions,
} from '@/lib/supabase/queries'
import {
  PIPELINE_COLUMNS,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
  type TagDefinition,
  type StatusHistory,
  type NotificationLog,
} from '@/lib/types'

interface LeadCardExpandedProps {
  lead: Lead
  onClose: () => void
  onUpdate: (lead: Lead) => void
}

export function LeadCardExpanded({ lead, onClose, onUpdate }: LeadCardExpandedProps) {
  const [notas, setNotas] = useState(lead.notas ?? '')
  const [history, setHistory] = useState<StatusHistory[]>([])
  const [notifications, setNotifications] = useState<NotificationLog[]>([])
  const [allTags, setAllTags] = useState<TagDefinition[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getLeadHistory(lead.id).then(setHistory)
    getLeadNotifications(lead.id).then(setNotifications)
    getTagDefinitions().then(setAllTags)
  }, [lead.id])

  async function handleStatusChange(status: LeadStatus) {
    await updateLeadStatus(lead.id, status)
    onUpdate({ ...lead, status })
  }

  async function handleSaveNotes() {
    setSaving(true)
    await updateLeadNotes(lead.id, notas)
    setSaving(false)
    onUpdate({ ...lead, notas })
  }

  async function handleAddTag(tagId: string) {
    await assignLeadTag(lead.id, tagId)
    const tag = allTags.find((t) => t.id === tagId)
    if (tag) onUpdate({ ...lead, tags: [...(lead.tags ?? []), tag] })
  }

  async function handleRemoveTag(tagId: string) {
    await removeLeadTag(lead.id, tagId)
    onUpdate({ ...lead, tags: (lead.tags ?? []).filter((t) => t.id !== tagId) })
  }

  const availableTags = allTags.filter(
    (t) => !(lead.tags ?? []).some((lt) => lt.id === t.id)
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-sky-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-sky-700">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-sky-700">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TemperatureBadge temperatura={lead.temperatura} showLabel />
              {lead.experience && (
                <span className="text-xs text-sky-400 bg-sky-800 px-2 py-0.5 rounded-full">
                  🪂 {lead.experience.nome}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-neutral-100">{lead.nome}</h2>
            <p className="text-sm text-sky-400 mt-0.5">
              📅 {formatDateTime(lead.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-sky-500 hover:text-neutral-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contato */}
          <section>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Contato
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={phoneToWhatsApp(lead.telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg px-4 py-2 text-sm hover:bg-green-500/20 transition-colors"
              >
                <MessageCircle size={16} />
                {formatPhone(lead.telefone)}
              </a>
              <a
                href={`tel:${lead.telefone_normalizado}`}
                className="flex items-center gap-2 bg-sky-700/50 text-sky-300 border border-sky-600 rounded-lg px-4 py-2 text-sm hover:bg-sky-700 transition-colors"
              >
                <Phone size={16} />
                Ligar
              </a>
            </div>
            {lead.email && (
              <p className="text-sm text-sky-400 mt-2">📧 {lead.email}</p>
            )}
          </section>

          {/* Informações do Lead */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-sky-800 rounded-lg p-3">
              <p className="text-xs text-sky-400 mb-1">Fonte de Captação</p>
              <p className="text-sm text-neutral-100 font-medium">
                🔗 {lead.fonte_label ?? lead.fonte}
              </p>
            </div>
            {lead.valor_estimado && (
              <div className="bg-sky-800 rounded-lg p-3">
                <p className="text-xs text-sky-400 mb-1">Valor Estimado</p>
                <p className="text-sm text-green-400 font-bold">
                  {formatCurrency(lead.valor_estimado)}
                </p>
              </div>
            )}
          </section>

          {/* Pipeline Status */}
          <section>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Mover no Pipeline
            </h3>
            <div className="flex flex-wrap gap-2">
              {PIPELINE_COLUMNS.map((col) => (
                <button
                  key={col.status}
                  onClick={() => handleStatusChange(col.status)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    lead.status === col.status
                      ? 'bg-accent-primary text-sky-900 font-bold'
                      : 'bg-sky-800 text-sky-300 hover:bg-sky-700 border border-sky-600'
                  }`}
                >
                  {col.emoji} {col.label}
                </button>
              ))}
            </div>
          </section>

          {/* Etiquetas */}
          <section>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {(lead.tags ?? []).map((tag) => (
                <TagBadge key={tag.id} tag={tag} onRemove={() => handleRemoveTag(tag.id)} />
              ))}
            </div>
            {availableTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleAddTag(tag.id)}
                    className="text-xs px-2 py-1 rounded-full border border-dashed border-sky-600 text-sky-400 hover:border-sky-400 hover:text-sky-200 transition-colors"
                  >
                    + {tag.icone} {tag.nome}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Notas */}
          <section>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Notas
            </h3>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              placeholder="Adicione observações sobre este lead..."
              className="w-full bg-sky-800 border border-sky-600 rounded-lg p-3 text-sm text-neutral-100 placeholder-sky-500 focus:outline-none focus:border-accent-primary resize-none"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-2 px-4 py-1.5 bg-accent-primary text-sky-900 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving ? 'Salvando...' : 'Salvar Notas'}
            </button>
          </section>

          {/* Histórico */}
          <section>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              Histórico
            </h3>
            <div className="space-y-2">
              {/* Notificações WA */}
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-2 text-xs text-sky-400">
                  <Clock size={12} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {formatDateTime(n.created_at)} ·{' '}
                    {n.tipo === 'wa_lead' ? '💬 WA enviado ao lead' : '👥 Grupo notificado'}{' '}
                    <span
                      className={n.status === 'enviado' ? 'text-green-400' : 'text-red-400'}
                    >
                      {n.status === 'enviado' ? '✓' : '✗'}
                    </span>
                  </span>
                </div>
              ))}
              {/* Status history */}
              {history.map((h) => (
                <div key={h.id} className="flex items-start gap-2 text-xs text-sky-400">
                  <Clock size={12} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {formatDateTime(h.created_at)} · Movido:{' '}
                    {h.status_anterior ? STATUS_LABELS[h.status_anterior] : 'Novo'} →{' '}
                    {STATUS_LABELS[h.status_novo]}
                  </span>
                </div>
              ))}
              {notifications.length === 0 && history.length === 0 && (
                <p className="text-xs text-sky-600">Nenhum histórico ainda.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
