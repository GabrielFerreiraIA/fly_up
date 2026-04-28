"use client";

import { motion } from "framer-motion";
import {
    ArrowRight, CheckCircle2, ChevronDown, Clock, MapPin, Shield, Zap,
    Cloud, Sunrise, Bird, Camera, Wind, Trophy, Users, Award,
    AlertTriangle, PlayCircle, Mountain, BookOpen, Skull, BadgeCheck,
    GraduationCap, Star, Plane, Activity, Gauge, type LucideIcon
} from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const iconMap: Record<string, LucideIcon> = {
    CheckCircle2, Clock, MapPin, Shield, Zap, Cloud, Sunrise, Bird, Camera,
    Wind, Trophy, Users, Award, AlertTriangle, PlayCircle, Mountain,
    BookOpen, Skull, BadgeCheck, GraduationCap, Star, Plane, Activity, Gauge,
};

interface FAQItem {
    question: string;
    answer: string;
}

interface PricingItem {
    title: string;
    price: string;
    features: string[];
    highlight?: boolean;
}

interface SpecialConditionItem {
    title: string;
    description: string;
    icon?: string;
}

interface StepItem {
    title: string;
    description: string;
    icon?: string;
    image?: string;
}

interface ServicePageLayoutProps {
    title: string;
    subtitle: string;
    heroImage: string;
    overview: string;
    steps: StepItem[];
    galleryImages: string[];
    pricingOptions: PricingItem[];
    faqs: FAQItem[];
    specialConditions?: SpecialConditionItem[];
    ctaText?: string;
    sourceId?: string; // ID for webhook tracking
    pricingTitle?: string;
    renderBelowSteps?: React.ReactNode;
}

