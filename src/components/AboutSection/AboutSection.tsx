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

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const slideInFromLeft = {
        hidden: { 
            opacity: 0, 
            x: -50
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const slideInFromRight = {
        hidden: { 
            opacity: 0, 
            x: 50
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const cardHover = {
        hover: {
            y: -5,
            boxShadow: "0 15px 30px -5px rgba(99, 102, 241, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const statHover = {
        hover: {
            scale: 1.03,
            y: -3,
            boxShadow: "0 15px 25px -5px rgba(99, 102, 241, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };



    const floatingAnimation = {
        float: {
            y: [0, -10, 0],
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    };

    return (
        <section id="about" className="about-section" ref={aboutRef}>
            <motion.div 
                className="background-shape shape-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 0.3,
                        scale: 1,
                        transition: { delay: 0.3, duration: 0.8 }
                    }
                }}
            />
            <motion.div 
                className="background-shape shape-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 0.2,
                        scale: 1,
                        transition: { delay: 0.5, duration: 0.8 }
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
                            </motion.h2>
                            <motion.p 
                                className="section-subtitle"
                                variants={fadeIn}
                            >
                                FrontEnd Developer | UI/UX Specialist
                            </motion.p>
                        </div>

                        <div className="about-paragraphs">
                            <motion.p variants={fadeIn}>
                                I'm a passionate full-stack developer specializing in web and mobile application development with 1.5+ years of experience creating responsive, user-centric applications from concept to deployment.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                My expertise spans the entire development lifecycle - from crafting pixel-perfect UI/UX designs to implementing robust frontend architectures and seamless API integrations that power modern digital experiences.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                I combine technical proficiency with an eye for design, ensuring applications are not only functional but also deliver intuitive, engaging user experiences that drive business growth.
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
                                <div className="stat-number">15+</div>
                                <div className="stat-label">Web Apps</div>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover="hover"
                                variants={{...fadeIn, ...statHover}}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="stat-number">10+</div>
                                <div className="stat-label">Mobile Apps</div>
                            </motion.div>
                            <motion.div 
                                className="stat-item"
                                whileHover="hover"
                                variants={{...fadeIn, ...statHover}}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="stat-number">50+</div>
                                <div className="stat-label">API Integrations</div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            className="skills-showcase"
                            variants={fadeIn}
                        >                            
                          
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
                                        <div className="experience-date">2024 - Present</div>
                                        <div className="experience-status">Current Role</div>
                                    </div>
                                    <h4 className="experience-role">FrontEnd Developer (Web & Mobile)</h4>
                                    <div className="experience-company">Plus Distribution Pvt. Ltd.</div>
                                    <p className="experience-description">
                                        Leading the development of responsive web and mobile applications with a focus on UI/UX excellence and seamless API integrations. Responsible for full-stack development using modern technologies.
                                    </p>
                                    
                                    <div className="experience-highlights">
                                        <h5>Key Responsibilities & Achievements:</h5>
                                        <ul>
                                            <li>Developed responsive web applications with React/Next.js improving user engagement by 45%</li>
                                            <li>Built cross-platform mobile applications using React Native with native-like performance</li>
                                            <li>Designed and implemented RESTful APIs and integrated third-party APIs for enhanced functionality</li>
                                            <li>Created pixel-perfect UI components from Figma designs with attention to accessibility</li>
                                            <li>Optimized application performance through code splitting, lazy loading, and efficient state management</li>                                        
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>                        
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

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
        </section>
    );
};

export default AboutSection;