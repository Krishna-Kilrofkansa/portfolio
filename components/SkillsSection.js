'use client';

import { useState } from 'react';
import SectionWrapper from './SectionWrapper';

const skillCategories = [
    {
        name: 'Languages',
        skills: ['Python', 'Java', 'SQL', 'C#', 'C++', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
        name: 'Frameworks & Libraries',
        skills: ['Spring Boot', 'Angular', 'React.js', 'Node.js'],
    },
    {
        name: 'ML / AI',
        skills: ['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'CNN', 'Transfer Learning'],
    },
    {
        name: 'Databases',
        skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'H2'],
    },
    {
        name: 'Cloud',
        skills: ['AWS (EC2, S3, Lambda)', 'AWS (SageMaker, Beanstalk)'],
    },
    {
        name: 'Tools',
        skills: ['Git', 'GitHub', 'Docker', 'Linux', 'Agile', 'Unity', 'SolidWorks', 'ANSYS'],
    },
];

const languages = [
    'English (Bilingual or Proficient - C2)',
    'Hindi (Bilingual or Proficient - C2)',
    'French (Upper Intermediate - B2)',
    'Gujarati (Intermediate - B1)',
];

const education = [
    { text: 'Bachelor of Technology: Computer Science', sub: 'Vellore Institute of Technology - Chennai, India', extra: 'Expected in 2027-08' },
    { text: 'AISSCE Class 12th', sub: 'Delhi Public School - Ranchi, India', extra: 'Grade: 90%' },
    { text: 'AISSE Class 10th', sub: 'Sarala Birla Public School - Ranchi, India', extra: 'Final Grade: 94.5%' },
];

const hobbies = [
    { name: 'Drawing', desc: 'Enjoy creating traditional artwork, exploring different styles and techniques.' },
    { name: 'Writing', desc: 'Passionate about writing creative stories, blogs, and technical articles to express ideas effectively.' },
    { name: 'Reading Books', desc: 'Enthusiastic reader of fiction and non-fiction, with a keen interest in science, technology, and personal development.' },
    { name: 'Sports & Games', desc: 'Actively play soccer, cricket, badminton, chess, and swimming, enjoying both competitive and recreational play.' },
];

export default function SkillsSection() {
    const [collapsed, setCollapsed] = useState(() => {
        const initial = {};
        skillCategories.forEach((_, i) => { initial[i] = true; });
        return initial;
    });

    const toggleCategory = (index) => {
        setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <SectionWrapper id="skills">
            <h2>Skills</h2>
            <div className="projects-grid">
                {/* Technical Skills */}
                <div className="project-card">
                    <h3 className="project-title">Technical Skills</h3>
                    {skillCategories.map((category, index) => (
                        <div className="skill-category" key={index}>
                            <h3 className="skill-header" onClick={() => toggleCategory(index)}>
                                {category.name}{' '}
                                <span
                                    className="toggle-arrow"
                                    style={{ transform: collapsed[index] ? 'rotate(0deg)' : 'rotate(90deg)' }}
                                >
                                    ▶
                                </span>
                            </h3>
                            <div className={`tags skill-content ${collapsed[index] ? 'collapsed' : ''}`}>
                                {category.skills.map((skill, i) => (
                                    <span className="tag" key={i}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Languages */}
                <div className="project-card">
                    <h3 className="project-title">Languages</h3>
                    <ul className="timeline-description">
                        {languages.map((lang, i) => (
                            <li key={i}>{lang}</li>
                        ))}
                    </ul>
                </div>

                {/* Education */}
                <div className="project-card">
                    <h3 className="project-title">Education</h3>
                    <ul className="timeline-description">
                        {education.map((edu, i) => (
                            <li key={i}>
                                {edu.text}<br />
                                {edu.sub}<br />
                                {edu.extra}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Hobbies */}
                <div className="project-card">
                    <h3 className="project-title">Hobbies</h3>
                    <ul className="timeline-description">
                        {hobbies.map((hobby, i) => (
                            <li key={i}>
                                <strong>{hobby.name}:</strong> {hobby.desc}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
