'use client';

import { motion, AnimatePresence } from 'framer-motion';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);

export default function ModeToggle({ isDarkMode, isMonoMode, onToggleDark, onToggleMono, onToggleSearch }) {
    return (
        <motion.div
            className="mode-toggle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.button
                className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
                id="darkModeToggle"
                onClick={onToggleDark}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isDarkMode ? (
                        <motion.span
                            key="sun"
                            initial={{ rotate: -90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 90, scale: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: 'flex' }}
                        >
                            <SunIcon />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="moon"
                            initial={{ rotate: 90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: -90, scale: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: 'flex' }}
                        >
                            <MoonIcon />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
            <motion.button
                className={`toggle-btn ${isMonoMode ? 'active' : ''}`}
                id="monoModeToggle"
                onClick={onToggleMono}
                title="Toggle Monospace Font"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <CodeIcon />
            </motion.button>
            <motion.button
                className="toggle-btn"
                id="searchToggle"
                onClick={onToggleSearch}
                title="Search"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <SearchIcon />
            </motion.button>
        </motion.div>
    );
}
