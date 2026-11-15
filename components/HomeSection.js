'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher, { LANGUAGES } from './LanguageSwitcher';
import HangingIdCard from './HangingIdCard';
import KineticBanner from './KineticBanner';

export default function HomeSection() {
    const [activeLang, setActiveLang] = useState('EN');
    const current = LANGUAGES[activeLang] || LANGUAGES.EN;

    return (
        <section className="profile-section hero-engineering-container" id="home">
            {/* Top Film Aperture Strip */}
            <div className="retro-film-strip-top font-mono">
                <div className="film-strip-meta">
                    <span className="badge-film">FRAME 001 // 35mm ANALOG</span>
                    <span className="badge-film">ƒ/1.4 T2.0 • ISO 400</span>
                    <span className="badge-film font-mono">5600K DAYLIGHT</span>
                </div>
                {/* Language Switcher integrated in top right */}
                <LanguageSwitcher
                    activeLang={activeLang}
                    onSelectLang={(lang) => setActiveLang(lang)}
                />
            </div>

            {/* Regional Journey Route Bar */}
            <div className="hero-regional-bar font-mono">
                <span className="route-dot" />
                <span className="route-region chromatic-bold">{current.region}</span>
                <span className="route-sep">•</span>
                <span className="route-tagline">{current.tagline}</span>
            </div>

            {/* Main Hero Grid */}
            <div className="hero-main-layout">
                {/* ID Card on left / top */}
                <div className="hero-card-col">
                    <HangingIdCard />
                </div>

                {/* Hero Typographic Manifesto on right */}
                <motion.div
                    className="hero-manifesto-col"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div className="manifesto-top-tag font-mono">
                        <span className="tag-bracket">[</span>
                        <span className="chromatic-text">SYSTEMS & AIML ENGINEER</span>
                        <span className="tag-bracket">]</span>
                        <span className="tag-sep">•</span>
                        <span>VIT CHENNAI ➔ BENGALURU</span>
                    </div>

                    <h1 className="hero-name-title">
                        <span className="name-bold chromatic-bold">Aakarshak Swaraj</span>
                    </h1>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLang}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="hero-dynamic-copy"
                        >
                            <h2 className="definitive-hero-line chromatic-bold">
                                &ldquo;{current.heroLine}&rdquo;
                            </h2>
                            <p className="hero-subline">
                                {current.subline}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Verified Quick Telemetry Badges */}
                    <div className="hero-metric-strip font-mono">
                        <div className="h-metric">
                            <span className="h-val chromatic-bold">8.62</span>
                            <span className="h-lbl">CGPA // VIT CHENNAI</span>
                        </div>
                        <div className="h-sep">/</div>
                        <div className="h-metric">
                            <span className="h-val chromatic-bold">2</span>
                            <span className="h-lbl">PRODUCTION INTERNSHIPS</span>
                        </div>
                        <div className="h-sep">/</div>
                        <div className="h-metric">
                            <span className="h-val chromatic-bold">60%</span>
                            <span className="h-lbl">SYSTEM LATENCY CUT</span>
                        </div>
                        <div className="h-sep">/</div>
                        <div className="h-metric">
                            <span className="h-val chromatic-bold">10,000+</span>
                            <span className="h-lbl">DAILY EVENTS STREAMED</span>
                        </div>
                    </div>

                    <div className="hero-actions-row">
                        <a href="#dossier-projects" className="retro-prime-btn font-mono">
                            <span>EXPLORE DOSSIER DECK ↓</span>
                        </a>
                        <a href="#pipeline" className="retro-subtle-btn font-mono">
                            <span>CIRCUIT PIPELINE ➔</span>
                        </a>
                        <a href="/Aakarshak_Swaraj_Resume.pdf" download="Aakarshak_Swaraj_Resume.pdf" className="retro-ghost-btn font-mono">
                            <span>RESUME [PDF] ↗</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Kinetic Typography Tape */}
            <div className="hero-kinetic-tape">
                <KineticBanner speed={30} />
            </div>
        </section>
    );
}
