"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface WhatsAppButtonProps {
    phoneNumber?: string;
    message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
    phoneNumber = "5515998282280",
    message = "Olá! Gostaria de saber mais informações.",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const finalMessage = `Olá, meu nome é ${name}, meu telefone é ${phone}. ${message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        // Reset form
        setName("");
        setPhone("");
    };

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-[#25D366]" />
                            
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-black text-white italic uppercase tracking-wider mb-2">Falar no WhatsApp</h3>
                            <p className="text-zinc-400 text-sm mb-6">Por favor, informe seu nome e telefone para iniciarmos o atendimento.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="wa-name" className="text-sm font-bold text-white uppercase tracking-wider">Nome Completo</label>
                                    <input
                                        id="wa-name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#25D366] transition-colors"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="wa-phone" className="text-sm font-bold text-white uppercase tracking-wider">Telefone / WhatsApp</label>
                                    <input
                                        id="wa-phone"
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#25D366] transition-colors"
                                        placeholder="(15) 99999-9999"
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-black italic uppercase tracking-wider px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
                                >
                                    <span>Iniciar Conversa</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <AnimatePresence>
                <div
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] cursor-pointer group"
                    aria-label="Fale conosco no WhatsApp"
                >
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-[#25D366] -z-10"
                    />

                    {/* WhatsApp Icon SVG */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 relative z-10"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-xl pointer-events-none">
                        Fale com um instrutor
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-r border-t border-white/10 rotate-45" />
                    </div>
                </div>
            </AnimatePresence>
        </>
    );
};

export default WhatsAppButton;
