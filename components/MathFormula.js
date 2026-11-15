'use client';

import { useMemo } from 'react';
import katex from 'katex';

/**
 * MathFormula
 * Renders mathematical formulas using KaTeX with display-grade mathematical typography,
 * proper fractions, superscripts, subscripts, Greek symbols, and summation limits.
 * Avoids raw monospaced code blocks for mathematical expressions.
 */
export default function MathFormula({ formula, label = 'MATHEMATICAL FORMULATION', id }) {
    const renderedHtml = useMemo(() => {
        if (!formula) return null;
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: false,
                strict: false,
            });
        } catch (err) {
            console.error('KaTeX rendering error for formula:', formula, err);
            return null;
        }
    }, [formula]);

    if (!formula) return null;

    return (
        <div className="math-formula-card" id={id ? `math-eq-${id}` : undefined}>
            <div className="math-formula-header font-mono">
                <div className="math-header-left">
                    <span className="math-dot" />
                    <span className="math-tag">MATHEMATICAL SPECIFICATION</span>
                </div>
                {label && <span className="math-label font-mono">{label}</span>}
            </div>

            <div className="math-display-viewport">
                {renderedHtml ? (
                    <div
                        className="katex-display-container"
                        dangerouslySetInnerHTML={{ __html: renderedHtml }}
                    />
                ) : (
                    <div className="math-fallback-text font-mono">
                        {formula}
                    </div>
                )}
            </div>
        </div>
    );
}
