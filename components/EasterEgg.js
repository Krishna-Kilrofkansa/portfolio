'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export default function EasterEgg() {
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        let inputSequence = [];

        const handleKeyDown = (e) => {
            inputSequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);

            const slice = inputSequence.slice(-KONAMI_CODE.length);

            if (
                slice.length === KONAMI_CODE.length &&
                slice.every((key, i) => key === KONAMI_CODE[i])
            ) {
                setTriggered(true);
                inputSequence = [];
                setTimeout(() => setTriggered(false), 4000);
            }

            if (inputSequence.length > 20) {
                inputSequence = inputSequence.slice(-20);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {triggered && (
                <motion.div
                    className="easter-egg-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="easter-egg-content">
                        <motion.div
                            className="easter-egg-emoji"
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                        >
                            🎮
                        </motion.div>
                        <motion.h2
                            className="easter-egg-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Achievement Unlocked!
                        </motion.h2>
                        <motion.p
                            className="easter-egg-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            You found the Konami Code Easter Egg!
                        </motion.p>
                        <motion.p
                            className="easter-egg-subtext"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            ↑↑↓↓←→←→BA
                        </motion.p>
                        <div className="confetti-container">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="confetti"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        backgroundColor: ['#22C55E', '#6366F1', '#F59E0B', '#EF4444', '#EC4899', '#38BDF8'][
                                            Math.floor(Math.random() * 6)
                                        ],
                                    }}
                                    initial={{ y: -10, rotate: 0, opacity: 1 }}
                                    animate={{
                                        y: typeof window !== 'undefined' ? window.innerHeight : 800,
                                        rotate: 720,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        delay: Math.random() * 1.5,
                                        ease: 'linear',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
