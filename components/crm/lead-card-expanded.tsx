'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Phone, Clock, Trash2 } from 'lucide-react'
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
  softDeleteLead,
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
  const [deleting, setDeleting] = useState(false)

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

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este lead? Essa ação não pode ser desfeita.')) return
    
    setDeleting(true)
    try {
      await softDeleteLead(lead.id)
      onUpdate({ ...lead, deleted_at: new Date().toISOString() }) // isso vai removê-lo das listas ativas
      onClose()
    } catch (error) {
      console.error(error)
      setDeleting(false)
    }
  }

  const availableTags = allTags.filter(
    (t) => !(lead.tags ?? []).some((lt) => lt.id === t.id)
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TemperatureBadge temperatura={lead.temperatura} showLabel />
              {lead.experience && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-surface px-3 py-1 rounded-full border border-white/5">
                  🪂 {lead.experience.nome}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-white italic tracking-wider uppercase">{lead.nome}</h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
              📅 {formatDateTime(lead.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contato */}
          <section>
            <h3 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-4">
              Contato
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={phoneToWhatsApp(lead.telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-neon text-black font-black italic tracking-wider uppercase rounded-xl px-5 py-2.5 text-xs hover:bg-neon/90 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              >
                <MessageCircle size={16} />
                {formatPhone(lead.telefone)}
              </a>
              <a
                href={`tel:${lead.telefone_normalizado}`}
                className="flex items-center gap-2 bg-white/5 text-white font-bold uppercase tracking-wider border border-white/10 rounded-xl px-5 py-2.5 text-xs hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                <Phone size={16} />
                Ligar
              </a>
            </div>
            {lead.email && (
              <p className="text-xs font-bold text-zinc-400 mt-3 tracking-wider">📧 {lead.email}</p>
            )}
          </section>

          {/* Informações do Lead */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-4 border border-white/5">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Fonte de Captação</p>
              <p className="text-sm text-white font-black uppercase tracking-wider">
                🔗 {lead.fonte_label ?? lead.fonte}
              </p>
            </div>
            {lead.valor_estimado && (
              <div className="bg-surface rounded-xl p-4 border border-neon/20 shadow-[inset_0_0_20px_rgba(57,255,20,0.05)]">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Valor Estimado</p>
                <p className="text-lg text-neon font-black italic tracking-wider">
                  {formatCurrency(lead.valor_estimado)}
                </p>
              </div>
            )}
          </section>

          {/* Pipeline Status */}
          <section>
            <h3 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-4">
              Mover no Pipeline
            </h3>
            <div className="flex flex-wrap gap-2">
              {PIPELINE_COLUMNS.map((col) => (
                <button
                  key={col.status}
                  onClick={() => handleStatusChange(col.status)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    lead.status === col.status
                      ? 'bg-neon text-black shadow-[0_0_15px_rgba(57,255,20,0.3)] scale-105'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  {col.emoji} {col.label}
                </button>
              ))}
            </div>
          </section>

          {/* Etiquetas */}
          <section>
            <h3 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-4">
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
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-dashed border-zinc-600 text-zinc-500 hover:border-neon hover:text-neon transition-colors"
                  >
                    + {tag.icone} {tag.nome}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Notas */}
          <section>
            <h3 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-4">
              Notas
            </h3>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              placeholder="Adicione observações sobre este lead..."
              className="w-full bg-surface border border-white/10 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 resize-none transition-all"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-3 px-6 py-2.5 bg-neon text-black rounded-xl text-xs font-black uppercase tracking-widest italic hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              {saving ? 'Salvando...' : 'Salvar Notas'}
            </button>
          </section>

          {/* Histórico */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-neon uppercase tracking-[0.2em]">
                Histórico
              </h3>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 size={12} />
                {deleting ? 'Excluindo...' : 'Excluir Lead'}
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <Clock size={12} className="mt-0.5 flex-shrink-0 text-neon" />
                  <span>
                    {formatDateTime(n.created_at)} ·{' '}
                    <span className="text-zinc-300">{n.tipo === 'wa_lead' ? '💬 WA enviado ao lead' : '👥 Grupo notificado'}</span>{' '}
                    <span className={n.status === 'enviado' ? 'text-neon' : 'text-red-500'}>
                      {n.status === 'enviado' ? '✓' : '✗'}
                    </span>
                  </span>
                </div>
              ))}
              {history.map((h) => (
                <div key={h.id} className="flex items-start gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <Clock size={12} className="mt-0.5 flex-shrink-0 text-neon" />
                  <span>
                    {formatDateTime(h.created_at)} · Movido:{' '}
                    {h.status_anterior ? STATUS_LABELS[h.status_anterior] : 'Novo'} →{' '}
                    <span className="text-white">{STATUS_LABELS[h.status_novo]}</span>
                  </span>
                </div>
              ))}
              {notifications.length === 0 && history.length === 0 && (
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Nenhum histórico ainda.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
