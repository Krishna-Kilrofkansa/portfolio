'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

export default function HomeSection() {
    const [displayText, setDisplayText] = useState('');
    const roleIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    const roles = [
        'Software Engineer Intern',
        'Full-Stack Developer',
        'AI/ML Enthusiast',
        'Computer Science Student',
        'Problem Solver',
        'Tech Innovator',
    ];

    useEffect(() => {
        const startDelay = setTimeout(() => {
            const type = () => {
                const currentRole = roles[roleIndexRef.current];

                if (isDeletingRef.current) {
                    charIndexRef.current--;
                    setDisplayText(currentRole.substring(0, charIndexRef.current));
                } else {
                    charIndexRef.current++;
                    setDisplayText(currentRole.substring(0, charIndexRef.current));
                }

                let typeSpeed = isDeletingRef.current ? 50 : 100;

                if (!isDeletingRef.current && charIndexRef.current === currentRole.length) {
                    typeSpeed = 2000;
                    isDeletingRef.current = true;
                } else if (isDeletingRef.current && charIndexRef.current === 0) {
                    isDeletingRef.current = false;
                    roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
                    typeSpeed = 500;
                }

                setTimeout(type, typeSpeed);
            };

            type();
        }, 2000);

        return () => clearTimeout(startDelay);
    }, []);

    return (
        <SectionWrapper id="home" className="profile-section">
            <Image
                src="/aki.jpg"
                alt="Aakarshak Swaraj"
                width={180}
                height={180}
                className="profile-photo"
                priority
            />
            <div className="bio">
                <div className="typewriter-container">
                    <h2>Hello! I&apos;m Aakarshak Swaraj</h2>
                    <div className="typewriter-text">
                        <span id="typewriter">{displayText}</span>
                        <span className="cursor">|</span>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
