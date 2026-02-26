'use client';

import { trackEventFire } from '@/lib/telemetry';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p className="footer-credit">
                    Designed &amp; Built by <span className="footer-name">Aakarshak Swaraj</span>
                </p>
                <p className="footer-rights">
                    © {currentYear} All Rights Reserved
                </p>
                <div className="footer-links">
                    <a
                        href="https://github.com/krishna-kilrofkansa"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        onClick={() => trackEventFire('github_click', { source: 'footer' })}
                    >
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a
                        href="https://linkedin.com/in/aakarshak-swaraj-a3ba21290"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        onClick={() => trackEventFire('linkedin_click', { source: 'footer' })}
                    >
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a
                        href="mailto:aakarshak.swaraj2023@vitstudent.ac.in"
                        title="Email"
                        onClick={() => trackEventFire('email_click', { source: 'footer' })}
                    >
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
