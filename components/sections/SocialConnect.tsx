"use client"

import { ShuffleGrid } from "@/components/ui/shuffle-grid";
import { Instagram, ArrowRight, Heart, MessageCircle, Send, Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialConnect = () => {
    return (
        <section className="w-full bg-[#FAFAFA] text-black py-32 relative overflow-hidden">
            {/* Background Base */}
            <div className="absolute inset-0 z-0 bg-[#F2F2F2]" />

            {/* Subtle static neon accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(57,255,20,0.06)_0%,transparent_70%)] blur-[40px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] blur-[40px] pointer-events-none" />

            {/* Technical HUD Overlays */}
            <div className="absolute top-10 left-10 text-[10px] font-mono text-zinc-400 opacity-30 select-none">
                COORD_LOCK: 23.2163° S, 47.7122° W <br />
                ALT_STATE: 14.000FT_MSL <br />
                WIND: 12KT_NW
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Content */}
                <div className="flex flex-col gap-8">

                    {/* Instagram Profile Header Mimic */}
                    <div className="flex items-center gap-4">
                        <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                            <div className="bg-white p-[2px] rounded-full">
                                <div className="w-16 h-16 rounded-full overflow-hidden relative">
                                    <img src="https://i.imgur.com/pTo2v1r.png" alt="Fly Up Profile" className="object-cover w-full h-full" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-2xl tracking-tight">flyupparaquedismo</span>
                                <img src="https://i.imgur.com/0ETBTah.png" alt="Verified" className="w-5 h-5" />
                            </div>
                            <span className="text-zinc-500 text-sm font-medium">Boituva, SP</span>
                        </div>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                        Compartilhe <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-400">o Hype</span>
                    </h2>

                    <p className="text-zinc-600 text-xl max-w-lg font-medium leading-relaxed">
                        Siga a <span className="text-black font-bold">@flyupparaquedismo</span>. Marque a gente nos stories. Apareça para a elite do paraquedismo.
                    </p>

                    {/* Social Action Bar */}
                    <div className="flex items-center justify-between py-4 border-y border-zinc-200 w-full max-w-md">
                        <Heart className="w-8 h-8 stroke-[1.5] hover:fill-red-500 hover:stroke-red-500 transition-colors cursor-pointer" strokeWidth={1.5} />
                        <MessageCircle className="w-8 h-8 stroke-[1.5] hover:stroke-zinc-600 transition-colors cursor-pointer" strokeWidth={1.5} />
                        <Send className="w-8 h-8 stroke-[1.5] hover:stroke-zinc-600 transition-colors cursor-pointer" strokeWidth={1.5} style={{ transform: 'rotate(45deg) translateY(-2px)' }} />
                        <Bookmark className="w-8 h-8 stroke-[1.5] hover:stroke-zinc-600 transition-colors cursor-pointer" strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a 
                            href="https://www.instagram.com/flyupparaquedismo/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-14 bg-black text-[#39FF14] hover:bg-zinc-800 hover:text-[#39FF14] font-bold uppercase tracking-wider rounded-xl px-10 text-lg transition-all hover:scale-105 shadow-xl shadow-black/10 flex items-center justify-center"
                        >
                            Seguir Agora
                        </a>
                        <a 
                            href="https://www.instagram.com/stories/flyupparaquedismo/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-14 px-6 flex items-center justify-center border-2 border-zinc-200 rounded-xl font-bold uppercase tracking-wider text-sm hover:border-black transition-colors cursor-pointer"
                        >
                            Ver Stories
                        </a>
                    </div>

                </div>

                {/* Right Content - Grid */}
                <div className="relative w-full h-full flex flex-col justify-center">
                    <div className="bg-white p-3 rounded-[2rem] shadow-2xl shadow-black/10 rotate-1 hover:rotate-0 transition-transform duration-700 ease-out border border-zinc-100">
                        <ShuffleGrid className="h-[500px] md:h-[650px] w-full gap-2" />
                    </div>

                    <div className="absolute -bottom-20 -right-20 -z-10 rotate-[-10deg] opacity-10 pointer-events-none select-none">
                        <h3 className="text-[12rem] font-black leading-none text-black">FLY UP</h3>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SocialConnect;
