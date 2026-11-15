'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const searchData = [
    { title: 'FIFA 2026 Forecasting Engine', content: '20,000 Monte Carlo runs, Platt calibration, zero temporal leakage', section: 'dossier-projects' },
    { title: 'Hollow Knight RL Agent', content: 'C# BepInEx memory hook, 23-D tactical radar vector, 0 frame latency', section: 'dossier-projects' },
    { title: 'Two-Stage Placement Outreach', content: 'RFC-822 batch queue, randomized jitter, conversational follow-up protocol', section: 'dossier-projects' },
    { title: 'TSlate Offline Voice Translator', content: '100% offline Whisper.cpp + NLLB-200 600M INT8 on Android hardware', section: 'dossier-projects' },
    { title: 'Taslasoft AIML Internship', content: '10,000+ daily posts analyzed, 3-tier NLP pipeline, 95% precision', section: 'pipeline' },
    { title: 'Qcecuring Security Internship', content: 'Enterprise PKI code signing, quorum digital approval, -60% latency', section: 'pipeline' },
    { title: 'Team Dromos Hyperloop', content: '2nd Place Global Hyperloop Competition, levitation telemetry & low-pass filter', section: 'off-screen' },
    { title: 'VARUNA Disaster Incident Triage', content: 'SIH 2025 51st Nationally, asymmetric cost-sensitive loss, 98.4% recall', section: 'dossier-projects' },
    { title: 'B.Tech CSE-AIML Education', content: 'VIT Chennai (8.62 CGPA), Sarala Birla (94.8%), DPS Ranchi (89.6%)', section: 'pipeline' },
    { title: 'Verified Resume PDF', content: '1-Page dense LaTeX format, ATS 100% compliant, audited October 2026', section: 'resume' },
    { title: 'Direct Contact & Coordinates', content: 'aakarshak.work@gmail.com, Chennai (VIT Campus) to Bengaluru', section: 'contact' },
];

export default function SearchOverlay({ onClose }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const results = query.length >= 2
        ? searchData.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const navigateToSection = (sectionId) => {
        onClose();
        setQuery('');
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('search-backdrop')) {
            onClose();
            setQuery('');
        }
    };

    return (
        <motion.div
            className="search-overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="search-backdrop" />
            <motion.div
                className="search-container font-mono"
                initial={{ opacity: 0, scale: 0.96, y: -16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.25 }}
            >
                <div className="search-input-wrapper">
                    <span className="search-prompt">&gt;</span>
                    <input
                        type="text"
                        id="searchInput"
                        ref={inputRef}
                        placeholder="Search projects, telemetry, systems, research..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        className="close-search"
                        onClick={() => { onClose(); setQuery(''); }}
                        aria-label="Close search"
                    >
                        <XIcon />
                    </button>
                </div>

                <div className="search-results">
                    {query.length >= 2 && results.length === 0 && (
                        <div className="search-no-results">
                            NO MATCHES FOR &ldquo;{query}&rdquo;
                        </div>
                    )}
                    {results.map((result, index) => (
                        <div
                            className="search-result-item"
                            key={index}
                            onClick={() => navigateToSection(result.section)}
                        >
                            <div className="result-header">
                                <span className="result-title chromatic-subtle">{result.title}</span>
                                <span className="result-section">[{result.section}]</span>
                            </div>
                            <p className="result-desc">{result.content}</p>
                        </div>
                    ))}
                    {query.length < 2 && (
                        <div className="search-suggestions">
                            <span className="sug-label">POPULAR QUERIES:</span>
                            <span className="sug-pill" onClick={() => setQuery('fifa')}>fifa</span>
                            <span className="sug-pill" onClick={() => setQuery('hollow knight')}>hollow knight</span>
                            <span className="sug-pill" onClick={() => setQuery('outreach')}>outreach</span>
                            <span className="sug-pill" onClick={() => setQuery('tslate')}>tslate</span>
                            <span className="sug-pill" onClick={() => setQuery('internship')}>internship</span>
                        </div>
                    )}
                </div>

                <div className="search-footer font-mono">
                    <span>PRESS ESC TO CLOSE</span>
                    <span>•</span>
                    <span>DIRECT DISPATCH INDEX</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
