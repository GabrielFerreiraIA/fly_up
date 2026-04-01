'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getTagDefinitions, createTag, deleteTag } from '@/lib/supabase/queries'
import { TagBadge } from '@/components/tag-badge'
import type { TagDefinition } from '@/lib/types'

const PRESET_ICONS = ['⚡', '🎯', '🔁', '💬', '📸', '🔍', '⭐', '🤝', '👥', '⏳', '🔥', '💎', '🚀', '✈️', '❤️']
const PRESET_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6',
  '#A855F7', '#EC4899', '#FFD700', '#06B6D4', '#10B981',
  '#8B5CF6', '#F59E0B', '#14B8A6', '#6366F1', '#84CC16',
]

export default function TagsConfigPage() {
  const [tags, setTags] = useState<TagDefinition[]>([])
  const [newTag, setNewTag] = useState({ nome: '', cor_hex: '#00B4D8', icone: '⚡' })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getTagDefinitions().then(setTags)
  }, [])

  async function handleCreate() {
    if (!newTag.nome.trim()) return
    await createTag(newTag)
    const updated = await getTagDefinitions()
    setTags(updated)
    setNewTag({ nome: '', cor_hex: '#00B4D8', icone: '⚡' })
    setAdding(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover esta etiqueta?')) return
    await deleteTag(id)
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100">🏷️ Etiquetas</h1>
          <p className="text-sky-400 text-sm mt-1">
            Crie etiquetas visuais para categorizar seus leads
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-sky-900 rounded-lg text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Nova Etiqueta
        </button>
      </div>

      {adding && (
        <div className="bg-sky-800 border border-sky-600 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-100">Criar Nova Etiqueta</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-sky-400 mb-1 block">Nome</label>
              <input
                value={newTag.nome}
                onChange={(e) => setNewTag((p) => ({ ...p, nome: e.target.value }))}
                placeholder="ex: VIP, Urgente..."
                className="w-full bg-sky-900 border border-sky-600 rounded-lg px-3 py-2 text-neutral-100 placeholder-sky-600 focus:outline-none focus:border-accent-primary"
              />
            </div>

            <div>
              <label className="text-xs text-sky-400 mb-1 block">Ícone</label>
              <div className="flex flex-wrap gap-1">
                {PRESET_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewTag((p) => ({ ...p, icone: icon }))}
                    className={`w-8 h-8 rounded text-base hover:bg-sky-700 transition-colors ${
                      newTag.icone === icon ? 'bg-sky-600 ring-2 ring-accent-primary' : 'bg-sky-800'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-sky-400 mb-1 block">Cor</label>
              <div className="flex flex-wrap gap-1">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewTag((p) => ({ ...p, cor_hex: color }))}
                    className={`w-6 h-6 rounded-full transition-all ${
                      newTag.cor_hex === color ? 'ring-2 ring-white ring-offset-1 ring-offset-sky-800 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-sky-400">Preview:</span>
              <TagBadge tag={{ id: 'preview', nome: newTag.nome || 'Exemplo', cor_hex: newTag.cor_hex, icone: newTag.icone, created_at: '' }} />
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setAdding(false)}
                className="px-4 py-2 text-sm text-sky-400 hover:text-neutral-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-accent-primary text-sky-900 rounded-lg text-sm font-medium hover:opacity-90"
              >
                Criar Etiqueta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-sky-800 border border-sky-700 rounded-xl p-4 flex items-center justify-between"
          >
            <TagBadge tag={tag} />
            <button
              onClick={() => handleDelete(tag.id)}
              className="text-sky-600 hover:text-red-400 transition-colors ml-2"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {tags.length === 0 && !adding && (
        <div className="py-12 text-center text-sky-500">
          <p className="text-4xl mb-3">🏷️</p>
          <p>Nenhuma etiqueta criada ainda.</p>
          <p className="text-xs mt-1">Clique em "Nova Etiqueta" para começar.</p>
        </div>
      )}
    </div>
  )
}
