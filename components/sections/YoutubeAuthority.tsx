"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function YoutubeAuthority() {
    return (
        <section className="relative py-32 bg-zinc-950 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />

            {/* Red/Green Dynamic Glows */}
            <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT COLUMN - EDU IMAGE COMPOSITION */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative group perspective-1000"
                    >
                        {/* Main Image Frame - Premium Glass/Dark Effect */}
                        <div className="relative z-10 rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm shadow-2xl transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
                            <div className="relative aspect-[4/5] w-full">
                                <img
                                    src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470879/Flyup_vtcxmo.webp"
                                    alt="Eduardo Esteves com Placa de 100k do YouTube"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Cinematic Grading Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent mix-blend-overlay" />
                            </div>

                            {/* Floating "Glass" Stats Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-6 left-6 right-6 p-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
                            >
                                <div className="bg-black/40 rounded-xl p-4 flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/20 overflow-hidden">
                                            <img
                                                src="https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
                                                alt="YouTube Logo"
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-zinc-200 shadow-sm overflow-hidden p-0.5">
                                            <img
                                                src="https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/660aee8a-ac4d-42f2-8d60-89473774fee9.png"
                                                alt="Verificado"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-display font-black text-white text-xl tracking-tight">100K+</span>
                                        </div>
                                        <p className="text-zinc-400 text-xs font-medium mt-0.5">Prêmio Criador de Prata Oficial</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-full h-full border border-zinc-800/60 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                        <div className="absolute -bottom-6 -left-6 w-full h-full bg-red-600/5 border border-red-500/10 rounded-3xl -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500 backdrop-blur-3xl" />
                    </motion.div>


                    {/* RIGHT COLUMN - CONTENT */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 group hover:bg-white/10 transition-colors cursor-default">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                                </span>
                                <span className="text-xs font-bold text-zinc-300 uppercase tracking-[0.2em] group-hover:text-white transition-colors">COMUNIDADE FLY UP</span>
                            </div>

                            {/* Headline with Light Green Outline */}
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display leading-[0.85] mb-8">
                                A AUTORIDADE <br />
                                MÁXIMA <br />
                                {/* Outline Text - Light Green */}
                                {/* Outline Text - Light Green Neon Effect */}
                                <span className="relative block mt-2" style={{ color: 'transparent', WebkitTextStroke: '2px #39FF14' }}>
                                    DO YOUTUBE.
                                    {/* Neon Glow Layer */}
                                    <span className="absolute inset-0 text-[#39FF14] opacity-20 blur-lg select-none" style={{ WebkitTextStroke: '0px', textShadow: '0 0 20px rgba(57,255,20,0.8)' }}>DO YOUTUBE.</span>
                                </span>
                            </h2>

                            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg border-l-2 border-zinc-800 pl-6">
                                Não é apenas sobre vídeos. Construímos a maior <span className="text-white font-bold">enciclopédia audiovisual de paraquedismo</span> da América Latina. Documentamos a jornada, a técnica e a emoção do esporte com qualidade cinematográfica.
                            </p>
                        </motion.div>

                        {/* Grid of Cards - Enhanced */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                { image: "https://i.imgur.com/H8vkCne.png", label: "Curso AFF", desc: "Passo a passo completo" },
                                { image: "https://i.imgur.com/QDgjk8r.png", label: "Segurança", desc: "Protocolos e análises" },
                                { image: "https://i.imgur.com/7RnHZax.png", label: "Vlogs & Lifestyle", desc: "A vida no dropzone" },
                                { image: "https://i.imgur.com/gt1MWF0.png", label: "Duvidas", desc: "Mitos e verdades" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="group relative p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/30 hover:bg-zinc-800/80 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-lime-900/10 hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-row items-center gap-5">
                                        <div className="p-0 w-20 h-20 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 group-hover:border-lime-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center overflow-hidden shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                className="w-full h-full object-contain transform scale-[1.7] group-hover:scale-[1.9] filter brightness-125 group-hover:brightness-150 group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-500"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black uppercase text-sm tracking-wide group-hover:text-lime-400 transition-colors">{item.label}</h3>
                                            <p className="text-zinc-500 text-xs mt-1 font-medium group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Modern CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                        >
                            <a 
                                href="https://www.youtube.com/@flyup" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative px-8 py-4 bg-white hover:bg-gray-100 text-black rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] inline-flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-neon translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                                <span className="relative z-10 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-black transition-colors">
                                     Junte-se a nós <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </a>
                            <p className="text-zinc-600 text-xs max-w-xs">
                                Junte-se a <span className="text-zinc-300">+100.000 inscritos</span> consumindo conteúdo de alta performance.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
