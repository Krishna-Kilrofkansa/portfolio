'use client';

import { motion } from 'framer-motion';

export default function OffTheScreenSection() {
    return (
        <section className="offscreen-section" id="off-screen">
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 04 // ANALOG LIVING</span>
                <span className="badge-film">ME OFF THE SCREEN</span>
                <span className="badge-film">PHYSICAL CONDITIONING & TACTICAL MINDSET</span>
            </div>

            <div className="offscreen-header">
                <h2 className="offscreen-title chromatic-bold">
                    Me Off The Screen
                </h2>
                <div className="quote-block analog-quote">
                    <p className="quote-text">
                        &ldquo;No citizen has a right to be an amateur in the matter of physical training... what a disgrace it is to grow old through sheer carelessness before seeing what manner of person you may become.&rdquo;
                    </p>
                    <span className="quote-author font-mono">— Socrates</span>
                </div>
            </div>

            <div className="offscreen-grid">
                {/* 1. Badminton Card */}
                <motion.div
                    className="offscreen-card"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="offscreen-image-wrapper">
                        <img
                            src="/images/badminton.jpg"
                            alt="Badminton court practice"
                            className="offscreen-card-img badminton-img"
                            loading="lazy"
                        />
                        <div className="offscreen-image-overlay">
                            <span className="image-badge font-mono">[ 35mm ANALOG ARCHIVE ]</span>
                        </div>
                    </div>

                    <div className="card-top-tag font-mono">
                        <span className="tag-sport">🏸 BADMINTON & 🏊 SWIMMING</span>
                        <span className="tag-level chromatic-text">[REFLEXES & BREATH]</span>
                    </div>
                    <h3 className="sport-heading">Court Anticipation & Lung Capacity</h3>
                    <p className="sport-desc">
                        Fast court anticipation, split-second footwork, and long-distance breath regulation. When you spend 10+ hours debugging memory offsets and tensor dimensions, high-intensity court movement and deep freestyle laps are my non-negotiable mental reset.
                    </p>
                    <div className="sport-metrics font-mono">
                        <span>PULSE RESET: 45 MINS</span>
                        <span>•</span>
                        <span>ZERO MONITORS</span>
                        <span>•</span>
                        <span>AEROBIC ENDURANCE</span>
                    </div>
                </motion.div>

                {/* 2. Chess Card */}
                <motion.div
                    className="offscreen-card"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="offscreen-image-wrapper">
                        <img
                            src="/images/chess.jpg"
                            alt="Tactical chess endgame board"
                            className="offscreen-card-img chess-img"
                            loading="lazy"
                        />
                        <div className="offscreen-image-overlay">
                            <span className="image-badge font-mono">[ TACTICAL ENDGAME // 64 SQUARES ]</span>
                        </div>
                    </div>

                    <div className="card-top-tag font-mono">
                        <span className="tag-sport">♟️ CHESS & ⚽ TACTICAL FOOTBALL</span>
                        <span className="tag-level chromatic-text">[SPATIAL & ENDGAMES]</span>
                    </div>
                    <h3 className="sport-heading">Spatial Transitions & Uncomfortable Endgames</h3>
                    <p className="sport-desc">
                        Chess taught me absolute patience in defending cramped, uncomfortable endgames after a piece blunder. Football taught me off-the-ball spacing, rotational pressing, and positional transitions — which directly inspired the positional squad decomposition in my FIFA simulation engine.
                    </p>
                    <div className="sport-metrics font-mono">
                        <span>SPATIAL MODELING</span>
                        <span>•</span>
                        <span>TACTICAL ENDGAMES</span>
                        <span>•</span>
                        <span>POSITIONAL PATIENCE</span>
                    </div>
                </motion.div>

                {/* 3. Calisthenics Card */}
                <motion.div
                    className="offscreen-card"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="offscreen-image-wrapper">
                        <img
                            src="/images/calisthenics.jpg"
                            alt="Calisthenics and bodyweight lever mastery"
                            className="offscreen-card-img calisthenics-img"
                            loading="lazy"
                        />
                        <div className="offscreen-image-overlay">
                            <span className="image-badge font-mono">[ RELATIVE BODYWEIGHT MASTERY ]</span>
                        </div>
                    </div>

                    <div className="card-top-tag font-mono">
                        <span className="tag-sport">🤸 CALISTHENICS & 🏋️ LEVER CONTROL</span>
                        <span className="tag-level chromatic-text">[BODYWEIGHT MASTERY]</span>
                    </div>
                    <h3 className="sport-heading">Relative Strength & Tendon Integrity</h3>
                    <p className="sport-desc">
                        Calisthenics develops strict relative strength, spatial awareness, and tendon conditioning — mastering clean levers, handstands, and weighted pull-ups where precision and posture cannot be cheated. Direct physical analog to engineering without shortcuts.
                    </p>
                    <div className="sport-metrics font-mono">
                        <span>BODYWEIGHT LEVERS</span>
                        <span>•</span>
                        <span>TENDON INTEGRITY</span>
                        <span>•</span>
                        <span>RELATIVE POWER</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
