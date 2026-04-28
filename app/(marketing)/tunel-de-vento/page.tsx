import ServicePageLayout from "@/components/ServicePageLayout";
import Footer from "@/components/sections/Footer";

export default function TunelDeVentoPage() {
    return (
        <ServicePageLayout
            sourceId="botao-agendar-tunel-vento"
            title="Túnel de Vento"
            subtitle="Acelere sua evolução ou voe pela primeira vez sem sair do chão."
            heroImage="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771951037/Tunel_de_Vento_Editada_16-9_m6lvyg.png"
            overview="O Túnel de Vento é a melhor ferramenta para aprender a voar ou evoluir suas técnicas de paraquedismo. Em um ambiente controlado, com fluxo de ar laminar e instrutores campeões mundiais, você aprende 10x mais rápido do que no céu, com segurança total e feedback imediato."
            steps={[
                {
                    title: "Briefing Técnico",
                    description: "Entenda a física do voo e as posições corporais antes de entrar no fluxo de ar. Treinamento mental para máxima performance.",
                    icon: "Trophy",
                    image: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Voo Indoor",
                    description: "Sessões de 2 a 15 minutos voando com instrutores que corrigem sua postura em tempo real. A evolução é exponencial.",
                    icon: "Wind",
                    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Debriefing em Vídeo",
                    description: "Após cada sessão, analisamos os vídeos frame a frame para correções precisas. A chave para a evolução técnica.",
                    icon: "Award",
                    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Diversão em Grupo",
                    description: "Além do treino sério, o túnel permite voos em grupo e brincadeiras, ideal para eventos e famílias.",
                    icon: "Users",
                    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
                }
            ]}
            galleryImages={[
                "https://images.unsplash.com/photo-1629737180425-6349c83664d4?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1628163901416-620251717282?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2669&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=2670&auto=format&fit=crop"
            ]}
            pricingOptions={[
                {
                    title: "First Flight",
                    price: "R$ 350",
                    features: ["2 Minutos de Voo (Eqv. 3 saltos)", "Instrutor Dedicado", "Equipamento Completo", "Certificado de Voo", "Vídeo Simples"]
                },
                {
                    title: "Pro Flyer 15",
                    price: "R$ 1.200",
                    features: ["15 Minutos de Voo", "Coaching Técnico", "Análise de Vídeo", "Evolução Acelerada", "Acesso à Área de Atletas"],
                    highlight: true
                },
                {
                    title: "Camp Intensivo",
                    price: "R$ 4.500",
                    features: ["60 Minutos (1 Hora)", "Coach Campeão Mundial", "Hospedagem Inclusa", "Plano de Carreira no Esporte", "Mentoria Exclusiva"]
                }
            ]}
            specialConditions={[
                {
                    title: "Festas de Aniversário",
                    description: "Uma festa inesquecível onde todos os convidados voam! Buffet e área exclusiva disponíveis.",
                    icon: "Star"
                },
                {
                    title: "Treinamento de Equipes",
                    description: "Condições especiais para times de 4-Way e Freefly. Coaching de alto nível incluso.",
                    icon: "Users"
                },
                {
                    title: "Corporativo",
                    description: "Eventos de team building que desafiam limites. Palestras motivacionais + voo indoor.",
                    icon: "Trophy"
                }
            ]}
            faqs={[
                {
                    question: "Quem pode voar?",
                    answer: "Democrático! A partir de 4 anos de idade, e sem limite máximo de idade. Temos experiência com acessibilidade também."
                },
                {
                    question: "Qual roupa devo usar?",
                    answer: "Roupas confortáveis (calça jeans ou moletom) e um tênis de amarrar bem firme. Fornecemos macacão, capacete e óculos."
                },
                {
                    question: "É igual a pular de paraquedas?",
                    answer: "A física é a mesma da queda livre a 200km/h. É a simulação mais perfeita existente, usada por profissionais para treinar."
                }
            ]}
        />
    );
}
