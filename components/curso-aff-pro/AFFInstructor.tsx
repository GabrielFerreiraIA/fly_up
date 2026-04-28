"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

export default function AFFInstructor() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section className="relative py-24 bg-white overflow-hidden" id="instrutor">
            {/* Top border line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            {/* Subtle neon green accent shapes in background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#39FF14]/5 -skew-x-12 transform translate-x-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#39FF14]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

                    {/* LEFT: Edu's Photo with neon accent border */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Neon green shadow/border behind image */}
                        <div className="absolute inset-0 bg-[#39FF14] rounded-lg transform translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5" />

                        {/* Photo - grayscale that reveals on hover */}
                        <img
                            src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771461011/Foto_Edu_Editada_Reduzida_pqwdly"
                            alt="Edu Esteves - Instrutor e Recordista"
                            className="relative rounded-lg shadow-2xl w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 object-cover aspect-[4/5]"
                        />

                        {/* Name badge - bottom right */}
                        <div className="absolute bottom-6 -right-4 bg-black text-white px-5 py-3 rounded-lg shadow-2xl border-l-4 border-[#39FF14]">
                            <p className="text-white font-black italic uppercase text-lg leading-none">Edu Esteves</p>
                            <p className="text-[#39FF14] text-xs uppercase tracking-widest font-bold mt-1 text-nowrap">Recordista Mundial & Campeão Brasileiro</p>
                        </div>
                    </motion.div>

                    {/* RIGHT: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        {/* Eyebrow */}
                        <p className="text-[#39FF14] font-black uppercase tracking-[0.25em] text-sm mb-3">
                            Sua Referência
                        </p>

                        {/* Main Headline */}
                        <h2 className="text-5xl md:text-6xl font-black italic uppercase text-black leading-[0.9] mb-6">
                            A Elite do<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">
                                Paraquedismo
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                            Edu Esteves não ensina apenas a saltar, ele forma a mentalidade de um atleta do céu. Com uma carreira construída sobre segurança extrema e performance, ele é a autoridade que vai guiar sua transformação.
                        </p>

                        {/* Stats Cards - Dark on White */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-black text-white rounded-xl p-4">
                                <div className="text-2xl md:text-3xl font-black italic text-white leading-none mb-1">+13.000</div>
                                <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Saltos</div>
                            </div>
                            <div className="bg-black text-white rounded-xl p-4">
                                <div className="text-2xl md:text-3xl font-black italic text-white leading-none mb-1">+1850</div>
                                <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Alunos</div>
                            </div>
                            <div className="bg-[#39FF14] text-black rounded-xl p-4">
                                <div className="flex items-center gap-1 mb-1">
                                    <Award className="w-4 h-4" />
                                    <div className="text-2xl md:text-3xl font-black italic leading-none">Top 1%</div>
                                </div>
                                <div className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Mundial</div>
                            </div>
                        </div>

                        {/* Quote */}
                        <blockquote className="border-l-4 border-[#39FF14] pl-4 mb-8">
                            <p className="text-zinc-600 text-sm italic leading-relaxed">
                                &ldquo;Meu objetivo não é só te ensinar a saltar. É te dar a mentalidade de quem domina o céu.&rdquo;
                            </p>
                            <cite className="text-zinc-400 text-xs font-black uppercase tracking-widest mt-2 block not-italic">— Edu Esteves</cite>
                        </blockquote>

                        {/* CTA Link */}
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="inline-flex items-center gap-2 text-[#39FF14] font-black uppercase tracking-widest text-sm hover:gap-4 transition-all duration-300 group"
                        >
                            Agendar com o Mentor
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                experienceTitle="Mentoria com Edu Esteves"
                source="form-interesse-aff"
            />
        </section>
    );
}
