import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Todas as Fases e Etapas do Curso AFF de Paraquedismo | Fly Up",
    description: "O passo a passo definitivo dos 7 níveis do curso AFF (Accelerated Freefall) explicados em detalhes por especialistas, do ground school até a graduação final.",
    keywords: "etapas curso aff, fasses curso aff paraquedismo, niveis aff paraquedismo, saltar de paraquedas sozinho, aprender a saltar de paraquedas niveis",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470434/Wing_Suit_imagem_1_mhspao.png"
                        alt="Todas as Fases do Curso AFF de Paraquedismo"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Academia de Atletas
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Todas as <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Fases e Etapas</span> do Curso AFF de Paraquedismo
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 20 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Equipe Técnica das Entidades do Esporte</div>
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
                            Se você está lendo isso, a pergunta central martelando a sua mente não é mais o "o que é?", mas sim um vigoroso <strong>"como eu faço pra cruzar do chão até o cobiçado certificado da escola Fly Up de forma cronológica?"</strong>
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Transformar um corajoso comum num domador dos ventos não requer dons imortais heróicos ou currículo acrobático prévio. Requer puramente dedicação às <strong>fases oficiais do Curso Accelerated Freefall (AFF)</strong> impostas pelas matrizes globais de ensino do United States Parachute Association (USPA) importadas para nossa escola em solo nacional.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">O "Ground School": O Berço Teórico do Voo (A Fase Zero)</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Antes da porta ruidosa abrir lá nas frias estearas dos 12.000 pés, sentamos numa calorosa sala das dependências de ensino em Boituva por intensas dez horas integrais curriculares para um divisor de águas absoluto. O <strong>treinamento teórico massivo do método AFF de paraquedismo</strong> varre todos os jargões, lida com a dobragem profunda do modelo aéreo pessoal que envergará em suas costas e cimenta os simuladores práticos perante situações anômalas raras de pane de comando, a posição em rã aerodinâmica exata e as curvas primárias usando os braços. Entendeu física do solo? Você pula!
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958050/Imagem_Balao_Editada_4-5_c2uipb.png"
                                alt="Paraquedista com o controle manual absoluto acima de Boituva"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Nível 1, 2 e 3 do Curso AFF de Paraquedismo: Assistência Dupla em Ação</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Os três primeiros e colossais saltos formam o miolo inicial da superação humana. Abandonando totalmente os vínculos de cordas fixas das épocas pioneiras de antigamente, você pulará sozinho carregando sua mochila sim, porém cercado brutalmente com a estabilização corpórea de <strong>dois Jump Masters credenciados de altíssima milhagem, um travando o quadril esquerdo e outro cuidando do joelho direito simultaneamente em pleno ar!</strong> Eles não te deixam embalar desgovernado.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            <strong className="text-black">Nível 1 de reconhecimento das alturas:</strong> Aqui seus orientadores focam sua atenção no círculo da consciência mental sob vento intenso de duzentos km/h checando um simulacro crivado num punho piloto para posterior acionamento dos velames.
                            <br /><br /><strong className="text-black">Nível 2 focando nas pernas do curso:</strong> Iniciamos singelos movimentos dos seus joelhos simulando curvas leves adiante. Mantendo a dupla firme de ajudantes colados à tua estabilidade absoluta da queda livre.
                            <br /><br /><strong className="text-black">Nível 3 A Liberação Tímida inicial:</strong> O divisor dramático de águas em que os dois instrutores flutuantes te soltam parcialmente, de modo momentâneo na horizontal apenas uns cinco ou quatro preciosos segundos e te agarram de volta. Pela majestosa primeira vez na vida você flutuou e se sustentou inteiramente pela barriga numa laje irreal de um vento fortíssimo solidificado sozinho!
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Graus de Níveis 4 a 6: Um Instrutor Solitário Perante as Piruetas Aéreas</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Ao se graduar solidamente capaz e maduro aerodinamicamente do 3º nível, você entra na esfera singular. <strong>Dizemos tchau pra um dos mestres.</strong> Daqui adiante apenas um instrutor master mergulhará segurando no começo seu corpo do chão do Cessna. E imediatamente solta as travas pro aluno voar as tarefas de agilidade.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            <strong className="text-black">Paraquedas AFF Nível 4:</strong> Você comandará giros severos e completos em incríveis e fechados 90 graus horizontais sem derrapar ou cair na armadilha espinhal perigosa para canos de manobra, sempre observado e perseguido no ar livre de perto por uma lente mestre.
                            <br /><strong className="text-black">Nível 5, O Controle Supremo total de Paraquedismo:</strong> Entramos na casa fantástica dos assustadores completos trezentos e sessenta intensos graus circulares na abóboda dos ares, aprendendo a retornar precisamente ao prumo magnético do norte em pleno meio celestial sem apoio periférico!
                            <br /><strong className="text-black">Nível 6 de estabilidade:</strong> O famigerado terror da desestabilização provocativa dos exames chamados 'mortal' (flip traseiro total e front loop saltando) da qual recobra a barriga nivelada rapidamente no meio da força gravitacional em meros curtos três segundos com sucesso provado em fitas avaliativas.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470433/Curso_AFF_Foto_1_jwmjre.png"
                                alt="Companheiros certificados pousando juntos ao final de um longo AFF"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">O Nível 7 de Graduação: A Apresentação Coroada para Ser o Novo Paraquedista</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            E enfim após rasgar seis doloridas marcas intensivas com sangue na veia. O final absoluto aproxima a graduação esportiva amadora <strong>no salto nível 7 do incrível Curso AFF!</strong> Esse salto representa no ar e nas filmadoras ativas um grande catadão geral e revisão rigorosa contendo uma bateria completa encadeada que misturou todas as piruetas, estabilizações de pernas dobradas, flip frontais, trancos axiais e de navegações perfeitamente limpas do velames de treino nas zonas corretas de escape seguras da Dropzone de Boituva.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Passando essa peneira estelar de segurança das entidades brasileiras do esporte, abraçam-se fortes amigos irmãos do ar. Você virou recém formado e certificado atleta saltador de esportes nas alturas, liberado orgulhosamente das obrigações com mestres caros voando acorrentado do lado. Podendo enfim ir comprar a própria parafernália alçando as categorias das nuvens sozinho para domingos maravilhosos até o fim de seus felizes dias saltitantes nos paraquedas!
                        </p>
                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Pronto para Conquistar as Alturas em 7 Passos?</h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Matricule-se no curso de desenvolvimento aéreo mais bem conceituado em Boituva.</p>
                        <Link href="/curso-aff-pro" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Transforme sua Adrenalina em Esporte
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
