'use client';

import SectionWrapper from './SectionWrapper';

const experiences = [
    {
        role: 'Software Engineer Intern',
        company: 'QCecuring Technologies, New Delhi, India',
        date: 'Oct 2025 - Dec 2025',
        bullets: [
            'Built a workflow-based Code Signing platform enabling developers and DevOps engineers to sign code on demand via a self-service portal with client-side hashing for faster signing without uploading large build files.',
            'Implemented Quorum-based approval workflows to prevent private key leakage, ensuring every code signing request passes through multiple approvers before execution.',
            'Developed complete activity tracking and audit logging for all code signing operations, supporting enterprise compliance and transparency requirements.',
            'Contributed to the PKI-as-a-Service module — a cloud-native Public Key Infrastructure with automated certificate lifecycle management and seamless cloud platform integration.',
            'Collaborated in a two-person team with daily Scrum meetings to deliver features iteratively.',
        ],
    },
    {
        role: 'Webmaster',
        company: 'ACM Club, VIT Chennai',
        date: 'Sep 2025 - Present',
        bullets: [
            "Manages and updates the club's official web presence.",
            'Mentors 15+ peers in competitive programming algorithms and data structures.',
        ],
    },
    {
        role: 'Levitation Engineer',
        company: 'Team Dromos, VIT Chennai',
        date: 'Jan 2025 - Present',
        bullets: [
            'Contributed to levitation system simulations that identified a 10% efficiency improvement for the proposed high-speed transport model.',
        ],
    },
    {
        role: 'Member',
        company: 'Game Development Club, VIT Chennai',
        date: 'Jul 2024 - Jul 2025',
        bullets: [
            'Collaborated with a partner in a 24-hour hackathon to rapidly prototype a 3D puzzle game using Unity and C#.',
            'Spearheaded a 5-hour high-traffic public gaming event, engaging over 50 students and boosting club visibility.',
        ],
    },
    {
        role: 'Junior Engineer',
        company: 'Team Ignition, VIT Chennai',
        date: 'Apr 2024 - Sep 2024',
        bullets: [
            "Designed and modeled the rocket's primary airframe using SolidWorks, optimizing for aerodynamic performance.",
            'Validated the structural integrity of the design against launch stresses exceeding 15 Gs using ANSYS.',
        ],
    },
];

export default function ExperienceSection() {
    return (
        <SectionWrapper id="experience">
            <h2>Experience &amp; Activities</h2>
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-role">{exp.role}</div>
                        <div className="timeline-company">{exp.company}</div>
                        <div className="timeline-date">{exp.date}</div>
                        <ul className="timeline-description">
                            {exp.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
