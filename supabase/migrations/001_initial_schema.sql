-- ============================================================
-- FLYUP CRM LEAD SYSTEM — Schema v1.0
-- Supabase PostgreSQL | Multi-usuário | RLS | Realtime
-- ============================================================

-- =========================
-- 1. EXPERIÊNCIAS
-- =========================
CREATE TABLE IF NOT EXISTS experiences (
  id            TEXT PRIMARY KEY,
  nome          TEXT NOT NULL,
  valor_medio   NUMERIC(10,2) NOT NULL,
  descricao     TEXT,
  ativo         BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE experiences IS 'Catálogo de experiências com preços. Editável via CRM → Configurações.';

-- =========================
-- 2. TAG DEFINITIONS
-- =========================
CREATE TABLE IF NOT EXISTS tag_definitions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome       TEXT NOT NULL UNIQUE,
  cor_hex    TEXT NOT NULL DEFAULT '#6B7280',
  icone      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 3. ENUM TYPES
-- PostgreSQL não suporta CREATE TYPE IF NOT EXISTS — usamos bloco DO com EXCEPTION
-- =========================
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'novo',
    'a_contactar',
    'qualificado',
    'convertido',
    'perdido'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_temperatura AS ENUM (
    'quente',
    'morno',
    'frio',
    'vip'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- =========================
-- 4. LEADS
-- =========================
CREATE TABLE IF NOT EXISTS leads (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome                  TEXT NOT NULL,
  telefone              TEXT NOT NULL,
  telefone_normalizado  TEXT GENERATED ALWAYS AS (
                          regexp_replace(telefone, '[^0-9]', '', 'g')
                        ) STORED,
  email                 TEXT,
  experience_id         TEXT REFERENCES experiences(id),
  fonte                 TEXT NOT NULL,
  fonte_label           TEXT,
  status                lead_status DEFAULT 'novo',
  temperatura           lead_temperatura DEFAULT 'morno',
  valor_estimado        NUMERIC(10,2),
  notas                 TEXT,
  webhook_payload       JSONB,
  wa_lead_enviado       BOOLEAN DEFAULT false,
  wa_grupo_enviado      BOOLEAN DEFAULT false,
  responsavel_id        UUID REFERENCES auth.users(id),
  deleted_at            TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE leads IS 'Lead capturado via webhook. responsavel_id = usuário do CRM que assumiu o lead.';
COMMENT ON COLUMN leads.fonte IS 'Identificador do botão/origem. Ex: botao-agendar-salto-duplo';
COMMENT ON COLUMN leads.webhook_payload IS 'Payload raw do webhook para auditoria';

-- =========================
-- 5. LEAD TAGS
-- =========================
CREATE TABLE IF NOT EXISTS lead_tags (
  lead_id    UUID REFERENCES leads(id) ON DELETE CASCADE,
  tag_id     UUID REFERENCES tag_definitions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (lead_id, tag_id)
);

-- =========================
-- 6. STATUS HISTORY
-- =========================
CREATE TABLE IF NOT EXISTS status_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID REFERENCES leads(id) ON DELETE CASCADE,
  status_anterior lead_status,
  status_novo     lead_status NOT NULL,
  agente          TEXT DEFAULT 'system',
  agente_user_id  UUID REFERENCES auth.users(id),
  notas           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 7. NOTIFICATION LOG
-- =========================
CREATE TABLE IF NOT EXISTS notification_log (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id             UUID REFERENCES leads(id) ON DELETE CASCADE,
  tipo                TEXT NOT NULL CHECK (tipo IN ('wa_lead', 'wa_grupo', 'email')),
  destinatario        TEXT NOT NULL,
  mensagem            TEXT NOT NULL,
  status              TEXT DEFAULT 'enviado' CHECK (status IN ('enviado', 'erro', 'pendente')),
  n8n_execution_id    TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX IF NOT EXISTS idx_leads_status        ON leads(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_created_at    ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_temperatura   ON leads(temperatura) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_experience    ON leads(experience_id);
CREATE INDEX IF NOT EXISTS idx_leads_fonte         ON leads(fonte);
CREATE INDEX IF NOT EXISTS idx_leads_telefone      ON leads(telefone_normalizado);
CREATE INDEX IF NOT EXISTS idx_leads_responsavel   ON leads(responsavel_id);
CREATE INDEX IF NOT EXISTS idx_status_history_lead ON status_history(lead_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notif_log_lead      ON notification_log(lead_id);

-- =========================
-- FUNÇÕES E TRIGGERS
-- =========================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS experiences_updated_at ON experiences;
CREATE TRIGGER experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION calc_lead_temperatura()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  hora_atual INT := EXTRACT(HOUR FROM NOW() AT TIME ZONE 'America/Sao_Paulo');
  valor_est  NUMERIC;
BEGIN
  SELECT valor_medio INTO valor_est FROM experiences WHERE id = NEW.experience_id;

  IF valor_est IS NOT NULL THEN
    NEW.valor_estimado := valor_est;
  END IF;

  IF NEW.valor_estimado > 5000 THEN
    NEW.temperatura := 'vip';
  ELSIF hora_atual BETWEEN 9 AND 20 THEN
    NEW.temperatura := 'quente';
  ELSE
    NEW.temperatura := 'morno';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_calc_temperatura ON leads;
CREATE TRIGGER leads_calc_temperatura
  BEFORE INSERT ON leads
  FOR EACH ROW EXECUTE FUNCTION calc_lead_temperatura();

CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO status_history(lead_id, status_anterior, status_novo, agente)
    VALUES (NEW.id, OLD.status, NEW.status, 'crm_user');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_status_history ON leads;
CREATE TRIGGER leads_status_history
  AFTER UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION log_status_change();

-- =========================
-- REALTIME
-- =========================
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE lead_tags;

-- =========================
-- RLS POLICIES
-- =========================
ALTER TABLE leads             ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tags         ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_history    ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log  ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_definitions   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "crm_all_authenticated"  ON leads;
DROP POLICY IF EXISTS "crm_read_experiences"   ON experiences;
DROP POLICY IF EXISTS "crm_manage_experiences" ON experiences;
DROP POLICY IF EXISTS "crm_read_tags"          ON tag_definitions;
DROP POLICY IF EXISTS "crm_manage_tags"        ON tag_definitions;
DROP POLICY IF EXISTS "crm_manage_lead_tags"   ON lead_tags;
DROP POLICY IF EXISTS "crm_read_history"       ON status_history;
DROP POLICY IF EXISTS "crm_insert_history"     ON status_history;
DROP POLICY IF EXISTS "crm_read_notif_log"     ON notification_log;

CREATE POLICY "crm_all_authenticated" ON leads
  FOR ALL TO authenticated
  USING (deleted_at IS NULL)
  WITH CHECK (true);

CREATE POLICY "crm_read_experiences" ON experiences
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "crm_manage_experiences" ON experiences
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "crm_read_tags" ON tag_definitions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "crm_manage_tags" ON tag_definitions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "crm_manage_lead_tags" ON lead_tags
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "crm_read_history" ON status_history
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "crm_insert_history" ON status_history
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "crm_read_notif_log" ON notification_log
  FOR SELECT TO authenticated USING (true);

-- =========================
-- VIEW — Dashboard Metrics
-- =========================
CREATE OR REPLACE VIEW dashboard_metrics AS
SELECT
  COUNT(*) FILTER (
    WHERE DATE_TRUNC('day', created_at AT TIME ZONE 'America/Sao_Paulo')
        = DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Sao_Paulo')
  ) AS leads_hoje,
  COUNT(*) FILTER (
    WHERE created_at >= NOW() - INTERVAL '7 days'
  ) AS leads_semana,
  COUNT(*) FILTER (
    WHERE created_at >= NOW() - INTERVAL '30 days'
  ) AS leads_mes,
  COALESCE(SUM(valor_estimado) FILTER (
    WHERE status NOT IN ('perdido') AND deleted_at IS NULL
  ), 0) AS valor_potencial_total,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'convertido')::NUMERIC /
    NULLIF(COUNT(*) FILTER (WHERE deleted_at IS NULL), 0) * 100, 1
  ) AS taxa_conversao_pct,
  COUNT(*) FILTER (WHERE status = 'novo'        AND deleted_at IS NULL) AS total_novos,
  COUNT(*) FILTER (WHERE status = 'a_contactar' AND deleted_at IS NULL) AS total_a_contactar,
  COUNT(*) FILTER (WHERE status = 'qualificado' AND deleted_at IS NULL) AS total_qualificados,
  COUNT(*) FILTER (WHERE status = 'convertido'  AND deleted_at IS NULL) AS total_convertidos,
  COUNT(*) FILTER (WHERE status = 'perdido'     AND deleted_at IS NULL) AS total_perdidos
FROM leads;
