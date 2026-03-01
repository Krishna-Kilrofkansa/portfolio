'use client';

import { useRef, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { trackEventFire } from '@/lib/telemetry';

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87c0-.6.2-1.17.6-1.63.2-.2.5-.3.8-.5C17.3 12.8 17.6 12 17.6 12s-3.2-1.2-3.2-5.5c0-.9.3-1.7.9-2.4 0 0 .1-.8-.3-2.2 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8-.4 1.4-.3 2.2-.3 2.2.6.7.9 1.5.9 2.4 0 4.3-3.2 5.5-3.2 5.5 0 .8.3 1.5.8 2 .3.2.5.3.8.5.4.5.6 1.1.6 1.63V22"></path>
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
    </svg>
);

const projects = [
    {
        title: 'Team Dromos Website',
        description:
            'Showcasing the Team Dromos Hyperloop technology website with modern React 18 and smooth animations. 2nd place Global Hyperloop Competition 2025.',
        tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
        github: 'https://github.com/krishna-kilrofkansa/team-dromos-website',
        live: 'https://team-dromos-website.vercel.app/',
        type: 'Web App',
        icon: '🚄',
    },
    {
        title: 'EntertainmentHub',
        description:
            'All-in-One platform for Movies, Anime, Manhwa, and Books. Spring Boot backend manages auth and serves aggregated content from MongoDB, with a React frontend.',
        tags: ['Spring Boot', 'React', 'MongoDB', 'Java', 'REST API'],
        github: 'https://github.com/krishna-kilrofkansa/entertainmenthub',
        live: 'https://entertainmenthub-delta.vercel.app',
        type: 'Full-Stack',
        icon: '🎬',
    },
    {
        title: 'Task Manager Assessment',
        description:
            'Full-Stack Task Manager Dashboard with enterprise-grade audit log, secure CRUD operations, and multi-tenant support built with Spring Boot and Angular.',
        tags: ['Spring Boot', 'Angular', 'Java', 'MongoDB', 'Spring Security'],
        github: 'https://github.com/krishna-kilrofkansa/task-manager-assessment',
        live: 'public/a1.ipynb',
        type: 'Full-Stack',
        icon: '✅',
    },
    {
        title: 'Circle (Mobile App)',
        description:
            'A cross-platform Flutter application supporting Android, iOS, Windows, Linux, macOS, and web. Focus productivity tool with visual session tracking.',
        tags: ['Flutter', 'Dart', 'Cross-Platform', 'Mobile'],
        github: 'https://github.com/krishna-kilrofkansa/circle',
        live: null,
        apk: '/circles.apk',
        type: 'Mobile App',
        icon: '📱',
    },
    {
        title: 'Legal Sentiment Analyzer',
        description:
            'Few-shot sentiment analysis tool for legal documents built on IBM Watson AI. Uses FLAN-T5 models via IBM Watson Machine Learning for classification.',
        tags: ['Python', 'IBM Watson AI', 'FLAN-T5', 'NLP', 'Jupyter'],
        github: 'https://github.com/krishna-kilrofkansa/legal-sentiment-analyzer',
        live: null,
        type: 'AI/ML',
        icon: '⚖️',
    },
    {
        title: 'YTscraper',
        description:
            'YouTube data scraping and processing tool. Extracts video metadata, statistics, and trends for analysis and visualization.',
        tags: ['Python', 'JavaScript', 'Web Scraping'],
        github: 'https://github.com/krishna-kilrofkansa/YTscraper',
        live: 'https://ytscraper-b4x2.onrender.com',
        type: 'Web Scraper',
        icon: '📊',
    },
    {
        title: 'Movie App',
        description:
            'Movie discovery and information application. Browse, search, and explore movies with a clean, responsive React interface.',
        tags: ['React', 'JavaScript', 'API Integration'],
        github: 'https://github.com/krishna-kilrofkansa/Movie-app',
        live: 'https://movie-app-tawny-kappa-58.vercel.app/',
        type: 'Web App',
        icon: '🎥',
    },
    {
        title: 'Circles (Web)',
        description:
            'Interactive circles web application built with React. Hosted on GitHub Pages — currently in active development.',
        tags: ['React', 'JavaScript', 'GitHub Pages'],
        github: 'https://github.com/krishna-kilrofkansa/Circles',
        live: 'https://krishna-kilrofkansa.github.io/Circles/',
        type: 'Web App',
        icon: '⭕',
    },
    {
        title: 'Codesigning',
        description:
            'Code signing certificate manager project for managing and automating code signing workflows in development pipelines.',
        tags: ['Backend', 'Security', 'DevOps'],
        github: null,
        live: null,
        type: 'Tool',
        icon: '🔐',
    },
    {
        title: 'Portfolio Website',
        description:
            'This responsive personal portfolio built from scratch. Hosted on Vercel with CI/CD pipeline for automatic deployment.',
        tags: ['Next.js', 'React', 'CSS', 'Vercel'],
        github: 'https://github.com/krishna-kilrofkansa/portfolio',
        live: 'https://akiportfolio.vercel.app',
        type: 'Portfolio',
        icon: '🌐',
    },
];

export default function ProjectsSection() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
        trackEventFire('project_scroll', { direction });
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

            const maxScrollLeft = el.scrollWidth - el.clientWidth;
            const atStart = el.scrollLeft <= 0;
            const atEnd = el.scrollLeft >= maxScrollLeft - 1;

            if (e.deltaY > 0 && !atEnd) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            } else if (e.deltaY < 0 && !atStart) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    const handleProjectClick = (project, linkType) => {
        trackEventFire('project_click', {
            project_title: project.title,
            link_type: linkType,
        });
    };

    return (
        <SectionWrapper id="projects">
            <div className="projects-header">
                <h2>Projects</h2>
                <div className="scroll-arrows">
                    <button className="scroll-arrow" onClick={() => scroll('left')} aria-label="Scroll left">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="scroll-arrow" onClick={() => scroll('right')} aria-label="Scroll right">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div className="projects-scroll" ref={scrollRef}>
                {projects.map((project, index) => (
                    <div className="project-card project-card-scroll" key={index}>
                        <div className="project-card-header">
                            <span className="project-icon">{project.icon}</span>
                            <span className="project-type">{project.type}</span>
                        </div>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="tags">
                            {project.tags.map((tag, i) => (
                                <span className="tag" key={i}>{tag}</span>
                            ))}
                        </div>
                        <div className="project-links">
                            {project.github && (
                                <a
                                    href={project.github}
                                    className="view-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleProjectClick(project, 'github')}
                                >
                                    GitHub <GitHubIcon />
                                </a>
                            )}
                            {project.live && (
                                <a
                                    href={project.live}
                                    className="view-btn view-btn-live"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleProjectClick(project, 'live_demo')}
                                >
                                    Live Demo <ArrowIcon />
                                </a>
                            )}
                            {project.apk && (
                                <a
                                    href={project.apk}
                                    className="view-btn view-btn-apk"
                                    download
                                    onClick={() => handleProjectClick(project, 'apk_download')}
                                >
                                    <i className="fa-brands fa-android" style={{ marginRight: '6px' }}></i>
                                    APK
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
