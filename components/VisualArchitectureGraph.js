'use client';

import { useState } from 'react';

/**
 * VisualArchitectureGraph
 * Renders an interactive, graph-based visual architecture diagram with SVG node connections,
 * glowing data pulses, status indicators, and detail inspection cards.
 */
export default function VisualArchitectureGraph({ stages = [], title = 'System Architecture Pipeline' }) {
    const [selectedNode, setSelectedNode] = useState(null);

    if (!stages || stages.length === 0) return null;

    return (
        <div className="visual-arch-container font-mono">
            <div className="arch-header">
                <div className="arch-title-row">
                    <span className="arch-dot" />
                    <span className="arch-title-text chromatic-bold">{title}</span>
                    <span className="arch-legend font-mono">[CLICK ANY NODE TO INSPECT SPECS]</span>
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
                                    STEP 0{idx + 1} // {stage.role}
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
                                >
                                    <div className="node-badge-row font-mono">
                                        <span className={`node-type-pill ${stage.type?.toLowerCase() || 'default'}`}>
                                            {stage.type || 'MODULE'}
                                        </span>
                                        {stage.metric && (
                                            <span className="node-metric-pill">{stage.metric}</span>
                                        )}
                                    </div>

                                    <h4 className="node-title chromatic-subtle">{stage.name}</h4>
                                    <p className="node-plain-desc">{stage.plainDescription}</p>

                                    <div className="node-footer font-mono">
                                        <span className="tech-stack-tag">{stage.tech}</span>
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
                        <span className="insp-label chromatic-text">
                            [INSPECTING: {selectedNode.name}]
                        </span>
                        <button
                            type="button"
                            className="insp-close-btn"
                            onClick={() => setSelectedNode(null)}
                        >
                            ✕ CLOSE
                        </button>
                    </div>

                    <div className="inspector-grid">
                        <div className="insp-col">
                            <span className="insp-label font-mono">WHAT IT DOES (PLAIN ENGLISH):</span>
                            <p className="insp-text">{selectedNode.plainDescription}</p>
                        </div>
                        <div className="insp-col">
                            <span className="insp-label font-mono">LOW-LEVEL IMPLEMENTATION:</span>
                            <p className="insp-text font-mono text-xs">{selectedNode.technicalDetail}</p>
                        </div>
                        {selectedNode.inputOutput && (
                            <div className="insp-col">
                                <span className="insp-label font-mono">DATA CONTRACT (IN / OUT):</span>
                                <div className="io-contract font-mono text-xs">
                                    <div><strong>IN:</strong> {selectedNode.inputOutput.in}</div>
                                    <div><strong>OUT:</strong> {selectedNode.inputOutput.out}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
