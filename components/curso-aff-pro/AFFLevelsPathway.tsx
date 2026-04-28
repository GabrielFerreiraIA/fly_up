"use client";

import { motion } from "framer-motion";
import { Zap, Shield, RotateCw, Trophy, Target, Plane, GraduationCap } from "lucide-react";

const levels = [
    {
        id: 1,
        title: "Nível 1: Estabilidade Assistida",
        desc: "Seu primeiro salto. Dois instrutores seguram sua lateral para garantir estabilidade constante enquanto você aprende o controle básico.",
        icon: Zap,
        focus: "Posição Básica e Abertura"
    },
    {
        id: 2,
        title: "Nível 2: Curvas e Deslocamento",
        desc: "Ainda com dois instrutores, você começa a experimentar curvas e pequenos deslocamentos horizontais.",
        icon: RotateCw,
        focus: "Consciência Espacial"
    },
    {
        id: 3,
        title: "Nível 3: Voo de Manutenção",
        desc: "O divisor de águas. Os instrutores te soltam no ar e você voa sozinho pela primeira vez, mantendo a estabilidade solo.",
        icon: Shield,
        focus: "Voo Solo Monitorado"
    },
    {
        id: 4,
        title: "Nível 4: Curvas 360º Solo",
        desc: "Agora com apenas um instrutor. Você demonstra controle total realizando curvas completas de 360 graus para ambos os lados.",
        icon: Target,
        focus: "Precisão de Manobra"
    },
    {
        id: 5,
        title: "Nível 5: Loopings e Controle",
        desc: "Introdução a manobras acrobáticas básicas e saídas controladas do avião em diferentes posições.",
        icon: RotateCw,
        focus: "Acrobacia Básica"
    },
    {
        id: 6,
        title: "Nível 6: Independência Total",
        desc: "Salto de rastreio (deslocamento rápido) e recuperação de posições instáveis sem auxílio direto.",
        icon: Plane,
        focus: "Rastreio e Recuperação"
    },
    {
        id: 7,
        title: "Nível 7: Avaliação Final",
        desc: "O seu exame. O aluno deve demonstrar todas as habilidades aprendidas em um único salto técnico perfeito.",
        icon: Trophy,
        focus: "Check de Graduação"
    }
];

export default function AFFLevelsPathway() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase italic mb-4">A Jornada <span className="text-neon">AFF</span></h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-tighter">7 passos para a sua licença classe A</p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800" />

                    <div className="space-y-12">
                        {levels.map((level, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Level Content */}
                                <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className={`p-8 rounded-3xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm hover:border-neon/50 transition-colors group cursor-default shadow-xl`}>
                                        <div className={`text-neon font-black italic text-xl mb-2 flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="text-zinc-700">0{level.id}</span>
                                            {level.title}
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{level.desc}</p>
                                        <div className={`inline-block px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-[10px] text-neon font-bold uppercase tracking-widest`}>
                                            Foco: {level.focus}
                                        </div>
                                    </div>
                                </div>

                                {/* Central Point */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center z-10 group-hover:border-neon shadow-[0_0_20px_rgba(0,0,0,1)]">
                                    <level.icon className="w-5 h-5 text-neon" />
                                </div>

                                {/* Spacer for timeline */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Graduation Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-24 p-12 rounded-[40px] bg-gradient-to-b from-neon to-neon-hover text-black text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <GraduationCap className="w-16 h-16 mx-auto mb-6" />
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase mb-2">Graduado na Fly Up</h3>
                        <p className="font-bold text-lg max-w-xl mx-auto opacity-80 uppercase tracking-tighter italic">
                            Após o nível 7, você recebe seu brevê de paraquedista e está livre para voar em qualquer lugar do mundo.
                        </p>
                    </div>
                    {/* Decorative stripes */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 20px, transparent 20px, transparent 40px)' }} />
                </motion.div>
            </div>
        </section>
    );
}
