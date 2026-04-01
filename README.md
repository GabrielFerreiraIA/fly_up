# 🪂 FlyUp CRM — Sistema de Gestão de Leads

Sistema completo de CRM para gestão de leads de paraquedismo, com captura via webhook, notificações automáticas no WhatsApp e pipeline visual.

---

## Arquitetura

```
Site → Webhook → N8N → WhatsApp (Lead + Grupo)
                    └→ Supabase (PostgreSQL)
                             ↓
                       Next.js CRM (Realtime)
```

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 + App Router |
| UI | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime (WebSocket) |
| Automação | N8N |
| WhatsApp | Evolution API |
| Auth | Supabase Auth |

---

## Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase
```

### 3. Criar o banco de dados
No Supabase Dashboard → SQL Editor, execute:
```sql
-- Cole o conteúdo de supabase/migrations/001_initial_schema.sql
-- Depois cole supabase/seed.sql
```

### 4. Configurar N8N
1. Acesse seu N8N
2. Importe o arquivo `n8n/flyup-lead-workflow.json`
3. Configure as credenciais:
   - **Supabase**: URL + Service Role Key
   - **Evolution API**: URL + Instance + API Key
4. Ative o workflow

### 5. Variáveis de ambiente do N8N
Configure nos envs do N8N:
```
EVOLUTION_API_URL=http://seu-evolution-api
EVOLUTION_INSTANCE=flyup
EVOLUTION_API_KEY=sua-chave-aqui
```

### 6. Rodar o CRM
```bash
npm run dev
# Acesse http://localhost:3000
```

---

## Webhook do Site

O site deve enviar um POST para a URL do N8N:

```
POST https://seu-n8n.com/webhook/flyup-lead
Content-Type: application/json

{
  "nome": "João Silva",
  "telefone": "(11) 99887-6655",
  "email": "joao@email.com",       // opcional
  "experiencia": "salto-duplo",    // ID da tabela experiences
  "fonte": "botao-agendar-salto-duplo",
  "fonte_label": "Botão Agendar — Página Salto Duplo"
}
```

---

## Funcionalidades

### Pipeline Kanban
- Drag & drop entre colunas
- Realtime: novos leads aparecem sem refresh
- Notificação sonora + toast ao receber lead

### Dashboard
- Leads hoje / semana / mês
- Valor potencial acumulado
- Taxa de conversão
- Leads por experiência (gráfico)
- Top fontes de captação
- Linha do tempo (14 dias)

### Cards de Lead
- Badge de temperatura (🔴 Quente / 🟡 Morno / 🔵 Frio / ⭐ VIP)
- Ação rápida WhatsApp e ligação
- Sistema de etiquetas coloridas
- Notas editáveis
- Histórico de movimentações

### Configurações
- Editar experiências e preços (efeito imediato nas mensagens)
- Criar/remover etiquetas visuais com cor e ícone

---

## Estrutura de Arquivos

```
flyup-crm/
├── app/                    # Next.js App Router
│   ├── (auth)/login/      # Página de login
│   ├── (crm)/             # Área protegida do CRM
│   │   ├── dashboard/     # Métricas
│   │   ├── pipeline/      # Kanban
│   │   ├── leads/         # Tabela de leads
│   │   └── config/        # Configurações
│   └── api/webhook/       # Webhook fallback
├── components/             # Componentes React
├── hooks/                  # Hooks customizados
├── lib/
│   ├── supabase/          # Client, server, queries
│   ├── types.ts           # TypeScript types
│   └── utils/             # Utilitários
├── supabase/migrations/   # Schema SQL
├── n8n/                   # Workflow N8N exportado
└── data/experiences.md    # Tabela de preços (referência)
```

---

## Tabela de Fontes

Veja [data/experiences.md](data/experiences.md) para a lista completa de IDs de fontes e preços.

---

*FlyUp CRM v1.0 — Desenvolvido com Synkra AIOS*
