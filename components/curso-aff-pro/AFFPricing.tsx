"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const pricing = [
    {
        title: "Ground School",
        price: "R$ 450",
        desc: "A base técnica essencial.",
        features: [
            "10h de instrução presencial",
            "Manual AFF Digital",
            "Simulador de solo",
            "Briefing de primeiro salto",
            "Certificado teórico"
        ],
        icon: ShieldCheck
    },
    {
        title: "Formação Completa",
        price: "R$ 8.900",
        desc: "Os 7 níveis + Graduação.",
        features: [
            "Ground School Incluso",
            "Todos os 7 saltos AFF",
            "Aluguel de Equipamento Completo",
            "Dobragens Inclusas",
            "Debriefing em Vídeo (High Tech)",
            "Acesso à Área VIP Fly Up"
        ],
        highlight: true,
        icon: Zap
    },
    {
        title: "Clube da Evolução",
        price: "R$ 1.200",
        desc: "Aperfeiçoamento pós-curso.",
        features: [
            "Coaching Pro individual",
            "Monitoria de navegação",
            "Descontos em saltos solo",
            "Workshops de dobragem avançada",
            "Kit Atleta Fly Up"
        ],
        icon: Star
    }
];

export default function AFFPricing() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase italic mb-4">Seu <span className="text-neon">Investimento</span></h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-tighter">O valor de se tornar um paraquedista de verdade</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricing.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-[35px] border ${plan.highlight ? 'bg-zinc-900 border-neon shadow-[0_20px_50px_rgba(57,255,20,0.1)]' : 'bg-black border-zinc-800'} flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon text-black text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest shadow-lg">
                                    Combo Recomendado
                                </div>
                            )}

                            <div className="mb-8">
                                <plan.icon className={`w-12 h-12 mb-6 ${plan.highlight ? 'text-neon' : 'text-zinc-500'}`} />
                                <h3 className="text-2xl font-black italic uppercase text-white mb-2">{plan.title}</h3>
                                <p className="text-zinc-500 text-xs font-bold uppercase">{plan.desc}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-black italic text-white">{plan.price}</span>
                                <span className="text-zinc-500 text-sm ml-2">à vista</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-1 ${plan.highlight ? 'text-neon' : 'text-zinc-600'}`} />
                                        <span className="text-sm text-zinc-400 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => setIsBookingOpen(true)}
                                className={`w-full py-8 rounded-2xl font-black italic uppercase text-lg transition-all ${plan.highlight ? 'bg-neon text-black hover:bg-neon-hover shadow-lg shadow-neon/20' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                            >
                                Iniciar Matrícula
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zinc-500 text-xs font-bold uppercase italic">* Parcelamento em até 12x no cartão de crédito disponível sob consulta.</p>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                experienceTitle="Matrícula AFF Pro"
                source="form-matricula-aff"
            />
        </section>
    );
}
