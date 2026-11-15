'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ALL_PROJECTS = [
    {
        id: 'fifa-2026',
        title: 'FIFA 2026 Probabilistic Forecasting Engine',
        domain: 'QUANT & SIMULATION',
        description: 'Simulates the 48-team tournament 20,000 times in 4.5s with dynamic forward Elo, player fatigue, and zero temporal data leakage.',
        tech: ['Python 3.11', 'NumPy', 'Scikit-Learn', 'Monte Carlo'],
        metric: '20,000 SIMS • < 4.5s',
        github: 'https://github.com/Krishna-Kilrofkansa/World-Cup-Predictor',
    },
    {
        id: 'hollow-knight-rl',
        title: "Hollow Knight King's Pass RL Agent",
        domain: 'REINFORCEMENT LEARNING',
        description: 'Bypasses slow video capture by reading coordinates straight from Unity memory via a custom C# mod for zero frame latency.',
        tech: ['C# BepInEx', 'Gymnasium', 'Stable-Baselines3', 'PPO'],
        metric: '0 FRAME LAG • 23-D RADAR',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'code-signing-pki',
        title: 'Enterprise Code-Signing Certificate Manager',
        domain: 'ENTERPRISE SECURITY',
        description: 'Quorum-based multi-approver digital release signing gateway with automated SHA-256 verification and immutable audit logs.',
        tech: ['Spring Boot 3.5', 'Angular 20', 'MongoDB', 'Java 21'],
        metric: '-60% LATENCY CUT • QUORUM PKI',
        github: 'https://github.com/Krishna-Kilrofkansa/Code-Signing-Certificate-Manager',
    },
    {
        id: 'outreach-automation',
        title: 'Two-Stage Conversational Placement Outreach',
        domain: 'AUTOMATION & PROTOCOLS',
        description: 'Human-first two-stage protocol: text-only query first to survive Proofpoint/Mimecast spam filters, resume delivered upon human reply.',
        tech: ['Python', 'Gmail API', 'OAuth2', 'Batch Queue'],
        metric: '0% SPAM DROP • 6-12s JITTER',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'tslate-translator',
        title: 'TSlate — Offline Voice Translator for Mom',
        domain: 'EDGE AI & ACCESSIBILITY',
        description: '100% offline speech-to-speech Hindi ➔ Kannada translation running INT4 ONNX quantized small models locally on Android.',
        tech: ['Whisper INT4', 'Silero VAD', 'Piper TTS', 'Android NDK'],
        metric: '100% OFFLINE • < 650ms E2E',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'taslasoft-nlp',
        title: 'Social Intelligence & Civic Safety Pipeline',
        domain: 'DISTRIBUTED NLP & PRIVACY',
        description: 'Analyzes 10,000+ daily posts across forums with 3-tier cascaded NLP, automatic PII redaction, and AES-256-GCM storage encryption.',
        tech: ['Python', 'PRAW', 'AES-256-GCM', 'VADER', 'SQLite WAL'],
        metric: '10k+ POSTS/DAY • 95% PRECISION',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'varuna-disaster',
        title: 'VARUNA — Disaster Incident Triage (SIH)',
        domain: 'COMPUTER VISION & CIVIC',
        description: 'Smart India Hackathon 2025 (51st Nationally). Asymmetric loss penalizes missed flood rescues 10x harder than false alarms.',
        tech: ['PyTorch', 'OpenCV', 'Asymmetric Loss', 'Flask'],
        metric: 'SIH 51st RANK • 98.4% RECALL',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'dromos-hyperloop',
        title: 'Team Dromos Hyperloop Web & Telemetry',
        domain: 'HARDWARE & 3D WEB',
        description: 'Global Hyperloop Competition 2nd Place. In-memory FIR low-pass filter eliminated motor noise; official 60 FPS Three.js web platform.',
        tech: ['React 18', 'Three.js', 'TypeScript', 'CAN Bus FIR'],
        metric: '2nd PLACE GHC • FIR LOW-PASS',
        github: 'https://github.com/Krishna-Kilrofkansa',
        live: 'https://team-dromos-website.vercel.app/',
    },
    {
        id: 'bullseye-xai',
        title: 'BullsEye with BreedTrace-XAI',
        domain: 'EXPLAINABLE AI & CV',
        description: 'Cattle breed identification combining YOLOv8 and VGG16 with Grad-CAM heatmaps verified through monotonic pixel deletion curves.',
        tech: ['YOLOv8', 'VGG16', 'Grad-CAM', 'PyTorch', 'Flask'],
        metric: 'EXPLAINABLE AI • MONOTONIC CURVE',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'police-rag',
        title: 'Police Crime Intelligence RAG Platform',
        domain: 'RAG & LOCAL LLMs',
        description: 'Air-gapped, local search assistant helping police investigators query First Information Reports (FIRs) without cloud data leakage.',
        tech: ['FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'ReportLab'],
        metric: '100% AIR-GAPPED • LOCAL LLM',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'society-tracker',
        title: 'Society Maintenance Tracker Portal',
        domain: 'FULL STACK WEB',
        description: 'Residential society accounting portal with Next.js 16 App Router, Prisma ORM, role-based access control, and 1-click billing verification.',
        tech: ['Next.js 16', 'React 19', 'Prisma ORM', 'PostgreSQL'],
        metric: 'PRISMA RBAC • 1-CLICK VERIFY',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'entertainment-hub',
        title: 'EntertainmentHub Discovery Platform',
        domain: 'PRODUCTION FULL STACK',
        description: 'Multi-category media discovery platform querying normalized catalogs across Movies, Anime, Manhwa, and Books with live deployment.',
        tech: ['React 18', 'Spring Boot', 'MongoDB', 'Vercel'],
        metric: 'LIVE WEB APP • MULTI-CATALOG',
        github: 'https://github.com/Krishna-Kilrofkansa',
        live: 'https://entertainmenthub-delta.vercel.app/',
    },
    {
        id: 'ipl-prediction',
        title: 'IPL Match Predictor & XI Optimizer',
        domain: 'SPORTS ANALYTICS',
        description: 'Soft-voting ensemble trained on 1,169 matches (2008–2026) with constrained Playing XI optimizer enforcing league composition rules.',
        tech: ['Python', 'Scikit-Learn', 'SQLite', 'Soft-Voting'],
        metric: 'AUC 0.81 • 1,169 MATCHES',
        github: 'https://github.com/Krishna-Kilrofkansa/ipl-prediction',
    },
    {
        id: 'truelens-c2pa',
        title: 'TrueLens C2PA Image Authenticity Engine',
        domain: 'CRYPTOGRAPHY & PROVENANCE',
        description: 'Injects and validates C2PA Content Credentials into JPEG APP11 binary marker segments with ECDSA/Ed25519 digital signatures.',
        tech: ['Node.js', 'Express', 'WebCrypto', 'Binary JPEG'],
        metric: 'C2PA STANDARD • TAMPER-EVIDENT',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'vtop-reg-monitor',
        title: 'VTOP Course Registration Monitor v3.0',
        domain: 'BROWSER UTILITIES',
        description: 'Tampermonkey userscript monitoring university registration capacity via DOM MutationObservers and firing instant desktop notifications.',
        tech: ['JavaScript', 'DOM Observer', 'Userscript'],
        metric: 'REAL-TIME HUD • ZERO MISSES',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'gossip-tracker',
        title: 'GossipTracker Edge Speech Intelligence',
        domain: 'AUDIO & THREADING',
        description: 'Multi-threaded background voice activity detection with Silero VAD and Faster-Whisper, keeping idle CPU/GPU consumption near 0%.',
        tech: ['Python', 'Faster-Whisper', 'Silero VAD', 'Pystray'],
        metric: '4 THREADS • NEAR-0% IDLE CPU',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'cancer-histopathology',
        title: 'Breast Cancer Histopathology SimCLR',
        domain: 'DEEP LEARNING RESEARCH',
        description: 'ResNet50 fine-tuned with SimCLR self-supervised contrastive learning on 7,909 BreakHis histopathology images, reaching 93.4% accuracy.',
        tech: ['PyTorch', 'ResNet50', 'SimCLR', 'BreakHis'],
        metric: '93.4% ACCURACY • RESNET50',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'business-entity-resolution',
        title: 'Business Entity Resolution LightGBM',
        domain: 'RECORD LINKAGE & ML',
        description: 'Two-stage ML challenge pipeline: multi-key fuzzy blocking (token sort, phonetic) followed by LightGBM pairwise classification.',
        tech: ['LightGBM', 'Scikit-Learn', 'Fuzzy Blocking', 'Pandas'],
        metric: '95% RECALL PRUNING • ML 2026',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'wq-alpha-pipeline',
        title: 'WorldQuant Alpha Trading Pipeline',
        domain: 'QUANTITATIVE FINANCE',
        description: 'Automated data pipeline interfacing with WorldQuant Brain API, ingesting 85k data fields with SQLite WAL storage and alpha factor search.',
        tech: ['Python 3.11', 'WorldQuant Brain API', 'SQLite WAL'],
        metric: '85k FIELDS • FACTOR CORRELATION',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
    {
        id: 'plan-d-bot',
        title: 'Plan D Task Scheduling & Reminder Bot',
        domain: 'SYSTEMS AUTOMATION',
        description: 'Automated execution and task dispatch script ensuring daily operational momentum and systematic habit tracking.',
        tech: ['Python', 'AsyncIO', 'Cron Automation'],
        metric: 'DAILY DISPATCH • AUTOMATED',
        github: 'https://github.com/Krishna-Kilrofkansa',
    },
];

export default function ProjectHorizontalReel() {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollBounds = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const handleScrollStep = (direction) => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = 440; // Approx one card width + gap
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="project-reel-section font-mono" id="all-projects-reel">
            {/* Top Film Badge Strip */}
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 03 // COMPLETE CATALOG</span>
                <span className="badge-film">ALL 20 VERIFIED PROJECTS</span>
                <span className="badge-film">HORIZONTAL SCROLL REEL</span>
            </div>

            {/* Header with Title and Scroll Buttons */}
            <div className="reel-header-row">
                <div className="reel-title-block">
                    <h2 className="reel-main-title chromatic-bold">
                        Complete Engineering Project Directory
                    </h2>
                    <p className="reel-subtitle">
                        Every system, utility, machine learning model, and security platform with direct repository links.
                    </p>
                </div>

                <div className="reel-nav-buttons font-mono hide-on-mobile">
                    <button
                        type="button"
                        onClick={() => handleScrollStep('left')}
                        className={`reel-btn ${!canScrollLeft ? 'disabled' : ''}`}
                        aria-label="Scroll left"
                    >
                        <span>◀ PREV</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScrollStep('right')}
                        className={`reel-btn ${!canScrollRight ? 'disabled' : ''}`}
                        aria-label="Scroll right"
                    >
                        <span>NEXT ▶</span>
                    </button>
                    <span className="reel-count-tag font-mono">[20 REPOSITORIES]</span>
                </div>
            </div>

            {/* Horizontal Scrolling Card Track */}
            <div
                ref={scrollContainerRef}
                className="reel-track-container"
                onScroll={updateScrollBounds}
            >
                {ALL_PROJECTS.map((proj, idx) => (
                    <motion.div
                        key={proj.id}
                        className="reel-card"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="card-top-row">
                            <span className="card-index-tag font-mono">
                                0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1} // {proj.domain}
                            </span>
                            <span className="card-metric-pill font-mono">{proj.metric}</span>
                        </div>

                        <h3 className="card-title chromatic-subtle">{proj.title}</h3>
                        <p className="card-plain-desc">{proj.description}</p>

                        <div className="card-tech-pills font-mono">
                            {proj.tech.map((t, tIdx) => (
                                <span key={tIdx} className="tech-pill">{t}</span>
                            ))}
                        </div>

                        <div className="card-action-footer font-mono">
                            <a
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reel-link-btn font-mono"
                            >
                                <span>GITHUB REPO ↗</span>
                            </a>

                            {proj.live && (
                                <a
                                    href={proj.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="reel-link-btn live font-mono"
                                >
                                    <span>LIVE DEMO ↗</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Mobile Scroll Hint */}
            <div className="reel-footer-hint font-mono show-on-mobile">
                <span>← SWIPE HORIZONTALLY TO EXPLORE ALL 20 PROJECTS →</span>
            </div>
        </section>
    );
}
