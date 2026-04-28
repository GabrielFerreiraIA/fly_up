'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getTagDefinitions, createTag, deleteTag } from '@/lib/supabase/queries'
import { TagBadge } from '@/components/crm/tag-badge'
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
          <h1 className="text-3xl font-black text-white italic tracking-wider uppercase">🏷️ Etiquetas</h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
            Crie etiquetas visuais para categorizar seus leads
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neon text-black rounded-xl text-xs font-black uppercase tracking-widest italic hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
        >
          <Plus size={16} />
          Nova Etiqueta
        </button>
      </div>

      {adding && (
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl">
          <h2 className="text-sm font-black text-neon uppercase tracking-wider">Criar Nova Etiqueta</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Nome</label>
              <input
                value={newTag.nome}
                onChange={(e) => setNewTag((p) => ({ ...p, nome: e.target.value }))}
                placeholder="ex: VIP, Urgente..."
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-white placeholder-zinc-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Ícone</label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewTag((p) => ({ ...p, icone: icon }))}
                    className={`w-9 h-9 rounded-lg text-base hover:bg-white/10 transition-colors border border-transparent ${
                      newTag.icone === icon ? 'bg-white/5 border-neon' : 'bg-background'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Cor</label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewTag((p) => ({ ...p, cor_hex: color }))}
                    className={`w-7 h-7 rounded-full transition-all border border-transparent ${
                      newTag.cor_hex === color ? 'border-white scale-110 shadow-[0_0_10px_currentColor]' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preview:</span>
              <TagBadge tag={{ id: 'preview', nome: newTag.nome || 'Exemplo', cor_hex: newTag.cor_hex, icone: newTag.icone, created_at: '' }} />
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setAdding(false)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="px-5 py-2.5 bg-neon text-black rounded-xl text-xs font-black uppercase tracking-widest italic hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
              >
                Criar Etiqueta
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-surface border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <TagBadge tag={tag} />
            <button
              onClick={() => handleDelete(tag.id)}
              className="text-zinc-600 hover:text-red-500 transition-colors ml-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {tags.length === 0 && !adding && (
        <div className="py-12 text-center text-zinc-500">
          <p className="text-4xl mb-4">🏷️</p>
          <p className="text-sm font-black uppercase tracking-wider mb-1">Nenhuma etiqueta criada ainda.</p>
          <p className="text-[10px] font-bold uppercase tracking-widest">Clique em &ldquo;Nova Etiqueta&rdquo; para começar.</p>
        </div>
      )}
    </div>
  )
}
