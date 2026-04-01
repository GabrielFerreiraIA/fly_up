-- ============================================================
-- FLYUP CRM — Seed Data
-- Execute após a migration inicial
-- ============================================================

-- Experiências com preços
INSERT INTO experiences (id, nome, valor_medio, descricao, ativo) VALUES
  ('salto-duplo',     'Salto Duplo (Tandem)',        1200.00, 'Salto tandem com instrutor certificado. A experiência mais popular!', true),
  ('curso-aff',       'Curso AFF',                    950.00, 'Aprenda a voar sozinho. O método de formação de atletas mais rápido e seguro do mundo.', true),
  ('salto-balao',     'Salto de Balão',              1800.00, 'Experiência mística: salto de balão ao amanhecer com visual incrível do nascer do sol.', true),
  ('tunel-vento',     'Túnel de Vento',               350.00, 'Primeira experiência em túnel de vento (First Flight) ou pacote Pro.', true),
  ('wingsuit',        'Wingsuit Experience',          2500.00, 'A elite do voo humano — sustentação e controle do traje planador em alta velocidade.', true),
  ('salto-solo-aff',  'Salto Solo AFF',               950.00, 'Curso progressivo AFF — Level 1 a 8', true),
  ('batismo-indoor',  'Batismo de Voo Indoor',        450.00, 'Primeira experiência em túnel de vento', true),
  ('pacote-aff',      'Pacote AFF Completo',         6500.00, 'Todos os níveis AFF + certificação CBPA', true),
  ('curso-brevet',    'Curso de Brevê',              4200.00, 'Curso completo para tirar licença de paraquedismo', true)
ON CONFLICT (id) DO NOTHING;

-- Tags padrão do sistema
INSERT INTO tag_definitions (nome, cor_hex, icone) VALUES
  ('Urgente',            '#EF4444', '⚡'),
  ('Alta Prioridade',    '#F97316', '🎯'),
  ('Retornar Amanhã',    '#EAB308', '🔁'),
  ('WA Enviado',         '#22C55E', '💬'),
  ('Instagram',          '#A855F7', '📸'),
  ('Google Ads',         '#3B82F6', '🔍'),
  ('VIP',                '#FFD700', '⭐'),
  ('Indicação',          '#10B981', '🤝'),
  ('Grupo WhatsApp',     '#06B6D4', '👥'),
  ('Aguardando Retorno', '#8B5CF6', '⏳')
ON CONFLICT (nome) DO NOTHING;
