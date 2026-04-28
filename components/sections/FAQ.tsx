"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "É seguro saltar de paraquedas?",
        answer: "Absolutamente. O paraquedismo é regulamentado e segue normas rígidas de segurança. Na Fly Up, utilizamos equipamentos de última geração e todos os nossos equipamentos possuem dispositivos de abertura automática (DAA). Nossos instrutores são certificados e possuem milhares de saltos.",
    },
    {
        question: "Preciso ter experiência prévia?",
        answer: "Não! O Salto Duplo foi criado justamente para quem nunca saltou. Você receberá um treinamento de 15 minutos antes do embarque e estará conectado a um instrutor profissional o tempo todo.",
    },
    {
        question: "Quanto tempo dura a queda livre?",
        answer: "No salto a 12.000 pés, a queda livre dura cerca de 45 a 50 segundos, atingindo velocidades de até 200km/h. Após a abertura do paraquedas, você terá mais 5 a 7 minutos de navegação suave até o pouso.",
    },
    {
        question: "Existe limite de peso ou idade?",
        answer: "A idade mínima é 12 anos (com autorização dos pais). O peso limite é geralmente 95kg. Para pessoas acima deste peso, é necessária uma avaliação prévia e pode haver uma taxa extra.",
    },
    {
        question: "E se o paraquedas não abrir?",
        answer: "Todos os equipamentos de paraquedismo possuem DOIS paraquedas: o principal e o reserva. O reserva é dobrado por um especialista certificado e inspecionado periodicamente. Além disso, existe o Cybernetic Parachute Release System (Cypres), um computador que abre o reserva automaticamente caso necessário.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-zinc-950 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">
                        Dúvidas Frequentes
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-montserrat">
                        Tudo sobre seu salto
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "border border-white/5 bg-zinc-900/30 rounded-lg overflow-hidden transition-all duration-300",
                                openIndex === index ? "border-primary/30 bg-zinc-900/80" : "hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={cn(
                                    "text-lg font-bold font-montserrat uppercase transition-colors",
                                    openIndex === index ? "text-primary" : "text-white"
                                )}>
                                    {faq.question}
                                </span>
                                <span className={cn(
                                    "p-2 rounded-full transition-colors",
                                    openIndex === index ? "bg-primary text-black" : "bg-white/5 text-zinc-400"
                                )}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-white/5 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
