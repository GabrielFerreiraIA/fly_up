"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & DATA
// ==========================================

export interface TestimonialData {
    id: string;
    src: string;
    name: string;
    role: string;
    text: string;
    highlight: string;
}

const TESTIMONIALS_SOURCE: TestimonialData[] = [
    {
        id: "t1",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471459/Depoimento_1_1_xzeqnf.png",
        name: "Thiago Silva",
        role: "Aluno AFF",
        text: "A Escola de paraquedismo Fly UP é simplesmente incrível! Desde a recepção até cada etapa do atendimento, tudo é feito com profissionalismo e paixão. Meus instrutores — Edu Esteves, Vitinho e Silvestre — são excepcionais: atenciosos, técnicos e inspiradores.",
        highlight: "profissionalismo e paixão",
    },
    {
        id: "t2",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471456/Depoimento_2_1_elupzt.png",
        name: "Paloma Santos",
        role: "Salto Duplo",
        text: "Foi tudo incrível, desde o atendimento virtual até o presencial, Fly Up fez meu aniversário chegar a um limite literalmente alto! Amei de paixão e claro levei meu irmão e meu enteado na loucura também. Valeu cada segundo!",
        highlight: "limite literalmente alto",
    },
    {
        id: "t3",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471455/Depoimento_3_1_q0tco5.png",
        name: "Felipe Calhau",
        role: "Aluno AFFpro",
        text: "Muito bom poder fazer e concluir o curso AFFpro, sem dúvidas uma ótima escolha para iniciar no esporte e evoluir. Sou grato por ter iniciado e feito o meu primeiro salto no dia da inauguração da Fly Up.",
        highlight: "iniciar no esporte e evoluir",
    },
    {
        id: "t4",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471457/Depoimento_Danilo_Nielson_1_ooyte9.png",
        name: "Danilo Nielson",
        role: "Aluno AFF",
        text: "Fui muito bem treinado por esse mestre, que me ensinou tudo detalhadamente e me deu tranquilidade e confiança. Quando cheguei no momento do salto estava tão tranquilo e treinado que meu salto foi muito bom!",
        highlight: "tranquilidade e confiança",
    },
    {
        id: "t5",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471453/Depoimento_4_1_ut5h3i.png",
        name: "Ricardo Professor",
        role: "Salto Duplo",
        text: "Uma experiência incrível, curti tudo. Atendimento de primeira e uma vibe surreal. Recomendo muito!",
        highlight: "Atendimento de primeira",
    },
    {
        id: "t6",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471452/Depoimento_5_1_yvwmnc.png",
        name: "Leandro Soares",
        role: "Atleta",
        text: "Conheci a Fly Up e o Edu, e desde então minha vida mudou, hoje sou paraquedista e cada novo salto é uma experiência de prazer e aprendizado. Hoje me sinto realizado com o esporte que escolhi para viver!",
        highlight: "minha vida mudou",
    },
    {
        id: "t7",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771471452/Depoimento_6_1_jtfu27.png",
        name: "Just Paulinha",
        role: "Aluna",
        text: "O Edu é um excelente instrutor. Me senti acolhida e segura o tempo todo, nas aulas teóricas e práticas. Ele é muito experiente e competência incrível! Guardo todos os ensinamentos e toda a energia boa!",
        highlight: "acolhida e segura",
    },
    {
        id: "t8",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435307/1_k9kijz.webp",
        name: "Natalia Grespan",
        role: "Aluna AFF",
        text: "Terminei meu AFF na Fly Up com o mestre Edu e sou imensamente grata a ele e a essa escola por todos os ensinamentos e por toda confiança! O Edu tem muita experiência e te passa muita segurança do início ao fim. Com certeza, melhor escolha que fiz!",
        highlight: "melhor escolha que fiz",
    },
    {
        id: "t9",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435307/2_tuma4h.webp",
        name: "Fernando Penteadinho",
        role: "Aluno",
        text: "Pra quem sonha em saltar e se tornar um paraquedista, o lugar é FlyUp. Edu e todo seu time são extremamente profissionais, cuidando do seu processo evolutivo no esporte de uma maneira que voce se sente seguro e confiante. Recomendadíssimo. A melhor escola do Brasil!",
        highlight: "melhor escola do Brasil",
    },
    {
        id: "t10",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435310/3_fsvc9f.webp",
        name: "Filipe Calhau",
        role: "Aluno AFFpro",
        text: "Muito bom poder fazer e concluir o curso AFFpro, sem dúvidas uma ótima escola para iniciar no esporte e evoluir. Sou grato por ter iniciado e feito o meu primeiro salto no dia da inauguração da FlyUp e agora formado sigo contente em busca da evolução no esporte. Gratidão!!!",
        highlight: "evolução no esporte",
    },
    {
        id: "t11",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435310/4_lkvqyc.webp",
        name: "Igor Ramos",
        role: "Aluno AFF Pro",
        text: "Melhor Escola com os melhores instrutores AFF Pro! Em breve voltarei para mais aventuras",
        highlight: "aventuras",
    },
    {
        id: "t12",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435314/5_hl1jtk.webp",
        name: "Gustavi Alonco",
        role: "Aluno",
        text: "Profissionalismo e segurança em primeiro lugar! Sem contar toda a simpatia e parceria de toda a equipe! Melhor escola do Brasil!",
        highlight: "Profissionalismo e segurança",
    },
    {
        id: "t13",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435311/7_g6wz5j.webp",
        name: "Kleber Toledo",
        role: "Aluno",
        text: "Escola Fly Up que realizou meu sonho , pessoas que se dedicam aos alunos completamente , fui muito bem acolhido e continuo ate hoje !!! que Deus continuo nos proporcionando essa amizade !!!",
        highlight: "realizou meu sonho",
    },
    {
        id: "t14",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435311/7_g6wz5j.webp",
        name: "Rodrigo Ro",
        role: "Salto Duplo",
        text: "Foi uma experiência incrível fazer um salto de paraquedas com a escola de paraquedismo Fly Up, sob a orientação do instrutor Edu Esteves. O Edu é um instrutor extremamente experiente e cuidadoso, que me deixou completamente à vontade durante todo o processo. Com certeza recomendo a Fly Up paraquedismo e o instrutor Edu Esteves para quem deseja viver essa experiência única e emocionante!",
        highlight: "experiência única e emocionante",
    },
    {
        id: "t15",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435317/8_hucisr.webp",
        name: "Beatriz Miranda",
        role: "Salto Duplo",
        text: "Confiei a melhor experiência da minha vida a escola Fly Up Paraquedismo. Foi surreal e eu indico a todos. Da medo? Claro! Mas eles super te tranquilizam, passam confiança e o instrutor foi super atencioso. Obrigada a todos os envolvidos.",
        highlight: "melhor experiência da minha vida",
    },
    {
        id: "t16",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435310/9_jws0k8.webp",
        name: "Fabiano",
        role: "Aluno",
        text: "Escola com estrutura completa e profissionais hiper gabaritos com décadas de experiência sempre presente no seu aprendizado teórico e prático!",
        highlight: "estrutura completa",
    },
    {
        id: "t17",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435310/10_xwocrn.webp",
        name: "Leone Thomasini",
        role: "Atleta",
        text: "Escola com uma estrutura incrível e instrutores altamente capacitados. Onde me formei e continuo saltando. Nota 10",
        highlight: "instrutores altamente capacitados",
    },
    {
        id: "t18",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435317/11_euwgii.webp",
        name: "Jorge Rigoli",
        role: "Aluno AFF Pro",
        text: "O Edu Esteves é um profissional excelente. Me senti super seguro em fazer o curso AFF Pro desde o início. É um gigante no ar. Super recomendo a FlyUp... se você teve alguma experiência frustrante no passado, dê uma chance e você mesmo, se permita e procure o Edu Esteves.",
        highlight: "É um gigante no ar",
    },
    {
        id: "t19",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435323/12_iy9rg1.webp",
        name: "Bruno Henrique",
        role: "Salto Duplo",
        text: "Muito bom, a equipe completa e muito atenciosa do começo ao fim, te passam a maior segurança do mundo, experiência única pra quem é fã de adrenalina, super recomendo a escola",
        highlight: "super recomendo",
    },
    {
        id: "t20",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435314/13_zrtwcl.webp",
        name: "Vitor Anjos",
        role: "Aluno AFF",
        text: "Edu Esteves é um profissional fora da curva. Quando encontrei a FlyUp Paraquedismo e conversei a respeito das minhas angústias e problemas que tive no passado, consegui ter a segurança e profissionalismo que buscava para continuar e finalizar o curso AFF.",
        highlight: "segurança e profissionalismo",
    },
    {
        id: "t21",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435320/14_mqpfbn.webp",
        name: "Pedro Godtfredsen",
        role: "Aluno",
        text: "Atendimento atencioso, profissionalidade nos ensinamentos, instrutor de extrema qualidade técnica e muito experiente. Edu Esteves é destaque e referência no esporte onde o cuidado e competência têm que vir sempre em primeiro lugar.",
        highlight: "destaque e referência",
    },
    {
        id: "t22",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435321/15_h1xlbs.webp",
        name: "fabiana strazza",
        role: "Aluna",
        text: "Escola maravilhosa! Que proporciona as melhores experiências!!!",
        highlight: "Escola maravilhosa",
    },
    {
        id: "t23",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435320/16_kvuf1f.webp",
        name: "Barbara R.",
        role: "Salto Duplo",
        text: "Desde o primeiro contato tive um ótimo atendimento, foi a empresa que mais me senti confortável pra realizar o salto. Atendimento top de toda equipe, local aconchegante. Meus parabéns a todos os instrutores e à empresa por realizar sonhos no lugar mais lindo que podemos visitar, o céu!",
        highlight: "melhor atendimento",
    },
    {
        id: "t24",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435323/17_uj6ulj.webp",
        name: "Cristiane Mendes",
        role: "Salto Duplo",
        text: "Minha experiência em saltar foi incrível, melhor do que eu imaginava, todo o atendimento , foi tudo perfeito, me passaram bastante segurança",
        highlight: "tudo perfeito",
    },
    {
        id: "t25",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435324/18_xunink.webp",
        name: "Vera lucia Escobar",
        role: "Salto Duplo",
        text: "Excelente Equipe desde o 1º contato. Super atenciosos. Os instrutores são animados e nos deixam tão envolvidos que confiamos plenamente. Foi sem dúvida A MELHOR EXPERIÊNCIA DA MINHA VIDA. Com certeza voltarei.",
        highlight: "A MELHOR EXPERIÊNCIA DA MINHA VIDA",
    },
    {
        id: "t26",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435324/19_lsgfy6.webp",
        name: "Kathiene Ibiapino",
        role: "Salto Duplo",
        text: "Experiência incrível. Instrutores experientes lhe-dão muita segurança no salto. Atendimento com excelência e prontidão. Parabéns a toda equipe, recomendo a Fly Up Paraquedismo.",
        highlight: "excelência e prontidão",
    },
    {
        id: "t27",
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/f_auto/v1775435324/20-_1__ctnjjc.webp",
        name: "Luiza Avila",
        role: "Salto Duplo",
        text: "Foi uma experiência incrível, profissionais com experiência e capacidade suficientes para trazer segurança à esse momento!!! Com certeza escolheria outras vezes voar com a Fly Up Boituva!",
        highlight: "profissionais com experiência",
    },
];

