"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";

const IMAGES = [
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462574/Aluno_AFF_1_-_Editada_qenftv", label: "Elite Performance" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462568/Aluno_AFF_8_-_Editado_ojmazf", label: "Liberdade Total" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462567/Aluno_AFF_7_-_Editado_haiego", label: "Domínio do Ar" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462564/Aluno_AFF_6_-_Editada_ovrfmf", label: "Foco & Técnica" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462563/Aluno_AFF_5_-_Editada_xafviv", label: "Conquista" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462562/Aluno_AFF_4_-_Editada_vohyj3", label: "Voo de Elite" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462562/Aluno_AFF_3_-_Editada_qaeg5q", label: "Adrenalina Pura" },
    { src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771462561/Aluno_AFF_2_-_Editada_pnb6gj", label: "Formação Alpha" },
];

export default function AFFGallery3D() {
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Rotation state: 0 to IMAGES.length - 1
    const xMotion = useMotionValue(0);
    const springConfig = { stiffness: 400, damping: 40, mass: 1 };
    const xSpring = useSpring(xMotion, springConfig);

    const containerRef = useRef<HTMLDivElement>(null);
    const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

    const n = IMAGES.length;
    const radius = 450; // Radius of the circle
    const angleStep = (2 * Math.PI) / n;

    // Helper to get active index from continuous value
    const getActiveIndex = (val: number) => {
        const modVal = ((-val % n) + n) % n;
        return Math.round(modVal) % n;
    };

    const activeIndex = getActiveIndex(xMotion.get());

    // Auto rotate logic
    const startAutoRotate = () => {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        autoRotateRef.current = setInterval(() => {
            if (!isDragging) {
                xMotion.set(xMotion.get() - 1);
            }
        }, 4000);
    };

    useEffect(() => {
        startAutoRotate();
        return () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current); };
    }, [isDragging]);

    const handleDragStart = () => {
        setIsDragging(true);
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };

    const handleDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        // Snap to nearest index
        const currentForce = info.velocity.x / 500;
        const target = Math.round(xMotion.get() + currentForce);
        xMotion.set(target);
        startAutoRotate();
    };

    return (
        <section
            className="py-24 relative overflow-hidden bg-white"
            id="galeria"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{
                    backgroundImage: `linear-gradient(to right, #39FF14 1px, transparent 1px), linear-gradient(to bottom, #39FF14 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white" />

            {/* Header */}
            <div className="relative z-10 text-center mb-16 px-6">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-4 border border-zinc-200 rounded-full px-4 py-1.5">
                    Lifestyle
                </span>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase text-zinc-900 leading-none">
                    Veja na{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-emerald-500">
                        Prática
                    </span>
                </h2>
                <p className="text-zinc-400 text-sm mt-3 max-w-md mx-auto">
                    Arraste para girar ou clique em uma imagem para ampliar.
                </p>
            </div>

            {/* Carousel Container */}
            <div
                className="relative z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{ height: 500, perspective: "1500px" }}
                ref={containerRef}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{
                        x: 0, // We use the drag purely for input, values are mapped from xMotion
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d'
                    }}
                    onUpdate={(latest: any) => {
                        // Map the actual drag 'x' to our circular rotation 'xMotion'
                        // Only update if we are actually dragging
                        if (isDragging) {
                            // Sensitivity: 500px drag = 1 item rotation
                            const delta = latest.x / 400;
                            // We don't use the 'x' property for rendering, just for the feel
                        }
                    }}
                    // Using Pan instead of Drag for custom mapping
                    onPan={(_: any, info: any) => {
                        const delta = info.delta.x / 200;
                        xMotion.set(xMotion.get() + delta);
                    }}
                >
                    {IMAGES.map((img, i) => {
                        return (
                            <ImageCard
                                key={i}
                                index={i}
                                total={n}
                                radius={radius}
                                rotation={xSpring}
                                img={img}
                                onClick={() => !isDragging && setLightboxImg(img.src)}
                            />
                        );
                    })}
                </motion.div>
            </div>

            {/* Navigation Indicators */}
            <div className="relative z-10 flex items-center justify-center gap-2 mt-10">
                {IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => xMotion.set(-i)}
                        className="transition-all duration-300"
                        style={{
                            width: activeIndex === i ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            background: activeIndex === i ? "#39FF14" : "#d4d4d8",
                        }}
                    />
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setLightboxImg(null)}
                    >
                        <motion.img
                            src={lightboxImg}
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            className="max-w-5xl max-h-[85vh] w-full object-contain rounded-2xl shadow-[0_0_100px_rgba(57,255,20,0.2)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setLightboxImg(null)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#39FF14] hover:text-black flex items-center justify-center text-white transition-all duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ImageCard({ index, total, radius, rotation, img, onClick }: any) {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;

    // Transform rotation into circular coordinates
    const cardRotation = useTransform(rotation, (r: number) => {
        return angle + (r * angleStep);
    });

    const x = useTransform(cardRotation, (a: number) => Math.sin(a) * radius);
    const z = useTransform(cardRotation, (a: number) => (Math.cos(a) - 1) * radius);
    const rotateY = useTransform(cardRotation, (a: number) => (a * 180) / Math.PI);

    // Fade out cards as they go to the back
    const opacity = useTransform(cardRotation, (a: number) => {
        const cos = Math.cos(a);
        return cos > -0.2 ? 1 : 0.4 + (cos + 0.2) * 0.5;
    });

    const scale = useTransform(cardRotation, (a: number) => {
        const cos = Math.cos(a);
        return 0.7 + (cos + 1) * 0.15; // Closer = bigger
    });

    return (
        <motion.div
            style={{
                position: "absolute",
                width: 280,
                height: 380,
                x,
                z,
                rotateY,
                opacity,
                scale,
                transformStyle: "preserve-3d",
                cursor: "pointer",
            }}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl border-2 border-transparent hover:border-[#39FF14]/50 transition-colors duration-300">
                <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                />
                {/* Subtle overlay for depth */}
                <motion.div
                    className="absolute inset-0 bg-black/40 pointer-events-none"
                    style={{
                        opacity: useTransform(cardRotation, (a: number) => {
                            const cos = Math.cos(a);
                            return (1 - cos) / 2; // Darker when further away
                        })
                    }}
                />
            </div>
        </motion.div>
    );
}
