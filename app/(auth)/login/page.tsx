'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CRMLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-crm-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🪂</div>
          <h1 className="text-3xl font-bold text-neutral-100">FlyUp CRM</h1>
          <p className="text-crm-400 mt-1">Sistema de Gestão de Leads</p>
        </div>

        {/* Form */}
        <div className="bg-crm-800 border border-crm-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-neutral-100 mb-6">Entrar no sistema</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-crm-400 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="mt-1 w-full bg-crm-900 border border-crm-600 rounded-lg px-4 py-3 text-neutral-100 placeholder-crm-600 focus:outline-none focus:border-crm-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-crm-400 uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1 w-full bg-crm-900 border border-crm-600 rounded-lg px-4 py-3 text-neutral-100 placeholder-crm-600 focus:outline-none focus:border-crm-accent transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-crm-accent text-crm-900 font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