const TESTIMONIALS = [...TESTIMONIALS_SOURCE];

// ==========================================
// GRID LAYOUT - ORGANIC DIAMOND BLOB (3-4-5-4-3 = 19)
// Estilo original da imagem 2, mais simétrico e com 19 depoimentos
// Container: max-w-[900px] h-[900px]
// ==========================================

const GRID_POSITIONS = [
    // Row 1 — 3 circles (topo)
    { x: 37, y: 12, size: 100 },
    { x: 50, y: 10, size: 115 },
    { x: 63, y: 12, size: 100 },

    // Row 2 — 4 circles
    { x: 27, y: 26, size: 105 },
    { x: 41, y: 24, size: 120 },
    { x: 59, y: 24, size: 120 },
    { x: 73, y: 26, size: 105 },

    // Row 3 — 5 circles (mais larga, centro em destaque)
    { x: 18, y: 42, size: 100 },
    { x: 33, y: 40, size: 118 },
    { x: 50, y: 38, size: 138 },
    { x: 67, y: 40, size: 118 },
    { x: 82, y: 42, size: 100 },

    // Row 4 — 4 circles
    { x: 27, y: 58, size: 105 },
    { x: 41, y: 56, size: 120 },
    { x: 59, y: 56, size: 120 },
    { x: 73, y: 58, size: 105 },

    // Row 5 — 3 circles
    { x: 37, y: 72, size: 100 },
    { x: 50, y: 70, size: 115 },
    { x: 63, y: 72, size: 100 },
];

