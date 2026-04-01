/**
 * FlyUp — Integração de Webhook para o Site
 *
 * Copie este arquivo para o projeto do site e importe onde precisar.
 * Configure a URL do N8N em FLYUP_WEBHOOK_URL.
 *
 * Uso:
 *   import { FlyUpWebhook } from './webhook-integration'
 *   FlyUpWebhook.send({ nome, telefone, email }, 'botao-agendar-salto-duplo')
 */

// ============================================================
// CONFIGURAÇÃO — altere apenas esta URL
// ============================================================
const FLYUP_WEBHOOK_URL = 'https://n8n.server.sermelhor.site/webhook-test/flyup-lead'

// ============================================================
// MAPA DE FONTES — cada botão/página tem um ID único
// Para adicionar novos, consulte data/site-mapping.md
// ============================================================
const FONTES = {
  // Home
  'cta-hero-home': 'Hero — Página Principal',
  'link-home-salto-duplo': 'Link Salto Duplo — Home',
  'link-home-aff': 'Link AFF — Home',
  'link-home-batismo': 'Link Batismo — Home',
  'cta-sticky-home': 'Banner Sticky — Home',
  'popup-exit-intent': 'Pop-up Saída — Site',

  // Salto Duplo
  'botao-agendar-salto-duplo': 'Botão Agendar — Página Salto Duplo',
  'botao-agendar-salto-duplo-meio': 'Botão Agendar Meio — Salto Duplo',
  'botao-agendar-salto-duplo-rodape': 'Botão Agendar Rodapé — Salto Duplo',
  'form-duvidas-salto-duplo': 'Formulário Dúvidas — Salto Duplo',

  // AFF
  'botao-iniciar-aff': 'Botão Iniciar — Página AFF',
  'botao-cta-aff': 'CTA Principal — Página AFF',
  'form-interesse-aff': 'Formulário Interesse — AFF',

  // Batismo
  'botao-agendar-batismo': 'Botão Agendar — Página Batismo',
  'form-agendamento-batismo': 'Formulário Batismo Indoor',

  // Pacote AFF
  'botao-pacote-aff': 'Botão Pacote AFF Completo',
  'form-matricula-aff': 'Formulário Matrícula AFF',

  // Externos
  'link-bio-instagram': 'Link Bio — Instagram',
  'story-instagram': 'Story — Instagram',
  'google-ads-salto-duplo': 'Google Ads — Salto Duplo',
  'google-ads-aff': 'Google Ads — AFF',
  'facebook-ads': 'Facebook Ads',
  'whatsapp-direto': 'WhatsApp Direto',
  'indicacao-cliente': 'Indicação de Cliente',
  'email-marketing': 'E-mail Marketing',
}

// ============================================================
// PAYLOAD BUILDER — monta o objeto para enviar ao N8N
// ============================================================

/**
 * @param {object} formData - Dados do formulário preenchidos pelo lead
 * @param {string} formData.nome       - Nome completo do lead
 * @param {string} formData.telefone   - Telefone com ou sem formatação
 * @param {string} [formData.email]    - Email (opcional)
 * @param {string} fonte               - ID da fonte (veja FONTES acima)
 * @param {string} [experiencia]       - ID da experiência (ex: 'salto-duplo')
 * @returns {object} payload pronto para enviar
 */
function buildPayload(formData, fonte, experiencia) {
  const fonteLabel = FONTES[fonte] || fonte

  return {
    nome: formData.nome?.trim() || '',
    telefone: formData.telefone?.replace(/\D/g, '') || '',
    email: formData.email?.trim() || '',
    experiencia: experiencia || '',
    fonte,
    fonte_label: fonteLabel,
  }
}

// ============================================================
// SEND — envia o webhook e retorna { ok, leadId, error }
// ============================================================

/**
 * @param {object} formData - Dados do formulário
 * @param {string} fonte - ID da fonte (ex: 'botao-agendar-salto-duplo')
 * @param {string} [experiencia] - ID da experiência (ex: 'salto-duplo')
 * @returns {Promise<{ ok: boolean, leadId?: string, error?: string }>}
 */
async function send(formData, fonte, experiencia) {
  const payload = buildPayload(formData, fonte, experiencia)

  try {
    const response = await fetch(FLYUP_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` }
    }

    const data = await response.json()
    return { ok: true, leadId: data.lead_id }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

// ============================================================
// EXPORT
// ============================================================
const FlyUpWebhook = { send, buildPayload, FONTES }

// CommonJS + ESM dual export
if (typeof module !== 'undefined') {
  module.exports = { FlyUpWebhook, send, FONTES }
}
if (typeof window !== 'undefined') {
  window.FlyUpWebhook = FlyUpWebhook
}

export { FlyUpWebhook, send, FONTES }
