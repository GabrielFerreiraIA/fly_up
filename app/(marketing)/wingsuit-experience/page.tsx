import ServicePageLayout from "@/components/ServicePageLayout";
import Footer from "@/components/sections/Footer";

export default function WingsuitExperiencePage() {
    return (
        <ServicePageLayout
            sourceId="botao-agendar-wingsuit"
            title="Wingsuit Experience"
            subtitle="Transforme seu corpo em uma asa e realize o sonho humano de voar."
            heroImage="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771951036/Wingsuit_Editado_16-9_xks2hr.png"
            overview="O Wingsuit não é apenas um salto, é voo horizontal de alta performance. Esta experiência avançada permite que paraquedistas experientes (mínimo 200 saltos) iniciem na disciplina com segurança, ou realizem saltos monitorados com instrutores de nível mundial."
            steps={[
                {
                    title: "Pré-Requisitos",
                    description: "Avaliação rigorosa de habilidades de queda livre e controle de velame. Segurança em primeiro lugar.",
                    icon: "AlertTriangle",
                    image: "https://images.unsplash.com/photo-1517480447781-8d2ba3da5998?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "First Flight Course (FFC)",
                    description: "Curso teórico e prático completo para o primeiro salto de Wingsuit. Equipamento, navegação e emergências.",
                    icon: "PlayCircle",
                    image: "https://images.unsplash.com/photo-1628163901416-620251717282?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "O Voo Horizontal",
                    description: "Sinta a transformação da queda vertical em deslocamento horizontal. Acelere e planeje sua rota no céu.",
                    icon: "Zap",
                    image: "https://images.unsplash.com/photo-1543360406-8dce28267252?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Debriefing Avançado",
                    description: "Análise de GPS e vídeo para otimizar sua performance, glide ratio e velocidade.",
                    icon: "Mountain",
                    image: "https://images.unsplash.com/photo-1461896336928-11e747ee3014?q=80&w=800&auto=format&fit=crop"
                }
            ]}
            galleryImages={[
                "https://images.unsplash.com/photo-1543360406-8dce28267252?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1498144846853-60ca2d43853b?q=80&w=2669&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1628163901416-620251717282?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1543360406-8dce28267252?q=80&w=2670&auto=format&fit=crop"
            ]}
            pricingOptions={[
                {
                    title: "Intro Wingsuit",
                    price: "R$ 1.500",
                    features: ["Curso Teórico FFC", "1 Salto Acompanhado", "Aluguel de Wingsuit Iniciante", "Debriefing com GPS"]
                },
                {
                    title: "Pack Performance",
                    price: "R$ 3.800",
                    features: ["5 Saltos Guiados", "Coaching de Performance", "Análise de Trajetória 3D", "Certificação USPA e entidades brasileiras do esporte"],
                    highlight: true
                }
            ]}
            specialConditions={[
                {
                    title: "Mentoria de Competição",
                    description: "Preparação específica para campeonatos nacionais e mundiais com atletas recordistas.",
                    icon: "Trophy"
                },
                {
                    title: "Evolução Pacote 50",
                    description: "Comprando 50 tickets antecipados, você ganha 5 coachings gratuitos e desconto no valor do salto.",
                    icon: "Activity"
                },
                {
                    title: "Aluguel de Trajes",
                    description: "Temos parcerias com Squirrel e Tony Suits. Teste diferentes modelos antes de comprar o seu.",
                    icon: "Shield"
                }
            ]}
            faqs={[
                {
                    question: "Preciso ter experiência?",
                    answer: "Sim! Mínimo de 200 saltos de paraquedas comprovados em caderneta para iniciar no Wingsuit. É uma disciplina avançada."
                },
                {
                    question: "Qual a velocidade atingida?",
                    answer: "Wingsuits modernos podem ultrapassar 250km/h na horizontal, com uma razão de planeio que permite voar por quilômetros de distância."
                },
                {
                    question: "É seguro voar de Wingsuit?",
                    answer: "Com o treinamento adequado (FFC) e respeito à progressão de trajes, é muito seguro. O risco maior está no BASE jump, não no paraquedismo de avião."
                }
            ]}
        />
    );
}
