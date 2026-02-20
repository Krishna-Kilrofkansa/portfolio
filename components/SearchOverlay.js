'use client';

import { useEffect, useRef, useState } from 'react';

const searchData = [
    { title: 'Python', content: 'Programming language', section: 'skills' },
    { title: 'Machine Learning', content: 'AI/ML expertise', section: 'skills' },
    { title: 'React.js', content: 'Frontend framework', section: 'skills' },
    { title: 'AWS', content: 'Cloud services', section: 'skills' },
    { title: 'Smart India Hackathon', content: 'SIH Finalist', section: 'accomplishments' },
    { title: 'VIT Chennai', content: 'Computer Science student', section: 'home' },
];

export default function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const results = query.length >= 2
        ? searchData.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const navigateToSection = (sectionId) => {
        onClose();
        setQuery('');
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
            setQuery('');
        }
    };

    return (
        <div
            id="searchOverlay"
            className={`search-overlay ${isOpen ? 'active' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="search-container">
                <input
                    type="text"
                    id="searchInput"
                    ref={inputRef}
                    placeholder="Search skills, projects, experience..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    id="closeSearch"
                    className="close-search"
                    onClick={() => { onClose(); setQuery(''); }}
                >
                    ×
                </button>
                <div id="searchResults" className="search-results">
                    {results.map((result, index) => (
                        <div
                            className="search-result"
                            key={index}
                            onClick={() => navigateToSection(result.section)}
                        >
                            <div className="search-result-title">{result.title}</div>
                            <div className="search-result-content">{result.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
