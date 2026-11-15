'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MILESTONES = [
    {
        id: '10th',
        station: '01',
        year: '2020',
        title: '10th CBSE Board',
        institution: 'Sarala Birla Public School, Ranchi',
        location: 'Ranchi, Jharkhand, India',
        metricValue: '94.8%',
        metricLabel: 'AGGREGATE',
        meta: '[RANK: TOP 1% • 100/100 MATHS]',
        tag: 'ACADEMIC // FOUNDATION',
        phase: 'FOUNDATION',
        narrative: 'Foundation in Mathematics, Natural Sciences, and algorithmic problem-solving. Graduated among the top 1% nationally with a perfect 100/100 in Mathematics.',
        competencies: ['Pure Mathematics (100/100)', 'Natural Sciences', 'Algorithmic Problem-Solving', 'Euclidean Geometry'],
        audit: 'CBSE Official Board Verification • All India Top 1%',
    },
    {
        id: '12th',
        station: '02',
        year: '2022',
        title: '12th CBSE Senior Secondary',
        institution: 'Delhi Public School (DPS), Ranchi',
        location: 'Ranchi, Jharkhand, India',
        metricValue: '89.6%',
        metricLabel: 'AGGREGATE',
        meta: '[ALL INDIA SENIOR CERTIFICATE]',
        tag: 'ACADEMIC // PRE-ENGINEERING',
        phase: 'PRE-ENGINEERING',
        narrative: 'PCM Stream (Physics, Chemistry, Advanced Mathematics, Computer Science). Rigorous pre-engineering foundation in object-oriented programming, calculus, and classical mechanics.',
        competencies: ['Advanced Calculus', 'Classical Mechanics', 'Computer Science (C++/Python)', 'Linear Algebra'],
        audit: 'AISSCE Senior Certificate • Roll Verified',
    },
    {
        id: 'btech',
        station: '03',
        year: '2023 – 2027',
        title: 'B.Tech CSE with AIML Specialization',
        institution: 'Vellore Institute of Technology, Chennai',
        location: 'Chennai, Tamil Nadu (Campus)',
        metricValue: '8.62',
        metricLabel: 'CGPA (AIML)',
        meta: '[6 SEMS ACTIVE • 8.62 CGPA • TOP TIER]',
        tag: 'UNDERGRADUATE // CURRENT',
        phase: 'CURRENT // DEGREE',
        narrative: 'Specializing in Artificial Intelligence and Machine Learning. Advanced coursework and rigorous project architectures across Data Structures, Operating Systems, Computer Architecture, and Deep Learning.',
        competencies: ['Deep Learning', 'Operating Systems', 'Data Structures & Algorithms', 'Machine Learning', 'Computer Architecture'],
        audit: 'VIT Chennai University Transcript • NAAC A++ Audited',
    },
    {
        id: 'qcecuring',
        station: '04',
        year: 'OCT – DEC 2025',
        title: 'SDE Intern — PKI & Security Systems',
        institution: 'Qcecuring Technologies, Delhi',
        location: 'New Delhi, India',
        metricValue: '60%',
        metricLabel: 'LATENCY CUT',
        meta: '[50+ ENTERPRISE ASSETS • ZERO BREACHES]',
        tag: 'PRODUCTION // CRYPTOGRAPHY',
        phase: 'ENTERPRISE PRODUCTION',
        narrative: 'Architected quorum-based multi-signatory authorization gateway with client-side SHA-256 binary hashing, zero key-exposure incidents, and immutable audit logs. Reduced code-signing turnaround by 60%.',
        competencies: ['PKI & X.509 Certification', 'Multi-Signatory Quorum', 'SHA-256 Client Hashing', 'Immutable Audit Trails', 'Air-Gapped Vault Security'],
        audit: 'Qcecuring Engineering Certificate & Production Verification',
    },
    {
        id: 'taslasoft',
        station: '05',
        year: 'FEB – SEP 2026',
        title: 'AIML & SDE Intern — Civic NLP Pipeline',
        institution: 'Taslasoft, Hyderabad',
        location: 'HITEC City, Hyderabad, India',
        metricValue: '95%',
        metricLabel: 'PRECISION',
        meta: '[200+ FLAGGED CRITICALS • SUB-SEC LATENCY]',
        tag: 'PRODUCTION // DISTRIBUTED ML',
        phase: 'PRODUCTION ML',
        narrative: 'Engineered real-time civic intelligence pipeline ingesting 10,000+ posts/day across 15+ subreddits. 3-stage cascaded NLP filtering with PII sanitization and sub-second classification for critical emergency dispatch.',
        competencies: ['10k+ Posts/Day Streaming', '3-Stage Cascaded NLP', 'Automated PII Scrubbing (Aadhaar/Phone)', 'Sub-Second Inference', 'Emergency Incident Triage'],
        audit: 'Taslasoft Letter of Recommendation & Live Production Telemetry',
    },
];

