'use client';

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export default function EasterEgg() {
    const [triggered, setTriggered] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let inputSequence = [];

        const handleKeyDown = (e) => {
            inputSequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);

            // Check if the latest inputs match the Konami code
            const slice = inputSequence.slice(-KONAMI_CODE.length);

            // Update progress indicator
            let matchCount = 0;
            for (let i = 0; i < slice.length && i < KONAMI_CODE.length; i++) {
                if (slice[i] === KONAMI_CODE[i]) matchCount++;
                else break;
            }

            if (slice.length <= KONAMI_CODE.length) {
                setProgress(matchCount / KONAMI_CODE.length);
            }

            if (
                slice.length === KONAMI_CODE.length &&
                slice.every((key, i) => key === KONAMI_CODE[i])
            ) {
                setTriggered(true);
                inputSequence = [];
                setTimeout(() => setTriggered(false), 4000);
            }

            // Keep only last 20 inputs
            if (inputSequence.length > 20) {
                inputSequence = inputSequence.slice(-20);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!triggered) return null;

    return (
        <div className="easter-egg-overlay">
            <div className="easter-egg-content">
                <div className="easter-egg-emoji">🎮</div>
                <h2 className="easter-egg-title">Achievement Unlocked!</h2>
                <p className="easter-egg-text">You found the Konami Code Easter Egg!</p>
                <p className="easter-egg-subtext">↑↑↓↓←→←→BA</p>
                <div className="confetti-container">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                                backgroundColor: ['#10b981', '#3ddc84', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'][
                                    Math.floor(Math.random() * 6)
                                ],
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
