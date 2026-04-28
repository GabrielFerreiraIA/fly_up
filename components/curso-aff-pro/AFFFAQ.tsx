"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Quantos saltos eu faço no curso?",
        answer: "O curso AFF completo consiste em 7 níveis de instrução prática. Cada nível corresponde a um salto com objetivos específicos de aprendizado. Após a aprovação no nível 7, você já é considerado um aluno em transição para a categoria A e pode saltar sozinho (consulte salto de graduação).",
    },
    {
        question: "Quantos dias de teórico?",
        answer: "O Ground School (parte teórica) tem duração média de 10 horas. Geralmente é realizado em um dia inteiro (sábado ou domingo) ou dividido em duas noites durante a semana, dependendo da agenda da turma.",
    },
    {
        question: "Eu salto sozinho sem instrutor?",
        answer: "Sim! O objetivo do curso é justamente sua autonomia. Nos níveis 1 a 3, você salta com dois instrutores segurando você. Nos níveis 4 a 7, apenas um instrutor acompanha. No nível 8 (salto de graduação), você já sai do avião sozinho, supervisionado de longe.",
    },
    {
        question: "Salto duplo conta para o curso AFF?",
        answer: "O salto duplo não conta como um dos 7 níveis do curso AFF, pois nele você não tem responsabilidade sobre o equipamento ou procedimentos. Porém, é uma excelente forma de quebrar o gelo e sentir a queda livre antes de iniciar o curso.",
    },
    {
        question: "Posso fazer o curso online?",
        answer: "Não. A segurança no paraquedismo exige treinamento presencial e prático. Você pode receber materiais de estudo digitalmente, mas o Ground School e as provas teóricas e práticas são obrigatoriamente presenciais no Centro de Paraquedismo.",
    },
    {
        question: "Quanto tempo eu termino o curso?",
        answer: "Depende da sua disponibilidade e das condições climáticas. Um aluno focado consegue terminar em 2 a 3 fins de semana. O ideal é não espaçar muito os saltos para manter a memória muscular ativa.",
    },
    {
        question: "O que acontece se eu reprovar um nível?",
        answer: "Caso não cumpra os objetivos de segurança de um nível, você precisará repeti-lo. Na Fly Up, isso é raríssimo (menos de 1%) graças ao nosso treinamento prévio em Túnel de Vento, que prepara seu corpo antes de ir para o céu.",
    },
    {
        question: "Quantos saltos posso fazer em um dia?",
        answer: "Para alunos em instrução, recomendamos no máximo 3 saltos por dia. O curso exige muita energia mental e física. A partir do 4º salto, o cansaço pode comprometer seu aprendizado e segurança.",
    },
];

export default function AFFFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden" id="faq">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                        Tire suas dúvidas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white leading-none">
                        Perguntas <span className="text-[#39FF14]">Frequentes</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className={`border rounded-xl transition-all duration-300 ${openIndex === i
                                    ? "border-[#39FF14]/40 bg-zinc-900"
                                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className={`font-bold uppercase tracking-wide text-sm pr-8 ${openIndex === i ? "text-white" : "text-zinc-400"}`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#39FF14]" : "text-zinc-600"}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-5 pb-5 pt-0">
                                            <p className="text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-zinc-500 text-sm">
                        Ainda tem dúvidas?{" "}
                        <a href="#" className="text-[#39FF14] font-bold hover:underline">
                            Fale com nosso time no WhatsApp
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
