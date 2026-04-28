'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Check, X } from 'lucide-react'
import { getExperiences, upsertExperience } from '@/lib/supabase/queries'
import { formatCurrency } from '@/lib/utils/date'
import type { Experience } from '@/lib/types'

export default function ExperiencesConfigPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<Experience>>({})
  const [adding, setAdding] = useState(false)
  const [newExp, setNewExp] = useState({ id: '', nome: '', valor_medio: 0, descricao: '' })

  useEffect(() => {
    getExperiences().then(setExperiences)
  }, [])

  async function handleSave(id: string) {
    await upsertExperience({ id, ...editValues })
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...editValues } : e))
    )
    setEditing(null)
  }

  async function handleAdd() {
    if (!newExp.id || !newExp.nome) return
    await upsertExperience(newExp)
    setExperiences((prev) => [...prev, { ...newExp, ativo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    setNewExp({ id: '', nome: '', valor_medio: 0, descricao: '' })
    setAdding(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-wider uppercase">🪂 Experiências e Preços</h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
            Edite os valores aqui para atualizar as mensagens do WhatsApp e o CRM automaticamente
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neon text-black rounded-xl text-xs font-black uppercase tracking-widest italic hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
        >
          <Plus size={16} />
          Nova Experiência
        </button>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-white/5">
              <th className="text-left px-5 py-4">ID</th>
              <th className="text-left px-5 py-4">Nome</th>
              <th className="text-left px-5 py-4">Valor Médio (R$)</th>
              <th className="text-left px-5 py-4">Descrição</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-zinc-500 font-mono text-[10px] font-bold">{exp.id}</td>
                <td className="px-5 py-4">
                  {editing === exp.id ? (
                    <input
                      value={editValues.nome ?? exp.nome}
                      onChange={(e) => setEditValues((p) => ({ ...p, nome: e.target.value }))}
                      className="bg-background border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white w-full focus:border-neon focus:outline-none"
                    />
                  ) : (
                    <span className="font-black text-white uppercase tracking-wider text-xs">{exp.nome}</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {editing === exp.id ? (
                    <input
                      type="number"
                      value={editValues.valor_medio ?? exp.valor_medio}
                      onChange={(e) => setEditValues((p) => ({ ...p, valor_medio: parseFloat(e.target.value) }))}
                      className="bg-background border border-white/10 rounded-lg px-3 py-2 text-neon font-black italic tracking-wider w-32 focus:border-neon focus:outline-none"
                    />
                  ) : (
                    <span className="text-neon font-black italic tracking-wider">{formatCurrency(exp.valor_medio)}</span>
                  )}
                </td>
                <td className="px-5 py-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest max-w-[200px] truncate">
                  {editing === exp.id ? (
                    <input
                      value={editValues.descricao ?? exp.descricao ?? ''}
                      onChange={(e) => setEditValues((p) => ({ ...p, descricao: e.target.value }))}
                      className="bg-background border border-white/10 rounded-lg px-3 py-2 text-white w-full focus:border-neon focus:outline-none"
                    />
                  ) : (
                    exp.descricao
                  )}
                </td>
                <td className="px-5 py-4">
                  {editing === exp.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(exp.id)} className="text-neon hover:text-white transition-colors">
                        <Check size={18} />
                      </button>
                      <button onClick={() => setEditing(null)} className="text-red-500 hover:text-red-400 transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditing(exp.id); setEditValues({}) }}
                      className="text-zinc-500 hover:text-neon transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {adding && (
              <tr className="border-b border-white/5 bg-white/5">
                <td className="px-5 py-4">
                  <input
                    value={newExp.id}
                    onChange={(e) => setNewExp((p) => ({ ...p, id: e.target.value }))}
                    placeholder="ex: salto-duplo"
                    className="bg-background border border-white/10 rounded-lg px-3 py-2 text-white w-full font-mono text-[10px] focus:border-neon focus:outline-none"
                  />
                </td>
                <td className="px-5 py-4">
                  <input
                    value={newExp.nome}
                    onChange={(e) => setNewExp((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Nome"
                    className="bg-background border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white w-full focus:border-neon focus:outline-none"
                  />
                </td>
                <td className="px-5 py-4">
                  <input
                    type="number"
                    value={newExp.valor_medio}
                    onChange={(e) => setNewExp((p) => ({ ...p, valor_medio: parseFloat(e.target.value) }))}
                    className="bg-background border border-white/10 rounded-lg px-3 py-2 text-neon font-black italic tracking-wider w-32 focus:border-neon focus:outline-none"
                  />
                </td>
                <td className="px-5 py-4">
                  <input
                    value={newExp.descricao}
                    onChange={(e) => setNewExp((p) => ({ ...p, descricao: e.target.value }))}
                    placeholder="Descrição"
                    className="bg-background border border-white/10 rounded-lg px-3 py-2 text-white w-full focus:border-neon focus:outline-none"
                  />
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button onClick={handleAdd} className="text-neon hover:text-white transition-colors">
                      <Check size={18} />
                    </button>
                    <button onClick={() => setAdding(false)} className="text-red-500 hover:text-red-400 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
