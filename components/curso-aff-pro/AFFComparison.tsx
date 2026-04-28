"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, CheckCircle2, ChevronDown, AlertTriangle, Wind, Target, Trophy, DollarSign, Brain, Layers } from "lucide-react";
import { useState } from "react";

// ── Comparison Table ──────────────────────────────────────────────────────────
const comparisonRows = [
    {
        feature: "Treino em Túnel de Vento",
        Icon: Wind,
        flyup: { label: "Incluso", type: "badge-green" },
        traditional: { label: "Inexistente", type: "badge-red" },
    },
    {
        feature: "Foco do Treinamento",
        Icon: Target,
        flyup: { label: "Aprovação Eficiente", type: "text-bold" },
        traditional: { label: "Lucro na Repetição", type: "text-dim" },
    },
    {
        feature: "Instrutor",
        Icon: Trophy,
        flyup: { label: "Elite / Recordista Mundial", type: "text-bold" },
        traditional: { label: "Instrutor Padrão", type: "text-dim" },
    },
    {
        feature: "Custos Extras Ocultos",
        Icon: DollarSign,
        flyup: { label: "Zero (Preço Fechado)", type: "text-bold" },
        traditional: { label: "Pagamento por reprovação", type: "text-dim" },
    },
    {
        feature: "Preparo Psicológico",
        Icon: Brain,
        flyup: { label: "Simulação Realista", type: "text-bold" },
        traditional: { label: "Apenas Teórico", type: "text-dim" },
    },
    {
        feature: "Metodologia",
        Icon: Layers,
        flyup: { label: "Progressiva & Validada", type: "text-bold" },
        traditional: { label: "Genérica", type: "text-dim" },
    },
];

// ── What's Included ───────────────────────────────────────────────────────────
const includedItems = [
    {
        icon: "📚",
        title: "Curso Teórico Completo",
        short: "10h de imersão em aerodinâmica, segurança e mentalidade de atleta.",
        detail:
            "Aulas presenciais com Edu Esteves cobrindo aerodinâmica, equipamentos, procedimentos de emergência, meteorologia e a mentalidade de um atleta de elite. Material didático digital incluso.",
    },
    {
        icon: "🌀",
        title: "15 Min de Túnel (Exclusivo)",
        short: "Memória muscular antes do primeiro salto real.",
        detail:
            "Sessão exclusiva no túnel de vento com instrutor ao lado. Você aprende a controlar seu corpo em queda livre num ambiente 100% seguro, eliminando 90% da ansiedade do primeiro salto.",
    },
    {
        icon: "🪂",
        title: "7 Saltos de Instrução",
        short: "Do nível 1 com 2 instrutores até o voo solo.",
        detail:
            "7 saltos progressivos com instrutores certificados. Níveis 1-3: dois instrutores ao seu lado. Níveis 4-7: um instrutor. Cada salto é filmado para debriefing técnico.",
    },
    {
        icon: "🎽",
        title: "Equipamento Premium",
        short: "Macacão, altímetro e rádio incluso em todos os saltos.",
        detail:
            "Todo o equipamento necessário está incluso: macacão profissional, altímetro digital, rádio de comunicação e capacete. Você não precisa comprar nada extra.",
    },
    {
        icon: "🎬",
        title: "Filmagens para Debriefing",
        short: "Full HD de cada salto para análise técnica.",
        detail:
            "Câmeras em capacete e no solo capturam cada salto em Full HD. As filmagens são usadas em sessões de debriefing para identificar pontos de melhoria e acelerar seu aprendizado.",
    },
    {
        icon: "📖",
        title: "Logbook Oficial (ABPQD)",
        short: "Caderneta de saltos homologada pela Associação.",
        detail:
            "Logbook oficial homologado pela Associação Brasileira de Paraquedismo (ABPQD), necessário para registrar todos os seus saltos e obter sua licença de paraquedista.",
    },
];

function ComparisonTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                {/* Header */}
                <thead>
                    <tr>
                        <th className="text-left py-4 px-4 text-zinc-400 text-xs uppercase tracking-widest font-bold w-1/3" />
                        <th className="py-4 px-6 w-1/3 align-bottom">
                            <div className="bg-black text-white rounded-t-xl py-3 px-4 border-t-4 border-[#39FF14] shadow-[0_-10px_20px_rgba(57,255,20,0.15)] relative z-10">
                                <span className="font-black italic uppercase text-lg tracking-wide block">
                                    Método Fly Up
                                </span>
                            </div>
                        </th>
                        <th className="py-4 px-6 w-1/3 align-bottom">
                            <div className="py-3 px-4">
                                <span className="text-zinc-500 font-bold italic uppercase text-base tracking-wide">
                                    Escolas Comuns
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-zinc-950/40 backdrop-blur-sm">
                    {comparisonRows.map((row, i) => (
                        <tr key={i} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-900/50 transition-colors">
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                                        <row.Icon className="w-4 h-4 text-zinc-400" />
                                    </div>
                                    <span className="text-zinc-300 text-xs font-black uppercase tracking-widest">
                                        {row.feature}
                                    </span>
                                </div>
                            </td>
                            {/* Fly Up Column - Highlighted BG */}
                            <td className="py-5 px-6 text-center bg-[#39FF14]/5 relative border-r border-l border-zinc-800">
                                {/* Green accent line on left/right for the column feel */}
                                <div className="flex items-center justify-center gap-2">
                                    {row.flyup.type === "badge-green" ? (
                                        <span className="inline-block bg-[#39FF14] text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                                            {row.flyup.label}
                                        </span>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5 text-[#39FF14] stroke-[3px]" />
                                            <span className="text-white font-bold text-sm tracking-tight">{row.flyup.label}</span>
                                        </>
                                    )}
                                </div>
                            </td>
                            {/* Traditional Column */}
                            <td className="py-5 px-6 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    {row.traditional.type === "badge-red" ? (
                                        <span className="inline-block bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                            {row.traditional.label}
                                        </span>
                                    ) : (
                                        <>
                                            <X className="w-5 h-5 text-red-500 stroke-[3px]" />
                                            <span className="text-red-500/80 text-sm font-bold uppercase tracking-wide">{row.traditional.label}</span>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function IncludedCard({ item, index }: { item: typeof includedItems[0]; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            viewport={{ once: true }}
            className={`
                border rounded-xl cursor-pointer transition-all duration-300 overflow-hidden relative group
                ${open
                    ? "border-[#39FF14]/50 bg-zinc-900/80 shadow-[0_0_30px_rgba(57,255,20,0.05)]"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60"
                }
            `}
            onClick={() => setOpen(!open)}
        >
            {/* Fine grid texture overlay on card */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="flex items-center justify-between p-5 relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${open ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'}`}>
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className={`font-black uppercase tracking-wide text-sm transition-colors ${open ? 'text-white' : 'text-zinc-300'}`}>
                            {item.title}
                        </p>
                        <p className="text-zinc-500 text-xs mt-0.5">{item.short}</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-1 rounded-full ${open ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-5 pb-5 pt-0 relative z-10">
                            <div className="h-px w-full bg-zinc-800 mb-4" />
                            <p className="text-zinc-400 text-sm leading-relaxed">{item.detail}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function AFFComparison() {
    return (
        <>
            {/* ── SECTION 1: Fly Up VS Tradicional (WHITE BG) ────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden" id="comparativo">
                {/* Subtle sky image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-[0.04] grayscale pointer-events-none"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1475506631979-7271290aa6dd?q=80&w=2000&auto=format&fit=crop')" }}
                />

                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-4 border border-zinc-200 rounded-full px-4 py-1.5">
                            Por que a Fly Up é Diferente?
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-zinc-900 leading-none">
                            Fly Up{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-500">
                                VS
                            </span>{" "}
                            Tradicional
                        </h2>

                        {/* Alert strip */}
                        <div className="mt-8 inline-flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-6 py-3 shadow-sm">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <p className="text-xs text-zinc-700 font-medium">
                                <span className="font-bold text-red-600">Alerta:</span>{" "}
                                Escolas tradicionais lucram com reprovações —{" "}
                                <span className="font-bold">mais erros = mais receita para elas.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        viewport={{ once: true }}
                        className="bg-zinc-950 rounded-2xl shadow-[0_0_80px_rgba(57,255,20,0.12)] border border-zinc-800 overflow-hidden relative"
                    >
                        {/* Internal glow for total pop */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent pointer-events-none" />
                        <ComparisonTable />
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: What's Included (BLACK BG + TEXTURE) ──────────────── */}
            <section className="py-24 bg-zinc-950 relative overflow-hidden" id="incluso">
                {/* Fine grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                    }}
                />
                {/* Radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(57,255,20,0.04),transparent)] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-[#39FF14] font-black uppercase tracking-[0.3em] text-sm mb-3 block">
                            Transparência Total
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white leading-none">
                            Tudo que você recebe ao se tornar{" "}
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px #39FF14" }}>
                                AFF PRO
                            </span>
                        </h2>
                        <p className="text-zinc-500 mt-4 text-sm max-w-xl mx-auto">
                            Tudo o que você precisa para se tornar um paraquedista autônomo, sem surpresas no checkout.
                        </p>
                    </motion.div>

                    {/* Cards Grid — expandable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        {includedItems.map((item, i) => (
                            <IncludedCard key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
