import React, { useEffect, useRef, ReactNode } from 'react';
import { LINKS_DATA, COPYRIGHT_TEXT } from './constants';
import LinkCard from './components/LinkCard';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// --- High-End Glow Logic (Adapted for Neon Green) ---
interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const xPos = x - rect.left;
        const yPos = y - rect.top;
        
        cardRef.current.style.setProperty('--x', xPos.toFixed(2));
        cardRef.current.style.setProperty('--y', yPos.toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative rounded-2xl p-[1px] overflow-hidden shadow-lg shadow-black/50
        transition-transform duration-300 hover:-translate-y-1 hover:shadow-flyup-green/20
        ${className}
      `}
    >
      {/* 1. The Moving Neon Green Border */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            400px circle at var(--x) var(--y),
            rgba(60, 255, 0, 1),
            transparent 40%
          )`
        }}
      />
      
      {/* 2. Static border for subtle definition */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 opacity-100 pointer-events-none" />

      {/* 3. The Content Container (Dark Card) */}
      <div className="relative h-full w-full bg-flyup-card rounded-[14px] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans py-12 px-4"
      style={{
        backgroundColor: '#0B0E11',
        // Layered background: 
        // 1. Green top glow (identity)
        // 2. Strong Radial Gradient (Dark Center -> Lighter Edges) to focus on content
        // 3. Texture Image
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(60, 255, 0, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(11, 14, 17, 0.95) 0%, rgba(11, 14, 17, 0.6) 100%),
          url('https://i.imgur.com/fXGW0hl.png')
        `,
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundPosition: 'center top, center, center',
        backgroundAttachment: 'fixed, fixed, fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* --- Cinematic Background Noise --- */}
      <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />

      {/* --- Floating Actions --- */}
      <FloatingWhatsApp />

      {/* --- Main Content Container --- */}
      <main className="relative z-10 w-full max-w-md animate-fade-in-up">
        
        {/* 
           ROTATING BORDER WRAPPER 
           - p-[2px]: Defines the border thickness
           - bg-flyup-green/20: Softer static glow (reduced from 30%)
        */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black p-[2px] bg-flyup-green/20">
          
          {/* THE ROTATING LIGHT BEAM 
              - animate-spin with 6s duration (Smoother flow)
              - conic-gradient: Updated to "transparent -> green -> transparent" to remove the hard edge cut.
          */}
          <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#3CFF00_50%,transparent_100%)] opacity-60" />

          {/* 
             INNER CONTENT MASK
             - bg-[#101214]: SOLID color. Blocks the spinner from showing in the middle.
          */}
          <div className="
            relative h-full w-full
            bg-[#101214] 
            rounded-[22px]
            p-6 md:p-8 
            overflow-hidden
          ">
            
            {/* Visual Texture / Glass Simulation (Overlay instead of transparency) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-100 pointer-events-none" />
            
            {/* Top Sheen */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />
            
            {/* Header & Identity */}
            <div className="flex flex-col items-center mb-8 text-center relative z-10">
              
              {/* Logo Image */}
              <div className="mb-6">
                 <img 
                   src="https://i.imgur.com/UlfCRZF.png" 
                   alt="FlyUp Paraquedismo" 
                   className="relative z-10 w-20 md:w-24 h-auto object-contain drop-shadow-lg"
                 />
              </div>

              {/* Authority Badges */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 shadow-inner shadow-white/5">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-200 text-xs font-bold tracking-widest uppercase font-sport">
                    +100 MIL INSCRITOS
                  </span>
                </div>
                
                <h2 className="mt-3 text-white text-lg font-bold tracking-tight drop-shadow-md">
                  COM <span className="text-flyup-green drop-shadow-[0_0_10px_rgba(60,255,0,0.5)]">EDU ESTEVES</span>
                </h2>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold opacity-70">
                  Recordista Mundial
                </p>
              </div>
            </div>

            {/* Links Stack */}
            <div className="space-y-4 relative z-10">
              {LINKS_DATA.map((link, index) => (
                <GlowCard key={index}>
                  <LinkCard link={link} />
                </GlowCard>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center gap-3 relative z-10">
              <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-center">
                {COPYRIGHT_TEXT}
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;