"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Zap, GraduationCap, Cloud, Wind, Bird, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const experiences = [
    {
        id: "salto-duplo",
        title: "Salto Duplo",
        badge: "Adrenalina",
        icon: Zap,
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png",
        col: 1,
        link: "/salto-duplo",
        tags: ["12.000FT", "50S QUEDA"],
        description: "A porta de entrada. Conectado a um instrutor, 200km/h de pura liberdade.",
        oldPrice: "759,00",
        price: "645,00"
    },
    {
        id: "curso-aff",
        title: "Curso AFF",
        badge: "Escola",
        icon: GraduationCap,
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470433/Curso_AFF_Foto_1_jwmjre.png",
        col: 2,
        link: "/curso-aff-pro",
        tags: ["7 NÍVEIS", "CERTIFICADO", "TEÓRICO INCLUSO"],
        description: "Aprenda a voar sozinho. O método de formação de atletas mais rápido e seguro do mundo."
    },
    {
        id: "salto-balao",
        title: "Voos e Saltos de Balão",
        badge: "Visual",
        icon: Cloud,
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470430/Salto_Bal%C3%A3o_1_u1amjp.png",
        col: 1,
        link: "/salto-balao",
        tags: ["AMANHECER", "EXCLUSIVO"],
        description: "Uma experiência mística. Saltando do balão com o visual incrível do nascer do sol."
    },
    {
        id: "tunel-vento",
        title: "Túnel de Vento",
        badge: "Técnica",
        icon: Wind,
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470429/Foto_Tunel_de_Vento_1_gn2b40.png",
        col: 2,
        link: "/tunel-de-vento",
        tags: ["INDOOR", "COACHING"],
        description: "Aperfeiçoe suas habilidades de voo no simulador de queda livre mais avançado do país."
    },
    {
        id: "wingsuit",
        title: "Wingsuit",
        badge: "Alta Performance",
        icon: Bird,
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470434/Wing_Suit_imagem_1_mhspao.png",
        col: 1,
        link: "/wingsuit-experience",
        tags: ["A partir da categoria B", "PRO", "MAX SPEED"],
        description: "A elite do voo humano. Sinta a incrível sustentação e controle do traje planador em alta velocidade."
    }
];

