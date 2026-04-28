"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

// ── AFF-specific testimonials from the main Fly Up page ────────────────────────
const testimonials = [
    {
        quote: "Fui muito bem treinado por esse mestre, que me ensinou tudo detalhadamente e me deu tranquilidade e confiança. Quando cheguei no momento do salto estava tão tranquilo e treinado que meu salto foi muito bom!",
        author: "Danilo Nielson",
        role: "Aluno AFF",
        company: "Fly Up",
        avatar: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471457/Depoimento_Danilo_Nielson_1_ooyte9.png",
    },
    {
        quote: "Muito bom poder fazer e concluir o curso AFFpro, sem dúvidas uma ótima escolha para iniciar no esporte e evoluir. Sou grato por ter iniciado e feito o meu primeiro salto no dia da inauguração da Fly Up.",
        author: "Felipe Calhau",
        role: "Aluno AFFpro",
        company: "Fly Up",
        avatar: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471455/Depoimento_3_1_q0tco5.png",
    },
    {
        quote: "A Escola de paraquedismo Fly UP é simplesmente incrível! Desde a recepção até cada etapa do atendimento, tudo é feito com profissionalismo e paixão. Meus instrutores — Edu Esteves, Vitinho e Silvestre — são excepcionais.",
        author: "Thiago Silva",
        role: "Aluno AFF",
        company: "Fly Up",
        avatar: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471459/Depoimento_1_1_xzeqnf.png",
    },
    {
        quote: "Conheci a Fly Up e o Edu, e desde então minha vida mudou. Hoje sou paraquedista e cada novo salto é uma experiência de prazer e aprendizado. Hoje me sinto realizado com o esporte que escolhi para viver!",
        author: "Leandro Soares",
        role: "Atleta",
        company: "Fly Up",
        avatar: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471452/Depoimento_5_1_yvwmnc.png",
    },
    {
        quote: "O Edu é um excelente instrutor. Me senti acolhida e segura o tempo todo, nas aulas teóricas e práticas. Ele é muito experiente e competente! Guardo todos os ensinamentos e toda a energia boa!",
        author: "Just Paulinha",
        role: "Aluna AFF",
        company: "Fly Up",
        avatar: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471452/Depoimento_6_1_jtfu27.png",
    },
]

function usePreloadImages(images: string[]) {
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [images])
}

function SplitText({ text }: { text: string }) {
    const words = text.split(" ")
    return (
        <span className="inline">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    )
}

function AFFTestimonialWidget() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    usePreloadImages(testimonials.map((t) => t.avatar))

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 150 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
        },
        [mouseX, mouseY],
    )

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const current = testimonials[activeIndex]

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-2xl mx-auto py-16 px-8 md:px-12"
            style={{ cursor: "none" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleNext}
        >
            {/* Custom magnetic cursor */}
            <motion.div
                className="pointer-events-none absolute z-50"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="rounded-full bg-[#39FF14] flex items-center justify-center"
                    animate={{ width: isHovered ? 72 : 0, height: isHovered ? 72 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                >
                    <motion.span
                        className="text-black text-[10px] font-black tracking-wider uppercase"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Próximo
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Index indicator */}
            <motion.div
                className="absolute top-6 right-8 flex items-baseline gap-1 font-mono text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.span
                    className="text-2xl font-light text-white"
                    key={activeIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-600">{String(testimonials.length).padStart(2, "0")}</span>
            </motion.div>

            {/* Stacked avatar previews */}
            <motion.div
                className="absolute top-6 left-8 flex -space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6 }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        className={`w-7 h-7 rounded-full border-2 border-zinc-950 overflow-hidden transition-all duration-300 ${i === activeIndex ? "ring-2 ring-[#39FF14] ring-offset-1 ring-offset-zinc-950" : "grayscale opacity-40"
                            }`}
                        whileHover={{ scale: 1.15, opacity: 1 }}
                    >
                        <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Quote */}
            <div className="relative mt-4">
                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="text-xl md:text-2xl font-light leading-relaxed tracking-tight text-white"
                    >
                        <SplitText text={`"${current.quote}"`} />
                    </motion.blockquote>
                </AnimatePresence>

                {/* Author */}
                <motion.div className="mt-10 relative" layout>
                    <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14">
                            <motion.div
                                className="absolute -inset-1.5 rounded-full border border-[#39FF14]/40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            {testimonials.map((t, i) => (
                                <motion.img
                                    key={t.avatar}
                                    src={t.avatar}
                                    alt={t.author}
                                    className="absolute inset-0 w-14 h-14 rounded-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                                    animate={{ opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="relative pl-4"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-px bg-[#39FF14]"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ originY: 0 }}
                                />
                                <span className="block text-sm font-black text-white tracking-wide uppercase">
                                    {current.author}
                                </span>
                                <span className="block text-xs text-zinc-500 mt-0.5 font-mono uppercase tracking-widest">
                                    {current.role} — {current.company}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Progress bar */}
                <div className="mt-12 h-px bg-zinc-800 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-[#39FF14]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>

            {/* Hint */}
            <motion.div
                className="absolute bottom-6 left-8 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
                    Clique para avançar
                </span>
            </motion.div>
        </div>
    )
}

export default function AFFTestimonials() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#39FF14_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-4"
                >
                    <span className="text-[#39FF14] font-black uppercase tracking-[0.3em] text-sm mb-3 block">
                        Quem já voou com a gente
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white leading-none">
                        Depoimentos{" "}
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #39FF14' }}>
                            Reais
                        </span>
                    </h2>
                </motion.div>

                <AFFTestimonialWidget />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
        </section>
    )
}
