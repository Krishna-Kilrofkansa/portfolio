'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onSkip }) {
    const [progress, setProgress] = useState(12);
    const latinName = 'AAKARSHAK SWARAJ';
    const latinLetters = latinName.split('');

    // Smooth telemetry progress counter up to 100%
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const inc = Math.floor(Math.random() * 18) + 8;
                return Math.min(100, prev + inc);
            });
        }, 120);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="loading-screen"
            onClick={onSkip}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            title="Click anywhere to skip boot sequence"
        >
            <div className="loading-container">
                {/* 35mm Analog Viewfinder Corner Markers */}
                <span className="loading-corner-marker tl" />
                <span className="loading-corner-marker tr" />
                <span className="loading-corner-marker bl" />
                <span className="loading-corner-marker br" />

                {/* Top Film Aperture Strip */}
                <div className="loading-film-header font-mono">
                    <span>[ 35mm ANALOG APERTURE // 28 FPS ]</span>
                    <span>DEVANAGARI CALLIGRAPHIC SIGNATURE</span>
                    <span className="hide-on-mobile">ISO 400 • 5600K</span>
                </div>

                {/* Center Calligraphy Stage: AMS Krishna / Tejas Style */}
                <div className="calligraphy-stage">
                    {/* Ambient Gold & Cyan Luminescent Aura */}
                    <div className="calligraphy-aura" />

                    <svg
                        className="calligraphy-svg"
                        viewBox="0 0 760 210"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Liquid Gold Metallic Gradient */}
                            <linearGradient id="calligraphyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFF9E6" />
                                <stop offset="28%" stopColor="#FDE68A" />
                                <stop offset="55%" stopColor="#F59E0B" />
                                <stop offset="85%" stopColor="#D97706" />
                                <stop offset="100%" stopColor="#B45309" />
                            </linearGradient>

                            {/* Soft Radial Glow Filter */}
                            <filter id="inkGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* ========================================================= */}
                        {/* 1. AMS KRISHNA ORNATE SHIROREKHA (Headline Swash)        */}
                        {/* Left royal curled flourish, bold bar, and tapered wing    */}
                        {/* ========================================================= */}
                        <motion.path
                            d="M 94,62 C 108,42 134,48 160,62 L 602,62 C 636,62 664,54 686,40 C 672,66 644,74 610,72 L 162,72 C 130,72 106,82 94,62 Z"
                            fill="url(#calligraphyGoldGrad)"
                            stroke="url(#calligraphyGoldGrad)"
                            strokeWidth="1.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{
                                duration: 1.1,
                                delay: 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        />

                        {/* ========================================================= */}
                        {/* 2. DEVANAGARI CALLIGRAPHY: "आकर्षक"                       */}
                        {/* Pure calligraphic liquid amber/gold stroke and fill       */}
                        {/* ========================================================= */}
                        <motion.text
                            x="380"
                            y="142"
                            className="calligraphy-devanagari-text"
                            stroke="url(#calligraphyGoldGrad)"
                            strokeWidth="2"
                            fill="url(#calligraphyGoldGrad)"
                            filter="url(#inkGlowFilter)"
                            initial={{
                                strokeDasharray: 2400,
                                strokeDashoffset: 2400,
                                fillOpacity: 0,
                            }}
                            animate={{
                                strokeDashoffset: 0,
                                fillOpacity: 1,
                            }}
                            transition={{
                                strokeDashoffset: {
                                    duration: 1.35,
                                    delay: 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                },
                                fillOpacity: {
                                    duration: 0.55,
                                    delay: 0.85,
                                    ease: 'easeInOut',
                                },
                            }}
                        >
                            आकर्षक
                        </motion.text>

                        {/* ========================================================= */}
                        {/* 3. CALLIGRAPHIC REED PEN / INK TRACER NIB                */}
                        {/* Glides across the word as it draws                       */}
                        {/* ========================================================= */}
                        <motion.g
                            initial={{ opacity: 0, x: 100, y: 64 }}
                            animate={{
                                opacity: [0, 1, 1, 1, 0],
                                x: [110, 220, 380, 530, 680],
                                y: [64, 66, 68, 64, 52],
                            }}
                            transition={{
                                duration: 1.4,
                                delay: 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            {/* Glowing pen nib flare */}
                            <circle cx="0" cy="0" r="14" fill="rgba(245, 158, 11, 0.25)" />
                            <circle cx="0" cy="0" r="7" fill="rgba(253, 230, 138, 0.6)" />
                            <circle cx="0" cy="0" r="3" fill="#FFF9E6" />
                        </motion.g>
                    </svg>
                </div>

                {/* Latin Identity Block */}
                <div className="loading-identity-block">
                    <div className="loading-latin-name chromatic-bold">
                        {latinLetters.map((char, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.75 + idx * 0.03,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div
                        className="loading-role-subline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                    >
                        <span>SYSTEMS & AIML ENGINEER // VIT CHENNAI ➔ BENGALURU</span>
                    </motion.div>
                </div>

                {/* Telemetry Progress Bar */}
                <div className="loading-telemetry-strip">
                    <div className="loading-meter-bar">
                        <motion.div
                            className="loading-meter-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        />
                    </div>

                    <div className="loading-telemetry-meta">
                        <span>INIT_PHASE: CALLIGRAPHY_BOOT</span>
                        <span className="font-mono text-amber">
                            {progress < 100 ? `SYSTEMS ${progress}%` : 'READY // 100%'}
                        </span>
                    </div>
                </div>

                {/* Skip Hint */}
                <motion.div
                    className="loading-skip-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                >
                    [ CLICK ANYWHERE TO ENTER PORTFOLIO ➔ ]
                </motion.div>
            </div>
        </motion.div>
    );
}