export default function Experiences() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [bookingExp, setBookingExp] = useState<string | null>(null);

    return (
        <section className="py-32 relative overflow-hidden bg-white" ref={ref}>
            {/* Background Effect - Lightweight */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                {/* Corner Gradients (Neon Accents) - Reduced blur */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_0%_0%,rgba(57,255,20,0.1)_0%,transparent_60%)] blur-[40px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_100%_100%,rgba(57,255,20,0.1)_0%,transparent_60%)] blur-[40px]" />

                {/* Static Flow Lines - No animation, pure SVG decoration */}
                <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(57,255,20,0)" />
                            <stop offset="50%" stopColor="rgba(57,255,20,0.3)" />
                            <stop offset="100%" stopColor="rgba(57,255,20,0)" />
                        </linearGradient>
                    </defs>
                    <path d="M-100,200 C400,100 800,800 1600,600" stroke="url(#windGradient)" fill="none" strokeWidth="2" />
                    <path d="M0,800 C300,700 600,200 1400,100" stroke="#101010" fill="none" strokeWidth="1" strokeDasharray="10 20" opacity="0.1" />
                </svg>

                {/* Speed Particles */}
                <div className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `radial-gradient(#39FF14 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        transform: 'skewX(-20deg)'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <div className="h-[3px] w-12 bg-neon" />
                        <span className="text-zinc-900 font-black tracking-[0.25em] uppercase text-base drop-shadow-sm">EXPERIÊNCIAS</span>
                        <div className="h-[3px] w-12 bg-neon" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter transform -skew-x-6 leading-none text-black mb-6 relative z-10"
                    >
                        ESCOLHA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400 block mt-2">
                            SUA AVENTURA
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-zinc-500 font-bold max-w-xl mx-auto uppercase tracking-wider text-sm relative z-10"
                    >
                        Desde o primeiro salto até a alta performance profissional
                    </motion.p>
                </div>

                {/* Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto">

                    {/* Column 1 (Left) */}
                    <div className="flex flex-col gap-24 lg:gap-32">
                        {experiences.filter(e => e.col === 1).map((exp, i) => (
                            <ExperienceCard key={exp.id} data={exp} index={i} isInView={isInView} onBooking={() => setBookingExp(exp.title)} />
                        ))}
                    </div>

                    {/* Column 2 (Right) */}
                    <div className="flex flex-col gap-24 lg:gap-32 md:mt-[400px]">
                        {experiences.filter(e => e.col === 2).map((exp, i) => (
                            <ExperienceCard key={exp.id} data={exp} index={i + 2} isInView={isInView} onBooking={() => setBookingExp(exp.title)} />
                        ))}
                    </div>

                </div>
            </div>

            <BookingModal
                isOpen={!!bookingExp}
                onClose={() => setBookingExp(null)}
                experienceTitle={bookingExp || ""}
                source={`link-home-${experiences.find(e => e.title === bookingExp)?.id}`}
            />
        </section>
    );
}

function ExperienceCard({ data, index, isInView, onBooking }: { data: any, index: number, isInView: boolean, onBooking: () => void }) {
    const { title, badge, icon: Icon, image, link, tags, description, oldPrice, price } = data;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onBooking}
            className="group relative h-[600px] md:h-[750px] w-full rounded-[40px] overflow-hidden cursor-pointer bg-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_15px_25px_-5px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.3),0_0_50px_rgba(57,255,20,0.15)] flex flex-col perspective-1000 transition-all duration-500"
        >
            {/* Main Content Area */}
            <div className="relative w-full h-full overflow-hidden">
                <motion.img
                    src={image}
                    alt={title}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                />

                {/* Badge (always on top) */}
                <div className="absolute top-8 right-8 z-40">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2"
                    >
                        <Icon size={14} className="text-neon" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                            {badge}
                        </span>
                    </motion.div>
                </div>

                {/* Initial Title Layer */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        y: isHovered ? -20 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="absolute bottom-12 left-10 z-20 pointer-events-none"
                >
                    <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-display">
                        {title}
                    </h3>
                </motion.div>

                {/* Dark Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

                {/* White Info Panel (Slides up on hover) */}
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: isHovered ? "0%" : "100%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 bottom-0 bg-white z-30 px-10 py-10 flex flex-col gap-6 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]"
                >
                    {/* Header Row */}
                    <div className="flex items-start justify-between min-h-[70px]">
                        <h3 className="text-3xl md:text-4xl flex-shrink-0 max-w-[50%] font-black italic uppercase tracking-tighter text-black font-display leading-[1] mt-2">
                            {title}
                        </h3>
                        {price && (
                            <div className="relative flex flex-col items-end justify-center transform group-hover:scale-105 transition-transform duration-500 origin-right mt-1">
                                
                                {/* Preço Original (Riscado em Vermelho) */}
                                <div className="flex items-center gap-2 mb-1.5 mr-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                        DE:
                                    </span>
                                    <span className="text-sm font-black italic text-red-500 line-through tracking-tighter">
                                        R$ {oldPrice}
                                    </span>
                                </div>

                                {/* Bloco Premium de Preço */}
                                <div className="bg-gradient-to-br from-zinc-900 to-black text-[#39FF14] pr-5 pl-6 py-2.5 rounded-xl transform -skew-x-6 border border-[#39FF14]/20 border-b-[#39FF14]/50 border-r-[#39FF14]/50 shadow-[0_10px_30px_-10px_rgba(57,255,20,0.4)] relative overflow-hidden group/price">
                                    
                                    {/* Efeito de Brilho Dinâmico */}
                                    <motion.div 
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1.5 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39FF14]/15 to-transparent flex-shrink-0"
                                    />
                                    
                                    <div className="flex flex-col items-end relative z-10 transform skew-x-6">
                                        <span className="text-[9px] font-bold text-white tracking-[0.2em] uppercase opacity-75 mb-0.5">
                                            POR APENAS
                                        </span>
                                        <span className="text-4xl font-black italic tracking-tighter leading-none flex items-baseline gap-1.5 font-display drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                                            <span className="text-[18px] text-white opacity-90">R$</span> 
                                            <span className="text-[42px] leading-[0.8]">{price.split(',')[0]}</span>
                                            <span className="text-[20px] leading-[0.8]">,{price.split(',')[1]}</span>
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                        )}
                    </div>

                    <div className="h-[1px] w-full bg-zinc-100" />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string) => (
                            <span 
                                key={tag} 
                                className={`text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-tight ${
                                    tag === "A partir da categoria B"
                                        ? "bg-yellow-400 text-black border border-black/10 shadow-[0_0_15px_rgba(250,204,21,0.3)] animate-pulse"
                                        : "text-zinc-500 bg-zinc-100 text-nowrap"
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-zinc-600 text-[15px] leading-relaxed font-semibold">
                        {description}
                    </p>

                    <div className="flex gap-4 mt-auto pt-2">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onBooking();
                            }}
                            className="flex-1 bg-neon text-black font-black italic rounded-xl h-14 text-sm tracking-wider border-none hover:bg-neon-hover shadow-lg shadow-neon/30 group/btn transition-all duration-300 active:scale-95 px-2"
                        >
                            AGENDAR <ArrowUpRight className="ml-1 size-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </Button>
                        <Link
                            href={link}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1"
                        >
                            <Button
                                variant="outline"
                                className="w-full h-14 border-2 border-neon text-neon font-black italic rounded-xl text-sm tracking-widest hover:bg-neon hover:text-black transition-all duration-300 active:scale-95 px-2 bg-black"
                            >
                                SAIBA MAIS
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

