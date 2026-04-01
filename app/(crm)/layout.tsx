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
]

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
    <div className="flex h-screen bg-sky-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-sky-900 border-r border-sky-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-sky-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪂</span>
            <div>
              <h1 className="font-bold text-neutral-100 leading-tight">FlyUp CRM</h1>
              <p className="text-xs text-sky-500">Lead Management</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sky-300
                         hover:bg-sky-800 hover:text-neutral-100 transition-colors group"
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="px-3 py-4 border-t border-sky-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sky-800/50 mb-2">
            <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center text-xs text-accent-primary font-bold">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-100 truncate">{user.email}</p>
            </div>
          </div>
          <SidebarLogout />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-sky-900">
        {children}
      </main>
    </div>
  )
}
