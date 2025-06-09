import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
    const aboutRef = useRef(null);
    const aboutControls = useAnimation();
    const isAboutInView = useInView(aboutRef, { once: false, margin: "-100px" });

    useEffect(() => {
        if (isAboutInView) aboutControls.start("visible");
    }, [isAboutInView, aboutControls]);

    // Enhanced animations with 3D perspective
    const fadeIn = {
        hidden: { opacity: 0, y: 20, rotateX: 5, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const slideInFromLeft = {
        hidden: { 
            opacity: 0, 
            x: -100, 
            rotateY: 20,
            rotateX: 5,
            scale: 0.95,
            transformPerspective: 1000
        },
        visible: { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.9,
                ease: [0.16, 0.77, 0.47, 0.97],
                rotateY: { duration: 1.1 }
            }
        }
    };

    const slideInFromRight = {
        hidden: { 
            opacity: 0, 
            x: 100, 
            rotateY: -20,
            rotateX: 5,
            scale: 0.95,
            transformPerspective: 1000
        },
        visible: { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.9,
                ease: [0.16, 0.77, 0.47, 0.97],
                rotateY: { duration: 1.1 }
            }
        }
    };

    const cardHover = {
        hover: {
            y: -15,
            rotateZ: -1,
            rotateX: 3,
            scale: 1.02,
            boxShadow: "0 35px 60px -12px rgba(99, 102, 241, 0.3), 0 15px 25px -5px rgba(139, 92, 246, 0.2)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const statHover = {
        hover: {
            scale: 1.08,
            y: -8,
            rotateX: 3,
            rotateY: 2,
            boxShadow: "0 25px 40px -10px rgba(99, 102, 241, 0.4), 0 15px 20px -5px rgba(139, 92, 246, 0.3)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const skillHover = {
        hover: {
            scale: 1.1,
            y: -3,
            rotateZ: 5,
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const floatingAnimation = {
        float: {
            y: [0, -15, 0],
            rotate: [0, 5, 0],
            transition: {
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    };

    const pulseAnimation = {
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    };

    return (
        <section id="about" className="about-section" ref={aboutRef}>
            {/* Enhanced 3D Background Elements */}
            <motion.div 
                className="background-shape shape-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.5, duration: 1.2 }
                    }
                }}
            />
            <motion.div 
                className="background-shape shape-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.8, duration: 1.2 }
                    }
                }}
            />
            <motion.div 
                className="background-shape shape-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 1.1, duration: 1.2 }
                    }
                }}
            />
            
            <div className="section-container">
                <motion.div 
                    className="about-content"
                    initial="hidden"
                    animate={aboutControls}
                    variants={staggerContainer}
                >
                    <motion.div 
                        className="about-text"
                        variants={slideInFromLeft}
                    >
                        <div className="section-header">
                            <motion.h2 
                                className="section-title"
                                variants={fadeIn}
                            >
                                About Me
                                <span className="title-decoration"></span>
                                <motion.span 
                                    className="title-glow"
                                    animate="pulse"
                                    variants={pulseAnimation}
                                ></motion.span>
                            </motion.h2>
                            <motion.p 
                                className="section-subtitle"
                                variants={fadeIn}
                            >
                                My journey in software development
                            </motion.p>
                        </div>

                        <div className="about-paragraphs">
                            <motion.p variants={fadeIn}>
                                I'm a passionate full-stack developer with 1.5+ years of hands-on experience building cutting-edge applications across web, mobile, and desktop platforms.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                Specializing in React, Node.js, and modern JavaScript frameworks, I create performant, accessible, and responsive applications with intuitive user experiences that drive real business value.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                My approach combines technical expertise with creative problem-solving and user-centered design principles to deliver solutions that not only meet requirements but exceed user expectations.
                            </motion.p>
                        </div>

                        <motion.div 
                            className="experience-stats"
                            variants={fadeIn}
                        >
                            <motion.div 
                                className="stat-item"
                                whileHover="hover"
                                variants={{...fadeIn, ...statHover}}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="stat-number">1.5+</div>
                                <div className="stat-label">Years Experience</div>
                                <div className="stat-decoration"></div>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover="hover"
                                variants={{...fadeIn, ...statHover}}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="stat-number">70+</div>
                                <div className="stat-label">Projects Completed</div>
                                <div className="stat-decoration"></div>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover="hover"
                                variants={{...fadeIn, ...statHover}}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Client Satisfaction</div>
                                <div className="stat-decoration"></div>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Skills Section */}
                        <motion.div 
                            className="skills-showcase"
                            variants={fadeIn}
                        >                            
                            <div className="skills-grid">
                                {['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'Git'].map((skill, index) => (
                                    <motion.span 
                                        key={skill}
                                        className="skill-tag"
                                        whileHover="hover"
                                        variants={skillHover}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={aboutControls}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="about-experience"
                        variants={slideInFromRight}
                    >
                        <div className="experience-header">
                            <h3 className="experience-title">Professional Experience</h3>
                            <div className="experience-line"></div>
                        </div>

                        <AnimatePresence>
                            <motion.div 
                                className="experience-card current-role"
                                whileHover="hover"
                                variants={cardHover}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="experience-content">
                                    <div className="experience-header-content">
                                        <div className="experience-date">2024  - Present</div>
                                        <div className="experience-status">Current Role</div>
                                    </div>
                                    <h4 className="experience-role">Full Stack Developer</h4>
                                    <div className="experience-company">Plus Distribution Pvt. Ltd.</div>
                                    <p className="experience-description">
                                        Leading the development of scalable web applications and implementing modern development practices. Responsible for full-stack development using React, Node.js, and cloud technologies, resulting in improved system performance and user experience.
                                    </p>
                                    
                                    <div className="experience-highlights">
                                        <h5>Key Achievements:</h5>
                                        <ul>
                                            <li>Developed responsive web applications improving user engagement by 45%</li>
                                            <li>Implemented modern development workflows and CI/CD pipelines</li>
                                            <li>Collaborated with cross-functional teams to deliver high-quality solutions</li>
                                            <li>Optimized application performance and maintained code quality standards</li>
                                        </ul>
                                    </div>
                                                                      
                                </div>
                                <div className="experience-decoration">
                                    <div className="decoration-circle"></div>
                                    <div className="decoration-line"></div>
                                </div>
                            </motion.div>                        
                           
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Enhanced floating 3D elements */}
            <motion.div 
                className="floating-element element-1"
                animate="float"
                variants={floatingAnimation}
            />
            <motion.div 
                className="floating-element element-2"
                animate="float"
                variants={floatingAnimation}
            />
            <motion.div 
                className="floating-element element-3"
                animate="float"
                variants={floatingAnimation}
            />
        </section>
    );
};

export default AboutSection;