import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import type { WebhookPayload } from '@/lib/types'

// Webhook fallback — caso o N8N esteja indisponível, o site pode chamar este endpoint
// diretamente para garantir que o lead seja salvo no Supabase.
// Normalmente o N8N é a rota primária (ele também faz as mensagens WA).

export async function POST(req: NextRequest) {
  try {
    // Verificar secret para segurança básica
    const authHeader = req.headers.get('authorization')
    const expectedSecret = process.env.WEBHOOK_SECRET
    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: WebhookPayload = await req.json()

    if (!body.nome || !body.telefone) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, telefone' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Buscar valor da experiência
    let valor_estimado: number | null = null
    if (body.experiencia) {
      const { data: exp } = await supabase
        .from('experiences')
        .select('valor_medio')
        .eq('id', body.experiencia)
        .single()
      valor_estimado = exp?.valor_medio ?? null
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        nome: body.nome.trim(),
        telefone: body.telefone,
        email: body.email ?? null,
        experience_id: body.experiencia ?? null,
        fonte: body.fonte ?? 'webhook-direto',
        fonte_label: body.fonte_label ?? body.fonte ?? 'Webhook Direto',
        valor_estimado,
        webhook_payload: body,
        wa_lead_enviado: false,   // N8N não foi usado — mensagens não foram enviadas
        wa_grupo_enviado: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Webhook: erro ao inserir lead:', error)
      return NextResponse.json({ error: 'Erro ao salvar lead' }, { status: 500 })
    }

    return NextResponse.json({
      status: 'ok',
      lead_id: data.id,
      message: 'Lead salvo via webhook direto (N8N indisponível)',
    })
  } catch (err) {
    console.error('Webhook: erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
