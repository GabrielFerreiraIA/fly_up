"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

export default function AFFHero() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image/Video placeholder */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462569/Curso_AFF_Editada_16-9_lg5vuc"
                    alt="AFF Skydiving"
                    className="w-full h-full object-cover opacity-60"
                />

                {/* Dark overlay with pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                {/* Extra bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center transform translate-y-[-5%]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Main Headline */}
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
                            <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                                Curso de
                            </div>
                            <div className="text-white drop-shadow-[0_0_40px_rgba(57,255,20,0.1)]">
                                Paraquedismo
                            </div>
                        </h1>
                    </div>

                    <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-12 font-medium leading-relaxed tracking-wide">
                        Método AFF: A tecnologia mais segura e rápida para você conquistar sua licença internacional e dominar os céus.
                    </p>

                    <div className="flex justify-center">
                        <Button
                            onClick={() => setIsBookingOpen(true)}
                            className="bg-white hover:bg-[#39FF14] text-black font-black italic uppercase text-lg px-12 py-8 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center">
                                Iniciar Formação <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Footer Bar - Cleaner Version */}
            <div className="absolute bottom-10 left-0 w-full px-6 z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 group hover:bg-white/[0.08] transition-all duration-500">
                        {/* Left: Location */}
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Localização</span>
                            <div className="flex items-center gap-2 text-white font-bold italic uppercase tracking-tight">
                                <MapPin className="w-4 h-4 text-[#39FF14]" />
                                Boituva, SP
                            </div>
                        </div>

                        {/* Center: Stats */}
                        <div className="flex items-center gap-12 md:gap-16">
                            <div className="text-center group-hover:scale-105 transition-transform">
                                <div className="text-2xl md:text-3xl font-black italic text-white mb-1">4.9/5</div>
                                <div className="flex items-center justify-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-2.5 h-2.5 text-[#39FF14] fill-[#39FF14]" />
                                    ))}
                                </div>
                            </div>

                            <div className="text-center px-8 border-x border-white/5 group-hover:scale-105 transition-transform">
                                <div className="text-2xl md:text-3xl font-black italic text-white mb-1">+1850</div>
                                <div className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em]">Alunos Formados</div>
                            </div>
                        </div>

                        {/* Right: Status */}
                        <div className="flex flex-col items-center md:items-end">
                            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Próxima Turma</span>
                            <div className="flex items-center gap-3 text-[#39FF14] font-black italic uppercase text-sm tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-ping" />
                                Turma Alpha
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                experienceTitle="Vaga: Turma Alpha AFF"
                source="botao-iniciar-aff"
            />
        </section >
    );
}