export default function HorizontalPipeline() {
    const [activeIdx, setActiveIdx] = useState(2); // Default to B.Tech (Current)
    const active = MILESTONES[activeIdx];

    const handlePrev = () => {
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
    };

    const handleNext = () => {
        setActiveIdx((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
    };

    return (
        <section className="pipeline-section" id="pipeline">
            {/* Top Film Badge Strip */}
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 01 // CIRCUIT TRACK</span>
                <span className="badge-film">EDUCATION & PRODUCTION ROADMAP</span>
                <span className="badge-film">2020 ➔ 2027</span>
            </div>

            {/* Section Header */}
            <div className="pipeline-header">
                <h2 className="pipeline-title chromatic-bold">
                    The Grounded Engineering Pipeline
                </h2>
                <p className="pipeline-subtitle font-mono">
                    The life trajectory goes on like...
                </p>
            </div>

            {/* Interactive Timeline Stepper Bus */}
            <div className="pipeline-stepper-container font-mono">
                <div className="stepper-rail-backbone" />
                <div
                    className="stepper-rail-fill"
                    style={{ width: `${(activeIdx / (MILESTONES.length - 1)) * 100}%` }}
                />

                <div className="stepper-stations-row">
                    {MILESTONES.map((m, idx) => {
                        const isSelected = activeIdx === idx;
                        const isPast = idx <= activeIdx;

                        return (
                            <button
                                key={m.id}
                                type="button"
                                className={`stepper-station-btn ${isSelected ? 'active' : ''} ${isPast ? 'reached' : ''}`}
                                onClick={() => setActiveIdx(idx)}
                                aria-label={`Select station ${m.station}: ${m.title}`}
                            >
                                <span className="station-node-dot">
                                    <span className="station-dot-core" />
                                    {isSelected && <span className="station-dot-glow" />}
                                </span>
                                <span className="station-id">STN_{m.station}</span>
                                <span className="station-year">{m.year}</span>
                                <span className="station-label hide-on-mobile">{m.phase}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Featured Active Station Deep-Dive Console */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active.id}
                    className="pipeline-station-console"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Console Header Bar */}
                    <div className="console-header-bar font-mono">
                        <div className="console-header-left">
                            <span className="console-station-badge">STATION // {active.station} OF 05</span>
                            <span className="console-tag-badge">{active.tag}</span>
                        </div>
                        <div className="console-header-right">
                            <span className="console-year-badge">{active.year}</span>
                            <span className="console-audit-badge hide-on-mobile">{active.audit}</span>
                        </div>
                    </div>

                    {/* Console Main Content Split */}
                    <div className="console-body-split">
                        {/* Left Column: Telemetry & KPI Pillar */}
                        <div className="console-telemetry-col font-mono">
                            <div className="telemetry-kpi-box">
                                <span className="kpi-label">{active.metricLabel}</span>
                                <div className="kpi-value chromatic-bold">{active.metricValue}</div>
                                <div className="kpi-meta-badge">{active.meta}</div>
                            </div>

                            <div className="telemetry-coords-box">
                                <div className="coords-item">
                                    <span className="coords-lbl">LOCATION:</span>
                                    <span className="coords-val">{active.location}</span>
                                </div>
                                <div className="coords-item">
                                    <span className="coords-lbl">STATION ID:</span>
                                    <span className="coords-val">SYS_NODE_0{active.station}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Academic / Production Substance */}
                        <div className="console-narrative-col">
                            <h3 className="console-title chromatic-text">{active.title}</h3>
                            <div className="console-institution font-mono">{active.institution}</div>

                            <p className="console-narrative-text">
                                {active.narrative}
                            </p>

                            <div className="console-competencies-block">
                                <span className="comp-label font-mono">CORE CURRICULUM & SYSTEM COMPETENCIES:</span>
                                <div className="comp-pills-row font-mono">
                                    {active.competencies.map((comp, cIdx) => (
                                        <span key={cIdx} className="comp-pill">
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Console Stepper Controls */}
                    <div className="console-footer-controls font-mono">
                        <button
                            type="button"
                            className="console-nav-btn"
                            onClick={handlePrev}
                            aria-label="Previous milestone"
                        >
                            <span>← PREVIOUS STATION</span>
                        </button>

                        <div className="console-pips-tracker">
                            {MILESTONES.map((m, pIdx) => (
                                <button
                                    key={pIdx}
                                    type="button"
                                    className={`pip-dot ${activeIdx === pIdx ? 'active' : ''}`}
                                    onClick={() => setActiveIdx(pIdx)}
                                    aria-label={`Jump to station ${pIdx + 1}: ${m.title}`}
                                    title={`Station ${m.station}: ${m.year} • ${m.phase}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            className="console-nav-btn"
                            onClick={handleNext}
                            aria-label="Next milestone"
                        >
                            <span>NEXT STATION →</span>
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
