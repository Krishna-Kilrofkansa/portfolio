'use client';

import SectionWrapper from './SectionWrapper';
import { trackEventFire } from '@/lib/telemetry';

export default function ResumeSection() {
    const handleDownload = () => {
        trackEventFire('resume_download');
    };

    return (
        <SectionWrapper id="resume">
            <h2>Resume</h2>
            <div className="project-card" style={{ textAlign: 'center', padding: '40px 28px' }}>
                <p style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '1rem' }}>
                    <i className="fa-solid fa-file-pdf" style={{ fontSize: '2.5rem', marginBottom: '12px', display: 'block', color: 'var(--primary-color)' }}></i>
                    Download my latest resume to learn more about my experience and skills.
                </p>
                <a href="/Aakarshak-resume.pdf" className="view-btn" download onClick={handleDownload}>
                    Download Resume
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                    </svg>
                </a>
                <a href="/a1.ipynb" className="view-btn" download onClick={handleDownload}>
                    Download Resume
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                    </svg>
                </a>
            </div>
        </SectionWrapper>
    );
}
