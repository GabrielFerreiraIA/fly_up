import { createClient } from './client'
import type {
  Lead,
  LeadStatus,
  Experience,
  TagDefinition,
  DashboardMetrics,
  StatusHistory,
  NotificationLog,
} from '@/lib/types'

// ==========================================
// LEADS
// ==========================================

export async function getLeads(): Promise<Lead[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      experience:experiences(*),
      tags:lead_tags(tag_definitions(*))
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(lead => ({
    ...lead,
    tags: lead.tags?.map((lt: { tag_definitions: TagDefinition }) => lt.tag_definitions) ?? [],
  }))
}

export async function getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      experience:experiences(*),
      tags:lead_tags(tag_definitions(*))
    `)
    .eq('status', status)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map(lead => ({
    ...lead,
    tags: lead.tags?.map((lt: { tag_definitions: TagDefinition }) => lt.tag_definitions) ?? [],
  }))
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      experience:experiences(*),
      tags:lead_tags(tag_definitions(*))
    `)
    .eq('id', id)
    .single()

  if (error) return null

  return {
    ...data,
    tags: data.tags?.map((lt: { tag_definitions: TagDefinition }) => lt.tag_definitions) ?? [],
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function updateLeadNotes(id: string, notas: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('leads')
    .update({ notas, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function softDeleteLead(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('leads')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function assignLeadTag(leadId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('lead_tags')
    .upsert({ lead_id: leadId, tag_id: tagId })

  if (error) throw error
}

export async function removeLeadTag(leadId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('lead_tags')
    .delete()
    .eq('lead_id', leadId)
    .eq('tag_id', tagId)

  if (error) throw error
}

// ==========================================
// STATUS HISTORY
// ==========================================

export async function getLeadHistory(leadId: string): Promise<StatusHistory[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('status_history')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// ==========================================
// NOTIFICATION LOG
// ==========================================

export async function getLeadNotifications(leadId: string): Promise<NotificationLog[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notification_log')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// ==========================================
// EXPERIENCES
// ==========================================

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('nome', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function upsertExperience(experience: Partial<Experience>): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('experiences')
    .upsert({ ...experience, updated_at: new Date().toISOString() })

  if (error) throw error
}

// ==========================================
// TAG DEFINITIONS
// ==========================================

export async function getTagDefinitions(): Promise<TagDefinition[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tag_definitions')
    .select('*')
    .order('nome', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createTag(tag: Omit<TagDefinition, 'id' | 'created_at'>): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tag_definitions').insert(tag)
  if (error) throw error
}

export async function deleteTag(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tag_definitions').delete().eq('id', id)
  if (error) throw error
}

// ==========================================
// DASHBOARD METRICS
// ==========================================

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .select('*')
    .single()

  if (error) throw error
  return data as DashboardMetrics
}

export async function getLeadsByExperience(): Promise<
  { experience_nome: string; total: number; valor_total: number }[]
> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('experience_id, valor_estimado, experiences(nome)')
    .is('deleted_at', null)

  if (error) throw error

  const grouped = (data ?? []).reduce(
    (acc, lead) => {
      const nome = (lead.experiences as unknown as { nome: string } | null)?.nome ?? 'Sem experiência'
      if (!acc[nome]) acc[nome] = { experience_nome: nome, total: 0, valor_total: 0 }
      acc[nome].total++
      acc[nome].valor_total += lead.valor_estimado ?? 0
      return acc
    },
    {} as Record<string, { experience_nome: string; total: number; valor_total: number }>
  )

  return Object.values(grouped).sort((a, b) => b.total - a.total)
}

export async function getLeadsByFonte(): Promise<
  { fonte_label: string; total: number }[]
> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('fonte_label')
    .is('deleted_at', null)

  if (error) throw error

  const grouped = (data ?? []).reduce(
    (acc, lead) => {
      const label = lead.fonte_label ?? 'Desconhecido'
      acc[label] = (acc[label] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(grouped)
    .map(([fonte_label, total]) => ({ fonte_label, total }))
    .sort((a, b) => b.total - a.total)
}

export async function getLeadsByDay(days = 14): Promise<
  { dia: string; total: number }[]
> {
  const supabase = createClient()
  const from = new Date()
  from.setDate(from.getDate() - days)

  const { data, error } = await supabase
    .from('leads')
    .select('created_at')
    .gte('created_at', from.toISOString())
    .is('deleted_at', null)

  if (error) throw error

  const grouped = (data ?? []).reduce(
    (acc, lead) => {
      const dia = new Date(lead.created_at).toISOString().slice(0, 10)
      acc[dia] = (acc[dia] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(grouped)
    .map(([dia, total]) => ({ dia, total }))
    .sort((a, b) => a.dia.localeCompare(b.dia))
}
