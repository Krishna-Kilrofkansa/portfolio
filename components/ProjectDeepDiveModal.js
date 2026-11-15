'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VisualArchitectureGraph from './VisualArchitectureGraph';

/**
 * ProjectDeepDiveModal
 * Interactive overlay modal providing a two-tier inspection experience:
 * Tier 1: Plain English explanation for non-technical visitors.
 * Tier 2: Deep engineering anatomy, visual graph-based architecture diagram,
 *         failure post-mortem, mathematical equations, and real screenshots.
 * 
 * Portaled directly to document.body to prevent any parent stacking context or overflow clipping.
 */
export default function ProjectDeepDiveModal({ project, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'blueprint' | 'postmortem' | 'gallery'
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Top Analog Film Strip Header */}
                    <div className="deepdive-modal-header font-mono">
                        <div className="modal-header-left">
                            <span className="badge-film">ANATOMY // {project.chapter || 'SYSTEM'}</span>
                            <span className="badge-film">{project.title}</span>
                            <span className="badge-film">{project.badge || 'PRODUCTION VERIFIED'}</span>
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

                    {/* Project Title & Humane Plain-English Summary */}
                    <div className="deepdive-hero-summary">
                        <div className="humane-story-box">
                            <div className="story-pill font-mono">
                                <span className="story-dot" />
                                <span>THE HUMAN STORY (EXPLAINED SIMPLY FOR EVERYONE)</span>
                            </div>
                            <h2 className="deepdive-main-title chromatic-bold">{project.title}</h2>
                            <p className="humane-story-text">{project.humaneStory}</p>
                        </div>

                        {/* Quick Metrics Bar */}
                        {project.metrics && (
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

                    {/* Modal Tab Controls */}
                    <div className="deepdive-tab-bar font-mono">
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                            onClick={() => setActiveTab('architecture')}
                        >
                            <span>01 // VISUAL ARCHITECTURE GRAPH</span>
                        </button>
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blueprint')}
                        >
                            <span>02 // ENGINEERING BLUEPRINT & MATH</span>
                        </button>
                        <button
                            type="button"
                            className={`dd-tab-btn ${activeTab === 'postmortem' ? 'active' : ''}`}
                            onClick={() => setActiveTab('postmortem')}
                        >
                            <span>03 // FAILURE POST-MORTEM & FIXES</span>
                        </button>
                        {project.images && project.images.length > 0 && (
                            <button
                                type="button"
                                className={`dd-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                                onClick={() => setActiveTab('gallery')}
                            >
                                <span>04 // SCREENSHOTS & RUNNING ASSETS ({project.images.length})</span>
                            </button>
                        )}
                    </div>

                    {/* Tab Body Content */}
                    <div className="deepdive-content-body">
                        {/* TAB 1: VISUAL ARCHITECTURE GRAPH */}
                        {activeTab === 'architecture' && (
                            <div className="tab-pane-fade">
                                <div className="arch-pane-intro">
                                    <p className="intro-note font-mono text-xs">
                                        GRAPH-BASED DATA FLOW PIPELINE — FROM INGESTION TO FINAL VERIFICATION
                                    </p>
                                </div>
                                <VisualArchitectureGraph
                                    stages={project.architectureStages || []}
                                    title={`${project.title} — Pipeline Flow`}
                                />

                                {project.dataContracts && (
                                    <div className="data-contracts-box font-mono mt-4">
                                        <div className="dc-header chromatic-text">
                                            [VERIFIED DATA CONTRACTS & STATE VECTOR]
                                        </div>
                                        <pre className="dc-pre">{project.dataContracts}</pre>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB 2: BLUEPRINT & MATH */}
                        {activeTab === 'blueprint' && (
                            <div className="tab-pane-fade blueprint-pane">
                                <div className="blueprint-section">
                                    <h4 className="bp-heading font-mono chromatic-subtle">
                                        [01] MATHEMATICAL FORMULATION & ALGORITHMS
                                    </h4>
                                    <div className="bp-math-box font-mono">
                                        {project.mathFormula ? (
                                            <div className="math-code">{project.mathFormula}</div>
                                        ) : (
                                            <p className="text-muted">Standard algorithmic optimization pipeline.</p>
                                        )}
                                    </div>
                                    <p className="bp-explanation">{project.mathExplanation}</p>
                                </div>

                                <div className="blueprint-section mt-4">
                                    <h4 className="bp-heading font-mono chromatic-subtle">
                                        [02] LOW-LEVEL IMPLEMENTATION DETAILS
                                    </h4>
                                    <ul className="bp-list">
                                        {project.technicalBulletPoints?.map((item, idx) => (
                                            <li key={idx}>
                                                <strong>{item.title}:</strong> {item.detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {project.codeSnippet && (
                                    <div className="blueprint-section mt-4">
                                        <h4 className="bp-heading font-mono chromatic-subtle">
                                            [03] REAL REPOSITORY CODE EXCERPT
                                        </h4>
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
                                    <span className="pm-icon">⚠</span>
                                    <span>REAL ENGINEERING LESSONS — WHAT BROKE UNDER STRESS & HOW I FIXED IT</span>
                                </div>

                                <div className="pm-detailed-grid">
                                    <div className="pm-detail-card failure">
                                        <h4 className="pm-card-h font-mono">[SYMPTOM & FAILURE MODE]</h4>
                                        <p className="pm-card-body">{project.postMortem?.whatBroke}</p>
                                    </div>

                                    <div className="pm-detail-card rootcause">
                                        <h4 className="pm-card-h font-mono">[ROOT CAUSE ANALYSIS]</h4>
                                        <p className="pm-card-body">{project.postMortem?.rootCause}</p>
                                    </div>

                                    <div className="pm-detail-card fix">
                                        <h4 className="pm-card-h font-mono">[WHAT I ACTUALLY CHANGED TO FIX IT]</h4>
                                        <div className="pm-fix-steps font-mono text-xs">
                                            {project.postMortem?.fixes?.map((fix, idx) => (
                                                <div key={idx} className="fix-step-row">
                                                    <span className="step-num">0{idx + 1}.</span>
                                                    <span><strong>{fix.title}:</strong> {fix.desc}</span>
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

                    {/* Bottom Status Ribbon */}
                    <div className="deepdive-footer-ribbon font-mono">
                        <span className="ribbon-item">VERIFIED FROM REPOSITORY SOURCE CODE</span>
                        <span className="ribbon-sep">•</span>
                        <span className="ribbon-item">TECH STACK: {project.techStack?.join(', ')}</span>
                        <span className="ribbon-sep">•</span>
                        <span className="ribbon-item chromatic-text">PRESS ESC OR CLICK ✕ TO RETURN TO DOSSIER</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
