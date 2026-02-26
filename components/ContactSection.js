'use client';

import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { trackEventFire } from '@/lib/telemetry';

export default function ContactSection() {
    const [status, setStatus] = useState('');

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
        <SectionWrapper id="contact">
            <h2>Contact</h2>
            <div className="project-card">
                <ul className="contact-links">
                    <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Motihari, Bihar, India</span>
                    </li>
                    <li>
                        <i className="fa-solid fa-envelope"></i>
                        <a
                            href="mailto:aakarshak.swaraj2023@vitstudent.ac.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEventFire('email_click')}
                        >
                            aakarshak.swaraj2023@vitstudent.ac.in
                        </a>
                    </li>
                    <li>
                        <i className="fa-brands fa-linkedin"></i>
                        <a
                            href="https://linkedin.com/in/aakarshak-swaraj-a3ba21290"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEventFire('linkedin_click')}
                        >
                            linkedin.com/in/aakarshak-swaraj
                        </a>
                    </li>
                    <li>
                        <i className="fa-solid fa-globe"></i>
                        <a
                            href="https://krishna-kilrofkansa.github.io/portfolio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEventFire('portfolio_link_click')}
                        >
                            Personal Portfolio
                        </a>
                    </li>
                </ul>
            </div>

            <h2 style={{ marginTop: '40px' }}>Send a Message</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="New message from Portfolio" />

                <label htmlFor="name">
                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Your Name
                </label>
                <input type="text" name="name" id="name" placeholder="John Doe" required />

                <label htmlFor="email">
                    <i className="fa-solid fa-at" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Your Email
                </label>
                <input type="email" name="email" id="email" placeholder="john@example.com" required />

                <label htmlFor="message">
                    <i className="fa-solid fa-message" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Write Message
                </label>
                <textarea name="message" id="message" rows="4" placeholder="Hi Aakarshak, I'd like to..." required></textarea>

                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <><i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Sending...</>
                    ) : (
                        <><i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }}></i>Send Message</>
                    )}
                </button>

                {status === 'success' && (
                    <p style={{ marginTop: '16px', color: 'var(--highlight-color)', fontWeight: 600, fontSize: '0.95rem' }}>
                        <i className="fa-solid fa-check-circle" style={{ marginRight: '6px' }}></i>
                        Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                )}
                {status === 'error' && (
                    <p style={{ marginTop: '16px', color: '#f7768e', fontWeight: 600, fontSize: '0.95rem' }}>
                        <i className="fa-solid fa-circle-xmark" style={{ marginRight: '6px' }}></i>
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </SectionWrapper>
    );
}
