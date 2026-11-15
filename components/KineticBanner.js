'use client';

import { motion } from 'framer-motion';

export default function KineticBanner({ items, speed = 25, direction = 'left', className = '' }) {
    const bannerItems = items || [
        'REVERSE-ENGINEERING GAME MEMORY',
        '20,000 VECTORIZED MONTE CARLO RUNS',
        'ZERO POINT-IN-TIME FUTURE LEAKAGE',
        'TWO-STAGE CONVERSATIONAL OUTREACH',
        '100% OFFLINE ON-DEVICE INFERENCE',
        'C# BepInEx TELEMETRY HOOKS',
        'PLATT PROBABILITY CALIBRATION',
        '98.4% RECALL UNDER ASYMMETRIC LOSS',
    ];

    return (
        <div className={`kinetic-banner-wrapper ${className}`}>
            <div className="film-strip-edge top" />
            <div className="kinetic-track-container">
                <motion.div
                    className="kinetic-track"
                    animate={{
                        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: speed,
                    }}
                >
                    {[...bannerItems, ...bannerItems].map((text, i) => (
                        <span key={i} className="kinetic-cell font-mono">
                            <span className="retro-film-symbol">✦</span>
                            <span className={i % 3 === 0 ? 'chromatic-bold' : 'kinetic-text'}>
                                {text}
                            </span>
                        </span>
                    ))}
                </motion.div>
            </div>
            <div className="film-strip-edge bottom" />
        </div>
    );
}

