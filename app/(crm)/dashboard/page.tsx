import {
  getDashboardMetrics,
  getLeadsByExperience,
  getLeadsByFonte,
  getLeadsByDay,
} from '@/lib/supabase/queries'
import { DashboardMetric } from '@/components/dashboard-metric'
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
        <h1 className="text-2xl font-bold text-neutral-100">Dashboard</h1>
        <p className="text-sky-400 text-sm mt-1">Visão geral dos leads e conversões</p>
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
      <div className="bg-sky-800 border border-sky-700 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
          Funil do Pipeline
        </h2>
        <div className="flex items-end gap-3">
          {[
            { label: '🆕 Novos',      value: metrics.total_novos,         color: '#00B4D8' },
            { label: '📞 A Contactar',value: metrics.total_a_contactar,   color: '#EAB308' },
            { label: '✅ Qualif.',    value: metrics.total_qualificados,  color: '#3B82F6' },
            { label: '🏆 Convertidos',value: metrics.total_convertidos,   color: '#22C55E' },
            { label: '❌ Perdidos',   value: metrics.total_perdidos,       color: '#EF4444' },
          ].map((item) => {
            const max = Math.max(
              metrics.total_novos, metrics.total_a_contactar,
              metrics.total_qualificados, metrics.total_convertidos, metrics.total_perdidos, 1
            )
            const height = Math.max((item.value / max) * 120, 8)
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-neutral-100">{item.value}</span>
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{ height: `${height}px`, backgroundColor: `${item.color}40`, border: `1px solid ${item.color}60` }}
                />
                <span className="text-xs text-sky-400 text-center whitespace-nowrap">{item.label}</span>
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
