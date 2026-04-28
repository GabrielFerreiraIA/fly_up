"use client";

import ServicePageLayout from "@/components/ServicePageLayout";
import DiscountPopup from "@/components/DiscountPopup";
import { motion } from "framer-motion";
import { Camera, Video, Zap, Sparkles } from "lucide-react";

export default function SaltoDuploPage() {
    const jumpTypes = [
        {
            id: "fun",
            title: "FUN (O Clássico)",
            description: "Sinta o vento e a adrenalina pura em queda livre, focando 100% na sua emoção pessoal. Perfeito para quem quer viver o momento sem distrações.",
            icon: Zap,
            color: "from-blue-500/10 to-blue-500/5",
            accent: "blue-500",
            image: "https://images.unsplash.com/photo-1521673461240-991eb9c9c71e?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "selfie",
            title: "Selfie (Handycam)",
            description: "Neste salto, você estará conectado a um instrutor que fará as fotos e o vídeo utilizando câmeras fixas na mão (handycam). Registro íntimo do voo.",
            icon: Camera,
            color: "from-neon/10 to-neon/5",
            accent: "neon",
            image: "https://images.unsplash.com/photo-1534149626607-4221d6fb86b5?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "experience",
            title: "Experience (Autonomia)",
            description: "A experiência definitiva: além da produção cinematográfica, você assume o controle do altímetro e pilota o paraquedas, sentindo a real autonomia de um aluno.",
            icon: Sparkles,
            color: "from-amber-500/10 to-amber-500/5",
            accent: "amber-500",
            image: "https://images.unsplash.com/photo-1596700816960-94d35eb843c9?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "vip",
            title: "VIP (Cinematográfico)",
            description: "Conectado a um instrutor, com um segundo paraquedista realizando fotos e vídeos de vários ângulos diferentes e cinematográficos.",
            icon: Video,
            color: "from-purple-500/10 to-purple-500/5",
            accent: "purple-500",
            image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const JumpTypesSection = (
        <div className="space-y-12">
            <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-black mb-4">
                    Modalidades de Salto
                </h3>
                <p className="text-zinc-600 font-medium max-w-2xl mx-auto">
                    Escolha como você quer eternizar sua queda livre. Temos o pacote ideal para o seu estilo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {jumpTypes.map((type, idx) => (
                    <motion.div
                        key={type.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden hover:border-neon transition-all duration-300 group shadow-sm hover:shadow-xl"
                    >
                        <div className="h-48 relative overflow-hidden">
                            <img src={type.image} alt={type.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            <div className="absolute bottom-4 left-4 bg-zinc-950 p-3 rounded-xl border border-white/20">
                                <type.icon className="text-neon w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-black italic uppercase text-black mb-3 group-hover:text-[#008800] transition-colors font-sans">
                                {type.title}
                            </h4>
                            <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                                {type.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <DiscountPopup />
            <ServicePageLayout
                sourceId="salto-duplo-page"
                title="Salto Duplo"
                subtitle="Sinta a liberdade absoluta a 200km/h com total segurança."
                heroImage="https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771951037/Salto_Duplo_Editado_16-9_qgdiqh.png"
                overview="O Salto Duplo é a maneira mais fácil e segura de realizar o sonho de voar. Conectado a um instrutor experiente e certificado, você saltará de 12.000 pés, experimentando cerca de 50 segundos de queda livre seguidos por 5 a 7 minutos de navegação com o paraquedas aberto."
                pricingTitle="Escolha a sua modalidade"
                renderBelowSteps={JumpTypesSection}
                steps={[
                    {
                        title: "Chegada e Preparação",
                        description: "Check-in e treinamento de 15 minutos sobre posição do corpo e segurança.",
                        icon: "CheckCircle2"
                    },
                    {
                        title: "O Voo Panorâmico",
                        description: "Subida de 15 minutos até 12.000 pés com vista espetacular de Boituva.",
                        icon: "Cloud"
                    },
                    {
                        title: "A Queda Livre",
                        description: "50 segundos de pura adrenalina a 200km/h. A sensação de liberdade definitiva.",
                        icon: "Zap"
                    },
                    {
                        title: "Navegação e Pouso",
                        description: "Voo de paraquedas aberto e pouso suave realizado pelo instrutor.",
                        icon: "Shield"
                    }
                ]}
                galleryImages={[
                    "https://images.unsplash.com/photo-1534149626607-4221d6fb86b5?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1596700816960-94d35eb843c9?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1582218412852-c0733d70669c?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1514890656687-9ce7c9b09ad3?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1521673461240-991eb9c9c71e?q=80&w=2670&auto=format&fit=crop"
                ]}
                pricingOptions={[
                    {
                        title: "Salto Duplo FUN",
                        price: "R$ 690",
                        features: ["Salto a 12.000 pés", "Instrutor Certificado ABPQD/USPA", "Equipamento de Ponta (Sigma)", "Foco 100% na emoção", "Certificado de Coragem"]
                    },
                    {
                        title: "Salto Duplo Selfie",
                        price: "R$ 890",
                        features: ["Salto a 12.000 pés", "Vídeo e Fotos (Handycam)", "Gravação em Close-up", "Link para Download Digital", "Camiseta Fly Up exclusiva"],
                        highlight: true
                    },
                    {
                        title: "Salto Duplo Experience",
                        price: "R$ 1.010",
                        features: ["Você Pilota o Paraquedas", "Uso de Altímetro no Braço", "Sinal de Comando para Abertura", "Foco total na Autonomia", "Filmagem Dupla (VIP + Selfie)"]
                    },
                    {
                        title: "Salto Duplo VIP",
                        price: "R$ 1.290",
                        features: ["Salto a 12.000 pés", "Cameraman Externo Dedicado", "Fotos e Vídeos em HD", "Ângulos Cinematográficos", "Kit VIP (Camiseta + Boné)"]
                    }
                ]}
                faqs={[
                    {
                        question: "Tenho muito medo de altura, consigo saltar?",
                        answer: "Sim! A sensação não é de cair em um abismo, mas de flutuar em um colchão de ar. A altura é tão grande que o cérebro não processa como medo de borda (vertigem). É libertador."
                    },
                    {
                        question: "É seguro? E se o paraquedas não abrir?",
                        answer: "Extremamente seguro. Utilizamos os melhores equipamentos do mundo (Sigma/Vigil). Todos os paraquedas possuem um dispositivo de abertura automática (AAD) que ativa o reserva caso necessário, sem ação humana."
                    },
                    {
                        question: "Quanto tempo demora tudo?",
                        answer: "Reserve cerca de 3 a 4 horas para toda a experiência, desde a chegada, treinamento, voo e aterrissagem. O salto em si leva cerca de 20 minutos (subida + queda + navegação)."
                    }
                ]}
            />
        </>
    );
}
