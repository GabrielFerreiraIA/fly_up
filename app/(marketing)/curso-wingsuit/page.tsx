import ServicePageLayout from "@/components/ServicePageLayout";

export default function CursoWingsuitPage() {
    return (
        <ServicePageLayout
            sourceId="botao-agendar-curso-wingsuit"
            title="Curso de Wingsuit"
            subtitle="Domine o voo horizontal e as leis da aerodinâmica paraquedista."
            heroImage="https://images.unsplash.com/photo-1549482199-bc1ca6f58502?q=80&w=3276&auto=format&fit=crop"
            overview="Este curso é destinado a paraquedistas experientes que desejam entrar na disciplina de Wingsuit. O First Flight Course (FFC) é homologado pela USPA e entidades brasileiras do esporte, cobrindo teoria de voo, equipamentos de segurança, procedimentos de emergência, navegação e pouso fora da área."
            steps={[
                {
                    title: "Teoria Avançada FFC",
                    description: "Abordagem completa sobre L/D (Lift over Drag), polar de velocidades, escolha de wingsuit e saída da aeronave.",
                    icon: "BookOpen"
                },
                {
                    title: "Salto Monitorado 1",
                    description: "Seu primeiro voo com asa. Foco total em estabilidade na saída, controle de heading e simulação de pane.",
                    icon: "MapPin"
                },
                {
                    title: "Performance e Navegação",
                    description: "Aprenda a ler o vento, planejar o spot de saída e retornar com segurança à área de pouso voando quilômetros.",
                    icon: "Gauge"
                }
            ]}
            galleryImages={[
                "https://images.unsplash.com/photo-1543360406-8dce28267252?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1498144846853-60ca2d43853b?q=80&w=2669&auto=format&fit=crop"
            ]}
            pricingOptions={[
                {
                    title: "First Flight Course",
                    price: "R$ 1.800",
                    features: ["Aula Teórica Completa", "Material Didático Wingsuit", "1 Salto com Instrutor e Vídeo Debrief", "Aluguel de Wingsuit Iniciante", "Assinatura na Caderneta"]
                },
                {
                    title: "Wingsuit Progression",
                    price: "R$ 4.200",
                    features: ["FFC Incluso", "5 Saltos de Coaching", "Análise GPS FlySight", "Evolução para Trajes Intermediários", "Mentoria de Carreira"],
                    highlight: true
                }
            ]}
            faqs={[
                {
                    question: "Preciso de quantos saltos?",
                    answer: "Mínimo exigido universalmente: 200 saltos de paraquedas nos últimos 18 meses, ou 500 saltos totais."
                },
                {
                    question: "Posso comprar meu wingsuit?",
                    answer: "Recomendamos alugar ou testar trajes de entrada antes de comprar. Nossa loja parceira tem modelos para demo."
                },
                {
                    question: "É muito difícil?",
                    answer: "Exige disciplina e boa consciência corporal (freefly ajuda muito), mas a progressão é segura com o método FFC."
                }
            ]}
        />
    );
}
