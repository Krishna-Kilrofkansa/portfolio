'use client';

export default function ModeToggle({ isDarkMode, isMonoMode, onToggleDark, onToggleMono, onToggleSearch }) {
    return (
        <div className="mode-toggle">
            <button
                className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
                id="darkModeToggle"
                onClick={onToggleDark}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                {isDarkMode ? (
                    <i className="fa-solid fa-sun"></i>
                ) : (
                    <i className="fa-solid fa-moon"></i>
                )}
            </button>
            <button
                className={`toggle-btn ${isMonoMode ? 'active' : ''}`}
                id="monoModeToggle"
                onClick={onToggleMono}
                title="Toggle Monospace Font"
            >
                <i className="fa-solid fa-code"></i>
            </button>
            <button
                className="toggle-btn"
                id="searchToggle"
                onClick={onToggleSearch}
                title="Search"
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
}
