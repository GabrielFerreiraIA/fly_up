
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Curso de Paraquedismo após Salto Duplo: Entenda o Método AFF | Fly Up",
    description: "Adorou a experiência e quer pular sozinho? Descubra a transição exata do salto duplo para o Curso Accelerated Freefall (AFF) em Boituva.",
    keywords: "curso de paraquedismo aff, metodo aff paraquedismo, curso paraquedismo boituva, pular de paraquedas sozinho, aprender a saltar de paraquedas, nivel 1 aff",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470433/Curso_AFF_Foto_1_jwmjre.png"
                        alt="Curso de Paraquedismo Método AFF"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Academia Fly Up
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Curso de Paraquedismo Após o Salto Duplo: Entenda o <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Método AFF</span>
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 21 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Head Coach</div>
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
                            Se você amou as maravilhas imponentes sentidas rasgando a estratosfera azul naquelas tiras em um tandem com nossos super instrutores, o bichinho do esporte extremo nacional certamente já mordeu sua corrente linfática. E a imensa curiosidade brota nos portões da Escola Fly Up: <em>"E agora? Pra onde eu vou se eu quiser pular de mochila sozinho?"</em>.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            A resposta unânime espalhada pelo cinturão voador de Boituva ao mundo, da Europa à Oceania, chama-se rigorosamente de <strong>Curso AFF (Accelerated Freefall)</strong>. Um milagre metodológico patenteado mundialmente para criar paraquedistas sérios em tempo irrisoriamente veloz, substituindo o jurássico sistema das cordinhas estáticas antigas em escolas que penduravam cadetes aos troncos de helicópteros! Mas antes, prepare os nervos: sim, do Salto Duplo a chave virada aqui se dá pulando com um equipamento focado apenas e totalmente restrito em suas costas!
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">O Que Exatamente é e como Iniciamos no AFF?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            O conceito original do <em>Queda Livre Acelerada (Accelerated Freefall)</em> subverte a lenda das mil quedinhas baixas ou longas aulas tristes onde não se sobe jamais num Cessna e chora vendo todos pulando na grade! Ele provém de saltarmos acompanhado, sim, por <strong>instrutores fisicamente ao seu lado num vácuo segurando você na porta da mesma aeronave aos mesmos famosos 12.000 (doze mil pés) do salto duplo</strong> nas bordas esburacadas de nossa dropzone local de Boituva.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Antes de encostar o pé no avião solitário na aeronave você será batizado num impressionante "Ground School"! São inacreditáveis 10 horas completadas teóricas exaustivas (na Fly Up amamos mergulhar nessas águas profundas na nossa sala refrigerada especial) dissecando aerodinâmicos, dobragem do paraquedas real, simulações mecânicas intensas num simulador físico e procedimentos lógicos fortíssimos de controle severo em casos emergenciais!
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png"
                                alt="Treinamento com instrutor experiente nos ares"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">A Prática Célere no Voo Livre Subjetivo</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Como funciona o paraquedismo se não estivermos amarrados pelo peitoral de um mestre de salto gigante em nosso colar cervical? No AFF os amparos vitais passam pro lado exterior: dois incríveis 'Jump Masters' (Instrutores Coach credenciados pelas entidades brasileiras do esporte) irão travar tuas pernas, quadril e a camisa, caindo juntinhos formados deitados, estabilizando e nivelando teu centro aerodinâmico durante exaustivos sessenta gloriosos segundos a brutais duzentos quilômetros de veloz queda livre ininterruptos em todas as curvas!
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Benefícios do Treinamento Imersivo</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            <strong>Evolução Meteórica:</strong> Você passa de curiosidade de parque a um ser detentor de habilidades avançadas que manipulam gravidade densa controlando curvas precisas já nas primeiras duas ou três aproximações e mergulhos no final de semana inaugural.
                            <br /><br /><strong>Segurança Absoluta:</strong> Ter mestres voando abraçados num compasso tridimensional corrigindo pernas tortas ou arqueamentos incorretos é esplendidamente curativo perante bloqueios traumáticos que costumam isolar quem estagna num medo do giro involuntário em paraquedismos defasados da era antiga ASL.
                            <br /><br /><strong>Certificação Célere do Mundo Real:</strong> Ao fechar os 7 incríveis degraus sequenciais da etapa, você arrebata do currículo da Confederação o prestigiado grau para voar completamente blindado do amparo da barra dos instrutores! É ser liberto no infinito solitário da glória nas nuvens rumo às categorias esportivas profissionais de asas e times.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470433/Curso_AFF_Foto_1_jwmjre.png"
                                alt="Certificado de Atleta Nível 1"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Para quem é recomendado?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Se apaixonou desmedidamente pelo final e pelo vento rasgando o capacete duro e quer trocar esse fôlego por autonomia diária constante virando lenda dos ventos na Fly Up? O salto duplo abriu as portas e blindou tuas fendas de incerteza! Você nasceu para escalar e terminar esse curso formativo fabuloso da AFF acelerada.
                        </p>
                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Pronto para assumir o Comando?</h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Toda jornada de mil milhas começa nos livros de chão da Fly Up até a queda de cabeça nas alturas do certificado!</p>
                        <Link href="/curso-aff-pro" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Inscreva-se na Próxima Turma AFF
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
