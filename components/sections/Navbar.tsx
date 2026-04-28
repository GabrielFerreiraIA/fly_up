"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, Phone, Calendar, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal";

const experiences = [
    { name: "Salto Duplo", href: "/salto-duplo" },
];

const cursosParaquedismo = [
    { name: "Curso de Paraquedismo AFF Pro", href: "/curso-aff-pro" },
    { name: "Curso de Wingsuit", href: "/curso-wingsuit" },
];

const outrasExperiencias = [
    { name: "Salto de balão", href: "/salto-balao" },
    { name: "Passeio de balão", href: "/salto-balao" },
    { name: "Túnel de vento", href: "/tunel-de-vento" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const isHoveredRef = useRef(false);

    // Sync ref with state for event handlers
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    // Handle scroll and visibility logic
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show background when scrolled
            setIsScrolled(currentScrollY > 20);

            setShowNavbar(true);
            clearTimeout(timeoutId);

            // Only auto-hide if scrolled down significantly and NOT hovering
            timeoutId = setTimeout(() => {
                if (window.scrollY > 50 && !isHoveredRef.current) {
                    setShowNavbar(false);
                }
            }, 3000);

            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = () => {
            // Only show if we are actually scrolled down (logic consistency)
            // or just always show on mouse move? "Always show" is safer UX.
            setShowNavbar(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (window.scrollY > 50 && !isHoveredRef.current) {
                    setShowNavbar(false);
                }
            }, 3000);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timeoutId);
        };
    }, []); // Empty dependency array = stable listeners

    return (
        <header
            ref={navRef}
            onMouseEnter={() => { setIsHovered(true); setShowNavbar(true); }}
            onMouseLeave={() => { setIsHovered(false); }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out", // Reduced duration slightly for snappier feel
                // Base spacing
                isScrolled ? "py-2" : "py-4",
                // Background logic: Always dark/glass when scrolled, transparent at top
                isScrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-transparent",
                // Hiding logic: Slide up if scrolled and inactive
                isScrolled && !showNavbar ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <div className={cn("container mx-auto px-6 transition-all duration-500", isScrolled ? "h-16" : "h-20")}>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 h-full">

                    {/* LEFT MENU: Experiences & Courses (Dropdowns) */}
                    <nav className="hidden lg:flex items-center gap-10 justify-start pl-4">
                        <Link
                            href="/salto-duplo"
                            className="flex items-center gap-1.5 text-xs font-black text-white hover:text-neon transition-colors uppercase tracking-widest py-4 relative group"
                        >
                            SALTO DUPLO
                            <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Cursos Dropdown */}
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setActiveDropdown("cursos")}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 text-xs font-black text-white hover:text-neon transition-colors uppercase tracking-widest py-4 relative group-hover:text-neon">
                                CURSOS
                                <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === "cursos" ? "rotate-180 text-neon" : "text-zinc-500 group-hover:text-neon")} />
                                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "cursos" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                        className="absolute top-full left-0 w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden py-3 z-50 ring-1 ring-white/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                        {cursosParaquedismo.map((item, idx) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="block px-8 py-3.5 text-sm font-bold text-zinc-400 hover:text-neon hover:bg-white/5 transition-all uppercase tracking-wide border-l-2 border-transparent hover:border-neon relative overflow-hidden"
                                                >
                                                    <span className="relative z-10">{item.name}</span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Experiências Dropdown */}
                        <div
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setActiveDropdown("outras")}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 text-xs font-black text-white hover:text-neon transition-colors uppercase tracking-widest py-4 relative group-hover:text-neon">
                                EXPERIÊNCIAS
                                <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === "outras" ? "rotate-180 text-neon" : "text-zinc-500 group-hover:text-neon")} />
                                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "outras" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                        className="absolute top-full left-0 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden py-3 z-50 ring-1 ring-white/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                        {outrasExperiencias.map((item, idx) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="block px-8 py-3.5 text-sm font-bold text-zinc-400 hover:text-neon hover:bg-white/5 transition-all uppercase tracking-wide border-l-2 border-transparent hover:border-neon relative overflow-hidden"
                                                >
                                                    <span className="relative z-10">{item.name}</span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* CENTER: LOGO */}
                    <div className={cn(
                        "flex-shrink-0 transition-opacity duration-300",
                        isScrolled && !showNavbar ? "opacity-0 invisible" : "opacity-100 visible"
                    )}>
                        <Link href="/" className="block relative group">
                            <div className="absolute inset-0 bg-neon/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src="https://i.imgur.com/UlfCRZF.png"
                                alt="Fly Up Logo"
                                className={cn(
                                    "w-auto object-contain transition-all duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                                    isScrolled ? "h-16 md:h-20" : "h-20 md:h-[100px]"
                                )}
                            />
                        </Link>
                    </div>

                    {/* RIGHT MENU: Info & Action */}
                    <div className="hidden lg:flex items-center gap-10 justify-end pr-4">
                        <Link href="/faq" className="flex items-center gap-2 text-xs font-black text-white hover:text-neon transition-colors uppercase tracking-widest group py-4 relative">
                            <HelpCircle size={14} className="text-zinc-500 group-hover:text-neon transition-colors" />
                            <span>FAQ</span>
                            <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                        </Link>

                        <Link href="/blog" className="flex items-center gap-2 text-xs font-black text-white hover:text-neon transition-colors uppercase tracking-widest group py-4 relative">
                            <BookOpen size={14} className="text-zinc-500 group-hover:text-neon transition-colors" />
                            <span>Blog</span>
                            <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                        </Link>

                        <Button 
                            className="bg-neon hover:bg-neon-hover text-black font-black italic uppercase tracking-wider px-8 py-6 rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] relative overflow-hidden group/btn"
                            onClick={() => {
                                if (pathname === "/curso-aff-pro") {
                                    const element = document.getElementById("preco");
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                } else {
                                    setIsBookingModalOpen(true);
                                }
                            }}
                        >
                            <span className="relative z-10">{pathname === "/curso-aff-pro" ? "Começar o curso agora" : "Contato / Agendar"}</span>
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                        </Button>
                    </div>
                </div>

                {/* Booking Modal */}
                <BookingModal 
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    experienceTitle="Contato Direto"
                    source="navbar-agendar"
                />

                {/* MOBILE TOGGLE */}
                <button
                    className="lg:hidden text-white hover:text-neon transition-colors absolute right-6 top-1/2 -translate-y-1/2 z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* MOBILE MENU FULLSCREEN */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-[#050505] z-40 flex flex-col pt-32 px-10 gap-8 overflow-y-auto"
                    >
                        {/* Mobile Sections */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-neon text-xs font-black uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Experiências</h3>
                                <div className="flex flex-col gap-4">
                                    {experiences.map(item => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-black text-white italic uppercase tracking-tighter hover:text-neon transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-neon text-xs font-black uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Cursos de Paraquedismo</h3>
                                <div className="flex flex-col gap-4">
                                    {cursosParaquedismo.map(item => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-black text-white italic uppercase tracking-tighter hover:text-neon transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-neon text-xs font-black uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Outras Experiências</h3>
                                <div className="flex flex-col gap-4">
                                    {outrasExperiencias.map(item => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-black text-white italic uppercase tracking-tighter hover:text-neon transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 flexflex-col gap-6">
                                {/* 
                                <Link
                                    href="/agenda-eventos"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 text-xl font-bold text-zinc-300 hover:text-white mb-4"
                                >
                                    <Calendar className="text-neon" /> Agenda / Eventos
                                </Link>
                                */}
                                <Link
                                    href="/faq"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 text-xl font-bold text-zinc-300 hover:text-white mb-4"
                                >
                                    <HelpCircle className="text-neon" /> FAQ
                                </Link>
                                <Link
                                    href="/blog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 text-xl font-bold text-zinc-300 hover:text-white"
                                >
                                    <BookOpen className="text-neon" /> Blog
                                </Link>
                            </div>

                            <Button 
                                className="w-full bg-neon text-black font-black italic uppercase py-6 rounded-xl mt-8"
                                onClick={() => {
                                    if (pathname === "/curso-aff-pro") {
                                        setIsMobileMenuOpen(false);
                                        const element = document.getElementById("preco");
                                        if (element) {
                                            element.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }
                                }}
                            >
                                {pathname === "/curso-aff-pro" ? "Começar o curso agora" : "Agendar Agora"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
