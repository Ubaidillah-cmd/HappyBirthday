'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Gift, X, Circle, PartyPopper, Sparkles } from 'lucide-react';
import { Confetti, Balloons } from './Confetti';

// --- Ganti nama penerima di sini (kosongkan '' jika tidak ingin menampilkan nama) ---
const RECIPIENT_NAME = '';

// --- Background Particles (kue, hadiah, bintang melayang) ---
const BackgroundParty = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const icons = [Cake, Gift, Sparkles, PartyPopper];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => {
                const Icon = icons[i % icons.length];
                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            y: '110vh',
                            x: `${(i * 10) + Math.random() * 5}%`,
                            scale: 0.5
                        }}
                        animate={{
                            opacity: [0, 0.25, 0],
                            y: '-10vh',
                            rotate: [0, 180],
                            scale: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className={`absolute ${i % 2 === 0 ? 'text-amber-400/20' : 'text-pink-400/20'}`}
                    >
                        <Icon size={30} />
                    </motion.div>
                );
            })}
        </div>
    );
};

// --- Step 1: Party Mode ---
const PartyModeStep = ({ onComplete }: { onComplete: () => void }) => {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (isOn) {
            const timer = setTimeout(() => onComplete(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOn, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            className="flex flex-col items-center justify-center relative z-10"
        >
            <div className={`backdrop-blur-2xl p-12 rounded-[3rem] transition-all duration-1000 ease-in-out flex flex-col items-center space-y-10 border border-white/10 ${isOn ? 'bg-amber-400/10 shadow-[0_0_80px_rgba(251,191,36,0.2)] border-amber-400/20' : 'bg-white/5 shadow-2xl'}`}>
                <div className="relative">
                    <motion.div
                        animate={isOn ? {
                            scale: [1, 1.15, 1],
                            filter: ['drop-shadow(0 0 0px rgba(251,191,36,0))', 'drop-shadow(0 0 20px rgba(251,191,36,0.6))', 'drop-shadow(0 0 0px rgba(251,191,36,0))']
                        } : {}}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <Cake className={`w-24 h-24 transition-all duration-1000 ${isOn ? 'text-amber-400' : 'text-white/10'}`} />
                    </motion.div>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <span className={`text-5xl font-playfair transition-colors duration-1000 ${isOn ? 'text-white' : 'text-white/40'}`}>
                        Party mode
                    </span>

                    <button
                        onClick={() => setIsOn(!isOn)}
                        className={`group relative w-32 h-16 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] p-1.5 focus:outline-none ${isOn ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)]' : 'bg-white/10'
                            }`}
                    >
                        <motion.div
                            animate={{ x: isOn ? 64 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="w-13 h-13 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center pointer-events-none"
                        >
                            <PartyPopper
                                size={24}
                                className={`transition-colors duration-500 ${isOn ? "text-amber-500" : "text-gray-300"}`}
                            />
                        </motion.div>

                        <AnimatePresence>
                            {!isOn && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30"
                                >
                                    off
                                </motion.span>
                            )}
                            {isOn && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80"
                                >
                                    on
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Step 2: Tic-Tac-Toe ---
const TicTacToeStep = ({ onComplete }: { onComplete: () => void }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [message, setMessage] = useState("Main game kecil dulu yuk...");

    const checkWinner = useCallback((squares: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return squares.includes(null) ? null : 'draw';
    }, []);

    const makeAIMove = useCallback((currentBoard: (string | null)[]) => {
        const emptyIndices = currentBoard.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
        if (emptyIndices.length === 0) return;

        // Extra Easy AI: Purposely avoid the center and pick random spots
        const nonCenterIndices = emptyIndices.filter(i => i !== 4);
        const targetIndex = nonCenterIndices.length > 0
            ? nonCenterIndices[Math.floor(Math.random() * nonCenterIndices.length)]
            : 4;

        const newBoard = [...currentBoard];
        newBoard[targetIndex] = 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsUserTurn(true);
        }
    }, [checkWinner]);

    const handleSquareClick = (index: number) => {
        if (board[index] || winner || !isUserTurn) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsUserTurn(false);
            setTimeout(() => makeAIMove(newBoard), 600);
        }
    };

    useEffect(() => {
        if (winner === 'X') {
            setMessage("Kamu Memenangkan");
            setTimeout(() => onComplete(), 3500); // wait for staggered animation
        } else if (winner === 'O' || winner === 'draw') {
            setMessage(winner === 'draw' ? "Seri! Coba lagi yaa 🎂" : "Hampir! Sekali lagi...");
            setTimeout(() => {
                setBoard(Array(9).fill(null));
                setWinner(null);
                setIsUserTurn(true);
            }, 1500);
        }
    }, [winner, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-10 relative z-10"
        >
            <h2 className="text-4xl font-playfair text-white text-center drop-shadow-lg max-w-xs whitespace-pre-line leading-tight">
                {winner === 'X' ? "Kamu Memenangkan" : message}
            </h2>
            <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                {board.map((square, i) => (
                    <button
                        key={i}
                        onClick={() => handleSquareClick(i)}
                        className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 group"
                    >
                        <AnimatePresence mode="wait">
                            {square === 'X' ? (
                                <motion.div
                                    key={winner === 'X' ? "gift" : "x"}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={winner === 'X' ? { delay: i * 0.15, type: 'spring' } : {}}
                                >
                                    {winner === 'X' ?
                                        <Gift className="w-12 h-12 text-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" /> :
                                        <X className="w-12 h-12 text-white/80" />
                                    }
                                </motion.div>
                            ) : square === 'O' ? (
                                <motion.div key="o" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <Circle className="w-12 h-12 text-pink-300 opacity-50" />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {winner === 'X' && (
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-playfair text-white text-center drop-shadow-lg mt-4"
                    >
                        Hadiah Spesial 🎁
                    </motion.h2>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Step 3: Happiness Meter ---
const HappyMeterStep = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 1500);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [onComplete]);

    // SVG parameters for the semi-circle
    const radius = 90;
    const circumference = Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-12 w-full max-w-lg px-6 relative z-10"
        >
            <div className="relative w-full aspect-[2/1] flex flex-col items-center justify-end overflow-hidden">
                {/* SVG Gauge */}
                <svg viewBox="0 0 200 100" className="w-full h-full absolute top-0 overflow-visible">
                    {/* Background Path (Gray) */}
                    <path
                        d="M 10,100 A 90,90 0 0 1 190,100"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Progress Path */}
                    <motion.path
                        d="M 10,100 A 90,90 0 0 1 190,100"
                        fill="none"
                        stroke="url(#happyGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }}
                    />
                    <defs>
                        <linearGradient id="happyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="z-10 flex flex-col items-center pb-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Cake className="w-16 h-16 text-amber-400 mb-2" />
                    </motion.div>
                    <div className="text-6xl font-black text-white font-mono tracking-tighter">
                        {progress}<span className="text-amber-300 text-3xl">%</span>
                    </div>
                    <span className="text-2xl text-white/60 font-playfair italic mt-2 tracking-widest">Happiness Level</span>
                </div>
            </div>

            {/* Progress Bar for consistency */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-pink-500"
                    animate={{ width: `${progress}%` }}
                />
            </div>
        </motion.div>
    );
};

// --- Step 4: Tiup Lilin & Make a Wish ---
const WishStep = ({ onComplete }: { onComplete: () => void }) => {
    const CANDLES = 5;
    const [lit, setLit] = useState<boolean[]>(Array(CANDLES).fill(true));
    const allOut = lit.every(v => !v);

    const blow = (i: number) => {
        setLit(prev => prev.map((v, idx) => (idx === i ? false : v)));
    };

    useEffect(() => {
        if (allOut) {
            const timer = setTimeout(() => onComplete(), 4500);
            return () => clearTimeout(timer);
        }
    }, [allOut, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-10 relative z-10 px-6"
        >
            <h2 className="text-3xl sm:text-4xl font-playfair text-white text-center drop-shadow-lg max-w-md leading-tight">
                {allOut ? "Semoga semua harapanmu terkabul 🎉" : "Buat permohonan, lalu tiup lilinnya 🕯️"}
            </h2>

            <div className="flex flex-col items-center">
                {/* Lilin */}
                <div className="flex gap-5 sm:gap-7 mb-[-2px]">
                    {lit.map((isLit, i) => (
                        <button
                            key={i}
                            onClick={() => blow(i)}
                            disabled={!isLit}
                            aria-label={`Tiup lilin ${i + 1}`}
                            className="flex flex-col items-center focus:outline-none cursor-pointer disabled:cursor-default"
                        >
                            <div className="h-8 flex items-end">
                                <AnimatePresence>
                                    {isLit && (
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [-4, 4, -3, 3, -4] }}
                                            exit={{ scale: 0, opacity: 0, y: -12, transition: { duration: 0.35 } }}
                                            transition={{ repeat: Infinity, duration: 0.9 }}
                                            className="w-3.5 h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-400 to-yellow-200 shadow-[0_0_18px_rgba(251,191,36,0.9)]"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="w-2.5 h-14 sm:h-16 rounded-sm bg-gradient-to-b from-pink-200 to-pink-400" />
                        </button>
                    ))}
                </div>

                {/* Kue */}
                <div className="w-64 sm:w-80 h-14 rounded-t-2xl bg-gradient-to-b from-pink-100 to-pink-300 relative shadow-[0_0_40px_rgba(244,114,182,0.25)]">
                    <div className="absolute -bottom-2 inset-x-0 flex justify-around px-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-pink-100" />
                        ))}
                    </div>
                </div>
                <div className="w-72 sm:w-96 h-16 bg-gradient-to-b from-amber-300 to-amber-500" />
                <div className="w-80 sm:w-[26rem] h-3 rounded-b-xl bg-white/80" />
            </div>

            {!allOut && (
                <p className="text-white/50 text-sm tracking-widest uppercase">
                    Ketuk tiap lilin untuk memadamkannya
                </p>
            )}

            {allOut && <Confetti count={60} />}
        </motion.div>
    );
};

// --- Step 5: Typewriter ---
const TypewriterStep = ({ onComplete }: { onComplete: () => void }) => {
    const text = RECIPIENT_NAME ? `Happy Birthday, ${RECIPIENT_NAME}!!!!` : "Happy Birthday!!!!";
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isDeleting && displayedText !== text) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 150);
        } else if (!isDeleting && displayedText === text) {
            timer = setTimeout(() => setIsDeleting(true), 2500);
        } else if (isDeleting && displayedText !== "") {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length - 1));
            }, 80);
        } else if (isDeleting && displayedText === "") {
            onComplete();
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, onComplete, text]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            className="flex items-center justify-center p-8 relative z-10"
        >
            <Confetti count={40} />
            <h1 className="text-5xl sm:text-8xl font-playfair text-white text-center leading-tight">
                {displayedText}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 sm:w-4 h-12 sm:h-20 bg-amber-400 ml-2 align-middle"
                />
            </h1>
        </motion.div>
    );
};

export default function InteractionFlow({ onFlowComplete }: { onFlowComplete: () => void }) {
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-50 bg-[#060010] flex items-center justify-center overflow-hidden">
            {/* Visual background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

            <BackgroundParty />
            <Balloons count={6} />

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <PartyModeStep key="step1" onComplete={() => setStep(2)} />
                )}
                {step === 2 && (
                    <TicTacToeStep key="step2" onComplete={() => setStep(3)} />
                )}
                {step === 3 && (
                    <HappyMeterStep key="step3" onComplete={() => setStep(4)} />
                )}
                {step === 4 && (
                    <WishStep key="step4" onComplete={() => setStep(5)} />
                )}
                {step === 5 && (
                    <TypewriterStep key="step5" onComplete={() => onFlowComplete()} />
                )}
            </AnimatePresence>

            {/* Corner Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-900/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-900/20 blur-[100px] rounded-full" />
        </div>
    );
}
