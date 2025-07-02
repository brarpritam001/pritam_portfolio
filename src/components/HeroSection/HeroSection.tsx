import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './HeroSection.css'

const PritamHeroSection = () => {
    const [typedText, setTypedText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
    
    const pritamHeroRef = useRef<HTMLDivElement>(null);
    const pritamVideoRef = useRef<HTMLVideoElement>(null);
    const heroControls = useAnimation();
    const isHeroInView = useInView(pritamHeroRef, { once: true });
    
    const texts = useMemo(() => [
      "Web & Mobile App Developer",
      "Clean Code. Smooth UI",
      "User-First Design Approach",
      "Creating Seamless Digital Experiences",
      "UX/UI Designer & Web Developer",       
    ], []);

    useEffect(() => {
        if (isHeroInView) heroControls.start("visible");
    }, [isHeroInView, heroControls]);

    useEffect(() => {
        const type = () => {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                setTypedText(currentText.substring(0, typedText.length - 1));
                setTypingSpeed(50);
            } else {
                setTypedText(currentText.substring(0, typedText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && typedText === currentText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setCurrentTextIndex((currentTextIndex + 1) % texts.length);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(type, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, currentTextIndex, isDeleting, typingSpeed, texts]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const handleDownloadCV = () => {
        // Replace '/path/to/your-cv.pdf' with your actual PDF path
        window.open('/pritam_portfolio/public/Pritam_Resume.pdf', '_blank');
    };

    const handleVideoLoaded = () => {
        if (pritamVideoRef.current) {
            pritamVideoRef.current.play().catch(error => {
                console.error("Video play failed:", error);
            });
        }
    };

    return (
        <div className="pritam-hero-container">
            <div className="pritam-hero-background">
                <video
                    ref={pritamVideoRef}
                    className="pritam-galaxy-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={handleVideoLoaded}
                    poster="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                >
                    {/* for dark mode */}
                    <source src="https://videos.pexels.com/video-files/7534244/7534244-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    {/* for light */}
                    <source src="https://videos.pexels.com/video-files/5473795/5473795-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>              
            </div>

            <section className="pritam-hero-section" ref={pritamHeroRef}>
                <motion.div 
                    className="pritam-hero-content"
                    initial="hidden"
                    animate={heroControls}
                    variants={containerVariants}
                >
                    <motion.div className="pritam-hero-text-section" variants={itemVariants}>
                        <motion.div className="pritam-hero-badge" variants={itemVariants}>
                            <span className="pritam-badge-dot"></span>
                            Available for opportunities
                        </motion.div>

                        <motion.h1 className="pritam-hero-title" variants={itemVariants}>
                            <span className="pritam-title-greeting">Hello, I'm</span>
                            <motion.span 
                                className="pritam-title-name"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Pritam
                            </motion.span>
                        </motion.h1>

                        <motion.h2 className="pritam-hero-subtitle" variants={itemVariants}>
                            <span className="pritam-typing-wrapper">
                                <span className="pritam-typing-text">{typedText}</span>
                                <span className="pritam-typing-cursor"></span>
                            </span>
                        </motion.h2>

                        <motion.p className="pritam-hero-description" variants={itemVariants}>
                            I craft intuitive digital experiences with user-centered design principles, 
                            seamless interactions, and pixel-perfect interfaces that delight users 
                            and drive business results.
                        </motion.p>

                        <motion.div className="pritam-hero-actions" variants={itemVariants}>
                            <motion.button 
                                className="pritam-btn-primary"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Portfolio</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.button>

                            <motion.button 
                                className="pritam-btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadCV}
                            >
                                <span>View CV</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 15V19A2 2 0 0119 21H5A2 2 0 013 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.button>
                        </motion.div>

                        <motion.div className="pritam-hero-stats" variants={itemVariants}>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">1.5+</span>
                                <span className="pritam-stat-label">Years Experience</span>
                            </div>
                            <div className="pritam-stat-divider"></div>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">70+</span>
                                <span className="pritam-stat-label">Projects Completed</span>
                            </div>
                            <div className="pritam-stat-divider"></div>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">100%</span>
                                <span className="pritam-stat-label">Happy Clients</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="pritam-hero-visual-section" variants={itemVariants}>
                        <div className="pritam-avatar-container">
                            <div className="pritam-avatar-ring"></div>
                            <div className="pritam-avatar-image"></div>
                            
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="pritam-scroll-indicator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <div className="pritam-scroll-text">Scroll to explore</div>
                    <motion.div 
                        className="pritam-scroll-arrow"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default PritamHeroSection;