"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FlyUpWebhook } from "@/lib/webhook-integration";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    experienceTitle: string;
    source?: string;
}

const countries = [
    { name: 'Brasil', code: 'br', ddi: '+55' },
    { name: 'Afeganistão', code: 'af', ddi: '+93' },
    { name: 'África do Sul', code: 'za', ddi: '+27' },
    { name: 'Albânia', code: 'al', ddi: '+355' },
    { name: 'Alemanha', code: 'de', ddi: '+49' },
    { name: 'Andorra', code: 'ad', ddi: '+376' },
    { name: 'Angola', code: 'ao', ddi: '+244' },
    { name: 'Arábia Saudita', code: 'sa', ddi: '+966' },
    { name: 'Argélia', code: 'dz', ddi: '+213' },
    { name: 'Argentina', code: 'ar', ddi: '+54' },
    { name: 'Armênia', code: 'am', ddi: '+374' },
    { name: 'Austrália', code: 'au', ddi: '+61' },
    { name: 'Áustria', code: 'at', ddi: '+43' },
    { name: 'Azerbaijão', code: 'az', ddi: '+994' },
    { name: 'Bahamas', code: 'bs', ddi: '+1' },
    { name: 'Bangladesh', code: 'bd', ddi: '+880' },
    { name: 'Barbados', code: 'bb', ddi: '+1' },
    { name: 'Barem', code: 'bh', ddi: '+973' },
    { name: 'Bélgica', code: 'be', ddi: '+32' },
    { name: 'Belize', code: 'bz', ddi: '+501' },
    { name: 'Benin', code: 'bj', ddi: '+229' },
    { name: 'Bielorrússia', code: 'by', ddi: '+375' },
    { name: 'Bolívia', code: 'bo', ddi: '+591' },
    { name: 'Bósnia e Herzegovina', code: 'ba', ddi: '+387' },
    { name: 'Botsuana', code: 'bw', ddi: '+267' },
    { name: 'Brunei', code: 'bn', ddi: '+673' },
    { name: 'Bulgária', code: 'bg', ddi: '+359' },
    { name: 'Burquina Faso', code: 'bf', ddi: '+226' },
    { name: 'Burundi', code: 'bi', ddi: '+257' },
    { name: 'Cabo Verde', code: 'cv', ddi: '+238' },
    { name: 'Camarões', code: 'cm', ddi: '+237' },
    { name: 'Camboja', code: 'kh', ddi: '+855' },
    { name: 'Canadá', code: 'ca', ddi: '+1' },
    { name: 'Catar', code: 'qa', ddi: '+974' },
    { name: 'Cazaquistão', code: 'kz', ddi: '+7' },
    { name: 'Chade', code: 'td', ddi: '+235' },
    { name: 'Chile', code: 'cl', ddi: '+56' },
    { name: 'China', code: 'cn', ddi: '+86' },
    { name: 'Chipre', code: 'cy', ddi: '+357' },
    { name: 'Colômbia', code: 'co', ddi: '+57' },
    { name: 'Comores', code: 'km', ddi: '+269' },
    { name: 'Congo-Brazzaville', code: 'cg', ddi: '+242' },
    { name: 'Congo-Kinshasa', code: 'cd', ddi: '+243' },
    { name: 'Coreia do Norte', code: 'kp', ddi: '+850' },
    { name: 'Coreia do Sul', code: 'kr', ddi: '+82' },
    { name: 'Costa do Marfim', code: 'ci', ddi: '+225' },
    { name: 'Costa Rica', code: 'cr', ddi: '+506' },
    { name: 'Croácia', code: 'hr', ddi: '+385' },
    { name: 'Cuba', code: 'cu', ddi: '+53' },
    { name: 'Dinamarca', code: 'dk', ddi: '+45' },
    { name: 'Djibuti', code: 'dj', ddi: '+253' },
    { name: 'Dominica', code: 'dm', ddi: '+1' },
    { name: 'Egito', code: 'eg', ddi: '+20' },
    { name: 'El Salvador', code: 'sv', ddi: '+503' },
    { name: 'Emirados Árabes Unidos', code: 'ae', ddi: '+971' },
    { name: 'Equador', code: 'ec', ddi: '+593' },
    { name: 'Eritreia', code: 'er', ddi: '+291' },
    { name: 'Eslováquia', code: 'sk', ddi: '+421' },
    { name: 'Eslovênia', code: 'si', ddi: '+386' },
    { name: 'Espanha', code: 'es', ddi: '+34' },
    { name: 'Estados Unidos', code: 'us', ddi: '+1' },
    { name: 'Estônia', code: 'ee', ddi: '+372' },
    { name: 'Etiópia', code: 'et', ddi: '+251' },
    { name: 'Fiji', code: 'fj', ddi: '+679' },
    { name: 'Filipinas', code: 'ph', ddi: '+63' },
    { name: 'Finlândia', code: 'fi', ddi: '+358' },
    { name: 'França', code: 'fr', ddi: '+33' },
    { name: 'Gabão', code: 'ga', ddi: '+241' },
    { name: 'Gâmbia', code: 'gm', ddi: '+220' },
    { name: 'Gana', code: 'gh', ddi: '+233' },
    { name: 'Geórgia', code: 'ge', ddi: '+995' },
    { name: 'Granada', code: 'gd', ddi: '+1' },
    { name: 'Grécia', code: 'gr', ddi: '+30' },
    { name: 'Guatemala', code: 'gt', ddi: '+502' },
    { name: 'Guiana', code: 'gy', ddi: '+592' },
    { name: 'Guiné', code: 'gn', ddi: '+224' },
    { name: 'Guiné Equatorial', code: 'gq', ddi: '+240' },
    { name: 'Guiné-Bissau', code: 'gw', ddi: '+245' },
    { name: 'Haiti', code: 'ht', ddi: '+509' },
    { name: 'Holanda', code: 'nl', ddi: '+31' },
    { name: 'Honduras', code: 'hn', ddi: '+504' },
    { name: 'Hungria', code: 'hu', ddi: '+36' },
    { name: 'Iêmen', code: 'ye', ddi: '+967' },
    { name: 'Ilhas Marshall', code: 'mh', ddi: '+692' },
    { name: 'Ilhas Salomão', code: 'sb', ddi: '+677' },
    { name: 'Índia', code: 'in', ddi: '+91' },
    { name: 'Indonésia', code: 'id', ddi: '+62' },
    { name: 'Irã', code: 'ir', ddi: '+98' },
    { name: 'Iraque', code: 'iq', ddi: '+964' },
    { name: 'Irlanda', code: 'ie', ddi: '+353' },
    { name: 'Islândia', code: 'is', ddi: '+354' },
    { name: 'Israel', code: 'il', ddi: '+972' },
    { name: 'Itália', code: 'it', ddi: '+39' },
    { name: 'Jamaica', code: 'jm', ddi: '+1' },
    { name: 'Japão', code: 'jp', ddi: '+81' },
    { name: 'Jordânia', code: 'jo', ddi: '+962' },
    { name: 'Kuwait', code: 'kw', ddi: '+965' },
    { name: 'Laos', code: 'la', ddi: '+856' },
    { name: 'Lesoto', code: 'ls', ddi: '+266' },
    { name: 'Letônia', code: 'lv', ddi: '+371' },
    { name: 'Líbano', code: 'lb', ddi: '+961' },
    { name: 'Libéria', code: 'lr', ddi: '+231' },
    { name: 'Líbia', code: 'ly', ddi: '+218' },
    { name: 'Liechtenstein', code: 'li', ddi: '+423' },
    { name: 'Lituânia', code: 'lt', ddi: '+370' },
    { name: 'Luxemburgo', code: 'lu', ddi: '+352' },
    { name: 'Macedônia do Norte', code: 'mk', ddi: '+389' },
    { name: 'Madagascar', code: 'mg', ddi: '+261' },
    { name: 'Malásia', code: 'my', ddi: '+60' },
    { name: 'Malawi', code: 'mw', ddi: '+265' },
    { name: 'Maldivas', code: 'mv', ddi: '+960' },
    { name: 'Mali', code: 'ml', ddi: '+223' },
    { name: 'Malta', code: 'mt', ddi: '+356' },
    { name: 'Marrocos', code: 'ma', ddi: '+212' },
    { name: 'Maurício', code: 'mu', ddi: '+230' },
    { name: 'Mauritânia', code: 'mr', ddi: '+222' },
    { name: 'México', code: 'mx', ddi: '+52' },
    { name: 'Micronésia', code: 'fm', ddi: '+691' },
    { name: 'Moçambique', code: 'mz', ddi: '+258' },
    { name: 'Moldávia', code: 'md', ddi: '+373' },
    { name: 'Mônaco', code: 'mc', ddi: '+377' },
    { name: 'Mongólia', code: 'mn', ddi: '+976' },
    { name: 'Montenegro', code: 'me', ddi: '+382' },
    { name: 'Namíbia', code: 'na', ddi: '+264' },
    { name: 'Nauru', code: 'nr', ddi: '+674' },
    { name: 'Nepal', code: 'np', ddi: '+977' },
    { name: 'Nicarágua', code: 'ni', ddi: '+505' },
    { name: 'Níger', code: 'ne', ddi: '+227' },
    { name: 'Nigéria', code: 'ng', ddi: '+234' },
    { name: 'Noruega', code: 'no', ddi: '+47' },
    { name: 'Nova Zelândia', code: 'nz', ddi: '+64' },
    { name: 'Omã', code: 'om', ddi: '+968' },
    { name: 'Palau', code: 'pw', ddi: '+680' },
    { name: 'Panamá', code: 'pa', ddi: '+507' },
    { name: 'Papua Nova Guiné', code: 'pg', ddi: '+675' },
    { name: 'Paquistão', code: 'pk', ddi: '+92' },
    { name: 'Paraguai', code: 'py', ddi: '+595' },
    { name: 'Peru', code: 'pe', ddi: '+51' },
    { name: 'Polônia', code: 'pl', ddi: '+48' },
    { name: 'Portugal', code: 'pt', ddi: '+351' },
    { name: 'Quênia', code: 'ke', ddi: '+254' },
    { name: 'Quirguistão', code: 'kg', ddi: '+996' },
    { name: 'Reino Unido', code: 'gb', ddi: '+44' },
    { name: 'República Centro-Africana', code: 'cf', ddi: '+236' },
    { name: 'República Checa', code: 'cz', ddi: '+420' },
    { name: 'República Dominicana', code: 'do', ddi: '+1' },
    { name: 'Romênia', code: 'ro', ddi: '+40' },
    { name: 'Ruanda', code: 'rw', ddi: '+250' },
    { name: 'Rússia', code: 'ru', ddi: '+7' },
    { name: 'Samoa', code: 'ws', ddi: '+685' },
    { name: 'San Marino', code: 'sm', ddi: '+378' },
    { name: 'Santa Lúcia', code: 'lc', ddi: '+1' },
    { name: 'São Cristóvão e Nevis', code: 'kn', ddi: '+1' },
    { name: 'São Tomé e Príncipe', code: 'st', ddi: '+239' },
    { name: 'São Vicente e Granadinas', code: 'vc', ddi: '+1' },
    { name: 'Seicheles', code: 'sc', ddi: '+248' },
    { name: 'Senegal', code: 'sn', ddi: '+221' },
    { name: 'Serra Leoa', code: 'sl', ddi: '+232' },
    { name: 'Sérvia', code: 'rs', ddi: '+381' },
    { name: 'Singapura', code: 'sg', ddi: '+65' },
    { name: 'Síria', code: 'sy', ddi: '+963' },
    { name: 'Somália', code: 'so', ddi: '+252' },
    { name: 'Sri Lanka', code: 'lk', ddi: '+94' },
    { name: 'Suazilândia', code: 'sz', ddi: '+268' },
    { name: 'Sudão', code: 'sd', ddi: '+249' },
    { name: 'Sudão do Sul', code: 'ss', ddi: '+211' },
    { name: 'Suécia', code: 'se', ddi: '+46' },
    { name: 'Suíça', code: 'ch', ddi: '+41' },
    { name: 'Suriname', code: 'sr', ddi: '+597' },
    { name: 'Tailândia', code: 'th', ddi: '+66' },
    { name: 'Taiwan', code: 'tw', ddi: '+886' },
    { name: 'Tajiquistão', code: 'tj', ddi: '+992' },
    { name: 'Tanzânia', code: 'tz', ddi: '+255' },
    { name: 'Timor-Leste', code: 'tl', ddi: '+670' },
    { name: 'Togo', code: 'tg', ddi: '+228' },
    { name: 'Tonga', code: 'to', ddi: '+676' },
    { name: 'Trinidad e Tobago', code: 'tt', ddi: '+1' },
    { name: 'Tunísia', code: 'tn', ddi: '+216' },
    { name: 'Turquemenistão', code: 'tm', ddi: '+993' },
    { name: 'Turquia', code: 'tr', ddi: '+90' },
    { name: 'Tuvalu', code: 'tv', ddi: '+688' },
    { name: 'Ucrânia', code: 'ua', ddi: '+380' },
    { name: 'Uganda', code: 'ug', ddi: '+256' },
    { name: 'Uruguai', code: 'uy', ddi: '+598' },
    { name: 'Uzbequistão', code: 'uz', ddi: '+998' },
    { name: 'Vanuatu', code: 'vu', ddi: '+678' },
    { name: 'Vaticano', code: 'va', ddi: '+39' },
    { name: 'Venezuela', code: 've', ddi: '+58' },
    { name: 'Vietnã', code: 'vn', ddi: '+84' },
    { name: 'Zâmbia', code: 'zm', ddi: '+260' },
    { name: 'Zimbábue', code: 'zw', ddi: '+263' },
];

