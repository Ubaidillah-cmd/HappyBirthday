'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb7185', '#fde68a'];

// Hujan confetti berwarna-warni
export const Confetti = ({ count = 50 }: { count?: number }) => {
    const [pieces, setPieces] = useState<
        { left: number; delay: number; duration: number; color: string; size: number; rotate: number; round: boolean }[]
    >([]);

    useEffect(() => {
        setPieces(
            Array.from({ length: count }, () => ({
                left: Math.random() * 100,
                delay: Math.random() * 4,
                duration: 4 + Math.random() * 4,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 6 + Math.random() * 8,
                rotate: 360 + Math.random() * 720,
                round: Math.random() > 0.6,
            }))
        );
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {pieces.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -40, opacity: 1, rotate: 0 }}
                    animate={{ y: '105vh', opacity: [1, 1, 0.8], rotate: p.rotate }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.round ? p.size : p.size * 0.5,
                        backgroundColor: p.color,
                        borderRadius: p.round ? '9999px' : '2px',
                    }}
                    className="absolute top-0"
                />
            ))}
        </div>
    );
};

// Balon yang naik dari bawah layar
export const Balloons = ({ count = 8 }: { count?: number }) => {
    const [balloons, setBalloons] = useState<
        { left: number; delay: number; duration: number; color: string; size: number }[]
    >([]);

    useEffect(() => {
        setBalloons(
            Array.from({ length: count }, (_, i) => ({
                left: (i * (100 / count)) + Math.random() * (60 / count),
                delay: Math.random() * 6,
                duration: 10 + Math.random() * 6,
                color: COLORS[i % COLORS.length],
                size: 44 + Math.random() * 24,
            }))
        );
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {balloons.map((b, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '110vh', opacity: 0.9 }}
                    animate={{ y: '-30vh', x: [0, 14, -14, 0] }}
                    transition={{
                        y: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' },
                        x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{ left: `${b.left}%` }}
                    className="absolute top-0 flex flex-col items-center opacity-80"
                >
                    <div
                        style={{
                            width: b.size,
                            height: b.size * 1.25,
                            backgroundColor: b.color,
                            boxShadow: `inset -6px -8px 0 rgba(0,0,0,0.12), 0 0 24px ${b.color}55`,
                        }}
                        className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%]"
                    />
                    <div style={{ backgroundColor: b.color }} className="w-2 h-2 -mt-0.5 rotate-45" />
                    <div className="w-px h-16 bg-white/30" />
                </motion.div>
            ))}
        </div>
    );
};
