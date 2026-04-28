import ServicePageLayout from "@/components/ServicePageLayout";

export default function SaltoBalaoPage() {
    return (
        <ServicePageLayout
            sourceId="botao-agendar-salto-balao"
            title="Salto de Balão"
            subtitle="A experiência mais exclusiva e serena do paraquedismo."
            heroImage="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771951036/Salto_Bal%C3%A3o_Editado_16-9_misn8s.png"
            overview="O salto de balão é o ápice da exclusividade no paraquedismo. Ao contrário do avião, não há vento ou barulho de motor. Você experimenta o 'dead air' — uma saída em silêncio absoluto onde a gravidade te puxa suavemente até atingir a velocidade terminal. É uma experiência transformadora e altamente fotogênica."
            steps={[
                {
                    title: "Decolagem ao Amanhecer",
                    description: "Os voos de balão ocorrem na primeira hora do sol. Você verá o espetáculo do amanhecer enquanto sobe lentamente.",
                    icon: "Sunrise",
                    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Ascensão Silenciosa",
                    description: "A subida dura cerca de 45 minutos até atingir a altitude de lançamento (entre 6.000 e 10.000 pés).",
                    icon: "Cloud",
                    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "A Saída (Dead Air)",
                    description: "Sem o vento relativo do avião, você simplesmente 'cai' no vazio. A sensação de aceleração é muito mais nítida e emocionante.",
                    icon: "Zap",
                    image: "https://images.unsplash.com/photo-1542408892-d965d1d61993?q=80&w=800&auto=format&fit=crop"
                },
                {
                    title: "Pouso e Brinde",
                    description: "Após o salto, nos reunimos para o tradicional brinde com espumante, celebrando a coragem e a beleza do voo.",
                    icon: "Trophy",
                    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop"
                }
            ]}
            galleryImages={[
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958051/Imagem_Balao_6_Editada_4-5_be0out.png",
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958050/Imagem_Balao_5_Editada_4-5_suomgt.png",
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958050/Imagem_Balao_Editada_4-5_c2uipb.png",
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958049/Imagem_Balao_2_Editada_4-5_ive7yc.png",
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958049/Imagem_Balao_3_Editada_4-5_myjoxk.png",
                "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771958050/Imagem_Balao_4_Editada_4-5_jd43st.png"
            ]}
            pricingOptions={[
                {
                    title: "Salto Duplo de Balão",
                    price: "R$ 1.950",
                    features: ["Voo de Balão", "Salto Duplo com Instrutor Elite", "Fotos e Vídeos Inclusos", "Brinde com Espumante", "Translado de volta à DZ"]
                },
                {
                    title: "Atleta (Solo)",
                    price: "R$ 450",
                    features: ["Voo de Balão", "Vaga para Atleta Licenciado", "Acompanhamento de Segurança", "Brinde com Espumante", "Resgate Incluso"],
                    highlight: true
                }
            ]}
            specialConditions={[
                {
                    title: "Voo Exclusivo",
                    description: "Feche o balão apenas para você e seus convidados. Ideal para pedidos de casamento e ocasiões intimistas.",
                    icon: "Star"
                },
                {
                    title: "Para Atletas",
                    description: "Pacotes de jumps tickets para grupos de atletas licenciados com condições especiais para organizer.",
                    icon: "Users"
                },
                {
                    title: "Produção de Conteúdo",
                    description: "Suporte logístico total para marcas e produtores que desejam filmar no ambiente único do balão.",
                    icon: "Camera"
                }
            ]}
            faqs={[
                {
                    question: "Por que os saltos são de madrugada?",
                    answer: "Para a segurança do voo de balão. Precisamos das condições atmosféricas estáveis (ventos calmos e temperatura amena) que só ocorrem nas primeiras horas do dia."
                },
                {
                    question: "É mais perigoso que o avião?",
                    answer: "Não. A operação segue rigorosos padrões da ANAC. A diferença é a saída 'morta' (sem vento relativo inicial), que requer técnica específica dos instrutores, mas é extremamente controlada."
                },
                {
                    question: "E se o tempo virar?",
                    answer: "O piloto do balão tem autoridade final. Se as condições não forem 100% seguras, o voo é cancelado e reagendado sem custo. Segurança é inegociável."
                },
                {
                    question: "Preciso ter experiência para salto duplo de balão?",
                    answer: "Não! Qualquer pessoa apta fisicamente pode fazer. É uma experiência ainda mais exclusiva e suave que o salto de avião."
                }
            ]}
        />
    );
}
