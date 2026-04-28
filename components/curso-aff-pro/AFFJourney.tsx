"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        number: "01",
        title: "Ground School",
        tag: "Fundamentos & Mindset",
        tagColor: "text-zinc-400",
        description:
            "Imersão teórica completa. Você aprende a linguagem do céu, equipamentos e procedimentos de emergência. Aqui começa a mudança de mentalidade.",
        nodeStyle: "bg-[#39FF14] border-zinc-950",
        nodeTextColor: "text-black",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462570/Curso_Aludo_16-9_b4hf3i",
    },
    {
        number: "02",
        title: "Túnel de Vento",
        tag: "O Diferencial Fly Up",
        tagColor: "text-[#39FF14]",
        description:
            "Aprenda a voar antes de saltar. Em um ambiente controlado, você domina a estabilidade do seu corpo. Isso elimina 90% da ansiedade do primeiro salto.",
        nodeStyle: "bg-zinc-950 border-2 border-[#39FF14]",
        nodeTextColor: "text-[#39FF14]",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462572/Tunel_de_Vento_Editada_16-9_qrd4vh",
    },
    {
        number: "03",
        title: "Saltos Nível 1 a 3",
        tag: "Segurança Máxima",
        tagColor: "text-zinc-400",
        description:
            "Seus primeiros saltos reais. Dois instrutores saltam segurando você o tempo todo, garantindo estabilidade enquanto você pratica os movimentos.",
        nodeStyle: "bg-white border-4 border-zinc-950",
        nodeTextColor: "text-black",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462565/Aluno_AFF_6_Editada_16-9_iznjts",
    },
    {
        number: "04",
        title: "Graduação & Licença",
        tag: "Liberdade Absoluta",
        tagColor: "text-[#39FF14]",
        description:
            "O momento da consagração. Você salta sozinho, pousa e recebe sua licença oficial. Agora você é um paraquedista autônomo pronto para voar em qualquer lugar do mundo.",
        nodeStyle: "bg-[#39FF14] border-zinc-950 shadow-[0_0_40px_rgba(57,255,20,0.6)]",
        nodeTextColor: "text-black",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462563/Aluno_AFF_5_Editado_16-9_tytsbj",
    },
];

// Separate component so it can have its own scroll ref
function TimelineTrack() {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 80%", "end 20%"],
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div
            ref={trackRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block"
            style={{ width: "2px" }}
        >
            {/* Gray track */}
            <div className="absolute inset-0 bg-zinc-800 rounded-full" />
            {/* Glowing neon fill that grows with scroll */}
            <motion.div
                className="absolute top-0 left-0 right-0 rounded-full origin-top"
                style={{
                    scaleY,
                    background: "linear-gradient(to bottom, #39FF14, #22cc0a)",
                    boxShadow: "0 0 16px 2px rgba(57,255,20,0.6)",
                    transformOrigin: "top",
                    bottom: 0,
                }}
            />
        </div>
    );
}

export default function AFFJourney() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden" id="jornada">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />
            {/* Dot grid texture */}
            <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#39FF14_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <span className="text-[#39FF14] font-black uppercase tracking-[0.3em] text-sm mb-4 block">
                        Roadmap
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white leading-none">
                        Sua Jornada até{" "}
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px #39FF14" }}>
                            as Nuvens
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Scroll-tracking vertical bar */}
                    <TimelineTrack />

                    <div className="flex flex-col gap-40 pb-20">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div
                                    key={step.number}
                                    className="relative flex flex-col md:flex-row items-center justify-between group"
                                >
                                    {/* TEXT SIDE */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        className={`w-full md:w-5/12 mb-10 md:mb-0 ${isEven
                                            ? "md:text-right md:pr-16"
                                            : "md:order-last md:text-left md:pl-16"
                                            }`}
                                    >
                                        {/* Big step number */}
                                        <div className={`flex items-center gap-2 mb-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                            <span className="text-zinc-800 font-black text-8xl leading-none select-none tabular-nums">
                                                {step.number}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-2 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className={`text-xs font-black uppercase tracking-[0.25em] mb-5 ${step.tagColor}`}>
                                            {step.tag}
                                        </p>
                                        <p className="text-zinc-500 leading-relaxed text-base">
                                            {step.description}
                                        </p>
                                    </motion.div>

                                    {/* CENTER NODE — shows step number */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        className={`
                                            absolute left-1/2 -translate-x-1/2 z-20
                                            w-16 h-16 rounded-full flex items-center justify-center
                                            transition-transform duration-300 group-hover:scale-125
                                            shadow-[0_0_30px_rgba(57,255,20,0.5)]
                                            ${step.nodeStyle}
                                            hidden md:flex
                                        `}
                                    >
                                        <span className={`font-black text-lg leading-none ${step.nodeTextColor}`}>
                                            {step.number}
                                        </span>
                                    </motion.div>

                                    {/* IMAGE SIDE */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 60 : -60, y: 20 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        className={`w-full md:w-5/12 ${isEven ? "md:pl-16" : "md:order-first md:pr-16"
                                            }`}
                                    >
                                        <div className="relative overflow-hidden rounded-2xl aspect-video border border-zinc-800 group-hover:border-[#39FF14]/60 transition-all duration-500 shadow-2xl">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                            {/* Neon corner accent on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute top-0 left-0 w-16 h-1 bg-[#39FF14]" />
                                                <div className="absolute top-0 left-0 w-1 h-16 bg-[#39FF14]" />
                                                <div className="absolute bottom-0 right-0 w-16 h-1 bg-[#39FF14]" />
                                                <div className="absolute bottom-0 right-0 w-1 h-16 bg-[#39FF14]" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />
        </section>
    );
}
