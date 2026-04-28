"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, ExternalLink, X, Phone, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FlyUpWebhook, FONTES } from "@/lib/webhook-integration";

// ─── FONTES chave por card ────────────────────────────────────────────────────
const CARD_FONTE: Record<string, string> = {
    "curso-online":       "card-aff-online",
    "teorico-nivel1":     "card-aff-teorico-n1",
    "aff-convencional":   "card-aff-convencional",
    "aff-pro":            "card-aff-pro",
};

// Registrar as fontes se ainda não estiverem no mapa global
if (!FONTES["card-aff-online"])       FONTES["card-aff-online"]      = "Card Curso Online — Comece do Seu Jeito";
if (!FONTES["card-aff-teorico-n1"])   FONTES["card-aff-teorico-n1"]  = "Card Teórico + N1 — Comece do Seu Jeito";
if (!FONTES["card-aff-convencional"]) FONTES["card-aff-convencional"]= "Card AFF Convencional — Comece do Seu Jeito";
if (!FONTES["card-aff-pro"])          FONTES["card-aff-pro"]         = "Card AFF PRO — Comece do Seu Jeito";

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type Feature = {
    text: string;
    strikethrough: boolean;
};

type PricingOption = {
    id: string;
    title: string;
    subtitle: string;
    pricePrefix: string;
    priceMain: string;
    priceSub: string;
    description: string;
    features: Feature[];
    highlight: boolean;
    button: {
        text: string;
        url: string;
        external: boolean;
        /** Se true, abre o modal de captura para redirecionar ao WhatsApp */
        leadModal?: boolean;
        /** Mensagem pré-definida para o WhatsApp (após captura do lead) */
        waMessage?: string;
        /** Título de experiência para o CRM */
        experiencia?: string;
    };
    infoLabel?: string;
};

// ─── DADOS DOS CARDS ─────────────────────────────────────────────────────────
const options: PricingOption[] = [
    {
        id: "curso-online",
        title: "Curso Online",
        subtitle: "Paraquedismo Online",
        pricePrefix: "R$",
        priceMain: "234,00",
        priceSub: "Pagamento único",
        description: "Faça no seu tempo, no sofá da sua sala.",
        features: [
            { text: "Vídeo aulas dinâmicas", strikethrough: false },
            { text: "Conteúdo em módulos", strikethrough: false },
            { text: "Provas de conhecimento", strikethrough: false },
            { text: "Apostila PDF inclusa", strikethrough: false },
            { text: "Vídeos de níveis AFF", strikethrough: false }
        ],
        highlight: false,
        button: {
            text: "Comprar Agora",
            url: "https://cursodeparaquedismo.com.br",
            external: true,
            leadModal: false,
        }
    },
    {
        id: "teorico-nivel1",
        title: "Teórico + Nível 1",
        subtitle: "Iniciação ao Esporte",
        pricePrefix: "R$",
        priceMain: "1.500,00",
        priceSub: "Estimativa",
        description: "O primeiro passo real no esporte com instrução e seu primeiro salto prático.",
        features: [
            { text: "10 horas de curso presencial", strikethrough: false },
            { text: "Material didático digital", strikethrough: false },
            { text: "Exercícios de emergência", strikethrough: false },
            { text: "Treinamento de solo (Harness)", strikethrough: false },
            { text: "Salto Nível 1 (2 Instrutores)", strikethrough: false }
        ],
        highlight: false,
        button: {
            text: "Começar Iniciação",
            url: "https://wa.me/5515998282280",
            external: true,
            leadModal: true,
            waMessage: "Olá! Tenho interesse em começar pelo Curso Teórico + Nível 1. Podem me passar mais informações?",
            experiencia: "Teórico + Nível 1",
        },
        infoLabel: "Valor aproximado para o primeiro nível prático."
    },
    {
        id: "aff-convencional",
        title: "AFF Convencional",
        subtitle: "Curso Padrão",
        pricePrefix: "R$",
        priceMain: "5.800,00",
        priceSub: "Estimativa",
        description: "O curso completo de paraquedismo na modalidade tradicional pelas escolas.",
        features: [
            { text: "Curso teórico completo", strikethrough: false },
            { text: "Material Didático Premium", strikethrough: false },
            { text: "Saltos de instrução (1 ao 7)", strikethrough: false },
            { text: "Equipamentos de salto inclusos", strikethrough: false },
            { text: "Treinamento em Túnel de Vento", strikethrough: true },
            { text: "Mentoria de Atleta", strikethrough: false }
        ],
        highlight: false,
        button: {
            text: "Agendar Padrão",
            url: "https://wa.me/5515998282280",
            external: true,
            leadModal: true,
            waMessage: "Olá! Tenho interesse no Curso AFF Convencional. Podem me passar mais informações?",
            experiencia: "AFF Convencional",
        }
    },
    {
        id: "aff-pro",
        title: "AFF PRO",
        subtitle: "A Formação Premium",
        pricePrefix: "6x",
        priceMain: "1.050",
        priceSub: "Ou R$ 5.900,00 à vista",
        description: "O método validado que forma atletas com segurança e sem surpresas financeiras.",
        features: [
            { text: "Túnel de Vento (Diferencial)", strikethrough: false },
            { text: "2 Instrutores nos níveis iniciais", strikethrough: false },
            { text: "Equipamento Elite em todos saltos", strikethrough: false },
            { text: "Gravação Full HD e Debriefing", strikethrough: false },
            { text: "Preço Fechado - Sem taxas extras", strikethrough: false },
            { text: "Kit Atleta Fly Up Completo", strikethrough: false },
            { text: "Acesso à Área VIP Fly Up", strikethrough: false }
        ],
        highlight: true,
        button: {
            text: "Quero ser AFF PRO",
            url: "https://wa.me/5515998282280",
            external: true,
            leadModal: true,
            waMessage: "Olá! Tenho interesse no Curso AFF PRO. Podem me passar mais informações?",
            experiencia: "AFF PRO",
        }
    }
];

