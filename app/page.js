'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import TopBar from '@/components/TopBar';
import HomeSection from '@/components/HomeSection';
import HorizontalPipeline from '@/components/HorizontalPipeline';
import TactileDossierDeck from '@/components/TactileDossierDeck';
import ProjectHorizontalReel from '@/components/ProjectHorizontalReel';
import AsciiLandscapeTransition from '@/components/AsciiLandscapeTransition';
import ScrollLinkedAscii from '@/components/ScrollLinkedAscii';
import OffTheScreenSection from '@/components/OffTheScreenSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import SearchOverlay from '@/components/SearchOverlay';
import ModeToggle from '@/components/ModeToggle';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import EasterEgg from '@/components/EasterEgg';
import ScrollProgress from '@/components/ScrollProgress';
import Footer from '@/components/Footer';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMonoMode, setIsMonoMode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2300);
        return () => clearTimeout(timer);
    }, []);

    // Listen for Ctrl+K / Cmd+K to open search overlay
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const bodyClass = `${isDarkMode ? 'dark-mode' : ''} ${isMonoMode ? 'monospace-mode' : ''}`.trim();

    useEffect(() => {
        document.body.className = bodyClass;
    }, [bodyClass]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" onSkip={() => setIsLoading(false)} />}
            </AnimatePresence>

            <ScrollProgress />
            <EasterEgg />

            {/* Exaggerated Minimalism Background: Clean subtle film grain, zero blurry orbs or weird grids */}
            <div className="minimal-noise" />

            {/* Subtle retro film aperture frame alignment crosshairs */}
            <div className="film-crosshair top-left">✛</div>
            <div className="film-crosshair top-right">✛</div>
            <div className="film-crosshair bottom-left">✛</div>
            <div className="film-crosshair bottom-right">✛</div>

            {/* Innovative Creative Top Bar (Replacing Left Sidebar to maximize 1920x1080 canvas) */}
            <TopBar
                onToggleSearch={() => setIsSearchOpen(true)}
                onToggleTerminal={() => {
                    const fab = document.querySelector('.terminal-fab');
                    if (fab) fab.click();
                }}
            />

            {/* Scroll-Linked Ambient ASCII HUD that animates & changes across chapters */}
            <ScrollLinkedAscii />

            <div className="container widescreen-blueprint-layout">
                <main className="main-content-wide">
                    {/* Hero: Motto, Roots, Language Switcher, Kinetic Tape */}
                    <HomeSection />

                    {/* Mid-Rest Animated ASCII Transition: Moonlit Mausoleum (Taj Mahal) + Gita 5:2 */}
                    <AsciiLandscapeTransition
                        scene="taj-mahal"
                        interludeNumber="01"
                        title="MOONLIT MAUSOLEUM // AGRA"
                        verse={{
                            sanskrit: 'संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ ५.२ ॥',
                            translation: 'Both passive contemplation and active engagement lead to understanding. But between armchair theorizing and rolling up your sleeves to build, the path of action is far superior.',
                            reference: 'Bhagavad Gītā 5:2',
                            anchor: 'THE PATH OF ACTION (कर्मयोग)',
                        }}
                    />

                    {/* System A: Pinned Horizontal Circuit Track */}
                    <HorizontalPipeline />

                    {/* System B: Tactile Stacking Dossier Deck & System C: Blueprint Lens */}
                    <TactileDossierDeck />

                    {/* All Projects Horizontal Scroll Reel with GitHub Links */}
                    <ProjectHorizontalReel />

                    {/* Chapter 4: Me Off The Screen (Badminton, Swimming, Football, Chess) */}
                    <OffTheScreenSection />

                    {/* Section 8: Resume Vault */}
                    <ResumeSection />

                    {/* Direct Contact & Coordinates */}
                    <ContactSection />

                    <Footer />
                </main>
            </div>

            <InteractiveTerminal />
            <ScrollToTop />

            <AnimatePresence>
                {isSearchOpen && (
                    <SearchOverlay key="search" onClose={() => setIsSearchOpen(false)} />
                )}
            </AnimatePresence>

            <ModeToggle
                isDarkMode={isDarkMode}
                isMonoMode={isMonoMode}
                onToggleDark={() => setIsDarkMode(!isDarkMode)}
                onToggleMono={() => setIsMonoMode(!isMonoMode)}
                onToggleSearch={() => setIsSearchOpen(true)}
            />
        </>
    );
}
