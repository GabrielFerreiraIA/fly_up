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
          <h1 className="text-2xl font-bold text-neutral-100">🪂 Experiências e Preços</h1>
          <p className="text-sky-400 text-sm mt-1">
            Edite os valores aqui para atualizar as mensagens do WhatsApp e o CRM automaticamente
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-sky-900 rounded-lg text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Nova Experiência
        </button>
      </div>

      <div className="bg-sky-800 border border-sky-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sky-700 text-xs text-sky-400 uppercase tracking-wider">
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Valor Médio (R$)</th>
              <th className="text-left px-4 py-3">Descrição</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-sky-700/50">
                <td className="px-4 py-3 text-sky-400 font-mono text-xs">{exp.id}</td>
                <td className="px-4 py-3">
                  {editing === exp.id ? (
                    <input
                      value={editValues.nome ?? exp.nome}
                      onChange={(e) => setEditValues((p) => ({ ...p, nome: e.target.value }))}
                      className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-neutral-100 w-full"
                    />
                  ) : (
                    <span className="font-medium text-neutral-100">{exp.nome}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === exp.id ? (
                    <input
                      type="number"
                      value={editValues.valor_medio ?? exp.valor_medio}
                      onChange={(e) => setEditValues((p) => ({ ...p, valor_medio: parseFloat(e.target.value) }))}
                      className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-green-400 w-32"
                    />
                  ) : (
                    <span className="text-green-400 font-medium">{formatCurrency(exp.valor_medio)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sky-400 text-xs">
                  {editing === exp.id ? (
                    <input
                      value={editValues.descricao ?? exp.descricao ?? ''}
                      onChange={(e) => setEditValues((p) => ({ ...p, descricao: e.target.value }))}
                      className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-neutral-100 w-full"
                    />
                  ) : (
                    exp.descricao
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === exp.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(exp.id)} className="text-green-400 hover:text-green-300">
                        <Check size={16} />
                      </button>
                      <button onClick={() => setEditing(null)} className="text-red-400 hover:text-red-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditing(exp.id); setEditValues({}) }}
                      className="text-sky-500 hover:text-neutral-100"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {adding && (
              <tr className="border-b border-sky-700/50 bg-sky-700/20">
                <td className="px-4 py-3">
                  <input
                    value={newExp.id}
                    onChange={(e) => setNewExp((p) => ({ ...p, id: e.target.value }))}
                    placeholder="ex: salto-duplo"
                    className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-neutral-100 w-full font-mono text-xs"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={newExp.nome}
                    onChange={(e) => setNewExp((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Nome da experiência"
                    className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-neutral-100 w-full"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={newExp.valor_medio}
                    onChange={(e) => setNewExp((p) => ({ ...p, valor_medio: parseFloat(e.target.value) }))}
                    className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-green-400 w-32"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={newExp.descricao}
                    onChange={(e) => setNewExp((p) => ({ ...p, descricao: e.target.value }))}
                    placeholder="Descrição"
                    className="bg-sky-700 border border-sky-500 rounded px-2 py-1 text-neutral-100 w-full"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={handleAdd} className="text-green-400 hover:text-green-300">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setAdding(false)} className="text-red-400 hover:text-red-300">
                      <X size={16} />
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
