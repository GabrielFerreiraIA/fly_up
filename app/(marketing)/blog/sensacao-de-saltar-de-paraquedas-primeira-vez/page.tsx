import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Qual a sensação de saltar de paraquedas pela primeira vez? | Fly Up",
    description: "Da ansiedade antes de embarcar à paz indescritível do voo. Entenda como seu cérebro lida com a queda livre e a verdadeira sensação de liberdade no ar.",
    keywords: "sensação de saltar de paraquedas, sensação queda livre, medo de altura paraquedas, medo de saltar de paraquedas, primeiro salto duplo",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png"
                        alt="Qual a sensação de saltar de paraquedas pela primeira vez"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Experiência
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Qual a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Sensação</span> de saltar de paraquedas pela primeira vez?
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 24 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Fly Up Experts</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><MapPin size={14} className="text-neon" /> Boituva - SP</div>
                    </div>
                </div>
            </section>

            {/* Article Body */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="mb-14 border-b border-zinc-200 pb-8">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-colors bg-zinc-100 hover:bg-neon hover:border-neon px-5 py-2 rounded-full border border-zinc-200">
                            <ArrowLeft size={14} /> Voltar para o Journal
                        </Link>
                    </div>

                    <article className="prose prose-lg max-w-none">
                        <p className="text-2xl text-zinc-800 font-medium mb-12 leading-relaxed border-l-4 border-neon pl-8 py-2">
                            A resposta rápida e objetiva para a pergunta de qual é a <strong>sensação de saltar de paraquedas pela primeira vez</strong> é uma única palavra: "libertadora". No entanto, quem ama palavras quer dissecar por que tantas pessoas mudam suas vidas após pularem de um avião.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Para você entender profundamente essa mágica (antes mesmo de fazer as suas malas rumo a Fly Up em Boituva), vamos detalhar cuidadosamente todas as etapas mentais e físicas! E fique tranquilo, mesmo quem sofre de fobia de montanha-russa consegue amar a queda livre. Vamos descobrir o motivo?
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">A Ansiedade do Começo (O Frio na Barriga)</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Seria uma traição dizer que ninguém se assusta ou se arrepia. O nervosismo e as palmas suadas são na verdade superpoderes do seu organismo lhe preparando. Trata-se da ansiedade positiva: quando o seu cérebro sabe instintivamente que experimentará algo extraordinário e completamente inédito.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Durante o preenchimento da ficha e o voo na barriga do avião lotado de pessoas ejetando endorfinas na sua corrente sanguínea, seu corpo atinge um pico formidável de foco. É um reset psicológico. Ao <strong>superar o medo de saltar de paraquedas</strong>, muitos confessam que se livraram de amarras ou bloqueios de coragem em seus próprios trabalhos e relacionamentos nos dias seguintes! É uma superação física incontestável.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_3_Editada_4-5_myjoxk.png"
                                alt="Paraquedista radiante de alegria no salto duplo"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Afinal, eu tenho muito 'Medo de Altura' no Salto Duplo?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Esta é uma lenda imensa! Pode ser difícil de engolir, contudo, é comprovado que <strong>o cérebro não contabiliza profundidade real sem pontos de referência visuais tangíveis que correm para trás dos seus olhos</strong>.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Ou seja: nós sentimos vertigem ao ficarmos plantados numa beirada de varanda em um arranha-céu vizinho ao chão da calçada, por causa de um perigo visivelmente mapeado em três dimensões imediatas. Por outro lado, a doze mil pés (4 mil metros), não faz muita diferença o tamanho minúsculo do solo. Tudo é muito abstrato. A sensação mais proeminente e arrebatadora é de olhar para imagens belas impressas em um mapa de papel num computador gigante. Praticamente não há a tal da vertigem.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">O salto de fato e a Surpresa Genuína</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            "Será que vou sentir aquele famoso buraco chato no estômago estilo o barco pirata balançando num parque de diversão infantil?" O seu corpo ganha esse 'medo gástrico' quando se inicia lentamente de um grau horizontal zerado (parado) e bruscamente atirro no precipício vertical da cadeira russa.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958051/Imagem_Balao_6_Editada_4-5_be0out.png"
                                alt="A tranquilidade do voo com o equipamento aberto"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Navegação e Paz Celestial</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Então os mágicos e furiosos cinquenta segundos de vento passam rápido, sentindo as correntes de forma rígida pelo corpo sem solavancos. Depois da aceleração frenética (velocidade terminal cravada nos 200 Km/hora), tudo freia subitamente!
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            A navegação através do lindo paraquedas colorido recém aberto é o oposto complementar perfeito da adrenalina explosiva. Tudo vira um balé aéreo sem gritos de vento e barulho rasgante. Você paira. Há quem medite e agradeça ou grite xingamentos felizes comemorando o mundo! Você vira refém das nuvens sentindo o controle esquerdo do batoque pelo ar limpo fazendo girinhos curtos na área de salto da maravilhosa capital dos paraquedistas.
                        </p>
                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Duvida se Essa Sensação é Pra Você?</h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Vença agora mesmo o medo e experimente a melhor viagem em cinco minutos da sua rotina na vida.</p>
                        <Link href="/salto-duplo" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Viva Essa Adrenalina
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
