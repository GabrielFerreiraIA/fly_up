"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const testimonials = [
    {
        id: 1,
        quote: '"Me fez renascer"',
        name: "Marcelo Yamin",
        role: "Aluno AFF",
        description:
            "A “Fly Up Paraquedismo” atráves da sua equipe e em especial ao Edú Esteves, foi a casa que me acolheu, nutriu e me fez renascer assim como um lagarto no casulo que no final da metamorfose sai voando!",
        thumbnail: "https://img.youtube.com/vi/AVCIwOep8r4/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=AVCIwOep8r4",
        tag: "Renascimento",
        tagColor: "bg-[#39FF14] text-black",
    },
    {
        id: 2,
        quote: '"Segurança e Técnica Impecáveis"',
        name: "Douglas Reis",
        role: "Aluno AFF",
        description:
            "Douglas destaca a metodologia Fly Up e a mentoria de Edu Esteves como diferenciais na sua formação, ressaltando a paciência e a competência técnica da equipe.",
        thumbnail: "https://img.youtube.com/vi/VgjGTvRV9uU/maxresdefault.jpg",
        videoUrl: "https://youtu.be/VgjGTvRV9uU",
        tag: "Evolução",
        tagColor: "bg-black text-white",
    },
    {
        id: 3,
        quote: '"Experiência Inesquecível"',
        name: "Arthur Santos",
        role: "Aluno AFF",
        description: "Arthur compartilha sua jornada desde o primeiro salto até a formatura no curso AFF PRO da Fly Up.",
        thumbnail: "https://img.youtube.com/vi/uEFD155jnqM/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=uEFD155jnqM",
        tag: "Liberdade",
        tagColor: "bg-[#39FF14] text-black",
    },
    {
        id: 4,
        quote: '"Domínio dos Céus"',
        name: "Lucas Ferreira",
        role: "Aluno AFF",
        description: "Lucas detalha como a mentoria de Edu Esteves ajudou a superar o medo e dominar as técnicas de queda livre.",
        thumbnail: "https://img.youtube.com/vi/za18UUDqpMc/maxresdefault.jpg",
        videoUrl: "https://youtu.be/za18UUDqpMc",
        tag: "Performance",
        tagColor: "bg-black text-white",
    },
];

export default function AFFTestimonialVideos() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="historias">
            {/* Subtle green blob */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#39FF14] font-black uppercase tracking-[0.3em] text-sm mb-3 block">
                        Depoimentos Reais
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black italic uppercase text-black leading-none">
                        Histórias de quem{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">
                            se tornou paraquedista
                        </span>
                    </h2>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onMouseEnter={() => setHoveredId(t.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => window.open(t.videoUrl, "_blank")}
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl mb-6 border border-zinc-200 group-hover:border-[#39FF14]/50 transition-all duration-300">
                                <img
                                    src={t.thumbnail}
                                    alt={t.quote}
                                    className="w-full h-full object-cover opacity-100 transition-all duration-500 group-hover:scale-105"
                                />

                                {/* Tag - Moved to right */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${t.tagColor}`}>
                                        {t.tag}
                                    </span>
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <motion.div
                                        animate={{ scale: hoveredId === t.id ? 1.15 : 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-20 h-20 bg-[#39FF14] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(57,255,20,0.6)]"
                                    >
                                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                                    </motion.div>
                                </div>

                                {/* Quote at bottom - Subtle gradient just for text shadow */}
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <p className="text-white font-black italic uppercase text-xl leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
                                        {t.quote}
                                    </p>
                                </div>
                            </div>

                            {/* Card Info */}
                            <div className="px-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#39FF14] font-black text-base shadow-lg">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-black font-black text-base uppercase tracking-wide">{t.name}</p>
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-zinc-600 text-base leading-relaxed italic border-l-2 border-[#39FF14]/30 pl-4">{t.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA nudge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-zinc-400 text-sm uppercase tracking-[0.3em] font-black">
                        +1850 histórias reais no nosso legado
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
