'use client';

import { useState } from 'react';

/**
 * VisualArchitectureGraph
 * Renders an interactive, graph-based visual architecture diagram with SVG node connections,
 * glowing data pulses, status indicators, and detail inspection cards.
 * Follows strict dark-obsidian and warm amber palette rules (no rainbow color schemes).
 */
export default function VisualArchitectureGraph({ stages = [], title = 'System Architecture Pipeline' }) {
    // Default to first stage selected so inspection details are immediately visible
    const [selectedNode, setSelectedNode] = useState(stages && stages.length > 0 ? stages[0] : null);

    if (!stages || stages.length === 0) return null;

    return (
        <div className="visual-arch-container font-mono">
            <div className="arch-header">
                <div className="arch-title-row">
                    <span className="arch-dot" />
                    <span className="arch-title-text chromatic-bold">{title}</span>
                    <span className="arch-legend font-mono">[CLICK ANY NODE TO INSPECT SPECS & CONTRACTS]</span>
                </div>
            </div>

            {/* Visual Node Flow Grid */}
            <div className="arch-flow-wrapper">
                <div className="arch-stages-row">
                    {stages.map((stage, idx) => {
                        const isSelected = selectedNode?.id === stage.id;
                        return (
                            <div key={stage.id || idx} className="arch-stage-column">
                                <div className="stage-step-tag font-mono">
                                    <span className="step-num-badge">0{idx + 1}</span>
                                    <span className="step-role-text">{stage.role}</span>
                                </div>

                                <div
                                    className={`arch-node-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => setSelectedNode(stage)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedNode(stage);
                                        }
                                    }}
                                    aria-label={`Inspect ${stage.name}`}
                                >
                                    <div className="node-badge-row font-mono">
                                        <span className="node-type-pill">
                                            {stage.type || 'MODULE'}
                                        </span>
                                        {stage.metric && (
                                            <span className="node-metric-pill font-mono">{stage.metric}</span>
                                        )}
                                    </div>

                                    <h4 className="node-title chromatic-subtle">{stage.name}</h4>
                                    <p className="node-plain-desc">{stage.plainDescription}</p>

                                    <div className="node-footer font-mono">
                                        <span className="tech-stack-tag">{stage.tech}</span>
                                        <span className="node-inspect-cta">
                                            {isSelected ? 'ACTIVE ●' : 'INSPECT ➔'}
                                        </span>
                                    </div>

                                    {/* Connection Arrow (if not last) */}
                                    {idx < stages.length - 1 && (
                                        <div className="arch-connector-arrow">
                                            <span className="arrow-line" />
                                            <span className="arrow-pulse" />
                                            <span className="arrow-head">▶</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Selected Node Inspector Drawer */}
            {selectedNode && (
                <div className="arch-node-inspector animate-fadeIn">
                    <div className="inspector-header font-mono">
                        <div className="insp-header-left">
                            <span className="insp-badge">SPECIFICATION DRAWER</span>
                            <span className="insp-title chromatic-bold">
                                [INSPECTING: {selectedNode.name}]
                            </span>
                        </div>
                        <button
                            type="button"
                            className="insp-close-btn font-mono"
                            onClick={() => setSelectedNode(null)}
                            aria-label="Close inspector drawer"
                        >
                            [ ✕ CLOSE ]
                        </button>
                    </div>

                    <div className="inspector-grid">
                        <div className="insp-col">
                            <span className="insp-label font-mono">01 // WHAT IT DOES (PLAIN ENGLISH):</span>
                            <p className="insp-text">{selectedNode.plainDescription}</p>
                        </div>
                        <div className="insp-col">
                            <span className="insp-label font-mono">02 // LOW-LEVEL IMPLEMENTATION:</span>
                            <p className="insp-text font-mono text-xs">{selectedNode.technicalDetail}</p>
                        </div>
                        {selectedNode.inputOutput && (
                            <div className="insp-col span-full">
                                <span className="insp-label font-mono">03 // VERIFIED DATA CONTRACT (IN / OUT):</span>
                                <div className="io-contract font-mono text-xs">
                                    <div className="io-row">
                                        <span className="io-badge in">IN</span>
                                        <span className="io-val">{selectedNode.inputOutput.in}</span>
                                    </div>
                                    <div className="io-row">
                                        <span className="io-badge out">OUT</span>
                                        <span className="io-val">{selectedNode.inputOutput.out}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
