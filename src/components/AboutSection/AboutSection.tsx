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
        hidden: { opacity: 0, y: 15, rotateX: 5 },
        visible: { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
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
                delayChildren: 0.3
            }
        }
    };

    const slideInFromLeft = {
        hidden: { 
            opacity: 0, 
            x: -80, 
            rotateY: 15,
            rotateX: 5,
            transformPerspective: 1000
        },
        visible: { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97],
                rotateY: { duration: 0.9 }
            }
        }
    };

    const slideInFromRight = {
        hidden: { 
            opacity: 0, 
            x: 80, 
            rotateY: -15,
            rotateX: 5,
            transformPerspective: 1000
        },
        visible: { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97],
                rotateY: { duration: 0.9 }
            }
        }
    };

    const cardHover = {
        hover: {
            y: -10,
            rotateZ: -0.5,
            rotateX: 2,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const statHover = {
        hover: {
            scale: 1.05,
            y: -5,
            rotateX: 2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
            {/* 3D Background Elements */}
            <motion.div 
                className="background-shape shape-1"
                initial={{ opacity: 0 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 1,
                        transition: { delay: 0.5, duration: 1 }
                    }
                }}
            />
            <motion.div 
                className="background-shape shape-2"
                initial={{ opacity: 0 }}
                animate={aboutControls}
                variants={{
                    visible: { 
                        opacity: 1,
                        transition: { delay: 0.7, duration: 1 }
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
                                My journey in software development
                            </motion.p>
                        </div>

                        <div className="about-paragraphs">
                            <motion.p variants={fadeIn}>
                                I'm a passionate full-stack developer with 2+ years of experience building applications across web, mobile, and desktop platforms.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                Specializing in React, Node.js, and modern JavaScript frameworks, I create performant, accessible, and responsive applications with intuitive user experiences.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                My approach combines technical expertise with creative problem-solving to deliver solutions that exceed user expectations.
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
                                <div className="stat-number">2+</div>
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
                    </motion.div>

                    <motion.div 
                        className="about-timeline"
                        variants={slideInFromRight}
                    >
                        <AnimatePresence>
                            <motion.div 
                                className="timeline-card"
                                whileHover="hover"
                                variants={cardHover}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="timeline-item">
                                    <div className="timeline-date">2022 - Present</div>
                                    <h3 className="timeline-title">Senior Frontend Developer</h3>
                                    <div className="timeline-company">Plus Distributions PVT. LTD.</div>
                                    <p className="timeline-description">
                                        Lead the development of responsive web applications using React and Next.js, improving performance by 40%.
                                    </p>
                                    <div className="timeline-tech">
                                        <span>React</span>
                                        <span>Next.js</span>
                                        <span>TypeScript</span>
                                    </div>
                                </div>
                                <div className="timeline-decoration"></div>
                            </motion.div>

                            <motion.div 
                                className="timeline-card"
                                whileHover="hover"
                                variants={cardHover}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="timeline-item">
                                    <div className="timeline-date">2020 - 2022</div>
                                    <h3 className="timeline-title">Full Stack Developer</h3>
                                    <div className="timeline-company">Digital Solutions LLC</div>
                                    <p className="timeline-description">
                                        Developed and maintained web applications with React frontends and Node.js backends, implementing CI/CD pipelines.
                                    </p>
                                    <div className="timeline-tech">
                                        <span>Node.js</span>
                                        <span>MongoDB</span>
                                        <span>AWS</span>
                                    </div>
                                </div>
                                <div className="timeline-decoration"></div>
                            </motion.div>

                            <motion.div 
                                className="timeline-card"
                                whileHover="hover"
                                variants={cardHover}
                                initial="hidden"
                                animate={aboutControls}
                            >
                                <div className="timeline-item">
                                    <div className="timeline-date">2018 - 2020</div>
                                    <h3 className="timeline-title">Junior Developer</h3>
                                    <div className="timeline-company">Web Craft Studios</div>
                                    <p className="timeline-description">
                                        Contributed to various client projects, gaining experience in modern web development practices and agile methodologies.
                                    </p>
                                    <div className="timeline-tech">
                                        <span>JavaScript</span>
                                        <span>HTML/CSS</span>
                                        <span>Git</span>
                                    </div>
                                </div>
                                <div className="timeline-decoration"></div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating 3D elements */}
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