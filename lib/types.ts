// ============================================================
// FlyUp CRM — TypeScript Types
// ============================================================

export type LeadStatus = 'novo' | 'a_contactar' | 'qualificado' | 'convertido' | 'perdido'
export type LeadTemperatura = 'quente' | 'morno' | 'frio' | 'vip'

export interface Experience {
  id: string
  nome: string
  valor_medio: number
  descricao: string | null
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface TagDefinition {
  id: string
  nome: string
  cor_hex: string
  icone: string | null
  created_at: string
}

export interface Lead {
  id: string
  nome: string
  telefone: string
  telefone_normalizado: string
  email: string | null
  experience_id: string | null
  fonte: string
  fonte_label: string | null
  status: LeadStatus
  temperatura: LeadTemperatura
  valor_estimado: number | null
  notas: string | null
  webhook_payload: Record<string, unknown> | null
  wa_lead_enviado: boolean
  wa_grupo_enviado: boolean
  responsavel_id: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
  // Joined relations
  experience?: Experience
  tags?: TagDefinition[]
  responsavel?: { email: string; id: string }
}

export interface LeadTag {
  lead_id: string
  tag_id: string
  created_at: string
}

export interface StatusHistory {
  id: string
  lead_id: string
  status_anterior: LeadStatus | null
  status_novo: LeadStatus
  agente: string
  agente_user_id: string | null
  notas: string | null
  created_at: string
}

export interface NotificationLog {
  id: string
  lead_id: string
  tipo: 'wa_lead' | 'wa_grupo' | 'email'
  destinatario: string
  mensagem: string
  status: 'enviado' | 'erro' | 'pendente'
  n8n_execution_id: string | null
  created_at: string
}

export interface DashboardMetrics {
  leads_hoje: number
  leads_semana: number
  leads_mes: number
  valor_potencial_total: number
  taxa_conversao_pct: number
  total_novos: number
  total_a_contactar: number
  total_qualificados: number
  total_convertidos: number
  total_perdidos: number
}

export interface WebhookPayload {
  nome: string
  telefone: string
  email?: string
  experiencia: string
  fonte: string
  fonte_label: string
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  novo:         'Novo',
  a_contactar:  'A Contactar',
  qualificado:  'Qualificado',
  convertido:   'Convertido',
  perdido:      'Perdido',
}

export const STATUS_COLORS: Record<LeadStatus, string> = {
  novo:         'bg-crm-accent/20 text-crm-accent',
  a_contactar:  'bg-yellow-500/20 text-yellow-400',
  qualificado:  'bg-blue-500/20 text-blue-400',
  convertido:   'bg-green-500/20 text-green-400',
  perdido:      'bg-red-500/20 text-red-400',
}

export const TEMPERATURA_CONFIG: Record<LeadTemperatura, { label: string; color: string; emoji: string }> = {
  quente: { label: 'Quente',  color: '#FF6B35', emoji: '🔴' },
  morno:  { label: 'Morno',   color: '#F39C12', emoji: '🟡' },
  frio:   { label: 'Frio',    color: '#3B82F6', emoji: '🔵' },
  vip:    { label: 'VIP',     color: '#FFD700', emoji: '⭐' },
}

export const PIPELINE_COLUMNS: { status: LeadStatus; label: string; emoji: string }[] = [
  { status: 'novo',        label: 'Novo',         emoji: '🆕' },
  { status: 'a_contactar', label: 'A Contactar',  emoji: '📞' },
  { status: 'qualificado', label: 'Qualificado',  emoji: '✅' },
  { status: 'convertido',  label: 'Convertido',   emoji: '🏆' },
  { status: 'perdido',     label: 'Perdido',      emoji: '❌' },
]
