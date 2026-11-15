'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BlueprintLens({
    title,
    surfaceLabel,
    blueprintLabel,
    surfaceContent,
    blueprintContent,
    metrics = [],
}) {
    const frameRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, isInside: false });

    const handleMouseMove = (e) => {
        if (!frameRef.current) return;
        const rect = frameRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isInside: true,
        });
    };

    const handleMouseLeave = () => {
        setMousePos((prev) => ({ ...prev, isInside: false }));
    };

    return (
        <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="blueprint-lens-wrapper"
        >
            {/* Top film badge */}
            <div className="lens-top-bar font-mono">
                <span className="lens-mode">
                    {mousePos.isInside ? '⚡ X-RAY BLUEPRINT INVERT ACTIVE' : 'SURFACE UI VIEW'}
                </span>
                <span className="lens-tip">HOVER CURSOR TO INVERT PIXELS & REVEAL MEMORY</span>
            </div>

            <div className="lens-viewport">
                {/* Surface Polished View */}
                <div className="lens-layer surface-layer">
                    <div className="layer-tag font-mono">{surfaceLabel}</div>
                    {surfaceContent}
                </div>

                {/* Blueprint Low-Level View (Revealed via clip-path circle or revealed on hover) */}
                <div
                    className="lens-layer blueprint-layer"
                    style={{
                        clipPath: mousePos.isInside
                            ? `circle(140px at ${mousePos.x}px ${mousePos.y}px)`
                            : 'circle(0px at 50% 50%)',
                        transition: mousePos.isInside ? 'none' : 'clip-path 0.4s ease-out',
                    }}
                >
                    <div className="layer-tag blueprint-tag font-mono chromatic-text">
                        [BLUEPRINT: {blueprintLabel}]
                    </div>
                    {blueprintContent}
                </div>

                {/* Magnetic Crosshair Cursor Follower */}
                {mousePos.isInside && (
                    <div
                        className="blueprint-cursor-ring"
                        style={{
                            left: `${mousePos.x}px`,
                            top: `${mousePos.y}px`,
                        }}
                    >
                        <span className="crosshair-center" />
                        <span className="crosshair-coords font-mono">
                            {Math.round(mousePos.x)},{Math.round(mousePos.y)}
                        </span>
                    </div>
                )}
            </div>

            {/* Metrics HUD under lens */}
            {metrics.length > 0 && (
                <div className="lens-metrics-strip font-mono">
                    {metrics.map((m, i) => (
                        <div key={i} className="lens-metric-pill">
                            <span className="m-label">{m.label}:</span>
                            <span className="m-val chromatic-subtle">{m.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

