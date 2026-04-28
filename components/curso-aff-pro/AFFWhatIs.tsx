"use client";

import { motion } from "framer-motion";
import { Wind, Trophy, Shield, Zap } from "lucide-react";

const pillars = [
    {
        icon: Wind,
        title: "Túnel de Vento",
        desc: "Memória muscular antes do primeiro salto real. Tecnologia exclusiva.",
    },
    {
        icon: Trophy,
        title: "Instrutor Recordista",
        desc: "Edu Esteves — atleta de elite e recordista mundial de paraquedismo.",
    },
    {
        icon: Shield,
        title: "Aprovação Eficiente",
        desc: "Metodologia focada em eliminar erros antes de chegar no ar.",
    },
    {
        icon: Zap,
        title: "Preço Fechado",
        desc: "Zero custos ocultos. Tudo incluso, sem surpresas no checkout.",
    },
];

export default function AFFWhatIs() {
    return (
        <section className="relative bg-white overflow-hidden py-28" id="o-que-e">
            {/* Background image — sky, very subtle */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.07] grayscale pointer-events-none"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1475506631979-7271290aa6dd?q=80&w=2000&auto=format&fit=crop')",
                }}
            />

            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />

            <div className="relative z-10 container mx-auto px-6 max-w-6xl">
                {/* ── Headline block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-5 border border-zinc-200 rounded-full px-4 py-1.5">
                        A Formação Definitiva
                    </span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase text-zinc-900 leading-[0.9] tracking-tighter mb-8">
                        O Que é o{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#39FF14] to-emerald-500 pr-2">
                                Curso AFF PRO?
                            </span>
                            {/* Underline accent */}
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#39FF14] to-emerald-500 rounded-full" />
                        </span>
                    </h2>

                    {/* Stylized quote — centered, with big decorative marks */}
                    <div className="relative max-w-3xl mx-auto mt-10">
                        <span
                            className="absolute -top-6 -left-4 text-[80px] leading-none text-[#39FF14] font-serif select-none opacity-60"
                            aria-hidden
                        >
                            "
                        </span>
                        <p className="text-xl md:text-2xl font-serif italic text-zinc-600 leading-relaxed px-10">
                            O único método que combina tecnologia de túnel de vento,
                            instrução de elite e foco absoluto na sua segurança e
                            autonomia — eliminando o{" "}
                            <em className="text-zinc-900 not-italic font-bold">
                                "lucro da reprovação"
                            </em>{" "}
                            das escolas tradicionais.
                        </p>
                        <span
                            className="absolute -bottom-8 -right-4 text-[80px] leading-none text-[#39FF14] font-serif select-none opacity-60"
                            aria-hidden
                        >
                            "
                        </span>
                    </div>
                </motion.div>

                {/* ── Four Pillars ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            viewport={{ once: true }}
                            className="group relative bg-zinc-50 hover:bg-white border border-zinc-100 hover:border-[#39FF14]/30 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#39FF14]/5 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 group-hover:bg-[#39FF14] transition-colors duration-300 mb-4 mx-auto">
                                <p.icon className="w-6 h-6 text-[#39FF14] group-hover:text-black transition-colors duration-300" />
                            </div>
                            <h3 className="font-black uppercase text-zinc-900 text-sm tracking-wide mb-2">
                                {p.title}
                            </h3>
                            <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>

                            {/* Bottom accent line on hover */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-[#39FF14] rounded-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </section>
    );
}
