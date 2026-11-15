'use client';

import { trackEventFire } from '@/lib/telemetry';

export default function Footer() {
    return (
        <footer className="site-footer retro-footer">
            <div className="footer-content font-mono">
                <div className="footer-left">
                    <p className="footer-credit">
                        © {new Date().getFullYear()}{' '}
                        <span className="footer-name chromatic-bold">Aakarshak Swaraj</span>
                        <span className="footer-sep"> • </span>
                        <span className="footer-coords">Chennai ➔ Bengaluru, India</span>
                    </p>
                </div>

                <div className="footer-right">
                    <a
                        href="https://github.com/Krishna-Kilrofkansa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-nav-link"
                        onClick={() => trackEventFire('github_click', { source: 'footer' })}
                    >
                        GITHUB ↗
                    </a>
                    <a
                        href="https://www.linkedin.com/in/aakarshak-swaraj-a3ba21290"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-nav-link"
                        onClick={() => trackEventFire('linkedin_click', { source: 'footer' })}
                    >
                        LINKEDIN ↗
                    </a>
                    <a
                        href="https://www.instagram.com/akrshk.void/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-nav-link chromatic-text"
                        onClick={() => trackEventFire('instagram_click', { source: 'footer' })}
                    >
                        INSTAGRAM ↗
                    </a>
                    <a
                        href="mailto:aakarshak.work@gmail.com"
                        className="footer-nav-link chromatic-subtle"
                        onClick={() => trackEventFire('email_click', { source: 'footer' })}
                    >
                        EMAIL ↗
                    </a>
                </div>
            </div>
        </footer>
    );
}
