'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AsciiLandscapeTransition
 * Renders an authentic high-fidelity square-matrix ASCII/halftone architectural scene:
 * - Scene: Moonlit Mausoleum (Taj Mahal under full moon with live water ripples & soaring birds)
 * - 16:9 HD square-halftone matrix (722×425) matching user-selected Squares mode (89% cell fill)
 * - Authentic live sinusoidal water ripple engine across the reflecting pool
 * - Soft breathing lunar luminescence and soaring silhouetted night birds
 * - Interactive controls: Pause/Play, 0.5x / 1x / 2x speed presets, and telemetry HUD
 */
export default function AsciiLandscapeTransition({
    scene = 'taj-mahal',
    verse = {
        sanskrit: 'संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ ५.२ ॥',
        translation: 'Both passive contemplation and active engagement lead to understanding. But between armchair theorizing and rolling up your sleeves to build, the path of action is far superior.',
        reference: 'Bhagavad Gītā 5:2',
        anchor: 'THE PATH OF ACTION (कर्मयोग)',
    },
    interludeNumber = '01',
    title = 'MOONLIT MAUSOLEUM // AGRA',
    subtitle = '',
}) {
    const canvasRef = useRef(null);
    const offscreenRef = useRef(null);
    const imageRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [fpsCounter, setFpsCounter] = useState(60);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Preload the high-resolution square-halftone artwork
    useEffect(() => {
        const img = new Image();
        img.src = '/images/taj-mahal-ascii.png';
        img.onload = () => {
            imageRef.current = img;

            // Create offscreen canvas for fast strip slicing
            const off = document.createElement('canvas');
            off.width = img.naturalWidth || 722;
            off.height = img.naturalHeight || 425;
            const offCtx = off.getContext('2d');
            if (offCtx) {
                offCtx.imageSmoothingEnabled = false;
                offCtx.drawImage(img, 0, 0, off.width, off.height);
                offscreenRef.current = off;
            }
            setImageLoaded(true);
        };
    }, []);

    // Main real-time animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 722;
        const H = 425;
        canvas.width = W;
        canvas.height = H;
        ctx.imageSmoothingEnabled = false;

        let animationFrameId;
        let t = 0;
        let lastTime = performance.now();
        let frameCount = 0;
        let lastFpsUpdate = performance.now();

        const render = (now) => {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            // Update FPS counter every 500ms
            frameCount++;
            if (now - lastFpsUpdate >= 500) {
                setFpsCounter(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
                frameCount = 0;
                lastFpsUpdate = now;
            }

            if (isPlaying) {
                t += dt * speed;
            }

            const img = imageRef.current;
            const offCanvas = offscreenRef.current;

            if (img && offCanvas && imageLoaded) {
                // 1. Draw base crisp square-matrix artwork
                ctx.drawImage(offCanvas, 0, 0, W, H);

                // 2. Sinusoidal Water Ripple Engine in Reflecting Pool (y: 238 to 425)
                // Pool trapezoid coordinates in perspective
                const poolTopY = 238;
                const poolBottomY = 424;
                const stripH = 2;

                for (let y = poolTopY; y < poolBottomY; y += stripH) {
                    const normY = (y - poolTopY) / (poolBottomY - poolTopY);
                    const poolLeft = Math.max(10, Math.floor(328 - normY * 205));
                    const poolRight = Math.min(W - 10, Math.ceil(394 + normY * 205));
                    const poolWidth = poolRight - poolLeft;

                    if (poolWidth > 0) {
                        // Horizontal water wave displacement
                        const wave = Math.sin((y * 0.16) - (t * 3.2)) * (2.4 * normY);

                        // Draw sliced water reflection with displacement
                        ctx.drawImage(
                            offCanvas,
                            poolLeft, y, poolWidth, stripH,
                            poolLeft + wave, y, poolWidth, stripH
                        );

                        // Specular shimmer on wave crests
                        const shimmer = Math.sin((y * 0.28) - (t * 4.2));
                        if (shimmer > 0.88) {
                            ctx.fillStyle = `rgba(180, 210, 255, ${(shimmer - 0.88) * 1.8 * normY})`;
                            ctx.fillRect(poolLeft + wave + poolWidth * 0.35, y, poolWidth * 0.3, 1);
                        }
                    }
                }

                // 3. Moon Atmospheric Luminescence (Center: 578, 60)
                const moonPulse = 0.88 + Math.sin(t * 1.8) * 0.12;
                const moonGrad = ctx.createRadialGradient(578, 60, 16, 578, 60, 56);
                moonGrad.addColorStop(0, `rgba(255, 253, 240, ${0.12 * moonPulse})`);
                moonGrad.addColorStop(0.5, `rgba(140, 175, 225, ${0.06 * moonPulse})`);
                moonGrad.addColorStop(1, 'rgba(10, 16, 32, 0)');
                ctx.fillStyle = moonGrad;
                ctx.beginPath();
                ctx.arc(578, 60, 56, 0, Math.PI * 2);
                ctx.fill();

                // 4. Soaring Silhouetted Night Birds
                const numBirds = 3;
                for (let bi = 0; bi < numBirds; bi++) {
                    const birdSpeed = 24 + bi * 4;
                    const bx = ((W + 80) - ((t * birdSpeed + bi * 130) % (W + 140))) - 40;
                    const by = 54 + Math.sin(t * 1.8 + bi * 2) * 8 + bi * 16;
                    const wingFlap = Math.sin(t * 9 + bi);

                    // Draw minimalist 3-dot ASCII bird (\v/)
                    ctx.fillStyle = '#060A14';
                    // Center body
                    ctx.fillRect(Math.round(bx), Math.round(by), 2, 2);
                    // Left & Right wings
                    const wingOff = wingFlap > 0 ? -1 : 1;
                    ctx.fillRect(Math.round(bx - 2), Math.round(by + wingOff), 2, 1);
                    ctx.fillRect(Math.round(bx + 2), Math.round(by + wingOff), 2, 1);
                }
            } else {
                // Loading fallback screen
                ctx.fillStyle = '#06080D';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#F59E0B';
                ctx.font = '12px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('INITIALIZING 16:9 SQUARE MATRIX RENDERER...', W / 2, H / 2);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, speed, imageLoaded]);

    return (
        <section className="ascii-interlude-section font-mono" id={`interlude-${interludeNumber}`}>
            {/* Top Film Strip Header */}
            <div className="section-film-badge font-mono">
                <span className="badge-film">INTERLUDE {interludeNumber} // SACRED ARCHITECTURE</span>
                <span className="badge-film">{title}</span>
                <span className="badge-film">16:9 MONOSPACE SQUARE MATRIX</span>
            </div>

            {/* Main Dual Interlude Layout */}
            <div className="interlude-layout-grid">
                {/* Left/Top: Sacred Bhagavad Gita Quote Dock */}
                <motion.div
                    className="interlude-quote-dock"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="quote-brass-plate font-mono">
                        <div className="plate-header">
                            <span className="plate-dot" />
                            <span className="plate-title chromatic-bold">{verse.anchor}</span>
                            <span className="plate-ref font-mono">[SACRED SANSKRIT // {verse.reference}]</span>
                        </div>

                        <div className="plate-sanskrit">
                            <p className="sanskrit-devanagari">{verse.sanskrit}</p>
                        </div>

                        <div className="plate-translation">
                            <span className="quote-mark">&ldquo;</span>
                            {verse.translation}
                            <span className="quote-mark">&rdquo;</span>
                        </div>

                        <div className="plate-footer font-mono">
                            <span className="footer-tag">HISTORICAL CONTEXT: AGRA, INDIA</span>
                            <span className="footer-sep">•</span>
                            <span className="footer-tag">THE ARCHITECTURE OF SILENCE & CRAFT</span>
                        </div>
                    </div>

                    <div className="interlude-desc-box">
                        {subtitle && (
                            <p className="interlude-subtext font-mono">
                                {subtitle}
                            </p>
                        )}

                        {/* Interactive Look & Playback Controls Matching User Spec */}
                        <div className="playback-toolbar font-mono">
                            <div className="toolbar-btn-group">
                                <button
                                    type="button"
                                    className={`tool-btn ${!isPlaying ? 'active' : ''}`}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    title={isPlaying ? 'Pause animation' : 'Resume animation'}
                                >
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                                <button
                                    type="button"
                                    className={`tool-btn ${speed === 0.5 ? 'active' : ''}`}
                                    onClick={() => { setSpeed(0.5); setIsPlaying(true); }}
                                >
                                    0.5x
                                </button>
                                <button
                                    type="button"
                                    className={`tool-btn ${speed === 1 ? 'active' : ''}`}
                                    onClick={() => { setSpeed(1); setIsPlaying(true); }}
                                >
                                    1x
                                </button>
                                <button
                                    type="button"
                                    className={`tool-btn ${speed === 2 ? 'active' : ''}`}
                                    onClick={() => { setSpeed(2); setIsPlaying(true); }}
                                >
                                    2x
                                </button>
                            </div>

                            <div className="toolbar-status font-mono">
                                <span className="status-badge-squares">LOOK: SQUARES [89%]</span>
                                <span className="fps-indicator">{fpsCounter} FPS</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right/Bottom: The Animated High-Def Canvas */}
                <motion.div
                    className="interlude-canvas-dock"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div className="canvas-frame-wrapper">
                        {/* CRT Scanline effect */}
                        <div className="crt-scanline-overlay" />

                        <canvas
                            ref={canvasRef}
                            className="ascii-landscape-canvas"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                imageRendering: 'pixelated',
                            }}
                        />

                        {/* Analog Overlay Meta Stamp */}
                        <div className="canvas-meta-stamp font-mono">
                            <span>MOONLIT MAUSOLEUM // 16:9 MONOSPACE SQUARES (722×425 HD)</span>
                            <span className="stamp-live">[ REAL-TIME RIPPLE ENGINE ]</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
