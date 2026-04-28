import AFFHero from "@/components/curso-aff-pro/AFFHero";
import AFFWhatIs from "@/components/curso-aff-pro/AFFWhatIs";
import AFFJourney from "@/components/curso-aff-pro/AFFJourney";
import AFFComparison from "@/components/curso-aff-pro/AFFComparison";
import AFFInstructor from "@/components/curso-aff-pro/AFFInstructor";
import AFFTestimonialVideos from "@/components/curso-aff-pro/AFFTestimonialVideos";
import AFFTestimonials from "@/components/curso-aff-pro/AFFTestimonials";
import AFFGallery3D from "@/components/curso-aff-pro/AFFGallery3D";
import AFFPricingNew from "@/components/curso-aff-pro/AFFPricingNew";
import AFFAlternativePricing from "@/components/curso-aff-pro/AFFAlternativePricing";
import AFFFAQ from "@/components/curso-aff-pro/AFFFAQ";
import SocialProof from "@/components/sections/SocialProof";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function CursoAFFProPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden">
            {/* 1. Hero — PRETO */}
            <AFFHero />

            {/* 2. O Que é o Curso AFF PRO — BRANCO (imagem de fundo) */}
            <AFFWhatIs />

            {/* 3. Jornada AFF (Roadmap/Timeline) — PRETO */}
            <AFFJourney />

            {/* 4. Fly Up VS Tradicional — BRANCO */}
            {/* 5. Pacote Aprovação Garantida — PRETO (dentro do AFFComparison) */}
            <AFFComparison />

            {/* 6. Instrutor Edu Esteves — BRANCO */}
            <AFFInstructor />

            {/* 7. Histórias em Vídeo — BRANCO */}
            <AFFTestimonialVideos />

            {/* 8. Depoimentos (Texto) — PRETO */}
            <AFFTestimonials />

            {/* 9. Galeria 3D "Veja na Prática" — BRANCO + grid verde */}
            <AFFGallery3D />

            {/* 10. Preço / Ancoragem — PRETO */}
            <AFFPricingNew />

            {/* 10.5 Pagamento Alternativo — PRETO */}
            <AFFAlternativePricing />

            {/* 11. FAQ — PRETO */}
            <AFFFAQ />

            {/* Floating WhatsApp Button */}
            <WhatsAppButton />
        </div>
    );
}
