# 🪂 Tabela de Experiências e Valores — FlyUp

> **Fonte de verdade dos preços.**
> Este arquivo serve como referência para a IA e para a equipe.
> Para atualizar preços no sistema, edite via **CRM → Configurações → Experiências**.
> O banco de dados Supabase (`experiences`) é a fonte usada pelo N8N e pelo CRM.

---

## Preços Atuais

| ID | Experiência | Valor Médio | Descrição |
|----|-------------|-------------|-----------|
| `salto-duplo` | **Salto Duplo (Tandem)** | R$ 1.200,00 | Salto tandem com instrutor certificado. Não exige experiência prévia. |
| `salto-solo-aff` | **Salto Solo AFF** | R$ 950,00 | Curso progressivo AFF — Level 1 a 8. Certificação CBPA. |
| `batismo-indoor` | **Batismo de Voo Indoor** | R$ 450,00 | Primeira experiência em túnel de vento. Ideal para crianças e iniciantes. |
| `pacote-aff` | **Pacote AFF Completo** | R$ 6.500,00 | Todos os níveis AFF + certificação + 5 saltos livres. |
| `curso-brevet` | **Curso de Brevê** | R$ 4.200,00 | Curso completo para tirar licença de paraquedismo CBPA. |

---

## Como os Preços Aparecem

1. **Mensagem WA para o Grupo** — O N8N busca o `valor_medio` da tabela `experiences` pelo `experience_id` recebido no webhook
2. **Card do CRM** — O campo `valor_estimado` no card é preenchido automaticamente pelo trigger do banco
3. **Métricas do Dashboard** — O "Valor Potencial" soma todos os `valor_estimado` dos leads ativos

---

## Como Atualizar

### Via CRM (recomendado)
1. Acesse o CRM → **Configurações** → **Experiências**
2. Clique no ícone de editar na linha desejada
3. Altere o valor e salve — efeito imediato

### Via Supabase Dashboard
1. Acesse `supabase.com` → seu projeto → Table Editor → `experiences`
2. Edite diretamente na tabela

---

## Fontes de Lead (IDs usados no webhook)

Use estes IDs no atributo `fonte` dos formulários do site:

| ID da Fonte | Descrição |
|-------------|-----------|
| `botao-agendar-salto-duplo` | Botão Agendar — Página Salto Duplo |
| `botao-agendar-aff` | Botão Agendar — Página AFF |
| `botao-cta-home` | CTA Principal — Home |
| `popup-exit-intent` | Pop-up de saída |
| `link-bio-instagram` | Link na bio do Instagram |
| `google-ads-salto-duplo` | Google Ads — campanha Salto Duplo |
| `whatsapp-direto` | WhatsApp direto (sem formulário) |
| `indicacao-cliente` | Indicação de cliente |

> Adicione novos IDs aqui conforme cria novos pontos de captação no site.
