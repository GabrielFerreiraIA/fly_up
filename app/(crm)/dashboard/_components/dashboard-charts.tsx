'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Tick customizado para permitir textTransform (não suportado como prop SVG direta)
function UppercaseTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
      style={{ fill: '#71717a', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}
    >
      {payload?.value}
    </text>
  )
}

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
      <div className="bg-surface border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-6">
          📊 Leads por Experiência
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={byExperience.slice(0, 6)} layout="vertical">
            <XAxis type="number" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} />
            <YAxis
              type="category"
              dataKey="experience_nome"
              tick={<UppercaseTick />}
              width={130}
            />
            <Tooltip
              contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
              labelStyle={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
              itemStyle={{ color: '#39FF14', fontWeight: 900 }}
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            />
            <Bar dataKey="total" fill="#39FF14" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top fontes */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-6">
          🔗 Top Fontes de Captação
        </h2>
        <div className="space-y-3">
          {byFonte.slice(0, 6).map((item, i) => {
            const max = byFonte[0]?.total ?? 1
            const pct = Math.round((item.total / max) * 100)
            return (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  <span className="truncate max-w-[200px]">{item.fonte_label}</span>
                  <span className="font-black text-white">{item.total}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(57,255,20,0.5)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leads por dia */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6 lg:col-span-2 shadow-xl">
        <h2 className="text-[10px] font-black text-neon uppercase tracking-[0.2em] mb-6">
          📈 Leads por Dia — últimos 14 dias
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={dayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} allowDecimals={false} axisLine={false} tickLine={false} dx={-10} />
            <Tooltip
              contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
              labelStyle={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
              itemStyle={{ color: '#39FF14', fontWeight: 900 }}
              cursor={{ stroke: 'rgba(57,255,20,0.2)', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#39FF14"
              strokeWidth={3}
              dot={{ fill: '#09090b', stroke: '#39FF14', strokeWidth: 2, r: 4 }}
              activeDot={{ fill: '#39FF14', stroke: '#fff', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