export default function BookingModal({ isOpen, onClose, experienceTitle, source = 'geral' }: BookingModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        fullPhone: "", // Store combined DDD + Number
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeField, setActiveField] = useState<"name" | "phone" | null>(null);
    const [mounted, setMounted] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'br') || countries[0]);
    const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
    const countrySelectorRef = useRef<HTMLDivElement>(null);

    // Mount check for client-side portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset form when modal opens and lock body scroll
    useEffect(() => {
        if (isOpen) {
            setFormData({ name: "", fullPhone: "" });
            setIsSubmitted(false);
            setSelectedCountry(countries.find(c => c.code === 'br') || countries[0]);
            setIsCountrySelectorOpen(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (countrySelectorRef.current && !countrySelectorRef.current.contains(event.target as Node)) {
                setIsCountrySelectorOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const phoneNumber = `${selectedCountry.ddi}${formData.fullPhone.replace(/\D/g, "")}`;

            // Dispara para o fluxo do N8N através da integração
            await FlyUpWebhook.send({
                nome: formData.name,
                telefone: phoneNumber
            }, source, experienceTitle);

            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Erro ao enviar interesse:", error);
            // Em caso de erro, ainda dá a mensagem de sucesso para não frustrar o usuário ou mostramos um aviso
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Smart Phone Formatter (DDD + Number)
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        // Only apply special formatting for Brazil
        if (selectedCountry.code === 'br') {
            // Limit to 11 chars (2 for DDD + 9 for number)
            if (value.length > 11) value = value.slice(0, 11);

            // Format: (11) 99999-9999
            let formatted = value;
            if (value.length > 0) {
                formatted = `(${value.slice(0, 2)}`;
                if (value.length > 2) {
                    formatted += `) ${value.slice(2, 7)}`;
                }
                if (value.length > 7) {
                    formatted += `-${value.slice(7)}`;
                }
            }
            setFormData((prev) => ({ ...prev, fullPhone: formatted }));
        } else {
            // Simple logic for other countries: just limit length
            if (value.length > 15) value = value.slice(0, 15);
            setFormData((prev) => ({ ...prev, fullPhone: value }));
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop with heavy blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all duration-500"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="relative w-full max-w-[440px] overflow-hidden bg-[#0a0a0a] rounded-[3rem] shadow-[0_0_80px_-20px_rgba(57,255,20,0.15)] ring-1 ring-white/10 group"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Green Gradient Mesh */}
                        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-neon/20 via-neon/5 to-transparent pointer-events-none mix-blend-screen opacity-60" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 text-zinc-500 hover:text-white transition-colors hover:rotate-90 duration-300"
                        >
                            <X size={24} strokeWidth={2.5} />
                        </button>

                        <div className="relative p-10 pt-16 flex flex-col h-full">

                            {/* Header */}
                            <div className="mb-12 relative">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl font-black italic text-white uppercase tracking-tighter leading-[0.85]"
                                >
                                    AGENDAR
                                </motion.h2>

                                {/* Hollow Text Effect */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-1 relative"
                                >
                                    <span
                                        className="text-4xl font-black italic uppercase tracking-tighter leading-none text-transparent block absolute inset-0 blur-sm opacity-50 select-none"
                                        style={{ WebkitTextStroke: '1px #39FF14' }}
                                    >
                                        {experienceTitle}
                                    </span>
                                    <span
                                        className="text-4xl font-black italic uppercase tracking-tighter leading-none text-transparent relative z-10 block"
                                        style={{ WebkitTextStroke: '1.5px #39FF14' }}
                                    >
                                        {experienceTitle}
                                    </span>
                                </motion.div>

                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-[2px] w-8 bg-neon rounded-full" />
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                        Vagas Limitadas
                                    </p>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring" }}
                                        className="w-24 h-24 rounded-full bg-neon text-black flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(57,255,20,0.4)]"
                                    >
                                        <CheckCircle2 size={48} strokeWidth={3} />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl font-black italic text-white uppercase tracking-tighter"
                                    >
                                        Solicitação Recebida!
                                    </motion.h3>
                                    <p className="text-zinc-500 font-medium text-xs mt-3 max-w-[200px] leading-relaxed">
                                        Nossa equipe de elite entrará em contato em instantes.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">

                                    {/* Name Input */}
                                    <div className="group/input relative">
                                        <label
                                            className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 block transition-colors duration-300 ${activeField === 'name' ? 'text-neon' : 'text-zinc-500'}`}
                                        >
                                            Nome de Elite
                                        </label>
                                        <div
                                            className={`
                        relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 overflow-hidden
                        ${activeField === 'name' ? 'border-neon ring-1 ring-neon/20 bg-white/10' : 'border-white/10 hover:border-white/20'}
                      `}
                                        >
                                            <div className="pl-5 text-zinc-400">
                                                <User size={18} strokeWidth={2.5} />
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="COMO DEVEMOS TE CHAMAR?"
                                                className="w-full bg-transparent border-none py-5 pl-3 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-0 font-bold uppercase text-sm tracking-wide"
                                                value={formData.name}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                                onFocus={() => setActiveField('name')}
                                                onBlur={() => setActiveField(null)}
                                            />
                                        </div>
                                    </div>

                                    {/* Combined Phone Input */}
                                    <div className="group/input relative">
                                        <label
                                            className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 block transition-colors duration-300 ${activeField === 'phone' ? 'text-neon' : 'text-zinc-500'}`}
                                        >
                                            WhatsApp
                                        </label>
                                        <div
                                            className={`
                        relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300
                        ${activeField === 'phone' ? 'border-neon ring-1 ring-neon/20 bg-white/10' : 'border-white/10 hover:border-white/20'}
                      `}
                                        >
                                            <div className="pl-5 flex items-center gap-3" ref={countrySelectorRef}>
                                                {/* Country Selector Toggle */}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                                                    className="flex items-center gap-2 hover:bg-white/5 py-1 px-1.5 rounded-lg transition-colors group/flag"
                                                >
                                                    <div className="w-5 h-3.5 relative rounded-[2px] overflow-hidden opacity-80 shadow-sm ring-1 ring-white/10">
                                                        <img
                                                            src={`https://flagcdn.com/${selectedCountry.code}.svg`}
                                                            alt={selectedCountry.code}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <ChevronDown size={12} className={`text-zinc-500 transition-transform duration-300 ${isCountrySelectorOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                <div className="h-4 w-[1px] bg-white/10 rounded-full" />
                                                <span className="text-zinc-400 font-bold text-sm tracking-tight w-10">{selectedCountry.ddi}</span>

                                                {/* Flag Selection Dropdown */}
                                                <AnimatePresence>
                                                    {isCountrySelectorOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute left-4 top-full mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-[60]"
                                                        >
                                                            <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                                                                {countries.map((country) => (
                                                                    <button
                                                                        key={country.code}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedCountry(country);
                                                                            setIsCountrySelectorOpen(false);
                                                                            // Reset phone field when country changes to avoid mixed formats
                                                                            setFormData(prev => ({ ...prev, fullPhone: "" }));
                                                                        }}
                                                                        className={`
                                                                            w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                                                                            ${selectedCountry.code === country.code ? 'bg-neon/10 text-neon' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}
                                                                        `}
                                                                    >
                                                                        <div className="w-5 h-3.5 relative rounded-[2px] overflow-hidden opacity-90 shadow-sm ring-1 ring-white/10 shrink-0">
                                                                            <img
                                                                                src={`https://flagcdn.com/${country.code}.svg`}
                                                                                alt={country.code}
                                                                                className="object-cover w-full h-full"
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs font-bold leading-none">{country.name}</span>
                                                                            <span className="text-[10px] opacity-60 mt-1">{country.ddi}</span>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <input
                                                required
                                                type="tel"
                                                placeholder="(DD) 99999-9999"
                                                className="w-full bg-transparent border-none py-5 pl-3 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-0 font-bold text-sm tracking-widest font-mono"
                                                value={formData.fullPhone}
                                                onChange={handlePhoneChange}
                                                onFocus={() => setActiveField('phone')}
                                                onBlur={() => setActiveField(null)}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                        group w-full relative overflow-hidden rounded-2xl bg-neon p-5 
                        transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]
                        active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none
                      "
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-2">
                                                <span className="text-black font-black italic uppercase tracking-[0.1em] text-sm">
                                                    {isSubmitting ? "Enviando..." : "Confirmar Interesse"}
                                                </span>
                                                <ArrowRight size={18} className="text-black transition-transform group-hover:translate-x-1" strokeWidth={3} />
                                            </div>

                                            {/* Button Shine Effect */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 ease-in-out" />
                                        </button>

                                        <p className="mt-6 text-center text-[9px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-500 transition-colors cursor-pointer">
                                            Política de Privacidade e Termos
                                        </p>
                                    </div>

                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        , document.body);
}
