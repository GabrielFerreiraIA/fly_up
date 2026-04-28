"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Minus, Calendar, Tag, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "É seguro saltar de paraquedas?",
        answer: "Absolutamente. O paraquedismo é regulamentado e segue normas rígidas de segurança. Na Fly Up, utilizamos equipamentos de última geração e todos os nossos equipamentos possuem dispositivos de abertura automática (DAA). Nossos instrutores são certificados pelas entidades brasileiras do esporte e possuem milhares de saltos.",
    },
    {
        question: "Preciso ter experiência prévia para o salto duplo?",
        answer: "Não! O Salto Duplo foi criado justamente para quem nunca saltou. Você receberá um treinamento de 15 minutos em solo antes do embarque e estará conectado a um instrutor profissional e experiente durante toda a experiência.",
    },
    {
        question: "Quanto tempo dura a queda livre e o voo de paraquedas?",
        answer: "No salto a 12.000 pés, a queda livre dura cerca de 45 a 50 segundos, atingindo velocidades de até 200km/h. Após a abertura do paraquedas, você terá mais 5 a 7 minutos de navegação suave e panorâmica até o pouso.",
    },
    {
        question: "Existe limite de peso ou idade para saltar?",
        answer: "A idade mínima é 12 anos (menores de 18 anos precisam de autorização assinada pelos pais ou responsáveis). O peso limite padrão é 95kg. Para pessoas acima deste peso, é necessária uma avaliação prévia do instrutor no local e pode haver uma taxa extra pela exigência diferenciada do equipamento.",
    },
    {
        question: "E se o paraquedas não abrir?",
        answer: "Todos os equipamentos profissionais de paraquedismo possuem DOIS paraquedas em seu interior: o principal e o reserva. O reserva é dobrado exclusivamente por um especialista rigger certificado. Além disso, os velames contam com o DAA (Dispositivo de Abertura Automática), um computador de bordo que abre o reserva automaticamente caso identifique uma atitude de risco na altura limite.",
    },
    {
        question: "Posso usar óculos de grau ou lentes de contato durante o salto?",
        answer: "Sim, sem problemas! Nós forneceremos óculos de salto especiais (goggles) que são colocados por cima dos seus óculos de grau para protegê-los do vento e garantir que você aproveite toda a paisagem.",
    },
    {
        question: "Como é o pouso? É perigoso se machucar?",
        answer: "O pouso moderno é extremamente suave. Antes de aterrissar, o instrutor fará o 'flare' (frenagem) do paraquedas, e pedirá para que você levante as pernas, para que ele toque o solo primeiro. Costuma ser tão suave quanto descer um degrau de escada.",
    },
    {
        question: "Posso levar minha própria câmera (GoPro) ou celular no salto?",
        answer: "Por questões de segurança estipuladas pelas entidades brasileiras do esporte, passageiros de salto duplo não são autorizados a portar câmeras eletrônicas ou celulares durante o voo, pois podem se soltar ou causar distrações. Mas fique tranquilo! Nossos instrutores ou os cameraflyers registrarão tudo para você.",
    },
    {
        question: "Como devo me vestir no dia do salto?",
        answer: "Recomendamos roupas confortáveis, propícias para esportes, como moletons, calças de tactel ou legging, e camisetas confortáveis. Nos pés, o uso de tênis é obrigatório (nada de botas, chinelos ou sandálias). Em dias mais frios, traga blusas de frio justas ou corta-vento.",
    },
    {
        question: "Se o clima estiver ruim no dia, o que acontece?",
        answer: "O paraquedismo é um esporte totalmente dependente das condições climáticas (vento, nuvens e chuva). Caso o tempo não esteja seguro para o salto, informaremos você e reagendaremos a atividade sem nenhum custo adicional para a melhor data disponível.",
    },
];

