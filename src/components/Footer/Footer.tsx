import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/brarpritam001", name: "GitHub" },
        { icon: <FaLinkedin />, url: "https://linkedin.com", name: "LinkedIn" },
        { icon: <FaTwitter />, url: "https://twitter.com", name: "Twitter" },
        { icon: <FaDribbble />, url: "https://dribbble.com", name: "Dribbble" },
        { icon: <FaEnvelope />, url: "mailto:brarpritam001@gmail.com", name: "Email" }
    ];

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    return (
        <footer className="footer-container">
            <div className="footer-background">
                <div className="footer-grid"></div>
                <div className="footer-gradient"></div>
            </div>

            <motion.div 
                className="footer-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                variants={footerVariants}
            >
                <div className="footer-top">
                    <motion.div 
                        className="footer-cta"
                        variants={itemVariants}
                        custom={0}
                    >
                        <h3>Let's work together</h3>
                        <p>Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
                        
                        <motion.a 
                            href="mailto:brarpritam001@gmail.com" 
                            className="cta-button"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get in touch
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </motion.a>
                    </motion.div>

                    <div className="footer-links">
                        <motion.div 
                            className="link-group"
                            variants={itemVariants}
                            custom={1}
                        >
                            <h4>Navigation</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#work">Work</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#process">Process</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            className="link-group"
                            variants={itemVariants}
                            custom={2}
                        >
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#styleguide">Style Guide</a></li>
                                <li><a href="#licensing">Licensing</a></li>
                                <li><a href="#changelog">Changelog</a></li>
                                <li><a href="#404">404 Page</a></li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            className="link-group"
                            variants={itemVariants}
                            custom={3}
                        >
                            <h4>Connect</h4>
                            <ul>
                                <li><a href="https://twitter.com">Twitter</a></li>
                                <li><a href="https://linkedin.com">LinkedIn</a></li>
                                <li><a href="https://dribbble.com">Dribbble</a></li>
                                <li><a href="https://github.com/brarpritam001">GitHub</a></li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <motion.div 
                        className="footer-social"
                        variants={itemVariants}
                        custom={4}
                    >
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="social-icon"
                                whileHover={{ y: -5, color: "#8b5cf6" }}
                                transition={{ duration: 0.2 }}
                                custom={index}
                                variants={itemVariants}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div 
                        className="footer-copyright"
                        variants={itemVariants}
                        custom={5}
                    >
                        <p>© {currentYear} Pritam. All rights reserved.</p>
                        <div className="legal-links">
                            <a href="#privacy">Privacy Policy</a>
                            <span>•</span>
                            <a href="#terms">Terms of Service</a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;