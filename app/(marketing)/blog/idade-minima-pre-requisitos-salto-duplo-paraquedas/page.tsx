import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Idade mínima e pré-requisitos para o Salto Duplo de Paraquedas | Fly Up",
    description: "Existem limites de idade ou de peso? Entenda as regras das entidades brasileiras do esporte e prepare-se adequadamente para a sua aventura no céu de Boituva.",
    keywords: "idade mínima para salto duplo de paraquedas, limite de peso para salto duplo, salto duplo de paraquedas autorização dos pais, pré requisitos salto duplo, quem não pode saltar de paraquedas",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470429/Foto_Tunel_de_Vento_1_gn2b40.png"
                        alt="Idade mínima e pré-requisitos para Salto Duplo"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Regras das Entidades Nacionais
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Idade Mínima e <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Pré-Requisitos</span> para o Salto Duplo de Paraquedas
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 22 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Fly Up Safety</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><MapPin size={14} className="text-neon" /> Centro de Treinamento</div>
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
                            Se você chegou ao ponto de reservar emocionalmente seu fim de semana para um inesquecível batismo nas nuvens em nossa escola Fly Up em Boituva, a empolgação agora divide lugar com as burocracias essenciais do esporte. Afinal, quem pode e quem não pode voar?
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Questões que parecem lendas urbanas enchem as caixas de mensagens dos aeroclubes da capital nacional do paraquedismo: <em>"Tem restrição de tamanho, idade ou dores?"</em> Vamos deixar o achismo de lado e esclarecer rigidamente as diretrizes das <strong>entidades brasileiras do esporte</strong>.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">O Fator Legal: Qual a Idade Mínima para Salto Duplo?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Conectemos aos fatos legais primeiro. Oficialmente em nosso esporte nacional o limiar se encontra na margem da adolescência. <strong>A idade mínima para salto duplo de paraquedas cravou nos 14 anos</strong>.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Porém não basta parecer maduro ou se atirar escondido! Para absolutamente qualquer aventureiro corajoso e entusiasmado menor de 18 anos bater as botas nos ares a nossa federação ordena regras rigorosas para isenção. O <strong>salto duplo de paraquedas com autorização dos pais</strong> reconhecida em modelo oficial é mandatório para permitir sua escalada nos nossos maravilhosos aviões. E isso garante pais maravilhosos amparando e assinando termos físicos nas tendas, observando suas maravilhas pularem juntos a Tandem-Masters completamente blindados de sabedoria e segurança.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958050/Imagem_Balao_4_Editada_4-5_jd43st.png"
                                alt="Momentos seguros e inesquecíveis nos céus de Boituva"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Os Extremos da Idade: A "Melhor Idade" voa?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Surpreenda-se. Do lado extremo da cronologia: não há nenhum telhado obsoleto da faixa envelhecida! Pessoas de vigorosa ou frágil terceira idade são figurinhas mais do que ilustres. Pular aos esplêndidos 60, aos incríveis oitenta anos, e até senhores com noventa que voam assiduamente compõem um catálogo vitalício. Contanto que tragam sob si o simples endosso num atestado por escrito declarando plenas capacidades das pernas, saúde cardiovascular aceita em rotinas intensas do médico dele. Nada encerre o voo ao cume!
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Qual o limite de peso para Salto Duplo? (A balança local)</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Falando puramente sobre a inesgotável senhora de nossas vidas, a Dona Gravidade entra em voga aqui. Todo velame reserva em nossas instalações conta com parâmetros específicos num somatório severo de quilos totais a despencar em segurança máxima para abrir-se corretamente no céu aberto de Boituva resistindo num colchão as batentes fortes das correntes conturbadas caso houver intempéries. O mestre precisa segurar esse cinto firmemente ao passageiro perante si enquanto guia todos nós amarrados a segurança irretocável do "harness".
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Por conta direta de segurança operacional e resistência humana, na maioria da pista nacional a meta baliza numa fronteira do balança de <strong>média de 95kg a cravados 100 kg no máximo para mulheres ou homens grandes</strong>! Indivíduos pesando algo na fronteira do índice ou perigosamente ultrapassando esse cume, por conta das corpulências fora dos traçados confortáveis até de estarem amarrados pelo suporte nas coxas num arnês apertado, passarão por análises dos próprios Masters experientes responsáveis no próprio local, dependendo imensamente de um IMC minimamente equilibrado nas frentes estruturais; podendo gerar pequenas sobretaxas da própria escola por necessidade de alçar técnicos maiores e usar velames imensamente robustos.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png"
                                alt="Profissionais altamente preparados levando as regras a sério"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">Existem Dicas Secretas do "O que Vestir"?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            A elegância mora em nosso esporte numa vestimenta atlética completamente descomplicada! Ao comparecer na tenda Fly Up descarte veementemente sua coleção rija pesada (calças apertadas densamente amarradas no modelo blue jeans por exemplo dificultarão na imensa restrição das tiras duras envoltas a tua cintura). Vá com calças estilo legging e camisas frescas do tipo malha em academia confortáveis, que darão todo um alívio. Calce indispensáveis tênis esportivos amarrados no duplo nó muito agarrados! Nada das loucuras impensáveis na beira da janela de usar sapatilhas caindo aos ares ou chinelinho que irão inevitavelmente flutuar à solta pelas fazendas alheias, lhe deixando envergonhado pisando de meias rasgadas nas áreas vips do galpão ao chegar desamparado na base!
                        </p>
                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Regulamento Cumprido? </h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Chame seus pais para assinar, ou apenas pule para essa aventura na melhor forma de superação!</p>
                        <Link href="/salto-duplo" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Verifique Vagas para Pular
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
