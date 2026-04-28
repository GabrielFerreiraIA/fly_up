"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Medal,
    Plane,
    CloudSun,
    Feather,
    ChevronLeft,
    ChevronRight,
    CheckCircle2
} from "lucide-react";

// Data Configuration
const SAFETY_ITEMS = [
    {
        id: 0,
        title: "Tecnologia DAA",
        subtitle: "Equipamento Inteligente",
        description: "Todo paraquedas da Fly Up é equipado com o sistema CYPRES (Cybernetic Parachute Release System). É um computador de bordo de tecnologia alemã que monitora altitude e velocidade, garantindo a abertura automática do reserva se necessário. É a mesma tecnologia usada por militares em todo o mundo.",
        icon: Shield,
        navLabel: "Tecnologia DAA"
    },
    {
        id: 1,
        title: "Instrutores de Elite",
        subtitle: "Certificação Internacional",
        description: "Nossa equipe não é apenas experiente, é a elite. Todos os instrutores possuem certificações USPA (United States Parachute Association) e entidades brasileiras do esporte, com milhares de saltos computados. Você não vai saltar com um iniciante, mas com um especialista em voo humano.",
        icon: Medal,
        navLabel: "Instrutores"
    },
    {
        id: 2,
        title: "Aeronave Turbo",
        subtitle: "Caravan Blackhawk",
        description: "Operamos com o Cessna Grand Caravan, a aeronave mais segura e eficiente do paraquedismo mundial. Motor turboélice, manutenção rigorosa seguindo padrões aeronáuticos e capacidade para subir a 12.000 pés em tempo recorde com total estabilidade.",
        icon: Plane,
        navLabel: "Aeronave"
    },
    {
        id: 3,
        title: "Controle Climático",
        subtitle: "Monitoramento Real-Time",
        description: "Segurança não se negocia. Temos uma estação meteorológica dedicada no dropzone. Monitoramos ventos, nuvens e visibilidade em tempo real. Se as condições não forem 100% perfeitas e seguras para o seu nível de salto, nós não decolamos.",
        icon: CloudSun,
        navLabel: "Clima"
    },
    {
        id: 4,
        title: "Pouso Suave",
        subtitle: "Técnica de Chegada",
        description: "O medo de 'cair' é comum, mas o pouso é um deslizamento. Nossos paraquedas modernos (Retangulares Ram-Air) permitem um planeio suave, controlado por freios aerodinâmicos. Na maioria das vezes, você pousa suavemente em pé ou deslizando na grama.",
        icon: Feather, // Changed from PlaneLanding
        navLabel: "Pouso"
    }
];

export default function SafetyObjections() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleTabClick = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % SAFETY_ITEMS.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + SAFETY_ITEMS.length) % SAFETY_ITEMS.length);
    };

    // Derived state for prev/next labels in the footer
    const prevItem = SAFETY_ITEMS[(activeIndex - 1 + SAFETY_ITEMS.length) % SAFETY_ITEMS.length];
    const nextItem = SAFETY_ITEMS[(activeIndex + 1) % SAFETY_ITEMS.length];

    return (
        <section className="relative py-24 bg-zinc-950 overflow-hidden">
            {/* Background Image - Grey Filtered but Visible */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470435/Banner_Paraquedas_1_xzqj4x.png"
                    alt="Céu Fly Up"
                    className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-zinc-950" />
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        5 Razões Para <span className="text-transparent" style={{ WebkitTextStroke: "1px #39FF14" }}>Confiar</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Entenda por que o paraquedismo moderno é um dos esportes mais seguros do mundo quando praticado com profissionais de elite.
                    </p>
                </div>

                {/* Icons Navigation - Dark/Neon variant */}
                <div className="flex justify-center mb-12">
                    <div className="flex gap-4 md:gap-8 overflow-x-auto pb-10 pt-4 px-4 md:px-0 w-full md:w-auto scrollbar-hide snap-x items-center">
                        {SAFETY_ITEMS.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabClick(index)}
                                    className={`relative flex flex-col items-center gap-4 min-w-[90px] md:min-w-[110px] group transition-all duration-300 snap-center focus:outline-none`}
                                >
                                    {/* Icon Circle */}
                                    <div className={`
                                        w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 relative z-10
                                        ${isActive
                                            ? "border-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_20px_rgba(57,255,20,0.3)] scale-110"
                                            : "border-zinc-800 bg-zinc-900 group-hover:border-zinc-600 text-zinc-500 group-hover:text-zinc-300"}
                                    `}>
                                        <item.icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${isActive ? "text-[#39FF14]" : "text-current"}`} strokeWidth={1.5} />
                                    </div>

                                    {/* Label */}
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-[#39FF14]" : "text-zinc-600 group-hover:text-zinc-500"}`}>
                                        {item.navLabel}
                                    </span>

                                    {/* Connecting Line Segment */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute -bottom-8 w-px h-8 bg-gradient-to-b from-[#39FF14] to-transparent z-0"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Card - Dark Glassmorphism */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">

                        {/* Decorative Top Border Gradient */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent" />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col items-center text-center"
                            >
                                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-2 text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                                    {SAFETY_ITEMS[activeIndex].title}
                                </h3>
                                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">
                                    {SAFETY_ITEMS[activeIndex].subtitle}
                                </p>

                                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl font-light">
                                    {SAFETY_ITEMS[activeIndex].description}
                                </p>

                                <div className="mt-8 flex gap-2 text-[#39FF14]/80">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Protocolo de Elite Verificado</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Internal Navigation (Footer of Card) */}
                        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center w-full">
                            <button
                                onClick={handlePrev}
                                className="group flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-500 hover:text-white transition-colors text-left uppercase tracking-wider"
                            >
                                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#39FF14]" />
                                <div>
                                    <span className="opacity-50 text-[10px] block">Anterior</span>
                                    {prevItem.navLabel}
                                </div>
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex gap-1.5 ">
                                {SAFETY_ITEMS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-[#39FF14]" : "bg-zinc-800"}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="group flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-500 hover:text-white transition-colors text-right uppercase tracking-wider"
                            >
                                <div>
                                    <span className="opacity-50 text-[10px] block">Próximo</span>
                                    {nextItem.navLabel}
                                </div>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#39FF14]" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

// Add custom scrollbar hiding utility if not present in global css
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
