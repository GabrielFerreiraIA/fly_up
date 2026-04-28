import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-bold tracking-tighter uppercase font-montserrat text-white">
                            FLY UP <span className="text-primary">.</span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            A experiência de paraquedismo mais exclusiva de São Paulo.
                            Segurança absoluta, instrutores de elite e a vibe mais intensa da sua vida.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={<Instagram size={20} />} />
                            <SocialLink href="#" icon={<Facebook size={20} />} />
                            <SocialLink href="#" icon={<Twitter size={20} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Navegação</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/salto-duplo">Saltos Duplo</FooterLink>
                            <FooterLink href="/curso-aff-pro">Curso AFF</FooterLink>
                            <FooterLink href="#">Atletas</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="#">FAQ</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>Centro Nacional de Paraquedismo, Boituva - SP</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400 text-sm">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+55 (15) 99828-2280</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400 text-sm">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>contato@flyup.com.br</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Newsletter</h4>
                        <p className="text-zinc-400 text-sm">
                            Receba novidades e promoções exclusivas.
                        </p>
                        <form className="flex flex-col gap-3 group/form">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all placeholder:text-zinc-600"
                                    required
                                />
                            </div>
                            <Button className="w-full bg-neon text-black hover:bg-neon-hover font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Inscrever-se
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-500 text-xs">
                        © {new Date().getFullYear()} Fly Up Elite Skydiving. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-zinc-500">
                        <Link href="#" className="hover:text-neon transition-colors">Termos de Uso</Link>
                        <Link href="#" className="hover:text-neon transition-colors">Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-neon hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]"
        >
            {icon}
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-zinc-400 text-sm hover:text-neon transition-colors flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-[1px] bg-neon transition-all duration-300"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{children}</span>
            </Link>
        </li>
    );
}