// ─── MINI MODAL DE CAPTURA ────────────────────────────────────────────────────
interface LeadModalProps {
    isOpen: boolean;
    option: PricingOption | null;
    onClose: () => void;
}

function LeadModal({ isOpen, option, onClose }: LeadModalProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Reset ao abrir
    useEffect(() => {
        if (isOpen) {
            setName("");
            setPhone("");
            setIsSubmitting(false);
            setIsDone(false);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        let f = v;
        if (v.length > 0) {
            f = `(${v.slice(0, 2)}`;
            if (v.length > 2) f += `) ${v.slice(2, 7)}`;
            if (v.length > 7) f += `-${v.slice(7)}`;
        }
        setPhone(f);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!option) return;
        setIsSubmitting(true);

        const telefone = `+55${phone.replace(/\D/g, "")}`;
        const fonte = CARD_FONTE[option.id] || "geral";
        const experiencia = option.button.experiencia || option.title;

        try {
            await FlyUpWebhook.send({ nome: name, telefone }, fonte, experiencia);
        } catch (_) {
            // falha silenciosa — ainda redireciona
        }

        setIsDone(true);

        // Aguarda 1.5s e então redireciona ao WhatsApp
        setTimeout(() => {
            const msg = encodeURIComponent(option.button.waMessage || "Olá! Tenho interesse no curso.");
            window.open(`${option.button.url}?text=${msg}`, "_blank", "noopener,noreferrer");
            onClose();
        }, 1500);
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && option && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                        className="relative w-full max-w-[400px] bg-zinc-950 rounded-3xl shadow-[0_0_60px_rgba(57,255,20,0.12)] ring-1 ring-[#39FF14]/30 p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-1.5 text-zinc-500 hover:text-white transition-colors hover:rotate-90 duration-300"
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>

                        {isDone ? (
                            <div className="flex flex-col items-center text-center py-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring" }}
                                    className="w-16 h-16 rounded-full bg-[#39FF14] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(57,255,20,0.4)]"
                                >
                                    <CheckCircle2 className="text-black" size={32} strokeWidth={3} />
                                </motion.div>
                                <h3 className="text-xl font-black italic text-white uppercase tracking-tight">
                                    Registrado!
                                </h3>
                                <p className="text-zinc-500 text-xs mt-2">
                                    Redirecionando para o WhatsApp...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <p className="text-[#39FF14] text-[10px] font-black uppercase tracking-widest mb-1">
                                        {option.subtitle}
                                    </p>
                                    <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">
                                        {option.title}
                                    </h3>
                                    <p className="text-zinc-500 text-xs mt-2">
                                        Preencha rapidinho e fale com nossa equipe agora.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Nome */}
                                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus-within:border-[#39FF14] transition-colors">
                                        <User size={16} className="text-zinc-500 flex-shrink-0" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-transparent w-full text-white text-sm font-semibold placeholder:text-zinc-600 outline-none"
                                        />
                                    </div>

                                    {/* Telefone */}
                                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus-within:border-[#39FF14] transition-colors">
                                        <Phone size={16} className="text-zinc-500 flex-shrink-0" />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="(85) 99999-9999"
                                            value={phone}
                                            onChange={handlePhone}
                                            className="bg-transparent w-full text-white text-sm font-semibold placeholder:text-zinc-600 outline-none tracking-widest font-mono"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-[#39FF14] hover:bg-[#2ecc11] text-black font-black uppercase tracking-wider text-sm rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all disabled:opacity-60"
                                    >
                                        {isSubmitting ? "Enviando..." : "Falar no WhatsApp"}
                                        <ArrowRight size={16} strokeWidth={3} />
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function AFFAlternativePricing() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<PricingOption | null>(null);

    const handleButtonClick = (opt: PricingOption) => {
        if (opt.button.leadModal) {
            setSelectedOption(opt);
            setModalOpen(true);
        } else {
            window.open(opt.button.url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <>
            <LeadModal
                isOpen={modalOpen}
                option={selectedOption}
                onClose={() => setModalOpen(false)}
            />

            <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                            Flexibilidade Total
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white leading-none mb-6">
                            Comece do{" "}
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px #39FF14" }}>
                                Seu Jeito
                            </span>
                        </h2>
                        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
                            Aqui você escolhe como fazer o curso. Opte por consumir apenas a teoria online da sua casa, fazer os primeiros níveis ou escolher a formação mais completa e premium do Ceará.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {options.map((opt, i) => (
                            <motion.div
                                key={opt.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative p-6 lg:p-8 rounded-3xl flex flex-col border ${opt.highlight
                                    ? "border-[#39FF14] bg-zinc-900/60 shadow-[0_0_50px_rgba(57,255,20,0.15)] ring-1 ring-[#39FF14]/50 z-10 lg:-translate-y-4"
                                    : "border-zinc-800 bg-zinc-900/40"
                                    } group hover:border-[#39FF14]/50 transition-all duration-300`}
                            >
                                {/* Header */}
                                <div className="mb-5 pb-5 border-b border-zinc-800/80">
                                    <h3 className={`font-black uppercase italic ${opt.highlight ? "text-3xl" : "text-xl"} text-white tracking-wide mb-1`}>
                                        {opt.title}
                                    </h3>
                                    <p className="text-[#39FF14] text-xs font-bold uppercase tracking-widest opacity-80">
                                        {opt.subtitle}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className={`text-zinc-500 font-bold ${opt.highlight ? "text-xl" : "text-sm"}`}>
                                            {opt.pricePrefix}
                                        </span>
                                        <span className={`text-white font-black tracking-tighter ${opt.highlight ? "text-6xl" : "text-4xl"}`}>
                                            {opt.pricePrefix === "R$" ? "" : "R$"} {opt.priceMain}
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-zinc-800/50 rounded-lg px-3 py-1.5 border border-zinc-700/50">
                                        <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider">
                                            {opt.priceSub}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    {opt.description}
                                </p>

                                {/* Features — flex-1 empurra o restante para baixo */}
                                <ul className="space-y-3 flex-1 mb-6">
                                    {opt.features.map((feat, j) => (
                                        <li
                                            key={j}
                                            className={`flex items-start gap-2 text-sm ${feat.strikethrough ? "text-zinc-500/60 line-through" : "text-zinc-300"}`}
                                        >
                                            <div className={`p-1 rounded-full mt-0.5 flex-shrink-0 ${feat.strikethrough
                                                ? "bg-zinc-800/50 text-zinc-600"
                                                : opt.highlight
                                                    ? "bg-[#39FF14]/20 text-[#39FF14]"
                                                    : "bg-zinc-800 text-zinc-500 group-hover:text-[#39FF14] group-hover:bg-[#39FF14]/10"
                                                } transition-all`}>
                                                {feat.strikethrough
                                                    ? <X className="w-2.5 h-2.5 flex-shrink-0" />
                                                    : <Check className="w-2.5 h-2.5 flex-shrink-0" />
                                                }
                                            </div>
                                            <span className="leading-tight">{feat.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Info note (antes do botão) */}
                                {opt.infoLabel && (
                                    <div className="flex gap-2 items-start mb-4 pt-3 border-t border-zinc-800/50">
                                        <Info className="w-3.5 h-3.5 text-zinc-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-[10px] text-zinc-500 leading-tight">
                                            {opt.infoLabel}
                                        </p>
                                    </div>
                                )}

                                {/* Action Button — sempre na base */}
                                <button
                                    onClick={() => handleButtonClick(opt)}
                                    className={`w-full flex items-center justify-center gap-2 py-4 font-black uppercase tracking-wider text-sm rounded-xl transition-all ${opt.highlight
                                        ? "bg-[#39FF14] hover:bg-[#2ecc11] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                                        }`}
                                >
                                    {opt.button.text}
                                    {!opt.button.leadModal && opt.button.external && (
                                        <ExternalLink className="w-4 h-4" />
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
