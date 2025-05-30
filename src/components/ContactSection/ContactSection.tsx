import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useTransform, useSpring } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiLinkedin, FiGithub, FiTwitter, FiArrowRight } from 'react-icons/fi';
import { useMotionValue, useMotionTemplate } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
    const contactRef = useRef(null);
    const formRef = useRef(null);
    const contactControls = useAnimation();
    const isContactInView = useInView(contactRef, { once: true, margin: "-100px" });

    // 3D tilt effect variables
    const [, setIsHoveringForm] = useState(false);
    const [, setIsHoveringInfo] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXInfo = useMotionValue(0);
    const mouseYInfo = useMotionValue(0);

    // Smooth spring transforms
    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
    const rotateXInfo = useTransform(mouseYInfo, [-100, 100], [5, -5]);
    const rotateYInfo = useTransform(mouseXInfo, [-100, 100], [-5, 5]);

    const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 300 });
    const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 300 });
    const springRotateXInfo = useSpring(rotateXInfo, { damping: 20, stiffness: 300 });
    const springRotateYInfo = useSpring(rotateYInfo, { damping: 20, stiffness: 300 });

    // Glow effect
    const glowOpacity = useMotionValue(0);
    const glowOpacityInfo = useMotionValue(0);
    const glowTransformInfo = useMotionTemplate`translate(-50%, -50%) scale(${glowOpacityInfo})`;

    useEffect(() => {
        if (isContactInView) {
            contactControls.start("visible");
        }
    }, [isContactInView, contactControls]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);

        // Increase glow when hovering
        glowOpacity.set(1);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        glowOpacity.set(0);
        setIsHoveringForm(false);
    };

    const handleMouseMoveInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseXInfo.set(e.clientX - rect.left - rect.width / 2);
        mouseYInfo.set(e.clientY - rect.top - rect.height / 2);
        glowOpacityInfo.set(1);
    };

    const handleMouseLeaveInfo = () => {
        mouseXInfo.set(0);
        mouseYInfo.set(0);
        glowOpacityInfo.set(0);
        setIsHoveringInfo(false);
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
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
        hidden: { opacity: 0, x: -80, rotateY: 15 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const slideInFromRight = {
        hidden: { opacity: 0, x: 80, rotateY: -15 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <section id="contact" className="contact-section" ref={contactRef}>
            <div className="contact-gradient-overlay"></div>
            <div className="contact-particles"></div>
            <div className="section-container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    animate={contactControls}
                    variants={fadeIn}
                >
                    <h2 className="section-title">
                        <span className="title-gradient">Let's Connect</span>
                        <span className="title-decoration"></span>
                    </h2>
                    <p className="section-subtitle">Ready to start your next project or just want to chat? Reach out and let's create something amazing together.</p>
                </motion.div>

                <motion.div
                    className="contact-content"
                    initial="hidden"
                    animate={contactControls}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="contact-form-container"
                        variants={slideInFromLeft}
                        ref={formRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHoveringForm(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX: springRotateX,
                            rotateY: springRotateY,
                            transformPerspective: 1000,
                        }}
                    >
                        <div className="form-glow" style={{
                            opacity: glowOpacityInfo.get(),
                            transform: glowTransformInfo.get()
                        }} />
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    <span>Your Name</span>
                                    <span className="input-decoration"></span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-input"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    <span>Email Address</span>
                                    <span className="input-decoration"></span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="brarpritam001@gmail.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    <span>Your Message</span>
                                    <span className="input-decoration"></span>
                                </label>
                                <textarea
                                    id="message"
                                    className="form-input"
                                    placeholder="Hello, I'd like to talk about..."
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="submit-btn"
                                whileHover={{
                                    scale: 1.03,
                                    y: -2,
                                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Send Message</span>
                                <FiArrowRight className="btn-icon" />
                            </motion.button>
                        </form>
                    </motion.div>

                    <motion.div
                        className="contact-info-container"
                        variants={slideInFromRight}
                        onMouseMove={handleMouseMoveInfo}
                        onMouseEnter={() => setIsHoveringInfo(true)}
                        onMouseLeave={handleMouseLeaveInfo}
                        style={{
                            rotateX: springRotateXInfo,
                            rotateY: springRotateYInfo,
                            transformPerspective: 1000,
                        }}
                    >
                        <div className="info-glow" style={{
                            opacity: glowOpacityInfo.get(),
                            transform: glowTransformInfo.get()
                        }} />
                        <div className="contact-info-card">
                            <h3 className="contact-info-title">
                                <span>Contact Information</span>
                                <span className="title-decoration"></span>
                            </h3>
                            <p className="contact-info-text">
                                Feel free to reach out through any of these channels. I typically respond within 24 hours.
                            </p>

                            <div className="contact-methods">
                                <motion.div
                                    className="contact-method"
                                    whileHover={{
                                        x: 5,
                                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                                    }}
                                >
                                    <motion.div
                                        className="contact-icon"
                                        whileHover={{
                                            rotateY: 15,
                                            backgroundColor: "var(--primary)",
                                            color: "white"
                                        }}
                                    >
                                        <FiMail />
                                    </motion.div>
                                    <div className="contact-details">
                                        <h4 className="contact-method-title">Email</h4>
                                        <a href="mailto:brarpritam001@gmail.com" className="contact-method-value">
                                            brarpritam001@gmail.com
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-method"
                                    whileHover={{
                                        x: 5,
                                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                                    }}
                                >
                                    <motion.div
                                        className="contact-icon"
                                        whileHover={{
                                            rotateY: 15,
                                            backgroundColor: "var(--primary)",
                                            color: "white"
                                        }}
                                    >
                                        <FiMapPin />
                                    </motion.div>
                                    <div className="contact-details">
                                        <h4 className="contact-method-title">Location</h4>
                                        <a
                                            className="contact-method-value"
                                            href="https://www.google.com/maps?q=Panipat+Haryana+India"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Panipat Haryana, India
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-method"
                                    whileHover={{
                                        x: 5,
                                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                                    }}
                                >
                                    <motion.div
                                        className="contact-icon"
                                        whileHover={{
                                            rotateY: 15,
                                            backgroundColor: "var(--primary)",
                                            color: "white"
                                        }}
                                    >
                                        <FiPhone />
                                    </motion.div>
                                    <div className="contact-details">
                                        <h4 className="contact-method-title">Phone</h4>
                                        <a href="tel:+918059366488" className="contact-method-value">
                                            +91 80593 66488
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="social-links">
                                <motion.a
                                    href="#"
                                    className="social-link"
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1,
                                        backgroundColor: "var(--primary)",
                                        color: "white"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiLinkedin />
                                </motion.a>
                                <motion.a
                                    href="https://github.com/brarpritam001"
                                    className="social-link"
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1,
                                        backgroundColor: "var(--primary)",
                                        color: "white"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiGithub />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="social-link"
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1,
                                        backgroundColor: "var(--primary)",
                                        color: "white"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiTwitter />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;