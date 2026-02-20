'use client';

import SectionWrapper from './SectionWrapper';

export default function ContactSection() {
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
                        <a href="mailto:aakarshak.swaraj2023@vitstudent.ac.in" target="_blank" rel="noopener noreferrer">
                            aakarshak.swaraj2023@vitstudent.ac.in
                        </a>
                    </li>
                    <li>
                        <i className="fa-brands fa-linkedin"></i>
                        <a href="https://linkedin.com/in/aakarshak-swaraj-a3ba21290" target="_blank" rel="noopener noreferrer">
                            linkedin.com/in/aakarshak-swaraj
                        </a>
                    </li>
                    <li>
                        <i className="fa-solid fa-globe"></i>
                        <a href="https://krishna-kilrofkansa.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                            Personal Portfolio
                        </a>
                    </li>
                </ul>
            </div>

            <h2 style={{ marginTop: '40px' }}>Send a Message</h2>
            <form
                action="https://docs.google.com/forms/d/e/1FAIpQLSf1i9q8ki8OdpTXdZ7mWGD8Iu-6TgJKgXd02PS4bR9pOj4TVQ/formResponse"
                method="POST"
                target="_blank"
            >
                <label htmlFor="name">
                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Your Name
                </label>
                <input type="text" name="entry.1862532032" id="name" placeholder="John Doe" required />

                <label htmlFor="email">
                    <i className="fa-solid fa-at" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Your Email
                </label>
                <input type="email" name="entry.1666166505" id="email" placeholder="john@example.com" required />

                <label htmlFor="message">
                    <i className="fa-solid fa-message" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                    Write Message
                </label>
                <textarea name="entry.602517742" id="message" rows="4" placeholder="Hi Aakarshak, I'd like to..." required></textarea>

                <button type="submit">
                    <i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }}></i>
                    Send Message
                </button>
            </form>
        </SectionWrapper>
    );
}
