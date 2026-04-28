import { Shield, Award, Star, Zap, Globe, Anchor } from "lucide-react";

const partners = [
    { name: "Red Bull", icon: Zap },
    { name: "GoPro", icon: Globe },
    { name: "Globo Esporte", icon: Star },
    { name: "ABPQD", icon: Award }, // Associação Brasileira de Paraquedismo
    { name: "USPA", icon: Shield }, // US Parachute Association
    { name: "Vibe", icon: Anchor },
];

export default function SocialProof() {
    return (
        <section className="py-10 bg-black border-y border-white/5 relative z-20">
            <div className="container mx-auto px-6">
                <p className="text-center text-zinc-500 text-xs uppercase tracking-widest mb-6">
                    Parceiros e Certificações
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex items-center gap-2 group">
                            <partner.icon className="size-8 text-zinc-400 group-hover:text-primary transition-colors" />
                            <span className="text-xl font-bold font-montserrat text-zinc-400 group-hover:text-white transition-colors">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
