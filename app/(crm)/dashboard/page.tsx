import {
  getDashboardMetrics,
  getLeadsByExperience,
  getLeadsByFonte,
  getLeadsByDay,
} from '@/lib/supabase/queries'
import { DashboardMetric } from '@/components/crm/dashboard-metric'
import { formatCurrency } from '@/lib/utils/date'
import { DashboardCharts } from './_components/dashboard-charts'

export const revalidate = 60

export default async function DashboardPage() {
  const [metrics, byExperience, byFonte, byDay] = await Promise.all([
    getDashboardMetrics(),
    getLeadsByExperience(),
    getLeadsByFonte(),
    getLeadsByDay(14),
  ])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-widest uppercase italic">Dashboard</h1>
        <p className="text-zinc-400 font-medium uppercase tracking-wider text-[10px] mt-1">Visão geral dos leads e conversões</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardMetric
          emoji="🆕"
          label="Leads Hoje"
          value={metrics.leads_hoje}
          sublabel="últimas 24h"
        />
        <DashboardMetric
          emoji="📅"
          label="Leads na Semana"
          value={metrics.leads_semana}
          sublabel="últimos 7 dias"
        />
        <DashboardMetric
          emoji="💰"
          label="Valor Potencial"
          value={formatCurrency(metrics.valor_potencial_total)}
          sublabel="leads ativos"
        />
        <DashboardMetric
          emoji="🏆"
          label="Taxa de Conversão"
          value={`${metrics.taxa_conversao_pct ?? 0}%`}
          sublabel="histórico total"
        />
      </div>

      {/* Funil do pipeline */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6 hover:border-neon/30 transition-all duration-300 shadow-xl">
        <h2 className="text-xs font-black text-neon uppercase tracking-[0.2em] mb-6">
          Funil do Pipeline
        </h2>
        <div className="flex items-end gap-4 h-40">
          {[
            { label: '🆕 Novos',       value: metrics.total_novos,        color: '#39FF14' },
            { label: '📞 A Contactar', value: metrics.total_a_contactar,  color: '#EAB308' },
            { label: '✅ Qualif.',     value: metrics.total_qualificados, color: '#00FFFF' },
            { label: '🏆 Convertidos', value: metrics.total_convertidos,  color: '#39FF14' },
            { label: '❌ Perdidos',    value: metrics.total_perdidos,     color: '#EF4444' },
          ].map((item) => {
            const max = Math.max(
              metrics.total_novos, metrics.total_a_contactar,
              metrics.total_qualificados, metrics.total_convertidos, metrics.total_perdidos, 1
            )
            const height = Math.max((item.value / max) * 120, 8)
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-3 group relative">
                <span className="text-sm font-black text-white">{item.value}</span>
                <div
                  className="w-full rounded-t-xl transition-all duration-700 ease-out group-hover:shadow-[0_0_15px_currentColor]"
                  style={{ height: `${height}px`, backgroundColor: `${item.color}20`, borderTop: `2px solid ${item.color}`, color: item.color }}
                />
                <span className="text-[10px] font-bold text-zinc-400 text-center whitespace-nowrap uppercase tracking-wider">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Charts */}
      <DashboardCharts
        byExperience={byExperience}
        byFonte={byFonte}
        byDay={byDay}
      />
    </div>
  )
}
