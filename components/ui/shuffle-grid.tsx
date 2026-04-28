"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ShuffleHero = () => {
    return (
        <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
            <div>
                <span className="block mb-4 text-xs md:text-sm text-primary font-medium">
                    Better every day
                </span>
                <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
                    Let's change it up a bit
                </h3>
                <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
                    error repellat voluptatibus ad.
                </p>
                <button className={cn(
                    "bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md",
                    "transition-all hover:bg-primary/90 active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}>
                    Find a class
                </button>
            </div>
            <ShuffleGrid />
        </section>
    );
};

export const shuffle = (array: (typeof squareData)[0][]) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const squareData = [
    {
        id: 1,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470424/Foto_feed_15_b6nlkc.jpg",
    },
    {
        id: 2,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470423/Foto_feed_16_1_v5hisf.png",
    },
    {
        id: 3,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470422/Foto_feed_13_1_ypiwoz.png",
    },
    {
        id: 4,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470420/Foto_feed_14_1_kc82fy.png",
    },
    {
        id: 5,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470419/Foto_feed_11_1_pydpdm.png",
    },
    {
        id: 6,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470417/Foto_feed_12_1_xqssrd.png",
    },
    {
        id: 7,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470417/Foto_feed_10_1_zoo74d.png",
    },
    {
        id: 8,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470415/Foto_feed_9_1_ozagb1.png",
    },
    {
        id: 9,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470414/Foto_feed_7_ppmqkl.jpg",
    },
    {
        id: 10,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470413/Foto_feed_6_feptej.jpg",
    },
    {
        id: 11,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470411/Foto_feed_5_mihgje.jpg",
    },
    {
        id: 12,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470410/Foto_feed_3_1_hpydnc.png",
    },
    {
        id: 13,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470411/Foto_feed_4_1_feyhjb.png",
    },
    {
        id: 14,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470409/Foto_feed_2_bx8lar.webp",
    },
    {
        id: 15,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470424/Foto_feed_15_b6nlkc.jpg",
    },
    {
        id: 16,
        src: "https://res.cloudinary.com/dn50urzkv/image/upload/f_auto,q_auto/v1771470423/Foto_feed_16_1_v5hisf.png",
    },
];

export const generateSquares = () => {
    return shuffle(squareData).map((sq) => (
        <motion.div
            key={sq.id}
            layout
            transition={{ duration: 1.5, type: "spring" }}
            className="w-full h-full rounded-md overflow-hidden bg-muted"
            style={{
                backgroundImage: `url(${sq.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></motion.div>
    ));
};

export const ShuffleGrid = ({ className }: { className?: string }) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mounted, setMounted] = useState(false);
    const [squares, setSquares] = useState(() =>
        squareData.map((sq) => (
            <motion.div
                key={sq.id}
                layout
                transition={{ duration: 1.5, type: "spring" }}
                className="w-full h-full rounded-md overflow-hidden bg-muted"
                style={{
                    backgroundImage: `url(${sq.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></motion.div>
        ))
    );

    useEffect(() => {
        setMounted(true);

        // Only shuffle after component is mounted on client
        const shuffleSquares = () => {
            setSquares(generateSquares());
            timeoutRef.current = setTimeout(shuffleSquares, 6000);
        };

        // Initial shuffle after mount
        shuffleSquares();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={cn("grid grid-cols-4 grid-rows-4 h-[450px] gap-1", className)}>
            {squares.map((sq) => sq)}
        </div>
    );
};
