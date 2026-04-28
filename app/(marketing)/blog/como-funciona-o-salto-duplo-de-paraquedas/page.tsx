import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Como funciona o Salto Duplo de Paraquedas: O Guia Completo | Fly Up",
    description: "Descubra detalhadamente todas as etapas do salto duplo de paraquedas em Boituva, da chegada ao aeroclube até a glória da aterrissagem.",
    keywords: "como funciona o salto duplo de paraquedas, etapas do salto duplo, o que é salto duplo de paraquedas, salto duplo para inciantes, salto de paraquedas Boituva",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png"
                        alt="Como funciona o Salto Duplo de Paraquedas"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Guia Completo Especialista
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Como funciona o Salto Duplo de Paraquedas: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">O Guia Completo</span>
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 24 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Fly Up Experts</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><MapPin size={14} className="text-neon" /> Capital do Paraquedismo</div>
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
                            Você já sonhou em voar, sentindo o poder do vento enquanto admira de cima os rios, rodovias e campos rurais como se fossem maquetes? Muitas pessoas querem viver esse momento, mas a dúvida sobre <strong>como funciona o salto duplo de paraquedas</strong> acaba deixando o sonho em compasso de espera.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Se você está considerando viver a glória de saltar da porta de um avião a milhares de pés de altitude na prestigiada cidade de Boituva (o principal polo do paraquedismo nacional), preparamos este guia exclusivo detalhando todas as fases da sua jornada rumo às nuvens. Sem jargões confusos e direto ao ponto!
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">1. O Primeiríssimo Passo: Chegada e Recepção</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            O paraquedismo é um esporte que depende essencialmente do clima. Ao chegar no aeroclube da escola Fly Up, nós avaliamos primeiramente a velocidade do vento e a camada de nuvens. Essa é a base de nossa segurança. Logo no check-in, faremos as verificações necessárias: cadastro, assinatura do termo de responsabilidade e conferência documental. Logo depois, você conhecerá pessoalmente o seu mestre de salto (o instrutor que irá conectado a você). É o instante de quebrar o gelo e sentir a vibe que te acompanhará no ar.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png"
                                alt="Equipamentos para salto duplo em ação no céu"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">2. Briefing Rápido: O que aprender antes do pulo?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Muitos iniciantes acreditam que vão ter uma aula escolar cansativa. Nada disso! O briefing para o <em>salto duplo para iniciantes</em> demora geralmente de 10 a 15 minutos em uma área reservada. Sendo extremamente prático, seu instrutor fará os ajustes do "Harness" (o cinto ou cadeirinha que te une a ele com quatro fechos indestrutíveis) e simulará num modelo de avião como atuar.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Você aprenderá apenas três fáceis obrigações corporais:
                            <br /><strong>A Saída:</strong> Inclinar a cabeça para trás, apoiar as mãos no próprio arnês dobrando as pernas igual uma pequena banana!
                            <br /><strong>O Voo:</strong> Braços abertos, aproveitando o momento em êxtase assim que o instrutor tocar no seu ombro.
                            <br /><strong>O Pouso:</strong> Erguer as pernas retas à frente, para que o único pé que encoste primeiro no chão seja o do seu experiente professor.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">3. O Voo Panorâmico</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Depois dos testes práticos no solo, caminhamos para o embarque na nossa aeronave apropriada. O voo entre ligar o motor na pista de grama até atingirmos os gloriosos 12.000 pés de altitude dura por volta de 15 a 20 minutos. <strong>O que é o salto duplo de paraquedas no ar?</strong> Consiste em uma subida coletiva e uma saída majestosa do avião amarrado a instrução qualificada. É seu momento "Zen" olhando pela janela os quilômetros de campos lá embaixo virando pontinhos coloridos. A essa altura, o barulho do avião e o instrutor revisando seus grampos pela última vez colocam sua adrenalina a mil.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">4. A Hora H: A Queda Livre</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Uma lâmpada vermelha avisa o grupo. A porta inteira rola para cima e o sol inunda a cabine. Na luz verde, é sua vez. Sentando no piso, os pés balançam do lado de fora enquanto o vento forte afaga seu rosto a 150km/h da própria força da aeronave. Seu coração bateria descompassado se já não fosse o foco gigantesco dominando sua cabeça!
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            <strong>Como funciona a queda livre?</strong> É uma descida vertical a colossais 200 km/h que dura, na média, dolorosamente deliciosos 45 a 50 segundos. E a sensação? Esqueça a montanha-russa. Não há buraco, frio destrutivo ou perda do estômago! É uma sensação formidável de deitar sob um imenso colchão de ar denso gerado pela velocidade vertiginosa que suporta com incrível delicadeza você dois emparelhados de barriga para baixo.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958050/Imagem_Balao_Editada_4-5_c2uipb.png"
                                alt="Vista panorâmica durante a descida com paraquedas aberto"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">5. Navegação no Silêncio (Voo de Velame Aberto)</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Próximo à marca dos 5.000 pés do chão, o paraquedista realiza o comando manual. Em dois ou três segundos firmes, as frenagens te puxam para cima suavemente. Imediatamente o som do vento gritante apaga. Um privilégio completo inunda o silêncio de lá de cima, o avião já foi embora, as nuvens parecem de algodão e a adrenalina diminui, cedendo o lugar a uma grandiosa apreciação visual panorâmica por impressionantes cinco a seis minutos comemorando abraçado ao céu azul. Dependendo dos ares estáveis, o seu mestre pode até permitir temporariamente que suas mãos peguem nas cordinhas, fazendo você direcionar ativamente grandes curvas suaves para compreender como pilotamos um paraquedas.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">6. O Pouso em Terra Firme</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Alinhando com o alvo central verde no gramado do centro esportivo local, escutará de pertinho o pedido derradeiro: "Levante suas pernas pra cima!" Neste ato, mantendo suas botas altas de forma reta, o instrutor fará a frenagem avançada do pano principal bem nos dois metros finais que sobram. O resultado é como descer resvalando sentado sem impacto nas nádegas suavemente no campo verde ameno! Terminou? Só restou os parabéns e um imenso brinde da comitiva assistindo seu sucesso na gravação profissional!
                        </p>

                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Você está Pronto para Viver a Magia?</h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Esqueça a dúvida! Centenas de vidas pulam todos os meses com nossa experiência ímpar em Boituva.</p>
                        <Link href="/salto-duplo" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Agende o Seu Primeiro Salto
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
