'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Scroll-Linked ASCII scenes inspired by https://www.ascii-magic.com/ascii
const SCROLL_SCENES = {
    home: {
        id: 'home',
        category: 'SOLIDS // 3D TORUS',
        title: 'HERO // 3D WIREFRAME TORUS',
        render: (t) => {
            const rot = (t * 0.1) % (2 * Math.PI);
            const chars = ['.', ':', '-', '=', '+', '*', '#', '%', '@'];
            const c1 = chars[Math.floor(t * 0.5) % chars.length];
            const c2 = chars[(Math.floor(t * 0.5) + 3) % chars.length];
            return [
                '   . : + - = * # @ # * = - + : .   ',
                ` :   /                     \\   : `,
                `-   |      ${c1} (3D TORUS) ${c2}     |   -`,
                `=  (       ROT: ${(rot * 57.3).toFixed(0)}°        )  =`,
                `-   |                       |   -`,
                ` :   \\                     /   : `,
                '   . : + - = * # @ # * = - + : .   ',
            ].join('\n');
        },
    },
    pipeline: {
        id: 'pipeline',
        category: 'ALGORITHMS // CIRCUIT',
        title: 'PIPELINE // DATA TRACER',
        render: (t) => {
            const pos = Math.floor((t * 2) % 24);
            const beam = '═'.repeat(pos) + '●' + '═'.repeat(Math.max(0, 24 - pos));
            return [
                '┌───[ 2020 ➔ 2027 CIRCUIT ]───┐',
                `│ ${beam}► │`,
                '│  [10th]   [12th]   [B.TECH] │',
                '│  94.8%    89.6%    8.62CGPA │',
                '│   SARALA   DPS     VIT_AIML │',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
    'dossier-projects': {
        id: 'dossier-projects',
        category: 'LIVE DATA // PROBABILITY',
        title: 'DOSSIER // MONTE CARLO & RAM',
        render: (t) => {
            const phase = Math.floor(t) % 6;
            const bar = '█'.repeat(phase + 2) + '░'.repeat(7 - phase);
            return [
                '┌───[ 20k MONTE CARLO & RAM ]─┐',
                `│ ARG: [${bar}] 18.4% │`,
                '│ C# BepInEx RAM: [X: 36.24]  │',
                '│ LATENCY: 0 FRAMES (DIRECT)  │',
                '│ PLATT CALIBRATED : OK       │',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
    'ascii-visualizer': {
        id: 'ascii-visualizer',
        category: 'STUDIO // ASCII MAGIC',
        title: 'STUDIO // 6 GENERATIVE MODES',
        render: (t) => {
            const sweep = ['|', '/', '—', '\\'][Math.floor((t * 0.5) % 4)];
            return [
                '┌───[ ASCII-MAGIC STUDIO ]────┐',
                `│ RADAR SWEEP: [ ${sweep} ] 28 FPS  │`,
                '│ MODE: CRT TERMINAL ACTIVE   │',
                '│ SOURCE: ascii-magic.com     │',
                '│ CATEGORIES: 6 ENG PIECES    │',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
    translator: {
        id: 'translator',
        category: 'LETTERING // SPLIT-FLAP',
        title: 'TRANSLATOR // DUAL CASSETTE',
        render: (t) => {
            const flip = ['TAPE_A', 'TAPE_B', 'REEL_01', 'REEL_02'][Math.floor((t * 0.3) % 4)];
            return [
                '┌───[ AUDIO CASSETTE DECK ]───┐',
                `│ [O] ═══ ${flip} ═══ [O]  │`,
                '│ RESUME JARGON VS REAL TALK  │',
                '│ PLAYBACK: SIDE-BY-SIDE      │',
                '│ AUDITED CODE IN REPOS       │',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
    'off-screen': {
        id: 'off-screen',
        category: 'PHYSICAL // HYPERLOOP',
        title: 'OFF-SCREEN // GHC 2nd PLACE',
        render: (t) => {
            const pos = Math.floor((t * 1.5) % 12);
            const tube = '─'.repeat(pos) + '[POD]' + '─'.repeat(Math.max(0, 12 - pos));
            return [
                '┌───[ DROMOS HYPERLOOP ]──────┐',
                `│ ══${tube}══ │`,
                '│ AIR GAP SENSORS: ±0.1mm     │',
                '│ GHC 2nd PLACE NATIONALLY    │',
                '│ BADMINTON • SWIMMING • CHESS│',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
    resume: {
        id: 'resume',
        category: 'VAULT // ATS LATEX',
        title: 'RESUME // 1-PAGE LATEX',
        render: () => [
            '┌───[ VERIFIED RESUME VAULT ]─┐',
            '│ FORMAT: 1-PAGE DENSE LATEX  │',
            '│ ATS SCORE: 100% PARSED      │',
            '│ SIZE: 121 KB (PDF READY)    │',
            '│ OCT 2026 AUDITED METRICS    │',
            '└─────────────────────────────┘',
        ].join('\n'),
    },
    contact: {
        id: 'contact',
        category: 'DISPATCH // P2P SIGNAL',
        title: 'CONTACT // aakarshak.work',
        render: (t) => {
            const dot = t % 2 === 0 ? '●' : '○';
            return [
                '┌───[ DIRECT DISPATCH ]───────┐',
                `│ STATUS: ${dot} READY FOR ROLES  │`,
                '│ aakarshak.work@gmail.com    │',
                '│ CHENNAI ➔ BENGALURU, INDIA  │',
                '│ 1-CLICK COPY AVAILABLE      │',
                '└─────────────────────────────┘',
            ].join('\n');
        },
    },
};

export default function ScrollLinkedAscii() {
    const [currentSection, setCurrentSection] = useState('home');
    const [tick, setTick] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    // Track active section as user scrolls
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.pageYOffset + 240;
            const sections = ['home', 'pipeline', 'dossier-projects', 'ascii-visualizer', 'translator', 'off-screen', 'resume', 'contact'];
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPos) {
                    setCurrentSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Frame ticker for ASCII animation
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => (prev + 1) % 1000);
        }, 90);
        return () => clearInterval(interval);
    }, []);

    const activeScene = SCROLL_SCENES[currentSection] || SCROLL_SCENES.home;
    const asciiArt = activeScene.render(tick);

    return (
        <aside className="scroll-linked-ascii-hud font-mono" aria-label="Scroll-Linked ASCII HUD">
            <div className="hud-header">
                <div className="hud-title-group">
                    <span className="hud-category">{activeScene.category}</span>
                </div>
                <div className="hud-controls">
                    <a href="#ascii-visualizer" className="hud-studio-btn" title="Jump to Full ASCII Studio">
                        STUDIO ↗
                    </a>
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hud-toggle-btn"
                        title={isExpanded ? 'Minimize HUD' : 'Expand HUD'}
                    >
                        {isExpanded ? '–' : '+'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="hud-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="hud-section-label">
                            <span className="label-prefix">VIEWPORT:</span>
                            <span className="label-target chromatic-bold">{activeScene.title}</span>
                        </div>
                        <pre className="hud-ascii-canvas">
                            {asciiArt}
                        </pre>
                        <div className="hud-footer">
                            <span>SCROLL REACTIVE</span>
                            <span>•</span>
                            <span>ASCII-MAGIC.COM</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