export default function Testimonials() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const activeTestimonials = TESTIMONIALS.slice(0, GRID_POSITIONS.length);

    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden min-h-screen md:min-h-[1000px] flex flex-col items-center justify-center">

            {/* Smooth Curve Transitions - Organic Inverted */}
            <div className="absolute top-0 left-0 w-full h-32 md:h-48 z-10 pointer-events-none">
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill="#09090b"
                        fillOpacity="1"
                        d="M0,0L1440,0L1440,100Q720,280 0,100Z"
                    />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-10 pointer-events-none rotate-180">
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill="#09090b"
                        fillOpacity="1"
                        d="M0,0L1440,0L1440,100Q720,280 0,100Z"
                    />
                </svg>
            </div>



            {/* Floating Accent Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon/[0.02] rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-neon/[0.015] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-20 flex flex-col items-center mb-12">
                {/* TOP BADGE */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-50 border border-neon/20 mb-10 group overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-neon/10 to-neon/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon shadow-[0_0_8px_rgba(57,255,20,0.6)]"></span>
                    </span>
                    <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.25em] relative z-10">
                        COMUNIDADE FLY UP
                    </span>
                </div>

                {/* MAIN HEADLINE */}
                <div className="text-center max-w-5xl mx-auto leading-[0.85] mb-4">
                    <h2 className="block text-6xl md:text-8xl font-black text-zinc-900 uppercase tracking-tighter font-display mb-3">
                        QUEM JÁ
                    </h2>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-transparent relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">
                            VOOU COM A GENTE.
                        </span>
                    </h2>
                </div>
            </div>

            {/* BUBBLE GRID — Organic Diamond Blob */}
            <div className="relative w-full aspect-square max-w-[900px] mx-auto z-20 mt-10 md:mt-0">
                {activeTestimonials.map((item, index) => {
                    const pos = GRID_POSITIONS[index] || { x: 50, y: 50, size: 0 };
                    const isHovered = hoveredId === item.id;
                    const isOthersHovered = hoveredId !== null && !isHovered;

                    return (
                        <motion.div
                            key={item.id}
                            className={cn(
                                "absolute transform-gpu transition-all duration-300",
                                isHovered ? "w-[85vw] max-w-[360px] h-auto" : ""
                            )}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.04 }}
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                zIndex: isHovered ? 100 : 10,
                                width: isHovered ? undefined : `${(pos.size / 900) * 100}%`,
                                height: isHovered ? undefined : `${(pos.size / 900) * 100}%`,
                                x: "-50%",
                                y: "-50%",
                            }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <motion.div
                                layout
                                className={`
                                    relative w-full overflow-hidden transition-all duration-300
                                    ${isHovered
                                        ? "rounded-xl p-6 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] z-[100]"
                                        : "rounded-full h-full bg-white shadow-xl border-2 border-zinc-50 hover:border-neon/50 hover:shadow-neon/20 group cursor-pointer"
                                    }
                                `}
                                animate={{
                                    scale: isOthersHovered ? 0.9 : 1,
                                    opacity: isOthersHovered ? 0.3 : 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    layout: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 }
                                }}
                            >
                                {/* Active Card Gradient Border Effect */}
                                {isHovered && (
                                    <>
                                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                    </>
                                )}

                                <div className={`flex items-center gap-4 ${isHovered ? "mb-5" : "w-full h-full justify-center"}`}>
                                    <div className={`relative overflow-hidden rounded-full border-2 border-white/10 shrink-0 shadow-inner ${isHovered ? "w-16 h-16 ring-4 ring-neon/10" : "w-full h-full"}`}>
                                        <motion.img
                                            animate={{ scale: isHovered ? 1.05 : 1 }}
                                            src={item.src}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-all duration-500"
                                        />
                                    </div>

                                    {isHovered && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
                                            <span className="font-black text-white leading-tight uppercase font-display text-sm tracking-wide">
                                                {item.name}
                                            </span>
                                            <span className="text-neon text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">
                                                {item.role}
                                            </span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Testimonial Text with Highlight */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Quote className="w-6 h-6 text-neon mb-3 fill-neon/10 opacity-100" />
                                        <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                                            "
                                            {item.text.split(item.highlight).map((part, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (
                                                        <span className="bg-neon text-black px-1.5 py-0.5 font-bold mx-0.5 rounded-sm">
                                                            {item.highlight}
                                                        </span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            "
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
