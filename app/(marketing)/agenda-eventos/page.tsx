"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
    {
        id: 1,
        title: "Fly Up Boogie 2026",
        date: "15-20 MAIO",
        location: "Boituva / SP",
        description: "O maior evento de paraquedismo do ano. Recordes, Big Way, Freefly e os melhores load organizers do mundo.",
        type: "Festival",
        highlight: true,
        image: "https://images.unsplash.com/photo-1542408892-d965d1d61993?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Night Jump Experience",
        date: "12 ABRIL",
        location: "Boituva / SP",
        description: "A magia da queda livre sob o luar. Saltos noturnos com sinalizadores e pirotecnia para atletas licenciados.",
        type: "Especial",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Curso AFF - Turma 04",
        date: "05 MARÇO",
        location: "Sede Fly Up",
        description: "Início da próxima turma do curso Accelerated Free Fall. Inicie sua jornada para se tornar um paraquedista.",
        type: "Escola",
        image: "https://images.unsplash.com/photo-1596716768393-2705e464c126?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Wingsuit Performance Camp",
        date: "22-25 JUNHO",
        location: "Boituva / SP",
        description: "4 dias de coaching intensivo focado em competição e navegação avançada com os melhores trajes da Squirrel.",
        type: "Atleta",
        image: "https://images.unsplash.com/photo-1549482199-bc1ca6f58502?q=80&w=3276&auto=format&fit=crop"
    }
];

export default function AgendaPage() {
    return (
        <div className="pt-24 min-h-screen bg-black">
            {/* Header */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neon/10 via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-6">
                            Agenda <span className="text-stroke-neon">Elite</span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Não perca os momentos que definem o esporte. Eventos exclusivos para alunos, atletas e entusiastas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events List */}
            <section className="py-12 pb-32">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid gap-8">
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`group relative bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:bg-zinc-900/50 transition-all duration-500 ${event.highlight ? 'border-neon/30 ring-1 ring-neon/20' : ''}`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8">
                                    <div className="relative h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                            <span className="text-neon text-xs font-black uppercase tracking-widest">{event.type}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex flex-wrap items-center gap-6 mb-6">
                                            <div className="flex items-center gap-2 text-neon">
                                                <Calendar size={18} />
                                                <span className="font-black uppercase tracking-widest text-sm">{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <MapPin size={18} />
                                                <span className="font-bold uppercase tracking-widest text-xs">{event.location}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-neon transition-colors">
                                            {event.title}
                                        </h3>

                                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl">
                                            {event.description}
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <Button variant="neon" size="xl" className="rounded-2xl">
                                                RESERVAR VAGA <Zap className="ml-2" />
                                            </Button>
                                            <button className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                                                Mais Detalhes <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
