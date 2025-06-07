import { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight,
  Heart,
  Star,
  Code,
  Globe,
  Instagram,    
  Phone,
  Smartphone,
  Monitor,
  Cpu,
  Database,
  Code2,
  Terminal,
  GitBranch,
  Figma
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const socialLinks = [
    { icon: Github, url: "https://github.com/brarpritam001", name: "GitHub", color: "#333"},
    { icon: Linkedin, url: "https://www.linkedin.com/in/pritam-brar-669330368", name: "LinkedIn", color: "#0077B5" },
    { icon: Twitter, url: "https://twitter.com/brarpritam001", name: "Twitter", color: "#1DA1F2" },
    { icon: Instagram, url: "https://www.instagram.com/brarpritam001", name: "Instagram", color: "#E1306C" },    
    { icon: Mail, url: "mailto:brarpritam001@gmail.com", name: "Email", color: "#EA4335" },
    { icon: Phone, url: "tel:+918059366488", name: "Call", color: "#25D366" }
  ];

  const navigationLinks = [
    { name: "Home", href: "/", icon: Globe },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Experience", href: "#about", icon: Terminal },
    { name: "Contact", href: "#contact", icon: Star }
  ];

  const techStack = [
    { name: "React", icon: Code2, description: "Frontend development" },
    { name: "React Native", icon: Smartphone, description: "Mobile app development" },
    { name: "Node", icon: Database, description: "Backend systems" },
    { name: "TypeScript", icon: Terminal, description: "Type-safe coding" },
    { name: "Git", icon: GitBranch, description: "Version control" },
    { name: "UI/UX Design", icon: Figma, description: "Design systems" }
  ];

  return (
    <footer 
      className="footer-container"
      onMouseMove={handleMouseMove}
      ref={footerRef}
    >
      <div className="footer-background">
        <div className="grid-pattern"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        
        <div 
          className="mouse-follower"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        ></div>
      </div>

      <div className={`footer-content ${isVisible ? 'animate-in' : ''}`}>
        <div className="footer-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <Star className="star-icon" size={16} />
              <span>Available for projects</span>
            </div>
            
            <h2 className="hero-title">
              Let's build something
              <span className="gradient-text"> amazing together</span>
            </h2>
            
            <p className="hero-description">
              Full-stack developer specializing in web and mobile applications. 
              I transform ideas into performant, scalable digital experiences 
              with clean code and intuitive interfaces.
            </p>
            
            <div className="hero-actions">
              <a href="#contact" className="cta-primary">
                <Mail size={20} />
                <span>Get in touch</span>
                <ArrowUpRight size={20} className="arrow-icon" />
              </a>
              
              <a href="#projects" className="cta-secondary">
                <Monitor size={20} />
                <span>View my work</span>
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="card-tabs">
                  <span className="active">index.tsx</span>
                  <span>styles.css</span>
                  <span>package.json</span>
                </div>
              </div>
              <div className="card-content">
                <div className="code-lines">
                  <div className="code-line"></div>
                  <div className="code-line short"></div>
                  <div className="code-line"></div>
                  <div className="code-line short"></div>
                  <div className="code-line"></div>
                  <div className="code-line"></div>
                  <div className="code-line short"></div>
                </div>
                <div className="tech-stack">
                  {techStack.slice(0, 4).map((tech, index) => (
                    <div key={index} className="tech-item">
                      <tech.icon size={14} />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3 className="link-title">
              <Globe size={20} />
              Navigation
            </h3>
            <ul className="link-list">
              {navigationLinks.map((link, index) => (
                <li key={index} className="link-item">
                  <a href={link.href} className="nav-link">
                    <link.icon size={16} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="link-group">
            <h3 className="link-title">
              <Cpu size={20} />
              Tech Stack
            </h3>
            <ul className="link-list">
              {techStack.map((tech, index) => (
                <li key={index} className="link-item">
                  <div className="tech-link">
                    <tech.icon size={16} />
                    <div>
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-description">{tech.description}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="link-group connect-group">
            <h3 className="link-title">
              <Heart size={20} />
              Connect
            </h3>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${hoveredSocial === index ? 'hovered' : ''}`}
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className="social-icon-wrapper">
                    <social.icon size={20} />
                  </div>
                  <div className="social-info">
                    <span className="social-name">{social.name}</span>
                  </div>
                  <ArrowUpRight size={16} className="social-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <div className="brand-info">
              <div className="brand-logo">
                <div className="logo-icon">PB</div>
                <span className="brand-name">Pritam Brar</span>
              </div>
              <p className="brand-tagline">
                Full-stack developer crafting digital experiences
              </p>
            </div>
            
            <div className="footer-meta">
              <div className="meta-item">
                <span className="meta-label">Built with</span>
                <Heart size={14} className="heart-icon" />
                <span className="meta-value">& React</span>
              </div>
              <div className="divider">•</div>
              <div className="meta-item">
                <span>© {currentYear} All rights reserved</span>
              </div>
            </div>
          </div>

          <div className="legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <a href="#terms" className="legal-link">Terms of Service</a>
            <a href="#cookies" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;