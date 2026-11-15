'use client';

import { motion } from 'framer-motion';
import { trackEventFire } from '@/lib/telemetry';

export default function ResumeSection() {
    const handleDownload = () => {
        trackEventFire('resume_download_verified');
    };

    return (
        <section className="resume-vault-section" id="resume">
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 05 // RESUME VAULT</span>
                <span className="badge-film">1-PAGE ATS-COMPLIANT LATEX</span>
                <span className="badge-film">OCTOBER 2026 AUDITED</span>
            </div>

            <div className="resume-vault-card">
                <div className="vault-header">
                    <div className="vault-title-group">
                        <span className="vault-tag font-mono chromatic-text">VERIFIED ENGINEERING RESUME</span>
                        <h2 className="vault-h2 chromatic-bold">Aakarshak Swaraj — Curriculum Vitae</h2>
                        <p className="vault-desc font-mono">
                            1-Page Dense LaTeX Format • ATS 100% Parser Compliant • Hand-crafted in Overleaf/TeX Live with verified metrics and code links.
                        </p>
                    </div>

                    <div className="vault-action-group">
                        <motion.a
                            href="/Aakarshak_Swaraj_Resume.pdf"
                            download="Aakarshak_Swaraj_Resume.pdf"
                            className="download-vault-btn font-mono"
                            onClick={handleDownload}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>DOWNLOAD PDF [121 KB] ↓</span>
                        </motion.a>
                        <a
                            href="/Aakarshak_Swaraj_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="preview-vault-btn font-mono"
                        >
                            <span>OPEN IN NEW TAB ↗</span>
                        </a>
                    </div>
                </div>

                <div className="vault-metadata-grid font-mono">
                    <div className="v-meta-item">
                        <span className="v-label">CANDIDATE:</span>
                        <span className="v-val">Aakarshak Swaraj (B.Tech CSE-AIML)</span>
                    </div>
                    <div className="v-meta-item">
                        <span className="v-label">EDUCATION:</span>
                        <span className="v-val">VIT Chennai (8.62 CGPA)</span>
                    </div>
                    <div className="v-meta-item">
                        <span className="v-label">INTERNSHIPS:</span>
                        <span className="v-val">Taslasoft (AIML/SDE) & Qcecuring (SDE)</span>
                    </div>
                    <div className="v-meta-item">
                        <span className="v-label">LOCATION:</span>
                        <span className="v-val">Chennai ➔ Bengaluru, India</span>
                    </div>
                </div>

                <div className="vault-summary-tape font-mono">
                    <span>KEY HIGHLIGHTS:</span>
                    <span>95% PRECISION NLP PIPELINE</span>
                    <span>•</span>
                    <span>-60% CODE-SIGNING LATENCY</span>
                    <span>•</span>
                    <span>20k MONTE CARLO TOURNAMENT ENGINE</span>
                    <span>•</span>
                    <span>SIH 2025 51st NATIONALLY</span>
                </div>
            </div>
        </section>
    );
}
