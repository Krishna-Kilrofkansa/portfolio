'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VisualArchitectureGraph from './VisualArchitectureGraph';
import MathFormula from './MathFormula';

/**
 * ProjectDeepDiveModal
 * Interactive overlay modal providing an uncompromised two-tier engineering deep dive:
 * Tier 1: The Inspiration & Problem Scope (humane plain-English explanation + key telemetry).
 * Tier 2: Interactive visual graph-based architecture diagram, low-level data contracts,
 *         mathematical formulas, real failure post-mortems, and production code snippets.
 * 
 * Portaled directly to document.body to prevent any parent stacking context or overflow clipping.
 */
export default function ProjectDeepDiveModal({ project, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'blueprint' | 'postmortem' | 'gallery'
    const [mounted, setMounted] = useState(false);
    const contentBodyRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset active tab to architecture when opening a new project
    useEffect(() => {
        if (isOpen) {
            setActiveTab('architecture');
        }
    }, [isOpen, project?.id]);

    // Reset scroll to top whenever switching tabs for pristine reading experience
    useEffect(() => {
        if (contentBodyRef.current) {
            contentBodyRef.current.scrollTop = 0;
        }
    }, [activeTab]);

    // Close on Escape key press and manage body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen || !project) return null;

    const modalContent = (
        <AnimatePresence>
            <div className="deepdive-backdrop" onClick={onClose}>
                <motion.div
                    className="deepdive-modal-wrapper"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.97, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 16 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Top Analog Film Strip Header - STICKY */}
                    <div className="deepdive-modal-header font-mono">
                        <div className="modal-header-left">
                            <span className="badge-film">ANATOMY // {project.chapter || 'SYSTEM'}</span>
                            <span className="badge-film hide-on-mobile">{project.title}</span>
                            <span className="badge-film highlight">{project.badge || 'PRODUCTION VERIFIED'}</span>
                        </div>

                        <div className="modal-header-right">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-action-btn font-mono"
                                >
                                    GITHUB ↗
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-action-btn font-mono highlight"
                                >
                                    LIVE DEMO ↗
                                </a>
                            )}
                            <button
                                type="button"
                                className="modal-close-btn font-mono"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                [ ESC / ✕ ]
                            </button>
                        </div>
                    </div>

                    {/* Modal Tab Controls - STICKY RIGHT BELOW HEADER */}
                    <div className="deepdive-tab-bar font-mono">
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                            onClick={() => setActiveTab('architecture')}
                        >
                            <span className="tab-indicator" />
                            <span>01 // THE INSPIRATION & ARCHITECTURE GRAPH</span>
                        </button>
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blueprint')}
                        >
                            <span className="tab-indicator" />
                            <span>02 // BLUEPRINT & MATHEMATICS</span>
                        </button>
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'postmortem' ? 'active' : ''}`}
                            onClick={() => setActiveTab('postmortem')}
                        >
                            <span className="tab-indicator" />
                            <span>03 // FAILURE POST-MORTEM & FIXES</span>
                        </button>
                        {project.images && project.images.length > 0 && (
                            <button
                                type="button"
                                className={`dd-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                                onClick={() => setActiveTab('gallery')}
                            >
                                <span className="tab-indicator" />
                                <span>04 // SCREENSHOTS & ASSETS ({project.images.length})</span>
                            </button>
                        )}
                    </div>

                    {/* Tab Body Content - SCROLLABLE WITH CUSTOM OBSIDIAN/AMBER SCROLLBAR */}
                    <div className="deepdive-content-body" ref={contentBodyRef}>
                        {/* TAB 1: INSPIRATION + VISUAL ARCHITECTURE GRAPH */}
                        {activeTab === 'architecture' && (
                            <div className="tab-pane-fade">
                                {/* The Inspiration & Humane Story Box */}
                                <div className="deepdive-hero-summary">
                                    <div className="humane-story-box">
                                        <div className="story-pill font-mono">
                                            <span className="story-dot" />
                                            <span>THE INSPIRATION</span>
                                        </div>
                                        <h2 className="deepdive-main-title chromatic-bold">{project.title}</h2>
                                        <p className="humane-story-text">{project.humaneStory}</p>
                                    </div>

                                    {/* Quick Metrics Bar */}
                                    {project.metrics && project.metrics.length > 0 && (
                                        <div className="deepdive-metrics-strip font-mono">
                                            {project.metrics.map((m, idx) => (
                                                <div key={idx} className="deep-metric-item">
                                                    <span className="dm-val chromatic-bold">{m.val}</span>
                                                    <span className="dm-lbl">{m.lbl}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Graph Pipeline Section */}
                                <div className="arch-section-wrapper">
                                    <div className="arch-pane-intro font-mono">
                                        <span className="intro-badge">SYSTEM ANATOMY</span>
                                        <span className="intro-note">
                                            GRAPH-BASED DATA FLOW PIPELINE — FROM INGESTION TO FINAL VERIFICATION
                                        </span>
                                    </div>

                                    <VisualArchitectureGraph
                                        stages={project.architectureStages || []}
                                        title={`${project.title} — Pipeline Flow`}
                                    />

                                    {project.dataContracts && (
                                        <div className="data-contracts-box font-mono">
                                            <div className="dc-header font-mono">
                                                <span className="dc-dot" />
                                                <span className="dc-title">[VERIFIED DATA CONTRACTS & STATE VECTOR]</span>
                                            </div>
                                            <pre className="dc-pre">{project.dataContracts}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB 2: BLUEPRINT & MATH */}
                        {activeTab === 'blueprint' && (
                            <div className="tab-pane-fade blueprint-pane">
                                <div className="blueprint-section">
                                    <div className="bp-header-row font-mono">
                                        <span className="bp-dot" />
                                        <h4 className="bp-heading">[01] MATHEMATICAL FORMULATION & ALGORITHMS</h4>
                                    </div>
                                    {project.mathFormula ? (
                                        <MathFormula
                                            formula={project.mathFormula}
                                            label={project.mathLabel || `${project.title} — Governing Equation`}
                                            id={project.id}
                                        />
                                    ) : (
                                        <div className="bp-math-box font-mono">
                                            <p className="text-muted">Standard algorithmic optimization pipeline.</p>
                                        </div>
                                    )}
                                    <p className="bp-explanation">{project.mathExplanation}</p>
                                </div>

                                <div className="blueprint-section">
                                    <div className="bp-header-row font-mono">
                                        <span className="bp-dot" />
                                        <h4 className="bp-heading">[02] LOW-LEVEL IMPLEMENTATION DETAILS</h4>
                                    </div>
                                    <ul className="bp-list">
                                        {project.technicalBulletPoints?.map((item, idx) => (
                                            <li key={idx} className="bp-list-item">
                                                <span className="bp-bullet font-mono">0{idx + 1}.</span>
                                                <div className="bp-item-content">
                                                    <strong className="bp-item-title font-mono">{item.title}:</strong>{' '}
                                                    <span className="bp-item-desc">{item.detail}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {project.codeSnippet && (
                                    <div className="blueprint-section">
                                        <div className="bp-header-row font-mono">
                                            <span className="bp-dot" />
                                            <h4 className="bp-heading">[03] REAL REPOSITORY CODE EXCERPT</h4>
                                        </div>
                                        <pre className="code-snippet-box font-mono text-xs">
                                            <code>{project.codeSnippet}</code>
                                        </pre>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB 3: FAILURE POST-MORTEM */}
                        {activeTab === 'postmortem' && (
                            <div className="tab-pane-fade postmortem-pane">
                                <div className="pm-alert-banner font-mono">
                                    <span className="pm-icon">⚡</span>
                                    <span>REAL ENGINEERING LESSONS — WHAT BROKE UNDER STRESS & HOW I FIXED IT</span>
                                </div>

                                <div className="pm-detailed-grid">
                                    <div className="pm-detail-card failure">
                                        <div className="pm-card-top font-mono">
                                            <span className="pm-card-tag">[SYMPTOM & FAILURE MODE]</span>
                                        </div>
                                        <p className="pm-card-body">{project.postMortem?.whatBroke}</p>
                                    </div>

                                    <div className="pm-detail-card rootcause">
                                        <div className="pm-card-top font-mono">
                                            <span className="pm-card-tag">[ROOT CAUSE ANALYSIS]</span>
                                        </div>
                                        <p className="pm-card-body">{project.postMortem?.rootCause}</p>
                                    </div>

                                    <div className="pm-detail-card fix">
                                        <div className="pm-card-top font-mono">
                                            <span className="pm-card-tag">[WHAT I ACTUALLY CHANGED TO FIX IT]</span>
                                        </div>
                                        <div className="pm-fix-steps font-mono text-xs">
                                            {project.postMortem?.fixes?.map((fix, idx) => (
                                                <div key={idx} className="fix-step-row">
                                                    <span className="step-num font-mono">0{idx + 1}.</span>
                                                    <span className="step-body">
                                                        <strong className="fix-title">{fix.title}:</strong> {fix.desc}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pm-takeaway-footer font-mono">
                                    <span className="footer-label">ENGINEERING TAKEAWAY:</span>
                                    <p className="footer-quote">&ldquo;{project.takeaway}&rdquo;</p>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: SCREENSHOTS & RUNNING ASSETS */}
                        {activeTab === 'gallery' && project.images && (
                            <div className="tab-pane-fade gallery-pane">
                                <div className="gallery-grid">
                                    {project.images.map((img, idx) => (
                                        <div key={idx} className="gallery-item-card">
                                            <div className="gallery-img-wrapper">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={img.src}
                                                    alt={img.caption || 'Project visual'}
                                                    className="gallery-img"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="gallery-caption font-mono">
                                                <span className="cap-idx">[FIG 0{idx + 1}]</span>
                                                <span className="cap-text">{img.caption}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Status Ribbon - STICKY */}
                    <div className="deepdive-footer-ribbon font-mono">
                        <div className="ribbon-left">
                            <span className="ribbon-item">VERIFIED FROM REPOSITORY SOURCE CODE</span>
                            <span className="ribbon-sep">•</span>
                            <span className="ribbon-item">STACK: {project.techStack?.join(', ')}</span>
                        </div>
                        <div className="ribbon-right">
                            <span className="ribbon-item highlight">PRESS ESC OR CLICK ✕ TO RETURN TO DOSSIER</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
