import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, MapPin } from "lucide-react";

export const metadata = {
    title: "Quanto tempo dura o salto duplo de paraquedas e qual a altura? | Fly Up",
    description: "Do embarque no avião até a aterrissagem suave: saiba a duração exata da queda livre, o tempo de voo com o paraquedas aberto e os detalhes de altitude.",
    keywords: "quanto tempo dura o salto duplo de paraquedas, altura do salto duplo de paraquedas, velocidade queda livre salto duplo, duração queda livre salto duplo, quanto tempo dura salto duplo",
};

export default function Article() {
    return (
        <div className="pt-24 min-h-screen bg-white selection:bg-neon selection:text-black">
            {/* Article Header */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://res.cloudinary.com/dn50urzkv/image/upload/v1771958051/Imagem_Balao_6_Editada_4-5_be0out.png"
                        alt="Quanto tempo dura e qual a altura"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto px-6 text-center mt-12 max-w-5xl">
                    <div className="flex justify-center items-center gap-2 mb-6 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
                        <Tag size={12} /> Informações Técnicas
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8 drop-shadow-xl leading-tight">
                        Quanto <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">Tempo Dura</span> o Salto Duplo de Paraquedas e Qual a Altura?
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-zinc-300 text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><Calendar size={14} className="text-neon" /> 23 FEV 2026</div>
                        <div className="flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-md bg-white/10 border border-white/20"><User size={14} className="text-neon" /> Equipe Fly Up</div>
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
                            A ideia de pisar porta afora de um equipamento aeroespacial atrai curiosos tanto quanto lhes aterroriza os nervos. E aí o mistério número 1 entre todos que chegam para viver seu dia mágico explode: <em>"Eu caio e acaba em segundos diretos no chão?"</em> De forma alguma!
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Seja na queda livre com o ronco do ar nos ouvidos ou no balanço sereno do pano esticado, vamos esclarecer exata e rigorosamente a verdadeira <strong>altura do salto duplo de paraquedas</strong> praticado no polo de Boituva e todo o desdobrar desses números contra seu relógio.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">1. Todo Pulo Nasce de uma Viagem (A Subida)</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            É importante contabilizar toda brincadeira em si! No Salto Duplo de sucesso, nós só focamos no ar livre? Jamais! Em nosso clube a preparação já começa em terra. Logo depois do treinamento básico você subirá numa de nossas aeronaves. O passeio inteiro desde taxiar a pista até de fato nivelar a aeronave consome de <strong>15 a 20 confortáveis e calmos minutos panorâmicos</strong>. É o seu instante focado em admirar um trajeto único até a estratosfera azul.
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470430/Salto_Bal%C3%A3o_1_u1amjp.png"
                                alt="Altitudes e emoções do trajeto inicial"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">2. Nuvens sob os Seus Pés: Que Altura Saltaremos?</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Enfim o altímetro marcará a altura crucial da maioria dos lançamentos comerciais qualificados do esporte: <strong>12.000 pés!</strong> Para ficar mais claro em nosso amado padrão latino métrico, se trata de expressivos <strong>3.650 metros ou mais de 3,6 km longe de qualquer solo sólido</strong>. Dessa fantástica laje verde que montamos na mente da Fly Up, a sua queda inicia, transpassando o ar ralo gelado e cortando o céu paulistano.
                        </p>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">3. Queda Livre Salto Duplo: A Fase Suprema da Velocidade</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Desprendendo-se, o cérebro congela em fascínio indomável. <strong>Quanto tempo dura a queda livre do salto duplo de paraquedas?</strong> Os atletas e instrutores chamam carinhosamente essa primeira fase até as cercanias dos 5.000 ou 5.500 pés de altitude do arrombo sensorial de velocidade terminal.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Durante cerca de <strong>45 segundos até completarmos o primeiro maravilhoso minuto voador!</strong> Tudo dependerá primordialmente das variáveis do peso somado do passageiro/instrutor em relação a área total friccionando todo o vento com maestria perante a enorme resistência do equipamento e barriga. Falando nisso, vale avisar que toda uma inacreditável <strong>velocidade em queda livre no salto duplo</strong> sustenta assustadoramente firmes na casa constante e furiosa dos gigantescos <strong>200 Km/hora!</strong> O seu corpo não perde as rédeas num buraco descontrolado, apenas assenta confortável em um gigantesco travesseiro gelado e impenetrável de empuxo natural!
                        </p>

                        <div className="my-14 overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470425/Salto_Duplo_1_hprebk.png"
                                alt="Tandem Master mantendo a incrível queda livre com seu aluno"
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase text-black mt-16 mb-8 tracking-tighter">4. Voar de Paraquedas Aberto: A Paz Celestial Estendida</h2>
                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Passada a zona frenética central dos batimentos por minuto contados, a magia troca do "Rock Pesado" e transforma tudo em pura Bossa Nova. Você sai agressivamente do vento assustador para uma calmaria onde sequer falar atrapalha: a navegação da copa, ou seja, de fato descer vagarosamente com um paraquedas aberto te sustentando em espirais serenas.
                        </p>

                        <p className="text-lg text-zinc-600 leading-loose mb-10">
                            Esta parte relaxante toma bastante tempo. A glória desta navegação até colocar as pontas dos próprios tênis estica entre <strong>5 a imensos 7 minutos plenos contemplando em quietude toda a beleza e formato circular majestoso do globo curvando no horizonte infinito à tardezinha</strong> num final de semana comum no nosso querido centro interiorano dos esportes radicais. Sem dúvida, de 15 minutos embarcados até as horas dos festejos embaixo com os amigos nos barzinhos, contabilize em seu dia reservar toda aquela folga boa e merecida do passeio à nossa dropzone no decorrer do mês com até 4 folgadas horas completas do dia! E deixe os compromissos urbanos distantes.
                        </p>
                    </article>

                    <div className="mt-20 pt-12 border-t border-zinc-200 text-center bg-zinc-50 rounded-3xl p-10 shadow-sm border border-zinc-100">
                        <h3 className="text-3xl font-black italic uppercase mb-4 text-black tracking-tighter">Cansado do Solo Tradicional?</h3>
                        <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto">Compreenda a liberdade absoluta nas próprias veias da adrenalina pulando a mais de doze mil pés.</p>
                        <Link href="/salto-duplo" className="inline-flex bg-neon text-black font-black italic rounded-full px-12 py-5 text-sm uppercase tracking-[0.2em] border border-transparent hover:border-black/20 hover:scale-105 shadow-[0_15px_30px_rgba(57,255,20,0.3)] transition-all duration-300">
                            Reserve seu lugar no Avião
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
