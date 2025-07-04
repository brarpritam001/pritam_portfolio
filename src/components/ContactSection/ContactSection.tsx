import { FiMail, FiMapPin, FiPhone, FiLinkedin, FiGithub, FiTwitter, FiArrowRight } from 'react-icons/fi';
import './ContactSection.css';

const ContactSection = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <section id="contact" className="contact-section-container">
            <div className="contact-background">
                <div className="contact-gradient-overlay"></div>
                <div className="contact-floating-elements">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="contact-floating-element" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            animationDelay: `${Math.random() * 4}s`
                        }}></div>
                    ))}
                </div>
            </div>
            
            <div className="contact-content-wrapper">
                <div className="contact-header">
                    <h2 className="contact-title">
                        <span className="contact-title-gradient">Let's Connect</span>
                    </h2>
                    <p className="contact-subtitle">
                        Ready to start your next project or just want to chat? Reach out and let's create something amazing together.
                    </p>
                </div>

                <div className="contact-main-content">
                    <form 
                        className="contact-form-wrapper"
                        onSubmit={handleSubmit}
                    >
                        <div className="contact-form-group">
                            <label htmlFor="name" className="contact-form-label">
                                <span>Your Name</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="contact-form-input"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        
                        <div className="contact-form-group">
                            <label htmlFor="email" className="contact-form-label">
                                <span>Email Address</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="contact-form-input"
                                placeholder="hello@example.com"
                                required
                            />
                        </div>
                        
                        <div className="contact-form-group">
                            <label htmlFor="message" className="contact-form-label">
                                <span>Your Message</span>
                            </label>
                            <textarea
                                id="message"
                                className="contact-form-input contact-form-textarea"
                                placeholder="Hello, I'd like to talk about..."
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="contact-submit-button">
                            <span>Send Message</span>
                            <FiArrowRight className="contact-button-icon" />
                        </button>
                    </form>

                    <div className="contact-info-wrapper">
                        <h3 className="contact-info-title">
                            <span>Contact Information</span>
                        </h3>
                        <p className="contact-info-description">
                            Feel free to reach out through any of these channels. I typically respond within 24 hours.
                        </p>

                        <div className="contact-methods-list">
                            <div className="contact-method-item">
                                <div className="contact-method-icon">
                                    <FiMail />
                                </div>
                                <div className="contact-method-details">
                                    <h4 className="contact-method-heading">Email</h4>
                                    <a href="mailto:brarpritam001@gmail.com" className="contact-method-link">
                                        brarpritam001@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="contact-method-item">
                                <div className="contact-method-icon">
                                    <FiMapPin />
                                </div>
                                <div className="contact-method-details">
                                    <h4 className="contact-method-heading">Location</h4>
                                    <a
                                        className="contact-method-link"
                                        href="https://www.google.com/maps?q=Panipat+Haryana+India"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Panipat Haryana, India
                                    </a>
                                </div>
                            </div>

                            <div className="contact-method-item">
                                <div className="contact-method-icon">
                                    <FiPhone />
                                </div>
                                <div className="contact-method-details">
                                    <h4 className="contact-method-heading">Phone</h4>
                                    <a href="tel:+918059366488" className="contact-method-link">
                                        +91 80593 66488
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-social-links">
                            <a
                                href="#"
                                className="contact-social-link"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href="https://github.com/brarpritam001"
                                className="contact-social-link"
                                aria-label="GitHub"
                            >
                                <FiGithub />
                            </a>
                            <a
                                href="#"
                                className="contact-social-link"
                                aria-label="Twitter"
                            >
                                <FiTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;  