export default function ServicePageLayout({
    title,
    subtitle,
    heroImage,
    overview,
    steps,
    galleryImages,
    pricingOptions,
    faqs,
    specialConditions,
    ctaText = "Agendar Agora",
    sourceId = "geral", // Previne undefined
    pricingTitle = "Investimento",
    renderBelowSteps
}: ServicePageLayoutProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="bg-black min-h-screen font-sans selection:bg-neon selection:text-black" suppressHydrationWarning>
            {/* HERO SECTION (DARK) */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-zinc-300 max-w-2xl mx-auto mb-10 tracking-wide">
                            {subtitle}
                        </p>
                        <Button
                            onClick={() => setIsBookingOpen(true)}
                            className="bg-neon hover:bg-neon-hover text-black font-black italic uppercase text-lg px-10 py-8 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:scale-105 transition-all"
                        >
                            {ctaText} <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* OVERVIEW & STEPS SECTION (LIGHT branded) */}
            <section className="py-24 bg-zinc-50 relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                    <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#39FF14]/10 rounded-full blur-[120px] mix-blend-multiply" />
                    <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[100px] mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto mb-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 text-black relative inline-block">
                            A Experiência
                            <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#00cc00]/40 -skew-x-12" />
                        </h2>
                        <p className="text-lg text-zinc-700 leading-relaxed font-medium">
                            {overview}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-zinc-300 rounded-3xl p-8 hover:border-[#00cc00] hover:shadow-[0_10px_40px_-10px_rgba(0,180,0,0.2)] transition-all duration-300 group flex flex-col h-full relative"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center group-hover:bg-black transition-all duration-300 shadow-md shadow-zinc-300 border border-zinc-800">
                                        {(() => {
                                            const IconComponent = step.icon ? iconMap[step.icon] : null;
                                            return IconComponent
                                                ? <IconComponent className="text-[#39FF14] w-8 h-8 transition-colors" />
                                                : <div className="w-2 h-2 bg-[#39FF14] rounded-full" />;
                                        })()}
                                    </div>
                                    <span className="text-4xl font-black italic text-zinc-200 group-hover:text-[#39FF14]/20 transition-colors">
                                        0{idx + 1}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black italic uppercase mb-3 text-black group-hover:text-[#008800] transition-colors">{step.title}</h3>
                                <p className="text-zinc-700 font-medium text-sm leading-relaxed flex-grow">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {renderBelowSteps && (
                        <div className="mt-20">
                            {renderBelowSteps}
                        </div>
                    )}
                </div>
            </section>

            {/* GALLERY SECTION (DARK) */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50" />
                {/* Background Decor */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 mb-4"
                        >
                            <div className="h-[2px] w-8 bg-neon" />
                            <span className="text-neon font-black tracking-[0.3em] uppercase text-xs">MOMENTOS REAIS</span>
                            <div className="h-[2px] w-8 bg-neon" />
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                            Galeria <span className="text-transparent" style={{ WebkitTextStroke: '1px #39FF14' }}>Exclusiva</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.slice(0, 6).map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: idx * 0.1,
                                    ease: [0.21, 1.11, 0.81, 0.99]
                                }}
                                className="group relative aspect-[4/5] rounded-[32px] overflow-hidden cursor-pointer bg-zinc-900 border border-white/5"
                            >
                                {/* Image with zoom on hover */}
                                <motion.img
                                    src={img}
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {/* Interactive Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon/50 rounded-[32px] transition-colors duration-500 z-20" />

                                {/* View Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                                    <div className="w-16 h-16 bg-neon rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_rgba(57,255,20,0.5)]">
                                        <Zap size={24} className="text-black fill-black" />
                                    </div>
                                </div>

                                {/* Subtle info (Optional, adds to premium feel) */}
                                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                                    <div className="h-[1px] w-full bg-white/20 mb-3" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neon">Fly Up Experience</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SPECIAL CONDITIONS SECTION (LIGHT branded) */}
            {specialConditions && specialConditions.length > 0 && (
                <section className="py-24 bg-white border-y border-zinc-300 relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.03]"
                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#00cc00]/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-[#008800] font-black tracking-widest uppercase text-sm mb-2 block bg-[#39FF14]/20 inline-block px-3 py-1 rounded-full">Exclusividade Fly Up</span>
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-black">
                                Condições Especiais
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {specialConditions.map((condition, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-zinc-50 border border-zinc-300 p-8 rounded-3xl hover:bg-white hover:border-[#00cc00]/50 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00cc00]/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150 group-hover:bg-[#00cc00]/20" />

                                    <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 px-3 shadow-md group-hover:scale-110 transition-transform relative z-10">
                                        {(() => {
                                            const IconComponent = condition.icon ? iconMap[condition.icon] : null;
                                            return IconComponent
                                                ? <IconComponent className="w-7 h-7 text-[#39FF14] transition-colors" />
                                                : <div className="w-2 h-2 bg-neon rounded-full" />;
                                        })()}
                                    </div>
                                    <h3 className="text-xl font-black italic uppercase mb-3 text-black relative z-10 group-hover:text-[#008800] transition-colors">{condition.title}</h3>
                                    <p className="text-zinc-700 text-sm leading-relaxed relative z-10">
                                        {condition.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PRICING SECTION (DARK) */}
            <section className="py-24 bg-black text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 text-center">
                        {pricingTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingOptions.map((option, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className={`w-full rounded-2xl p-8 flex flex-col relative ${option.highlight ? 'bg-zinc-900 border-2 border-[#39FF14] shadow-[0_0_40px_rgba(57,255,20,0.15)]' : 'bg-zinc-900/30 border border-white/10'}`}
                            >
                                {option.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#39FF14] text-black text-xs font-black uppercase px-4 py-1 rounded-full tracking-widest shadow-lg shadow-[#39FF14]/20">
                                        Mais Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-black italic uppercase mb-2">{option.title}</h3>
                                <div className="text-4xl font-black text-white mb-6 tracking-tight">
                                    {option.price}
                                    <span className="text-sm font-bold text-zinc-500 ml-2 tracking-normal align-middle">/ pessoa</span>
                                </div>
                                <ul className="flex-1 space-y-4 mb-8">
                                    {option.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#39FF14] shrink-0" />
                                            <span className="text-zinc-300 text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    onClick={() => setIsBookingOpen(true)}
                                    className={`w-full py-6 font-black italic uppercase rounded-xl ${option.highlight ? 'bg-[#39FF14] text-black hover:bg-[#32e010] shadow-lg shadow-[#39FF14]/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    Reservar Vaga
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION (LIGHT branded) */}
            <section className="py-24 bg-zinc-50 border-t border-zinc-300 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00cc00]/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="container mx-auto px-6 max-w-3xl relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 text-center text-black">
                        Dúvidas Frequentes
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-zinc-300 rounded-2xl bg-white overflow-hidden hover:border-[#00cc00] transition-colors group">
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`font-bold text-lg transition-colors ${openFaqIndex === idx ? 'text-[#008800]' : 'text-black group-hover:text-black/80'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === idx ? 'bg-[#00cc00] rotate-180' : 'bg-zinc-200 group-hover:bg-[#00cc00]/20'}`}>
                                        <ChevronDown className={`w-5 h-5 transition-colors ${openFaqIndex === idx ? 'text-white' : 'text-zinc-600 group-hover:text-black'}`} />
                                    </div>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaqIndex === idx ? "auto" : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0">
                                        <div className="w-full h-px bg-zinc-100 mb-4" />
                                        <p className="text-zinc-700 leading-relaxed bg-zinc-50/50 p-4 rounded-xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                experienceTitle={title}
                source={sourceId}
            />
        </div>
    );
}
