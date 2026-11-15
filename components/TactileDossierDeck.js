'use client';

import { useState } from 'react';
import BlueprintLens from './BlueprintLens';
import ProjectDeepDiveModal from './ProjectDeepDiveModal';
import { PROJECT_DEEP_DIVES } from '@/lib/projectDeepDives';
import { trackEventFire } from '@/lib/telemetry';

export default function TactileDossierDeck() {
    const [selectedProject, setSelectedProject] = useState(null);

    const openDeepDive = (projectId) => {
        const proj = PROJECT_DEEP_DIVES[projectId];
        if (proj) {
            setSelectedProject(proj);
            trackEventFire('dossier_deepdive_opened', { projectId });
        }
    };

    return (
        <section className="dossier-deck-section" id="dossier-projects">
            {/* Retro Film Chapter Stamp */}
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 02 // TACTILE STACKING DOSSIER</span>
                <span className="badge-film">HUMAN-FIRST STORIES & VERIFIED SYSTEMS</span>
                <span className="badge-film">ACCUMULATING CHAPTERS</span>
            </div>

            <div className="dossier-intro">
                <h2 className="dossier-main-title chromatic-bold">
                    Engineering Dossier Deck
                </h2>
            </div>

            <div className="dossier-stack-container">
                {/* ========================================================= */}
                {/* CHAPTER 1: CURIOSITY */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-1"
                    style={{ top: 'calc(80px + 0 * 26px)', zIndex: 10 }}
                >
                    <div className="dossier-tab-header">
                        <div className="tab-header-left">
                            <span className="tab-badge font-mono">CH.01 // CURIOSITY</span>
                            <span className="tab-title">FIFA 2026 Probabilistic Forecasting Engine</span>
                            <span className="tab-stamp font-mono hide-on-mobile">[20k MONTE CARLO • ZERO LEAKAGE]</span>
                        </div>
                        <div className="tab-header-right">
                            <button
                                type="button"
                                onClick={() => openDeepDive('fifa_worldcup')}
                                className="tab-inspect-btn font-mono"
                                aria-label="Inspect FIFA 2026 Architecture"
                            >
                                <span className="dd-pulse-dot" />
                                <span>INSPECT ARCHITECTURE ➔</span>
                            </button>
                            <a
                                href="https://github.com/Krishna-Kilrofkansa/World-Cup-Predictor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tab-gh-link font-mono hide-on-mobile"
                            >
                                GITHUB ↗
                            </a>
                        </div>
                    </div>

                    <div className="dossier-body">
                        <div className="quote-block analog-quote">
                            <p className="quote-text">
                                &ldquo;The first principle is that you must not fool yourself — and you are the easiest person to fool.&rdquo;
                            </p>
                            <span className="quote-author font-mono">— Richard P. Feynman</span>
                        </div>

                        <div className="dossier-grid">
                            <div className="dossier-details">
                                <div className="meta-row font-mono">
                                    <span className="meta-tag">TIMELINE: JUNE 2026 – AUGUST 2026</span>
                                    <span className="meta-tag">STACK: Python 3.11, NumPy, SciPy, Scikit-Learn, XGBoost</span>
                                </div>

                                {/* Plain-English Explanation */}
                                <div className="section-narrative">
                                    <h4 className="narrative-h font-mono chromatic-subtle">
                                        01. THE INSPIRATION
                                    </h4>
                                    <p>
                                        I love football, and with the 2026 World Cup expanding to a 48-team format (with 495 messy tie-breaker combinations for 3rd-place teams), traditional brackets broke down completely. Instead of listening to talking heads on TV, I built a simulation that plays out the entire World Cup <strong>20,000 times in 4.5 seconds</strong>—accounting for goal margins, player form, and real match fatigue to give honest, calibrated win probabilities.
                                    </p>

                                    <div className="actions-row">
                                        <button
                                            type="button"
                                            onClick={() => openDeepDive('fifa_worldcup')}
                                            className="deepdive-trigger-btn font-mono"
                                        >
                                            <span className="dd-pulse-dot" />
                                            <span className="chromatic-bold">INSPECT ARCHITECTURE GRAPH & DEEP DIVE</span>
                                            <span className="dd-arrow">➔</span>
                                        </button>
                                        <a
                                            href="https://github.com/Krishna-Kilrofkansa/World-Cup-Predictor"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="retro-action-btn font-mono"
                                        >
                                            <span>GITHUB REPO ↗</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="section-narrative">
                                    <h4 className="narrative-h font-mono chromatic-subtle">02. HOW IT WORKS</h4>
                                    <ul className="narrative-list">
                                        <li>Dynamic forward-in-time Elo rating engine with goal margin multipliers.</li>
                                        <li>Positional squad decomposition (attack, midfield, defense, goalkeeper) from player attributes.</li>
                                        <li>3-class win/draw/loss classifier calibrated against 900+ international matches.</li>
                                        <li>Zero orientation bias: guarantees Team A vs Team B produces symmetric probabilities.</li>
                                    </ul>
                                </div>

                                <div className="post-mortem-box">
                                    <div className="pm-header font-mono">
                                        <span className="pm-warning">⚠ HONEST POST-MORTEM</span>
                                        <span>POINT-IN-TIME DATA LEAKAGE</span>
                                    </div>
                                    <p className="pm-desc">
                                        <strong>What Broke:</strong> Initial tests gave a suspiciously high 78% accuracy. The model was inadvertently using tournament updates that happened <em>after</em> matches were played.
                                    </p>
                                    <div className="pm-fixes">
                                        <div className="pm-fix-item font-mono">
                                            <span className="fix-num">THE FIX:</span>
                                            <span>Froze all player and team attributes strictly at timestamp <code>t-1</code> before kickoff, and optimized for Platt calibration over raw accuracy.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System C: Interactive Blueprint Lens */}
                            <div className="dossier-lens-col">
                                <BlueprintLens
                                    title="FIFA 2026 Engine Lens"
                                    surfaceLabel="SURFACE: 48-TEAM TOURNAMENT BRACKET"
                                    blueprintLabel="LOW-LEVEL: PLATT CALIBRATION & SIMULATION ENGINE"
                                    surfaceContent={
                                        <div className="real-photo-surface">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/project-assets/fifa_worldcup/bracket_2026.png"
                                                alt="Official 48-Team Probabilistic Progression Bracket"
                                                className="real-photo-img"
                                            />
                                            <div className="photo-overlay-stamp font-mono">
                                                48-TEAM WORLD CUP // 20,000 MONTE CARLO SIMULATIONS
                                            </div>
                                        </div>
                                    }
                                    blueprintContent={
                                        <div className="lens-blueprint-fifa font-mono">
                                            <div className="code-line">t_kickoff = match.timestamp</div>
                                            <div className="code-line">elo_t = elo_history.at(t - 1) # ZERO LEAK</div>
                                            <div className="code-line">squad_vec = extract_pos_elo(t - 1)</div>
                                            <div className="code-line">sym_x = np.vstack([X, -X])</div>
                                            <div className="code-line">brier_score = 0.1782 # CALIBRATED</div>
                                            <div className="code-line">monte_carlo_vec(N=20000, seed=42)</div>
                                            <div className="code-line">EXEC_TIME: 4.18s | NUMPY VECTORIZED</div>
                                        </div>
                                    }
                                    metrics={[
                                        { label: 'SIMULATIONS', value: '20,000' },
                                        { label: 'EXEC TIME', value: '< 4.5s' },
                                        { label: 'BRIER LOSS', value: 'CALIBRATED' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* CHAPTER 2: INITIATIVE */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-2"
                    style={{ top: 'calc(80px + 1 * 26px)', zIndex: 11 }}
                >
                    <div className="dossier-tab-header">
                        <div className="tab-header-left">
                            <span className="tab-badge font-mono">CH.02 // INITIATIVE</span>
                            <span className="tab-title">The Two-Stage Placement Outreach Automation</span>
                            <span className="tab-stamp font-mono hide-on-mobile">[RFC-822 QUEUE • HUMAN-FIRST PROTOCOL]</span>
                        </div>
                        <div className="tab-header-right">
                            <button
                                type="button"
                                onClick={() => openDeepDive('outreach_automation')}
                                className="tab-inspect-btn font-mono"
                                aria-label="Inspect Outreach Automation Architecture"
                            >
                                <span className="dd-pulse-dot" />
                                <span>INSPECT ARCHITECTURE ➔</span>
                            </button>
                        </div>
                    </div>

                    <div className="dossier-body">
                        <div className="quote-block analog-quote">
                            <p className="quote-text">
                                &ldquo;नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः ॥ ३.८ ॥&rdquo;
                            </p>
                            <span className="quote-author font-mono">
                                — Bhagavad Gītā 3:8 (&ldquo;Perform your work with continuous diligence, for action is always superior to inaction.&rdquo;)
                            </span>
                        </div>

                        <div className="dossier-grid">
                            <div className="dossier-details">
                                <div className="meta-row font-mono">
                                    <span className="meta-tag">TIMELINE: OCTOBER 2026</span>
                                    <span className="meta-tag">STACK: Python, Gmail API, OAuth2, Batch Queuing</span>
                                </div>

                                <div className="section-narrative">
                                    <h4 className="narrative-h font-mono chromatic-subtle">
                                        01. THE INSPIRATION
                                    </h4>
                                    <p>
                                        During college placement season, I was spending 4 hours every single day writing the exact same email to 50 founders, customizing each one by hand, attaching my resume, and updating spreadsheets. I got tired of the manual repetition, so I built a tool to automate it. But when Google flagged me as a spam bot, I had to completely redesign it into a genuine, polite two-stage human conversation.
                                    </p>

                                    <div className="actions-row">
                                        <button
                                            type="button"
                                            onClick={() => openDeepDive('outreach_automation')}
                                            className="deepdive-trigger-btn font-mono"
                                        >
                                            <span className="dd-pulse-dot" />
                                            <span className="chromatic-bold">INSPECT ARCHITECTURE GRAPH & DEEP DIVE</span>
                                            <span className="dd-arrow">➔</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="post-mortem-box">
                                    <div className="pm-header font-mono">
                                        <span className="pm-warning">⚠ WHAT BROKE</span>
                                        <span>SPAM GATEWAYS & RATE-LIMIT CRASH</span>
                                    </div>
                                    <p className="pm-desc">
                                        Cold emails with PDF attachments get blocked by corporate mail filters. I redesigned the tool to send a short, polite 3-sentence note first with <strong>zero attachments</strong>. Only when a human replies with interest does the tool automatically follow up with the resume.
                                    </p>
                                </div>
                            </div>

                            {/* System C: Interactive Blueprint Lens */}
                            <div className="dossier-lens-col">
                                <BlueprintLens
                                    title="Outreach Pipeline Lens"
                                    surfaceLabel="SURFACE: TWO-STAGE CONVERSATION FLOW"
                                    blueprintLabel="LOW-LEVEL: RFC-822 EMAIL ENGINE"
                                    surfaceContent={
                                        <div className="lens-surface-outreach font-mono">
                                            <div className="email-preview-box">
                                                <div className="email-row"><strong>STAGE 1:</strong> Query (No PDF) ➔ Sent</div>
                                                <div className="email-row"><strong>REPLY:</strong> &ldquo;Sure, share resume.&rdquo;</div>
                                                <div className="email-row"><strong>STAGE 2:</strong> Tailored PDF attached ➔ Delivered</div>
                                            </div>
                                            <div className="outreach-stamp font-mono">
                                                SPAM SCORE: 0.0 // 100% INBOX LANDING RATE
                                            </div>
                                        </div>
                                    }
                                    blueprintContent={
                                        <div className="lens-blueprint-outreach font-mono">
                                            <div className="code-line">queue.filter(has_attachments=False)</div>
                                            <div className="code-line">jitter = random.uniform(6.0, 12.0)</div>
                                            <div className="code-line">gmail_api.users().drafts().create()</div>
                                            <div className="code-line">thread_watcher.poll(interval=60s)</div>
                                            <div className="code-line">on_reply: stage_attachment(resume.pdf)</div>
                                            <div className="code-line">RATE_LIMIT_STATUS: NOMINAL (20/HR)</div>
                                        </div>
                                    }
                                    metrics={[
                                        { label: 'SPAM RATE', value: '0%' },
                                        { label: 'JITTER DELAY', value: '6-12s' },
                                        { label: 'QUEUE DEL', value: 'BATCH 15' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* CHAPTER 3: HOLLOW KNIGHT */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-3"
                    style={{ top: 'calc(80px + 2 * 26px)', zIndex: 12 }}
                >
                    <div className="dossier-tab-header">
                        <div className="tab-header-left">
                            <span className="tab-badge font-mono">CH.03 // TAKING A BIGGER SWING</span>
                            <span className="tab-title">Hollow Knight King&apos;s Pass Reinforcement Learning Agent</span>
                            <span className="tab-stamp font-mono hide-on-mobile">[DIRECT RAM HOOK • ZERO FRAME LAG]</span>
                        </div>
                        <div className="tab-header-right">
                            <button
                                type="button"
                                onClick={() => openDeepDive('hollow_knight')}
                                className="tab-inspect-btn font-mono"
                                aria-label="Inspect Hollow Knight Architecture"
                            >
                                <span className="dd-pulse-dot" />
                                <span>INSPECT ARCHITECTURE ➔</span>
                            </button>
                        </div>
                    </div>

                    <div className="dossier-body">
                        <div className="quote-block analog-quote">
                            <p className="quote-text">
                                &ldquo;उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ॥ ६.५ ॥&rdquo;
                            </p>
                            <span className="quote-author font-mono">
                                — Bhagavad Gītā 6:5 (&ldquo;One must elevate oneself through one&apos;s own inner resolve... for the self alone is one&apos;s ally.&rdquo;)
                            </span>
                        </div>

                        <div className="dossier-grid">
                            <div className="dossier-details">
                                <div className="meta-row font-mono">
                                    <span className="meta-tag">TIMELINE: OCTOBER 2026</span>
                                    <span className="meta-tag">STACK: Python, Gymnasium, Stable-Baselines3 (PPO), C# Unity Modding</span>
                                </div>

                                <div className="section-narrative">
                                    <h4 className="narrative-h font-mono chromatic-subtle">
                                        01. THE INSPIRATION
                                    </h4>
                                    <p>
                                        When teaching computers to play video games, most developers record the screen with video capture and feed images into deep neural networks. But video capture lags behind by two frames and uses tons of computer power. In Hollow Knight, a split-second lag means falling onto spikes. I hacked directly into the game&apos;s internal Unity engine with a custom C# mod, reading coordinates straight from computer memory at the speed of RAM—letting the AI learn King&apos;s Pass with <strong>zero frame latency</strong>.
                                    </p>

                                    <div className="actions-row">
                                        <button
                                            type="button"
                                            onClick={() => openDeepDive('hollow_knight')}
                                            className="deepdive-trigger-btn font-mono"
                                        >
                                            <span className="dd-pulse-dot" />
                                            <span className="chromatic-bold">INSPECT ARCHITECTURE GRAPH & DEEP DIVE</span>
                                            <span className="dd-arrow">➔</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="post-mortem-box">
                                    <div className="pm-header font-mono">
                                        <span className="pm-warning">⚠ FACT-CHECK: DOES THE AGENT SEE ENEMIES?</span>
                                        <span>RADAR VECTOR VS CAMERA</span>
                                    </div>
                                    <p className="pm-desc">
                                        <strong>No.</strong> The agent does <strong>not</strong> use a camera. The C# mod queries game memory to feed Python a <strong>23-dimensional tactical radar vector</strong>: relative distance to hazards, danger flags, and enemy health.
                                    </p>
                                </div>
                            </div>

                            {/* System C: Interactive Blueprint Lens */}
                            <div className="dossier-lens-col">
                                <BlueprintLens
                                    title="Hollow Knight Memory Lens"
                                    surfaceLabel="SURFACE: RUNNING GAME ENGINE & ARCHITECTURE"
                                    blueprintLabel="LOW-LEVEL: IN-MEMORY COORDINATE TELEMETRY"
                                    surfaceContent={
                                        <div className="real-photo-surface">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/project-assets/hollow_knight/system_architecture.png"
                                                alt="Hollow Knight RL Architecture"
                                                className="real-photo-img"
                                            />
                                            <div className="photo-overlay-stamp font-mono">
                                                C# UNITY HOOK ➔ PYTHON GYMNASIUM TELEMETRY
                                            </div>
                                        </div>
                                    }
                                    blueprintContent={
                                        <div className="lens-blueprint-hk font-mono">
                                            <div className="code-line">START_X = 36.24 | START_Y = 11.41</div>
                                            <div className="code-line">HeroController.instance.current_pos</div>
                                            <div className="code-line">vel_x: +2.44 | vel_y: -0.12 | on_ground: 1</div>
                                            <div className="code-line">e_range: 1.14m | e_danger: FALSE</div>
                                            <div className="code-line">WAYPOINT #14 DIST: 0.42m (REWARD: +12.0)</div>
                                            <div className="code-line">JUMP_MACRO_ACTIVE: 0.32s HIGH_JUMP</div>
                                            <div className="code-line">LATENCY: 0 FRAMES (DIRECT RAM HOOK)</div>
                                        </div>
                                    }
                                    metrics={[
                                        { label: 'RADAR DIM', value: '23-D' },
                                        { label: 'FRAME LAG', value: '0 FRAMES' },
                                        { label: 'HARNESS', value: 'C# BepInEx' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* CHAPTER 4: REAL WORLD PRODUCTION */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-4"
                    style={{ top: 'calc(80px + 3 * 26px)', zIndex: 13 }}
                >
                    <div className="dossier-tab-header">
                        <span className="tab-badge font-mono">CH.04 // REAL WORLD PRODUCTION</span>
                        <span className="tab-title">Production Engineering Under Real Stakes</span>
                        <span className="tab-stamp font-mono">[TASLASOFT & QCECURING • AUDITED METRICS]</span>
                    </div>

                    <div className="dossier-body">
                        <div className="quote-block analog-quote">
                            <p className="quote-text">
                                &ldquo;योगः कर्मसु कौशलम् ॥ २.५० ॥&rdquo;
                            </p>
                            <span className="quote-author font-mono">
                                — Bhagavad Gītā 2:50 (&ldquo;Excellence in action is Yoga.&rdquo;)
                            </span>
                        </div>

                        <div className="internship-dual-grid">
                            {/* Intern 1: Taslasoft */}
                            <div className="intern-subcard">
                                <div className="subcard-header font-mono">
                                    <span className="company-name chromatic-text">TASLASOFT</span>
                                    <span className="role-time">AIML & SDE Intern | Mar – Sep 2026</span>
                                </div>
                                <div className="subcard-body">
                                    <div className="metric-highlight font-mono">
                                        <span className="num">95%</span>
                                        <span className="lbl">PRECISION (200+ FLAGGED CRITICAL EVENTS)</span>
                                    </div>
                                    <p>
                                        <strong>The Human Mission:</strong> Reading 10,000+ daily posts across Reddit and forums to spot civic emergencies (floods, traffic accidents) while automatically scrubbing Indian phone numbers and Aadhaar IDs to protect citizen privacy.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('taslasoft_reddit')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '10px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT ARCHITECTURE ➔</span>
                                    </button>
                                </div>
                            </div>

                            {/* Intern 2: Qcecuring */}
                            <div className="intern-subcard">
                                <div className="subcard-header font-mono">
                                    <span className="company-name chromatic-text">QCECURING TECHNOLOGIES</span>
                                    <span className="role-time">SDE Intern | Oct – Dec 2025</span>
                                </div>
                                <div className="subcard-body">
                                    <div className="metric-highlight font-mono">
                                        <span className="num">-60%</span>
                                        <span className="lbl">SIGNING TURNAROUND LATENCY CUT</span>
                                    </div>
                                    <p>
                                        <strong>The Human Mission:</strong> Developers were waiting hours to get cryptographic code-signing signatures to release software. I built a secure multi-approver digital vault where two authorized leads can sign releases in seconds without risking the master keys.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('qcecuring_pki')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '10px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT ARCHITECTURE ➔</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="dossier-lens-strip" style={{ marginTop: '20px' }}>
                            <BlueprintLens
                                title="Enterprise Security Lens"
                                surfaceLabel="SURFACE: CODE SIGNING DASHBOARD"
                                blueprintLabel="LOW-LEVEL: QUORUM MERKLE AUDIT PROOF"
                                surfaceContent={
                                    <div className="real-photo-surface">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/project-assets/code_signing/dashboard_overview.png"
                                            alt="Enterprise Code Signing Dashboard"
                                            className="real-photo-img"
                                        />
                                        <div className="photo-overlay-stamp font-mono">
                                            QCECURING PKI PORTAL // 52 ASSETS SECURED
                                        </div>
                                    </div>
                                }
                                blueprintContent={
                                    <div className="lens-blueprint-sec font-mono">
                                        <div className="code-line">binary.hash() == client_digest # NO KEY TRANSMIT</div>
                                        <div className="code-line">approvers = [sig_a, sig_b].verify(pki_pub_key)</div>
                                        <div className="code-line">audit_trail.append_immutable(timestamp, approvers)</div>
                                        <div className="code-line">SIGNING_TIME: 1.4s (PREV: 4.2 hrs MANUAL)</div>
                                    </div>
                                }
                                metrics={[
                                    { label: 'SECURITY', value: 'QUORUM 2/3' },
                                    { label: 'KEY LEAK', value: 'ZERO' },
                                    { label: 'AUDIT', value: 'IMMUTABLE' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* CHAPTER 5: WHAT I CARE ABOUT */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-5"
                    style={{ top: 'calc(80px + 4 * 26px)', zIndex: 14 }}
                >
                    <div className="dossier-tab-header">
                        <span className="tab-badge font-mono">CH.05 // HUMAN IMPACT</span>
                        <span className="tab-title">Tech for Underserved & Everyday Human Reality</span>
                        <span className="tab-stamp font-mono">[TSLATE • VARUNA SIH-51 • EYERIS ACCESSIBILITY]</span>
                    </div>

                    <div className="dossier-body">
                        <div className="quote-block analog-quote">
                            <p className="quote-text">
                                &ldquo;सक्ताः कर्मण्यविद्वांसो... कुर्याद्विद्वांस्तथासक्तश्चिकीर्षुर्लोकसङ्ग्रहम् ॥ ३.२५ ॥&rdquo;
                            </p>
                            <span className="quote-author font-mono">
                                — Bhagavad Gītā 3:25 (&ldquo;Dedicate your actions to the upliftment and welfare of the world.&rdquo;)
                            </span>
                        </div>

                        {/* Project 1: TSlate */}
                        <div className="care-project-box">
                            <div className="care-tag font-mono chromatic-text">
                                01. TSLATE — THE OFFLINE VOICE TRANSLATOR FOR MY MOM
                            </div>
                            <div className="grounded-reality">
                                <p>
                                    <em>The Grounded Human Reality:</em> My mother speaks only Hindi. When she visited me in South India, she faced daily friction talking to local vegetable vendors, kirana shopkeepers, and auto drivers who speak Kannada. Watching her feel hesitant and have to wait for me just to buy groceries made me build TSlate: an app with a single big tap button that runs <strong>100% offline</strong> with zero internet lag. She speaks Hindi, and the phone immediately speaks out loud in clear Kannada to the shopkeeper.
                                </p>
                            </div>
                            <div className="care-actions-row" style={{ marginTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => openDeepDive('tslate')}
                                    className="deepdive-trigger-btn font-mono"
                                >
                                    <span className="dd-pulse-dot" />
                                    <span>INSPECT TSLATE ARCHITECTURE GRAPH ➔</span>
                                </button>
                            </div>
                        </div>

                        {/* Project 2 & 3: VARUNA & EYERIS */}
                        <div className="dual-care-grid">
                            <div className="care-subitem">
                                <div className="subitem-head font-mono">
                                    <span className="chromatic-subtle">VARUNA // DISASTER INCIDENT TRIAGE</span>
                                    <span>SIH 2025 // 51st NATIONALLY</span>
                                </div>
                                <p>
                                    Ranked 51st Nationally (Top 150 of 864 teams) leading a 5-person team under 36-hour pressure. Built automated triage of flood distress calls, forcing the loss function to penalize missed life-threatening emergencies 10x harder than a false alarm.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => openDeepDive('varuna_triage')}
                                    className="deepdive-trigger-btn font-mono"
                                    style={{ marginTop: '8px' }}
                                >
                                    <span className="dd-pulse-dot" />
                                    <span>INSPECT VARUNA ARCHITECTURE ➔</span>
                                </button>
                            </div>

                            <div className="care-subitem">
                                <div className="subitem-head font-mono">
                                    <span className="chromatic-subtle">EYERIS // ASSISTIVE VISION</span>
                                    <span>ACCESSIBILITY ROBOT</span>
                                </div>
                                <p>
                                    &ldquo;EYERIS tracks eye gaze vectors and blink durations in real time to give individuals with severe motor disabilities hands-free computer and environment control.&rdquo;
                                </p>
                                <div className="metric-pill font-mono" style={{ marginTop: '10px' }}>
                                    MEDIAPIPE + OPENCV ➔ <strong>&lt;50ms DETECTION LATENCY</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* EXTRA LAB: HYPERLOOP & OTHER REAL SYSTEMS */}
                {/* ========================================================= */}
                <div
                    className="dossier-card chapter-extra"
                    style={{ top: 'calc(80px + 5 * 26px)', zIndex: 15 }}
                >
                    <div className="dossier-tab-header">
                        <span className="tab-badge font-mono">LAB // HARDWARE, CIVIC & VISION SYSTEMS</span>
                        <span className="tab-title">Hyperloop Telemetry, BullsEye XAI & Police RAG</span>
                        <span className="tab-stamp font-mono">[2nd PLACE GHC • EXPLAINABLE AI • AIR-GAPPED RAG]</span>
                    </div>

                    <div className="dossier-body">
                        <div className="lab-tri-grid">
                            {/* Dromos Hyperloop */}
                            <div className="lab-card">
                                <div className="lab-header font-mono chromatic-text">TEAM DROMOS HYPERLOOP</div>
                                <div className="lab-badge font-mono">2nd PLACE // GLOBAL HYPERLOOP COMP.</div>
                                <p>
                                    <strong>Role: Levitation Engineer & Web Architect.</strong> When electrical motor noise threatened to destabilize our pod 2 hours before the track run, I wrote an in-memory moving-window low-pass filter directly to firmware, securing 2nd Place internationally.
                                </p>
                                <div className="lab-actions">
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('dromos_hyperloop')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '8px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT HYPERLOOP SPECS ➔</span>
                                    </button>
                                </div>
                            </div>

                            {/* BullsEye XAI */}
                            <div className="lab-card">
                                <div className="lab-header font-mono chromatic-text">BULLSEYE WITH BREEDTRACE-XAI</div>
                                <div className="lab-badge font-mono">EXPLAINABLE AI // LIVESTOCK CV</div>
                                <p>
                                    Livestock breed classification using YOLOv8 + VGG16 with Grad-CAM heatmaps so veterinarians can see exactly which physical traits the AI evaluated.
                                </p>
                                <div className="lab-actions">
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('bullseye_xai')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '8px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT XAI ARCHITECTURE ➔</span>
                                    </button>
                                </div>
                            </div>

                            {/* Police RAG */}
                            <div className="lab-card">
                                <div className="lab-header font-mono chromatic-text">POLICE CRIME INTELLIGENCE RAG</div>
                                <div className="lab-badge font-mono">AIR-GAPPED // CHROMADB + OLLAMA</div>
                                <p>
                                    Local, private search copilot helping police investigators query First Information Reports (FIRs) and detect crime patterns without uploading sensitive data to the cloud.
                                </p>
                                <div className="lab-actions">
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('police_rag')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '8px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT RAG PIPELINE ➔</span>
                                    </button>
                                </div>
                            </div>

                            {/* Society Tracker */}
                            <div className="lab-card">
                                <div className="lab-header font-mono chromatic-text">SOCIETY MAINTENANCE TRACKER</div>
                                <div className="lab-badge font-mono">NEXT.JS 16 // PRISMA RBAC</div>
                                <p>
                                    Full-stack apartment complex portal automating monthly maintenance dues, payment verification, and resident complaint tracking.
                                </p>
                                <div className="lab-actions">
                                    <button
                                        type="button"
                                        onClick={() => openDeepDive('society_tracker')}
                                        className="deepdive-trigger-btn font-mono"
                                        style={{ marginTop: '8px' }}
                                    >
                                        <span className="dd-pulse-dot" />
                                        <span>INSPECT FULL-STACK ARCH ➔</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expansive Deep Dive Overlay Modal */}
            <ProjectDeepDiveModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
