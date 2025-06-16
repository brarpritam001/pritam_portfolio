import { useState, useEffect } from 'react';
import './FloatingNav.css';

interface FloatingNavProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const FloatingNav = ({ darkMode, toggleDarkMode }: FloatingNavProps) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`floating-nav-container ${isNavExpanded ? 'expanded' : ''} ${scrolled ? 'scrolled' : ''}`}>
            <div className="floating-buttons-container">
                {/* Dark mode toggle button */}
                <button
                    className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`}
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    <span className="nav-icon">
                        {darkMode ? '🌙' : '☀️'}
                    </span>
                </button>

                {/* Main toggle button */}
                <button
                    className="floating-nav-toggle"
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                    aria-label="Toggle navigation"
                >
                    <span className="nav-icon">
                        {isNavExpanded ? '✕' : '☰'}
                    </span>
                </button>
            </div>

            {/* Navigation panel */}
            <nav className={`floating-nav ${isNavExpanded ? 'expanded' : ''} ${darkMode ? 'dark' : ''}`}>
                <div className="nav-content">
                    <div className="nav-header">
                        <h3>Navigation</h3>
                        <div className="nav-divider" />
                    </div>
                    <ul className="nav-links">
                        {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                            <li key={item} className="nav-link">
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsNavExpanded(false)}
                                >                                    
                                    <span>{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default FloatingNav;