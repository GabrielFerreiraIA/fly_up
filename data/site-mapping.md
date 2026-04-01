# 🗺️ Mapeamento Completo — Botões e Páginas do Site FlyUp

> Este arquivo define o `fonte` (ID técnico) e `fonte_label` (texto legível) de cada ponto de captação do site.
> **Use estes valores exatamente** ao configurar os formulários — eles aparecem na mensagem do grupo e nos cards do CRM.

---

## Como funciona

Cada botão/formulário envia o campo `fonte` no webhook:
```json
{
  "nome": "João Silva",
  "telefone": "11999998888",
  "experiencia": "salto-duplo",
  "fonte": "botao-agendar-salto-duplo",
  "fonte_label": "Botão Agendar — Página Salto Duplo"
}
```

---

## Mapa de Fontes por Página

### 🏠 Página Home (`/`)

| Botão / Elemento | `fonte` | `fonte_label` | `experiencia` |
|-----------------|---------|--------------|--------------|
| Hero CTA principal "Quero Saltar" | `cta-hero-home` | Hero — Página Principal | *(selecionar no form)* |
| Seção Experiências → "Saiba Mais Salto Duplo" | `link-home-salto-duplo` | Link Salto Duplo — Home | `salto-duplo` |
| Seção Experiências → "Saiba Mais AFF" | `link-home-aff` | Link AFF — Home | `salto-solo-aff` |
| Seção Experiências → "Saiba Mais Batismo" | `link-home-batismo` | Link Batismo — Home | `batismo-indoor` |
| Banner flutuante / Sticky CTA | `cta-sticky-home` | Banner Sticky — Home | *(selecionar no form)* |
| Pop-up de Saída (exit intent) | `popup-exit-intent` | Pop-up Saída — Site | *(selecionar no form)* |

---

### 🪂 Página Salto Duplo (`/salto-duplo`)

| Botão / Elemento | `fonte` | `fonte_label` | `experiencia` |
|-----------------|---------|--------------|--------------|
| Botão principal "Agendar Agora" (topo) | `botao-agendar-salto-duplo` | Botão Agendar — Página Salto Duplo | `salto-duplo` |
| Botão "Agendar" (meio da página) | `botao-agendar-salto-duplo-meio` | Botão Agendar Meio — Salto Duplo | `salto-duplo` |
| Botão "Agendar" (rodapé da página) | `botao-agendar-salto-duplo-rodape` | Botão Agendar Rodapé — Salto Duplo | `salto-duplo` |
| Formulário de dúvidas / contato | `form-duvidas-salto-duplo` | Formulário Dúvidas — Salto Duplo | `salto-duplo` |

---

### 🎓 Página AFF / Salto Solo (`/aff`)

| Botão / Elemento | `fonte` | `fonte_label` | `experiencia` |
|-----------------|---------|--------------|--------------|
| Botão "Iniciar Meu Curso" (topo) | `botao-iniciar-aff` | Botão Iniciar — Página AFF | `salto-solo-aff` |
| Botão "Quero Me Tornar Paraquedista" | `botao-cta-aff` | CTA Principal — Página AFF | `salto-solo-aff` |
| Formulário de interesse AFF | `form-interesse-aff` | Formulário Interesse — AFF | `salto-solo-aff` |

---

### 🌀 Página Batismo Indoor (`/batismo`)

| Botão / Elemento | `fonte` | `fonte_label` | `experiencia` |
|-----------------|---------|--------------|--------------|
| Botão "Agendar Batismo" | `botao-agendar-batismo` | Botão Agendar — Página Batismo | `batismo-indoor` |
| Formulário de agendamento | `form-agendamento-batismo` | Formulário Batismo Indoor | `batismo-indoor` |

---

### 🎓 Página Pacote AFF Completo (`/pacote-aff`)

| Botão / Elemento | `fonte` | `fonte_label` | `experiencia` |
|-----------------|---------|--------------|--------------|
| Botão "Quero o Pacote Completo" | `botao-pacote-aff` | Botão Pacote AFF Completo | `pacote-aff` |
| Formulário de matrícula | `form-matricula-aff` | Formulário Matrícula AFF | `pacote-aff` |

---

### 📱 Canais Externos

| Canal | `fonte` | `fonte_label` | `experiencia` |
|-------|---------|--------------|--------------|
| Link na Bio do Instagram | `link-bio-instagram` | Link Bio — Instagram | *(selecionar no form)* |
| Story Instagram com swipe up | `story-instagram` | Story — Instagram | *(selecionar no form)* |
| Google Ads — Salto Duplo | `google-ads-salto-duplo` | Google Ads — Salto Duplo | `salto-duplo` |
| Google Ads — AFF | `google-ads-aff` | Google Ads — AFF | `salto-solo-aff` |
| Facebook Ads | `facebook-ads` | Facebook Ads | *(selecionar no form)* |
| WhatsApp direto (sem formulário) | `whatsapp-direto` | WhatsApp Direto | *(selecionar no form)* |
| Indicação de cliente | `indicacao-cliente` | Indicação de Cliente | *(selecionar no form)* |
| Email marketing | `email-marketing` | E-mail Marketing | *(selecionar no form)* |

---

## IDs de Experiências

Use estes IDs no campo `experiencia` do webhook:

| `experiencia` | Nome | Valor |
|--------------|------|-------|
| `salto-duplo` | Salto Duplo (Tandem) | R$ 1.200,00 |
| `salto-solo-aff` | Salto Solo AFF | R$ 950,00 |
| `batismo-indoor` | Batismo de Voo Indoor | R$ 450,00 |
| `pacote-aff` | Pacote AFF Completo | R$ 6.500,00 |
| `curso-brevet` | Curso de Brevê | R$ 4.200,00 |

---

## Adicionar Nova Fonte

1. Defina um `fonte` único em `kebab-case` (sem espaços, sem acentos)
2. Escreva um `fonte_label` descritivo para aparecer nas mensagens e no CRM
3. Adicione à tabela acima
4. Implemente no código do site (veja `site/webhook-integration.js`)

---

*Última atualização: Fevereiro 2026*
