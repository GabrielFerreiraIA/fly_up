import Link from "next/link";
import { Calendar, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
    {
        id: 1,
        title: "Como funciona o Salto Duplo de Paraquedas: O Guia Completo",
        summary: "Descubra todas as etapas do salto duplo, desde a preparação no solo até as instruções vitais para sair do avião e aproveitar o voo de paraquedas aberto.",
        date: "24 FEV 2026",
        category: "Salto Duplo",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png",
        slug: "como-funciona-o-salto-duplo-de-paraquedas",
    },
    {
        id: 2,
        title: "Qual a sensação de saltar de paraquedas pela primeira vez?",
        summary: "A ansiedade antes de embarcar e a paz indescritível do voo. Entenda como seu cérebro lida com a queda livre e a verdadeira sensação de liberdade no ar.",
        date: "24 FEV 2026",
        category: "Experiência",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png",
        slug: "sensacao-de-saltar-de-paraquedas-primeira-vez",
    },
    {
        id: 3,
        title: "Quanto tempo dura o salto duplo de paraquedas e qual a altura?",
        summary: "Do embarque no avião até a aterrissagem suave: saiba a duração exata da queda livre, o tempo de voo com o paraquedas aberto e os detalhes da altitude no nível de 12.000 pés.",
        date: "23 FEV 2026",
        category: "Informação",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958051/Imagem_Balao_6_Editada_4-5_be0out.png",
        slug: "quanto-tempo-dura-salto-duplo-paraquedas-altura",
    },
    {
        id: 4,
        title: "Idade mínima e pré-requisitos para o Salto Duplo de Paraquedas",
        summary: "Existem limites de idade ou de peso? Entenda as regras da Confederação Brasileira de Paraquedismo e prepare-se adequadamente para a sua aventura no céu.",
        date: "22 FEV 2026",
        category: "Regras",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470429/Foto_Tunel_de_Vento_1_gn2b40.png",
        slug: "idade-minima-pre-requisitos-salto-duplo-paraquedas",
    },
    {
        id: 5,
        title: "Curso de Paraquedismo após o Salto Duplo: Entenda o Método AFF",
        summary: "Adorou a experiência e quer saltar sozinho? Saiba como funciona a transição do salto duplo para o Accelerated Freefall (AFF) e vire um paraquedista autônomo.",
        date: "21 FEV 2026",
        category: "Curso AFF",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470433/Curso_AFF_Foto_1_jwmjre.png",
        slug: "curso-de-paraquedismo-apos-salto-duplo-metodo-aff",
    },
    {
        id: 6,
        title: "Todas as Fases e Etapas do Curso AFF de Paraquedismo",
        summary: "O passo a passo definitivo sobre os 7 níveis do curso AFF. O que você vai aprender na teoria do ground school e as avaliações no ar de estabilidade circular, locomoção e giros.",
        date: "20 FEV 2026",
        category: "Curso AFF",
        image: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470434/Wing_Suit_imagem_1_mhspao.png",
        slug: "fases-etapas-curso-aff-paraquedismo",
    },
];

export default function Blog() {
    return (
        <div className="pt-24 min-h-screen bg-zinc-950">
            {/* Header - White Theme */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_60%)] pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-zinc-500 text-sm font-black uppercase tracking-[0.2em] mb-4 block">
                        Conteúdo Exclusivo
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-6 italic">
                        Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Paraquedista</span>
                    </h1>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Mergulhe no universo do paraquedismo. Descubra como funciona o salto duplo, as vantagens do curso AFF e todas as dicas para você conquistar os céus com segurança e emoção!
                    </p>
                </div>
            </section>

            {/* Grid - Dark Theme */}
            <section className="py-24 bg-zinc-950 border-t border-white/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                                <article
                                    className="bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-neon hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col h-full perspective-1000 transform group-hover:-translate-y-2"
                                >
                                    {/* Image */}
                                    <div className="relative h-72 overflow-hidden bg-black">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${post.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-neon text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 flex items-center gap-2">
                                                <Tag size={12} />
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Hover overlay highlight */}
                                        <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow relative bg-zinc-900">
                                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                            <Calendar size={14} className="text-neon" />
                                            <span>{post.date}</span>
                                        </div>

                                        <div className="mb-4 flex-grow">
                                            <h3 className="text-xl md:text-2xl font-black italic text-white uppercase leading-tight group-hover:text-neon transition-colors line-clamp-3 lg:min-h-[90px]">
                                                {post.title}
                                            </h3>
                                        </div>

                                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                                            {post.summary}
                                        </p>

                                        <div className="pt-6 border-t border-white/10">
                                            <span className="inline-flex items-center gap-2 text-white group-hover:text-neon text-[11px] font-black uppercase tracking-[0.2em] transition-colors">
                                                Ler Artigo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
