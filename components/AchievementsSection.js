'use client';

import SectionWrapper from './SectionWrapper';

const achievements = [
    {
        title: 'Smart India Hackathon (SIH) Finalist',
        description: 'Our project, VARUNA, was shortlisted from 864 teams to the top 150, placing 51st in the internal round.',
        date: 'Sep 2025',
    },
    {
        title: 'National Semi-Finalist, Flipkart GRID 7.0',
        description: 'Achieved a national semi-finalist position in a prestigious hackathon organized by Flipkart Early Careers.',
        date: 'Aug 2025',
    },
    {
        title: 'Nokia AI Hackathon',
        description: 'Prototyped and launched a functional AI prototype in under 36 hours in collaboration with Nokia.',
        date: 'Dec 2024',
    },
    {
        title: '3rd Runner-up, DATASET \'24',
        description: 'Led Team AlgoMind to a National Hackathon Finalist position (3rd Runner-up), which resulted in an internship opportunity.',
        date: 'Dec 2024',
    },
    {
        title: 'Champion, Inter-College Coding Event',
        description: 'Secured 1st Place by surpassing 50+ other teams in a competitive coding event.',
        date: '2024',
    },
];

const certifications = [
    'Certificate in GEN AI Using IBM Watsonx (IBM, Jun 2025)',
    'Supervised Machine Learning: Regression and Classification (DeepLearning.AI, Dec 2024)',
];

export default function AchievementsSection() {
    return (
        <SectionWrapper id="accomplishments">
            <h2>Achievements &amp; Certifications</h2>

            <div className="achievements-block">
                <h3>Achievements</h3>
                <div className="timeline">
                    {achievements.map((item, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-role">{item.title}</div>
                            <div className="timeline-description">
                                <p>{item.description}</p>
                            </div>
                            <div className="timeline-date">{item.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="certifications-block">
                <h3>Certifications</h3>
                <ul className="cert-list">
                    {certifications.map((cert, index) => (
                        <li key={index}>
                            <i className="fa-solid fa-award"></i>
                            <span>{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    );
}
