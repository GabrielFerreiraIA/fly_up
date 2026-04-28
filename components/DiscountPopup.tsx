"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscountPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem("flyup-discount-seen");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 3000); // 3 seconds delay
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem("flyup-discount-seen", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-zinc-950 border border-neon/30 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.2)]"
                    >
                        {/* Decorative background */}
                        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neon/10 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-neon/5 rounded-full blur-[60px]" />
                            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#39FF14_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                        </div>

                        <div className="relative z-10 p-10 text-center">
                            <button 
                                onClick={closePopup}
                                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <motion.div 
                                initial={{ rotate: -10, scale: 0.8 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 10 }}
                                className="w-20 h-20 bg-neon/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-neon/20 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                            >
                                <Gift className="w-10 h-10 text-neon" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                    <Sparkles size={12} /> Oferta Especial <Sparkles size={12} />
                                </div>
                                
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">
                                    GANHE <span className="text-neon">10% OFF</span>
                                </h3>
                                <p className="text-zinc-400 text-lg font-medium mb-8 leading-snug">
                                    Garanta seu desconto agora para o seu primeiro Salto Duplo! <br />
                                    Expira em <span className="text-white font-bold">24 horas</span>.
                                </p>

                                <div className="space-y-4">
                                    <Button 
                                        onClick={closePopup}
                                        className="w-full bg-neon hover:bg-neon-hover text-black font-black italic uppercase text-lg py-8 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all group"
                                    >
                                        REQUERER MEU DESCONTO <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    
                                    <button 
                                        onClick={closePopup}
                                        className="text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors"
                                    >
                                        Não, obrigado. Prefiro pagar o valor cheio.
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Bottom bar */}
                        <div className="h-2 w-full bg-gradient-to-r from-neon via-emerald-400 to-neon relative">
                            <motion.div 
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-1/4 h-full bg-white/40 blur-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
