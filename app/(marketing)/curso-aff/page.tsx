import ServicePageLayout from "@/components/ServicePageLayout";

export default function CursoAffPage() {
    return (
        <ServicePageLayout
            sourceId="botao-agendar-aff"
            title="Curso AFF"
            subtitle="Accelerated Free Fall: O método mais rápido e seguro do mundo para se tornar paraquedista."
            heroImage="https://images.unsplash.com/photo-1529699213841-a686c0dda236?q=80&w=2670&auto=format&fit=crop"
            overview="O Curso AFF foi desenvolvido nos EUA para formar paraquedistas aptos a saltar sozinhos em poucos dias. O método divide a progressão em 7 níveis práticos, onde você salta com seu próprio paraquedas acompanhado por instrutores que corrigem sua posição em queda livre."
            steps={[
                {
                    title: "Teoria Intensiva (10h)",
                    description: "Um dia inteiro de aula teórica sobre equipamentos, aerodinâmica, procedimentos de emergência e navegação.",
                    icon: "BookOpen"
                },
                {
                    title: "Níveis 1 a 3",
                    description: "Saltos acompanhados por 2 instrutores. Foco em estabilidade, consciência de altura e comando do paraquedas.",
                    icon: "Skull"
                },
                {
                    title: "Níveis 4 a 7",
                    description: "Saltos com 1 instrutor. Foco em manobras de curvas, loopings, tracking (deslocamento) e autonomia total.",
                    icon: "BadgeCheck"
                },
                {
                    title: "Formatura e Licença A",
                    description: "Após o nível 7 e saltos de consolidação, você recebe sua licença de paraquedista atleta e pode saltar sozinho em qualquer lugar do mundo.",
                    icon: "GraduationCap"
                }
            ]}
            galleryImages={[
                "https://images.unsplash.com/photo-1549482199-bc1ca6f58502?q=80&w=3276&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2670&auto=format&fit=crop"
            ]}
            pricingOptions={[
                {
                    title: "Pacote Teórico + Salto 1",
                    price: "R$ 1.650",
                    features: ["Curso Teórico Completo", "Material Didático", "1º Salto AFF Nível 1", "Vídeos do Salto", "Caderneta de Salto"]
                },
                {
                    title: "Curso Completo AFF",
                    price: "R$ 6.800",
                    features: ["Teoria + 7 Níveis", "Todos os vídeos dos saltos", "Instrutores Dedicados", "Macacão e Capacete Aluguel Incluso", "Formatura"],
                    highlight: true
                }
            ]}
            faqs={[
                {
                    question: "Quanto tempo demora?",
                    answer: "Depende da sua disponibilidade e do clima. É possível terminar em 3 ou 4 finais de semana, ou em uma semana intensiva."
                },
                {
                    question: "E se eu reprovar um nível?",
                    answer: "Caso não cumpra os objetivos de segurança de um nível, é necessário repeti-lo (pagando apenas o salto de repetição) antes de avançar."
                },
                {
                    question: "O equipamento é seguro?",
                    answer: "Utilizamos paraquedas de última geração com dispositivos de abertura automática (AAD) em todos os saltos de aluno."
                }
            ]}
        />
    );
}
