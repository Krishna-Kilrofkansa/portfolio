'use client';

import { useEffect, useRef } from 'react';

export default function LoadingScreen({ isLoading }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isLoading && ref.current) {
            ref.current.style.opacity = '0';
            const timer = setTimeout(() => {
                if (ref.current) ref.current.style.display = 'none';
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <div className="loading-screen" id="loadingScreen" ref={ref}>
            <div className="loading-animation">
                <div className="loading-text">Aakarshak Swaraj</div>
                <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                </div>
            </div>
        </div>
    );
}
