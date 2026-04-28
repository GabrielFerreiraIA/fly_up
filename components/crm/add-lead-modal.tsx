'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { CustomSelect } from './custom-select'
import { getExperiences, createLead } from '@/lib/supabase/queries'
import type { Experience, LeadStatus, LeadTemperatura } from '@/lib/types'
import { PIPELINE_COLUMNS, TEMPERATURA_CONFIG } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface AddLeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddLeadModal({ open, onOpenChange, onSuccess }: AddLeadModalProps) {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [experienceId, setExperienceId] = useState('')
  const [status, setStatus] = useState<LeadStatus>('novo')
  const [temperatura, setTemperatura] = useState<LeadTemperatura>('morno')
  const [valor, setValor] = useState('')

  useEffect(() => {
    if (open) {
      getExperiences().then(setExperiences)
      // Reset form
      setNome('')
      setTelefone('')
      setEmail('')
      setExperienceId('')
      setStatus('novo')
      setTemperatura('morno')
      setValor('')
    }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || !telefone) {
      toast.error('Nome e Telefone são obrigatórios')
      return
    }

    try {
      setIsSubmitting(true)
      await createLead({
        nome,
        telefone,
        email: email || null,
        experience_id: experienceId || null,
        status,
        temperatura,
        valor_estimado: valor ? Number(valor) : 0,
        fonte: 'manual',
        fonte_label: 'Adicionado Manualmente',
      })
      toast.success('Lead criado com sucesso!')
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar lead.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black italic uppercase tracking-widest text-neon">
            Adicionar Novo Lead
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-zinc-500 hover:text-neon transition-colors p-2 hover:bg-white/5 rounded-full"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nome *</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon transition-colors"
              placeholder="Ex: João Silva"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Telefone *</label>
              <input
                type="text"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon transition-colors"
                placeholder="Ex: 11999999999"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon transition-colors"
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Experiência de Interesse</label>
            <CustomSelect
              value={experienceId}
              onChange={setExperienceId}
              options={[
                { value: '', label: 'Nenhuma / Não sabe' },
                ...experiences.map(exp => ({ value: exp.id, label: exp.nome }))
              ]}
              placeholder="Selecione uma experiência"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status Inicial</label>
              <CustomSelect
                value={status}
                onChange={(val) => setStatus(val as LeadStatus)}
                options={PIPELINE_COLUMNS.map(col => ({
                  value: col.status,
                  label: <span className="flex items-center gap-2"><span>{col.emoji}</span> {col.label}</span>
                }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Temperatura</label>
              <CustomSelect
                value={temperatura}
                onChange={(val) => setTemperatura(val as LeadTemperatura)}
                options={Object.entries(TEMPERATURA_CONFIG).map(([key, config]) => ({
                  value: key,
                  label: <span className="flex items-center gap-2"><span>{config.emoji}</span> {config.label}</span>
                }))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Valor Estimado (R$)</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon transition-colors"
              placeholder="Ex: 1500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 mt-4 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex mt-4 items-center gap-2 bg-neon/10 text-neon border border-neon/50 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-neon hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : null}
              Salvar Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
