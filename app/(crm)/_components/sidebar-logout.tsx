'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export function SidebarLogout() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-neon hover:bg-white/5 transition-colors group"
    >
      <LogOut size={16} className="group-hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all" />
      Sair
    </button>
  )
}
