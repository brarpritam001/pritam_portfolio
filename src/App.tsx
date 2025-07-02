import { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';
import FloatingNav from './components/FloatingNav/FloatingNav';
import Footer from './components/Footer/Footer';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="portfolio-container">
            <FloatingNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <HeroSection />
            <SkillsSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default App;