'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar';
import HomeSection from '@/components/HomeSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import SkillsSection from '@/components/SkillsSection';
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
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const bodyClass = `${isDarkMode ? 'dark-mode' : ''} ${isMonoMode ? 'monospace-mode' : ''}`.trim();

    useEffect(() => {
        document.body.className = bodyClass;
    }, [bodyClass]);

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <ScrollProgress />
            <EasterEgg />
            <div className="noise"></div>

            {/* Animated background orbs */}
            <div className="bg-orb bg-orb-1"></div>
            <div className="bg-orb bg-orb-2"></div>
            <div className="bg-orb bg-orb-3"></div>

            <div className="container">
                <Sidebar />
                <main className="main-content">
                    <HomeSection />
                    <ProjectsSection />
                    <ExperienceSection />
                    <AchievementsSection />
                    <SkillsSection />
                    <ResumeSection />
                    <ContactSection />
                    <Footer />
                </main>
            </div>
            <InteractiveTerminal />
            <ScrollToTop />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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
