/**
 * FlyUp — Integração de Webhook para o Site
 *
 * Configure a URL do N8N em FLYUP_WEBHOOK_URL.
 */

const FLYUP_WEBHOOK_URL_TEST = 'https://n8n.server.sermelhor.site/webhook-test/flyup-lead';
const FLYUP_WEBHOOK_URL_PROD = 'https://n8n.server.sermelhor.site/webhook/flyup-lead';

export const FONTES: Record<string, string> = {
    // Home
    'cta-hero-home': 'Hero — Página Principal',
    'link-home-salto-duplo': 'Link Salto Duplo — Home',
    'link-home-curso-aff': 'Link Curso AFF — Home',
    'link-home-salto-balao': 'Link Voos e Saltos de Balão — Home',
    'link-home-tunel-vento': 'Link Túnel de Vento — Home',
    'link-home-wingsuit': 'Link Wingsuit — Home',
    'link-home-aff': 'Link AFF — Home (legado)',
    'link-home-batismo': 'Link Batismo — Home (legado)',
    'cta-sticky-home': 'Banner Sticky — Home',
    'popup-exit-intent': 'Pop-up Saída — Site',

    // Salto Duplo
    'botao-agendar-salto-duplo': 'Botão Agendar — Página Salto Duplo',
    'botao-agendar-salto-duplo-meio': 'Botão Agendar Meio — Salto Duplo',
    'botao-agendar-salto-duplo-rodape': 'Botão Agendar Rodapé — Salto Duplo',
    'salto-duplo-page': 'Página Salto Duplo',
    'form-duvidas-salto-duplo': 'Formulário Dúvidas — Salto Duplo',

    // Salto de Balão
    'botao-agendar-salto-balao': 'Botão Agendar — Página Salto de Balão',

    // AFF / Curso AFF
    'botao-agendar-aff': 'Botão Agendar — Página Curso AFF',
    'botao-iniciar-aff': 'Botão Iniciar — Página AFF',
    'botao-cta-aff': 'CTA Principal — Página AFF',
    'form-interesse-aff': 'Formulário Interesse — AFF',

    // Comece do Seu Jeito — Cards de Pricing
    'card-aff-online':       'Card Curso Online — Comece do Seu Jeito',
    'card-aff-teorico-n1':   'Card Teórico + N1 — Comece do Seu Jeito',
    'card-aff-convencional': 'Card AFF Convencional — Comece do Seu Jeito',
    'card-aff-pro':          'Card AFF PRO — Comece do Seu Jeito',


    // Batismo Indoor
    'botao-agendar-batismo': 'Botão Agendar — Página Batismo Indoor',
    'form-agendamento-batismo': 'Formulário Batismo Indoor',

    // Pacote AFF
    'botao-pacote-aff': 'Botão Pacote AFF Completo',
    'form-matricula-aff': 'Formulário Matrícula AFF',

    // Túnel de Vento
    'botao-agendar-tunel-vento': 'Botão Agendar — Página Túnel de Vento',

    // Wingsuit Experience
    'botao-agendar-wingsuit': 'Botão Agendar — Página Wingsuit Experience',

    // Curso Wingsuit
    'botao-agendar-curso-wingsuit': 'Botão Agendar — Página Curso Wingsuit',

    // Externos
    'link-bio-instagram': 'Link Bio — Instagram',
    'story-instagram': 'Story — Instagram',
    'google-ads-salto-duplo': 'Google Ads — Salto Duplo',
    'google-ads-aff': 'Google Ads — AFF',
    'facebook-ads': 'Facebook Ads',
    'whatsapp-direto': 'WhatsApp Direto',
    'indicacao-cliente': 'Indicação de Cliente',
    'email-marketing': 'E-mail Marketing',
};

interface FormData {
    nome: string;
    telefone: string;
    email?: string;
}

// Mapa fixo: título da experiência no site → ID da tabela `experiences` no Supabase
// Garante a FK correta sem depender de slug automático
export const EXPERIENCE_IDS: Record<string, string> = {
    'Salto Duplo':          'salto-duplo',
    'Curso AFF':            'curso-aff',
    'Salto de Balão':       'salto-balao',
    'Voos e Saltos de Balão': 'salto-balao',
    'Túnel de Vento':       'tunel-vento',
    'Wingsuit':             'wingsuit',
    'Wingsuit Experience':  'wingsuit',
    'Pacote AFF Completo':  'pacote-aff',
    'Curso de Brevê':       'curso-brevet',
    'Salto Solo AFF':       'salto-solo-aff',
    'Batismo Indoor':       'batismo-indoor',
    'Batismo de Voo Indoor':'batismo-indoor',
};

export function buildPayload(formData: FormData, fonte: string = 'geral', experiencia: string = '') {
    const fonteLabel = FONTES[fonte] || fonte;

    // Resolve o ID da experiência usando o mapa fixo (fallback para slug automático)
    const telefoneNumerico = formData.telefone;
    const experienceId = EXPERIENCE_IDS[experiencia]
        || experiencia.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return {
        nome: formData.nome?.trim() || '',
        telefone: telefoneNumerico,
        telefone_br: telefoneNumerico.startsWith('+55') ? telefoneNumerico.replace('+55', '') : '',
        email: formData.email?.trim() || '',
        experience_id: experienceId,
        experience_nome: experiencia,
        fonte: fonte,
        fonte_label: fonteLabel,
        data_hora: new Date().toISOString(),
        webhook_payload: JSON.stringify({ ...formData, fonte, experiencia })
    };
}

export async function sendWebhook(formData: FormData, fonte: string = 'geral', experiencia: string = '') {
    const payload = buildPayload(formData, fonte, experiencia);

    try {
        // Envia para ambas as URLs de forma assíncrona para que capte no painel de Teste e no fluxo Ativo.
        const reqs = [FLYUP_WEBHOOK_URL_PROD, FLYUP_WEBHOOK_URL_TEST].map(url =>
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }).catch(e => ({ ok: false, error: e.message })) // Isola erros caso o de teste não esteja escutando
        );

        const responses = await Promise.all(reqs);

        // Consideramos sucesso se a chamada de produção funcionar (primeiro elemento)
        const prodResponse: any = responses[0];

        if (!prodResponse || prodResponse.ok === false) {
            return { ok: false, error: prodResponse?.error || `HTTP Invalido Prod` };
        }

        const data = await prodResponse.json?.();
        return { ok: true, leadId: data?.lead_id };
    } catch (err: any) {
        return { ok: false, error: err.message };
    }
}

export const FlyUpWebhook = { send: sendWebhook, buildPayload, FONTES };
