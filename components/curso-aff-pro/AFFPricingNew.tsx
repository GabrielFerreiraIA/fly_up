"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, Shield } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const items = [
    { label: "Curso Teórico Completo (Ground School)", price: "R$ 1.200", bonus: false },
    { label: "Treinamento em Túnel de Vento (15min)", price: "R$ 900", bonus: false },
    { label: "7 Saltos de Instrução (Equipamento + Vaga)", price: "R$ 9.800", bonus: false },
    { label: "Filmagens Full HD para Debriefing", price: "R$ 1.500", bonus: false },
    { label: "Logbook Oficial & Kit Fly Up", price: "BÔNUS", bonus: true },
    { label: "Acesso à Comunidade VIP (WhatsApp)", price: "INESTIMÁVEL", bonus: true },
];

const TOTAL_ANCHOR = "R$ 15.000+";
const FINAL_PRICE = "6.900";
const INSTALLMENT = "680,00";
const INSTALLMENTS = "12";

export default function AFFPricingNew() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden" id="preco">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#39FF14_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#39FF14]/4 rounded-full blur-3xl pointer-events-none" />

            {/* Background Image - Same as 5 motivos section, now filling the whole area */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <img
                    src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470435/Banner_Paraquedas_1_xzqj4x.png"
                    alt="Céu Fly Up"
                    className="w-full h-full object-cover grayscale opacity-20 mix-blend-overlay"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-[#39FF14] mb-4 border border-[#39FF14]/30 rounded-full px-4 py-1.5">
                        Investimento Único
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white leading-none">
                        Invista na sua{" "}
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #39FF14' }}>
                            Liberdade
                        </span>
                    </h2>
                    <p className="mt-6 text-xl md:text-2xl font-black uppercase text-[#39FF14] tracking-[0.2em]">
                        CURSO AFF PRO
                    </p>
                </motion.div>


                {/* Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(57,255,20,0.08)] overflow-hidden">
                        {/* Glow top right */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-[#39FF14]/8 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        {/* Oferta badge */}
                        <div className="absolute top-6 right-6">
                            <span className="bg-[#39FF14] text-black font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                                Oferta Especial
                            </span>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            {/* LEFT: What you get */}
                            <div className="flex-1">
                                <h3 className="text-white font-black uppercase tracking-widest text-xl mb-6 pb-4 border-b border-zinc-800">
                                    O Que Você Recebe:
                                </h3>

                                <ul className="space-y-4">
                                    {items.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            viewport={{ once: true }}
                                            className="flex items-start justify-between gap-4 pb-3 border-b border-dashed border-zinc-800/70 last:border-0"
                                        >
                                            <span className="flex items-start gap-2 text-zinc-300 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-[#39FF14] flex-shrink-0 mt-0.5" />
                                                {item.label}
                                            </span>
                                            {item.bonus ? (
                                                <span className="text-[#39FF14] font-black text-xs uppercase tracking-widest whitespace-nowrap flex-shrink-0">
                                                    {item.price}
                                                </span>
                                            ) : (
                                                <span className="text-zinc-600 font-bold text-sm line-through whitespace-nowrap flex-shrink-0">
                                                    {item.price}
                                                </span>
                                            )}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Anchor total */}
                                <div className="mt-6 flex justify-between items-center bg-zinc-800/50 rounded-xl px-5 py-4">
                                    <span className="text-zinc-400 font-black uppercase tracking-widest text-sm">
                                        Valor Total Real
                                    </span>
                                    <span className="text-zinc-400 font-black text-2xl line-through decoration-red-500 decoration-2">
                                        {TOTAL_ANCHOR}
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT: Price + CTA */}
                            <div className="w-full lg:w-80 flex flex-col items-center text-center">
                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-bold">
                                    Investimento Único
                                </p>

                                {/* Price */}
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-zinc-400 text-lg font-bold">6x</span>
                                        <span className="text-white font-black text-6xl md:text-7xl tracking-tighter">
                                            R$ 1.050
                                        </span>
                                    </div>
                                    <p className="text-[#39FF14] font-black text-sm uppercase tracking-widest mt-2 bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20">
                                        Ou R$ 5.900,00 à vista
                                    </p>
                                </div>

                                {/* Installment box - Removed as it's now the main focus */}
                                <div className="w-full bg-white/5 border border-zinc-700 rounded-xl p-4 mb-6">
                                    <p className="text-zinc-400 text-xs text-center leading-relaxed">
                                        *Equipamento completo, macacão, capacete, altímetro e rádio inclusos em todos os saltos.
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full py-5 bg-[#39FF14] hover:bg-[#2ecc11] text-black font-black italic uppercase text-2xl rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:shadow-[0_0_50px_rgba(57,255,20,0.7)] transition-all duration-300 mb-4"
                                >
                                    Quero Saltar
                                </motion.button>

                                {/* Trust signals */}
                                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                                    <Lock className="w-3 h-3" />
                                    <span>Compra 100% Segura</span>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-zinc-600 text-xs">
                                    <Shield className="w-3 h-3 text-[#39FF14]" />
                                    <span>Escola homologada pela CBP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                experienceTitle="Curso AFF Pro — Vaga Garantida"
                source="form-matricula-aff"
            />
        </section>
    );
}
