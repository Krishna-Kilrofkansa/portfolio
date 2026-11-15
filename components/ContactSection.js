'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEventFire } from '@/lib/telemetry';

export default function ContactSection() {
    const [status, setStatus] = useState('');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const email = 'aakarshak.work@gmail.com';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        trackEventFire('email_copied');
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target);
        formData.append('access_key', '24c16f0d-5093-4659-8a2a-31ee8ede23c9');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                trackEventFire('contact_submit');
                e.target.reset();
                setTimeout(() => setStatus(''), 4000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(''), 4000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus(''), 4000);
        }
    };

    return (
        <section className="contact-vault-section" id="contact">
            <div className="section-film-badge font-mono">
                <span className="badge-film">CHAPTER 06 // DIRECT DISPATCH</span>
                <span className="badge-film">CONTACT & VERIFIED COORDINATES</span>
                <span className="badge-film">OPEN FOR ROLES</span>
            </div>

            <div className="contact-dual-layout">
                {/* Left Card: Direct Coordinates & 1-Click Copy */}
                <div className="contact-info-card">
                    <span className="contact-tag font-mono chromatic-text">[DIRECT DISPATCH]</span>
                    <h2 className="contact-heading chromatic-bold">Let&apos;s Build Systems Together</h2>
                    <p className="contact-sub font-mono">
                        Available for software engineering, systems, and AI/ML roles. Grounded in real telemetry, clean architectures, and honest post-mortems.
                    </p>

                    <div className="contact-channels font-mono">
                        {/* 1-Click Copy Email */}
                        <div className="channel-box highlight-channel">
                            <div className="channel-meta">
                                <span className="channel-lbl">PRIMARY INBOX</span>
                                <span className="channel-val">{email}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="copy-channel-btn"
                            >
                                {copiedEmail ? '✓ COPIED TO CLIPBOARD' : '⧉ 1-CLICK COPY'}
                            </button>
                        </div>

                        {/* GitHub */}
                        <a
                            href="https://github.com/Krishna-Kilrofkansa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-link-box"
                        >
                            <span className="channel-lbl">GITHUB CODEBASE</span>
                            <span className="channel-action">github.com/Krishna-Kilrofkansa ↗</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/aakarshak-swaraj-a3ba21290"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-link-box"
                        >
                            <span className="channel-lbl">LINKEDIN NETWORK</span>
                            <span className="channel-action">linkedin.com/in/aakarshak-swaraj ↗</span>
                        </a>

                        {/* LeetCode */}
                        <a
                            href="https://leetcode.com/u/Aakarshak_Swaraj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-link-box"
                        >
                            <span className="channel-lbl">LEETCODE CONTEST PROFILE</span>
                            <span className="channel-action">300+ Problems • Rating: 1508 ↗</span>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/akrshk.void/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-link-box"
                        >
                            <span className="channel-lbl">INSTAGRAM</span>
                            <span className="channel-action">instagram.com/akrshk.void ↗</span>
                        </a>

                        {/* Coordinates */}
                        <div className="channel-box coordinates-box">
                            <span className="channel-lbl">CURRENT COORDINATES</span>
                            <span className="channel-val chromatic-subtle">
                                Chennai (VIT Campus) ➔ Transitioning to Bengaluru, India
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Card: Direct Fast Dispatch Form */}
                <div className="contact-form-card">
                    <div className="form-header font-mono">
                        <span>QUICK ENCRYPTED DISPATCH // Web3Forms</span>
                    </div>

                    <form onSubmit={handleSubmit} className="retro-contact-form font-mono">
                        <div className="form-group">
                            <label htmlFor="contact-name">SENDER_NAME:</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                placeholder="Your Name / Team"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">RETURN_EMAIL:</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">DISPATCH_PAYLOAD:</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={4}
                                placeholder="Discuss a project, opening, or technical deep dive..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="form-submit-btn font-mono"
                        >
                            {status === 'sending' ? 'TRANSMITTING PACKET...' : 'DISPATCH MESSAGE ➔'}
                        </button>

                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    className="dispatch-alert success font-mono"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    ✓ PACKET DELIVERED. I WILL REPLY WITHIN 24 HOURS.
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    className="dispatch-alert error font-mono"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    ⚠ TRANSMISSION FAILED. PLEASE EMAIL DIRECTLY: aakarshak.work@gmail.com
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
}
