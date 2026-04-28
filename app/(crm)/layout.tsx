import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { SidebarLogout } from './_components/sidebar-logout'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard',    emoji: '📊' },
  { href: '/pipeline',  label: 'Pipeline',     emoji: '🔄' },
  { href: '/leads',     label: 'Todos os Leads', emoji: '👥' },
  { href: '/config/experiences', label: 'Experiências', emoji: '🪂' },
  { href: '/config/tags',        label: 'Etiquetas',    emoji: '🏷️' },
] as const

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-background border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/UlfCRZF.png" alt="Fly Up Logo" className="w-10 h-auto object-contain" />
            <div>
              <h1 className="font-black text-white leading-tight uppercase italic tracking-wider">FlyUp CRM</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Lead Management</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-zinc-400
                         hover:bg-white/5 hover:text-neon transition-colors group relative overflow-hidden border border-transparent hover:border-white/10"
            >
              <span className="text-base group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
              <span className="uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 mb-2 border border-white/5">
            <div className="w-7 h-7 rounded-full bg-neon/20 flex items-center justify-center text-xs text-neon font-black border border-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-300 truncate uppercase tracking-wider">{user.email?.split('@')[0]}</p>
            </div>
          </div>
          <SidebarLogout />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-surface">
        {children}
      </main>
    </div>
  )
}
