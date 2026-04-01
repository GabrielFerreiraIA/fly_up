'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DashboardChartsProps {
  byExperience: { experience_nome: string; total: number; valor_total: number }[]
  byFonte: { fonte_label: string; total: number }[]
  byDay: { dia: string; total: number }[]
}

export function DashboardCharts({ byExperience, byFonte, byDay }: DashboardChartsProps) {
  const dayData = byDay.map((d) => ({
    ...d,
    label: format(new Date(d.dia + 'T12:00:00'), 'dd/MM', { locale: ptBR }),
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Leads por experiência */}
      <div className="bg-sky-800 border border-sky-700 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
          📊 Leads por Experiência
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={byExperience.slice(0, 6)} layout="vertical">
            <XAxis type="number" tick={{ fill: '#8BB3D8', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="experience_nome"
              tick={{ fill: '#8BB3D8', fontSize: 11 }}
              width={130}
            />
            <Tooltip
              contentStyle={{ background: '#152640', border: '1px solid #2A4F7A', borderRadius: 8 }}
              labelStyle={{ color: '#F8FAFC' }}
              itemStyle={{ color: '#00B4D8' }}
            />
            <Bar dataKey="total" fill="#00B4D8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top fontes */}
      <div className="bg-sky-800 border border-sky-700 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
          🔗 Top Fontes de Captação
        </h2>
        <div className="space-y-3">
          {byFonte.slice(0, 6).map((item, i) => {
            const max = byFonte[0]?.total ?? 1
            const pct = Math.round((item.total / max) * 100)
            return (
              <div key={i}>
                <div className="flex justify-between text-xs text-sky-300 mb-1">
                  <span className="truncate max-w-[200px]">{item.fonte_label}</span>
                  <span className="font-semibold ml-2">{item.total}</span>
                </div>
                <div className="h-1.5 bg-sky-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leads por dia */}
      <div className="bg-sky-800 border border-sky-700 rounded-xl p-5 lg:col-span-2">
        <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
          📈 Leads por Dia — últimos 14 dias
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={dayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
            <XAxis dataKey="label" tick={{ fill: '#8BB3D8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#8BB3D8', fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#152640', border: '1px solid #2A4F7A', borderRadius: 8 }}
              labelStyle={{ color: '#F8FAFC' }}
              itemStyle={{ color: '#FF6B35' }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#FF6B35"
              strokeWidth={2}
              dot={{ fill: '#FF6B35', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
