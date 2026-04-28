"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { Trophy, CheckCircle2, Youtube, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
    { label: "Saltos Realizados", value: 1300, suffix: "+", prefix: "" },
    { label: "Alunos Formados", value: 1850, suffix: "+", prefix: "" },
    { label: "Segurança", value: 100, suffix: "%", prefix: "" },
    { label: "Canal do Youtube", value: 1, suffix: "", prefix: "#TOP" },
];

function Counter({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
            }
        });
    }, [springValue, suffix, prefix]);

    return <span ref={ref} className="tabular-nums" />;
}

export default function Authority() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 0.5], [12, 0]); // Rotates from 12deg to 0deg as you scroll down
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

    return (
        <section className="py-24 relative overflow-hidden bg-black" ref={ref}>
            {/* Background Pattern - CLEARLY VISIBLE */}
            <div
                className="absolute inset-0 z-0 opacity-100"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470427/Backgorund_1_pk1aal.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            {/* Subtle Gradient for text readability only on the left */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Content Side (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] w-12 bg-neon" />
                            <span className="text-neon font-bold tracking-[0.2em] uppercase text-sm">O LEGADO</span>
                        </div>

                        {/* Headlines */}
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white mb-2">
                            MAIS QUE SALTAR.
                        </h2>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-transparent relative mb-12">
                            <span className="absolute inset-0 text-[#39FF14] opacity-20 blur-xl select-none pointer-events-none" style={{ textShadow: '0 0 30px rgba(57,255,20,0.6)' }}>
                                TEM QUE SABER VOAR.
                            </span>
                            <span style={{ WebkitTextStroke: '2px #39FF14' }}>
                                TEM QUE SABER VOAR.
                            </span>
                        </h2>

                        {/* Quote */}
                        <div className="border-l-4 border-neon pl-6 py-2 mb-10 bg-gradient-to-r from-neon/5 to-transparent rounded-r-lg">
                            <p className="text-zinc-300 text-lg md:text-xl italic font-medium leading-relaxed">
                                "Paraquedismo é terapia. É um divisor de águas. Sentir a emoção de saltar se resume entre a vida antes e depois de conhecer esse esporte."
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
                            Liderada por <strong className="text-white">Edu Esteves</strong>, recordista mundial e autoridade no esporte, a Fly Up entrega a experiência mais técnica, segura e visceral da sua vida.
                        </p>

                        {/* CTA REMOVED AS REQUESTED */}

                        {/* Metrics Grid */}
                        {/* Metrics Grid */}
                        <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl mt-12 hover:border-neon/30 transition-colors duration-500 group/metrics">
                            {/* Floating Badge Header */}
                            <div className="absolute -top-4 left-8 bg-neon text-black px-4 py-1.5 rounded-md font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(57,255,20,0.4)] border border-white/20 transform -skew-x-12">
                                <span className="block transform skew-x-12">Números de Elite</span>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/5 relative z-10">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-start px-2 group/stat">
                                        <p className="text-3xl md:text-4xl font-black text-white font-display mb-1 drop-shadow-md group-hover/stat:text-neon transition-colors duration-300">
                                            <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                                        </p>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover/stat:text-zinc-300 transition-colors">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-transparent opacity-0 group-hover/metrics:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
                        </div>
                    </motion.div>

                    {/* Image Side (Right) */}
                    <div className="relative group perspective-1000">
                        {/* Image Container with Scroll Rotation */}
                        <motion.div
                            style={{ rotate, scale }}
                            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10 origin-bottom-right"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771461011/Foto_Edu_Editada_Reduzida_pqwdly')" }}
                            />

                            {/* Overlay Gradient on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                            {/* Name & Title Overlay */}
                            <div className="absolute bottom-10 left-8 right-8 z-20">
                                <div className="flex items-center gap-2 mb-2 text-neon">
                                    <Trophy size={18} />
                                    <span className="font-bold uppercase tracking-widest text-xs">Recordista Mundial</span>
                                </div>
                                <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white font-display">
                                    Edu Esteves
                                </h3>
                            </div>
                        </motion.div>

                        {/* Top 1% Badge (Bottom Right, Outside or Overlapping) */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -bottom-6 -right-6 z-30 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[140px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-neon/10 to-transparent opacity-50 rounded-2xl" />
                            <p className="relative z-10 text-neon text-4xl font-black italic font-display leading-none mb-1 drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">TOP 1%</p>
                            <p className="relative z-10 text-white/80 text-[10px] font-bold uppercase tracking-widest">Instrutores Elite</p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

