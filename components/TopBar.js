'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';
import { trackEventFire } from '@/lib/telemetry';

const NAV_ITEMS = [
    { id: 'home', label: '00 // HERO', title: 'Hero & Mission' },
    { id: 'pipeline', label: '01 // PIPELINE', title: 'Grounded Roadmap' },
    { id: 'dossier-projects', label: '02 // DOSSIER', title: 'Engineering Deck' },
    { id: 'all-projects-reel', label: '03 // REEL', title: 'All 20 Projects' },
    { id: 'off-screen', label: '04 // OFF SCREEN', title: 'Athletics & Physical' },
    { id: 'resume', label: '05 // RESUME', title: 'Verified LaTeX CV' },
    { id: 'contact', label: '06 // CONTACT', title: 'Direct Dispatch' },
];

export default function TopBar({ onToggleSearch, onToggleTerminal }) {
    const [activeSection, setActiveSection] = useState('home');
    const [scrollPercent, setScrollPercent] = useState(0);
    const [timecode, setTimecode] = useState('00:00:00:00');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Track scroll position & active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.pageYOffset;
            const pct = scrollTotal > 0 ? Math.min(100, Math.round((currentScroll / scrollTotal) * 100)) : 0;
            setScrollPercent(pct);

            const sections = document.querySelectorAll('section');
            let current = 'home';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 160;
                if (currentScroll >= sectionTop) {
                    current = section.getAttribute('id') || current;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Rolling retro film timecode
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            const secs = String(now.getSeconds()).padStart(2, '0');
            const frames = String(Math.floor((now.getMilliseconds() / 1000) * 28)).padStart(2, '0');
            setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Generate ASCII mini progress bar
    const totalBars = 10;
    const filledBars = Math.round((scrollPercent / 100) * totalBars);
    const asciiBar = '█'.repeat(filledBars) + '░'.repeat(Math.max(0, totalBars - filledBars));

    return (
        <header className="retro-topbar font-mono">
            {/* Top Film Aperture Strip */}
            <div className="topbar-film-ribbon">
                <div className="ribbon-left">
                    <span className="badge-film">PORTFOLIO DISPATCH</span>
                    <span className="badge-film hide-on-mobile">35mm ANALOG // 28 FPS</span>
                    <span className="badge-film hide-on-mobile">TIMECODE: {timecode}</span>
                    <span className="badge-film">SYS_MONITOR: ONLINE</span>
                </div>

                <div className="ribbon-center hide-on-tablet">
                    <span className="ascii-progress-meter">
                        PROG: [{asciiBar}] {scrollPercent}% // {activeSection.toUpperCase()}
                    </span>
                </div>

                <div className="ribbon-right">
                    <span className="badge-film">VIT CHENNAI ➔ BENGALURU</span>
                    <a
                        href="/Aakarshak_Swaraj_Resume.pdf"
                        download="Aakarshak_Swaraj_Resume.pdf"
                        className="badge-film cv-quick-btn"
                        onClick={() => trackEventFire('topbar_resume_click')}
                    >
                        CV.PDF ↓
                    </a>
                </div>
            </div>

            {/* Main Creative Navigation Row */}
            <div className="topbar-nav-row">
                {/* Brand / Name */}
                <div className="topbar-brand">
                    <a href="#home" className="brand-anchor">
                        <span className="brand-name chromatic-bold">AAKARSHAK SWARAJ</span>
                        <span className="brand-tagline font-mono">[AIML & SYSTEMS]</span>
                    </a>
                </div>

                {/* Desktop Nav Items */}
                <nav className="topbar-nav-center hide-on-mobile" aria-label="Main Navigation">
                    <ul className="topbar-nav-list">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id} className="topbar-nav-item">
                                    <MagneticWrapper strength={0.2}>
                                        <a
                                            href={`#${item.id}`}
                                            className={`topbar-nav-link ${isActive ? 'active' : ''}`}
                                            title={item.title}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="topbarNavPill"
                                                    className="topbar-active-pill"
                                                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                                />
                                            )}
                                            <span className="link-text">{item.label}</span>
                                        </a>
                                    </MagneticWrapper>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Right Action Icons & Mobile Toggle */}
                <div className="topbar-actions">
                    {onToggleSearch && (
                        <button
                            type="button"
                            onClick={onToggleSearch}
                            className="topbar-icon-btn font-mono"
                            title="Quick Search (⌘K / Ctrl+K)"
                            aria-label="Open Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                            <span className="key-shortcut hide-on-mobile">⌘K</span>
                        </button>
                    )}

                    {onToggleTerminal && (
                        <button
                            type="button"
                            onClick={onToggleTerminal}
                            className="topbar-icon-btn terminal-btn font-mono"
                            title="Open Interactive Terminal"
                            aria-label="Open Terminal"
                        >
                            <span>&gt;_</span>
                        </button>
                    )}

                    {/* Mobile Hamburger Toggle */}
                    <button
                        type="button"
                        className="mobile-menu-toggle show-on-mobile"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Mobile Navigation"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-dropdown-nav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ul className="mobile-nav-list font-mono">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="mobile-nav-num">{item.label}</span>
                                        <span className="mobile-nav-desc">{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