const relatedPosts = [
    {
        id: 1,
        title: "Como funciona o Salto Duplo de Paraquedas: O Guia Completo",
        summary: "Descubra todas as etapas do salto duplo, desde a preparação no solo até as instruções vitais para sair do avião...",
        date: "24 FEV 2026",
        category: "Salto Duplo",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png",
        slug: "como-funciona-o-salto-duplo-de-paraquedas",
    },
    {
        id: 2,
        title: "Qual a sensação de saltar de paraquedas pela primeira vez?",
        summary: "A ansiedade antes de embarcar e a paz indescritível do voo. Entenda como seu cérebro lida com a queda livre...",
        date: "24 FEV 2026",
        category: "Experiência",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png",
        slug: "sensacao-de-saltar-de-paraquedas-primeira-vez",
    },
    {
        id: 4,
        title: "Idade mínima e pré-requisitos para o Salto Duplo de Paraquedas",
        summary: "Existem limites de idade ou de peso? Entenda as regras do esporte e prepare-se para a sua aventura no céu.",
        date: "22 FEV 2026",
        category: "Regras",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470429/Foto_Tunel_de_Vento_1_gn2b40.png",
        slug: "idade-minima-pre-requisitos-salto-duplo-paraquedas",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="pt-24 min-h-screen bg-zinc-950">
            {/* Header - White Theme */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_60%)] pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-zinc-500 text-sm font-black uppercase tracking-[0.2em] mb-4 block">
                        Dúvidas Frequentes
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-6 italic">
                        F<span className="text-neon">A</span>Q
                    </h1>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Encontre as respostas para as perguntas mais comuns sobre saltos duplos, cursos e nossa estrutura para que você possa embarcar nessa aventura com total segurança e tranquilidade.
                    </p>
                </div>
            </section>

            {/* FAQ List Content */}
            <section className="py-24 bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-4xl">
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
                                        "text-lg font-bold font-montserrat uppercase transition-colors pr-6",
                                        openIndex === index ? "text-primary" : "text-white"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <span className={cn(
                                        "p-2 rounded-full transition-colors flex-shrink-0",
                                        openIndex === index ? "bg-primary text-black" : "bg-white/5 text-zinc-400"
                                    )}>
                                        {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                    </span>
                                </button>

                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-300 ease-in-out",
                                        openIndex === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
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

            {/* Related Blog Posts (Veja também) */}
            <section className="py-24 bg-black border-t border-white/5 relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />
                 <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">
                            Explore Mais
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Veja Também
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {relatedPosts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                                <article
                                    className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden hover:border-neon hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] transition-all duration-500 flex flex-col h-full transform group-hover:-translate-y-2"
                                >
                                    {/* Image */}
                                    <div className="relative h-60 overflow-hidden bg-black">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${post.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md text-neon text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 flex items-center gap-1.5">
                                                <Tag size={10} />
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow relative bg-zinc-900">
                                        <div className="mb-3 flex-grow">
                                            <h3 className="text-lg md:text-xl font-black italic text-white uppercase leading-tight group-hover:text-neon transition-colors line-clamp-3">
                                                {post.title}
                                            </h3>
                                        </div>

                                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-6 font-medium">
                                            {post.summary}
                                        </p>

                                        <div className="pt-4 border-t border-white/10 mt-auto">
                                            <span className="inline-flex items-center gap-2 text-white group-hover:text-neon text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                                                Ler Artigo <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-zinc-900 relative overflow-hidden border-t border-white/5 text-center">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/q_auto/v1775267073/f_j84mxs.webp"
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20 sepia-[0.3]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                        Ainda tem dúvidas?
                    </h2>
                    <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
                        Nossa equipe está preparada para responder qualquer pergunta adicional. Entre em contato conosco e tire suas dúvidas!
                    </p>
                    <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-neon hover:bg-neon-hover text-black font-black italic uppercase tracking-wider px-8 py-7 text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] flex items-center gap-3 relative overflow-hidden group/btn mx-auto">
                            <span className="relative z-10 flex items-center gap-2">
                                <MessageCircle size={22} className="group-hover/btn:scale-110 transition-transform" />
                                Fale com a equipe
                            </span>
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
