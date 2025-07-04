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
  Figma,
  ExternalLink
} from 'lucide-react';
import './Footer.css';

type SocialLink = {
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  name: string;
  color: string;
};

type NavigationLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

type TechItem = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  description: string;
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }
    
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

  const socialLinks: SocialLink[] = [
    { icon: Github, url: "https://github.com/brarpritam001", name: "GitHub", color: "var(--social-github)"},
    { icon: Linkedin, url: "https://www.linkedin.com/in/pritam-brar-669330368", name: "LinkedIn", color: "var(--social-linkedin)" },
    { icon: Twitter, url: "https://twitter.com/brarpritam001", name: "Twitter", color: "var(--social-twitter)" },
    { icon: Instagram, url: "https://www.instagram.com/brarpritam001", name: "Instagram", color: "var(--social-instagram)" },    
    { icon: Mail, url: "mailto:brarpritam001@gmail.com", name: "Email", color: "var(--social-email)" },
    { icon: Phone, url: "tel:+918059366488", name: "Call", color: "var(--social-phone)" }
  ];

  const navigationLinks: NavigationLink[] = [
    { name: "Home", href: "/", icon: Globe },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Experience", href: "#about", icon: Terminal },
    { name: "Contact", href: "#contact", icon: Star }
  ];

  const techStack: TechItem[] = [
    { name: "React", icon: Code2, description: "Frontend development" },
    { name: "React Native", icon: Smartphone, description: "Mobile app development" },
    { name: "Node", icon: Database, description: "Backend systems" },
    { name: "TypeScript", icon: Terminal, description: "Type-safe coding" },
    { name: "Git", icon: GitBranch, description: "Version control" },
    { name: "UI/UX Design", icon: Figma, description: "Design systems" }
  ];

  return (
    <footer 
      className="pb-footer"
      ref={footerRef}
      aria-label="Website footer"
    >
      <div className={`pb-footer__content ${isVisible ? 'pb-animate-in' : ''}`}>
        
        <section className="pb-footer-hero" aria-labelledby="pb-hero-heading">
          <div className="pb-hero__content">
            <div className="pb-hero__badge">
              <Star className="pb-hero__star" size={16} />
              <span>Available for projects</span>
            </div>
            
            <h2 id="pb-hero-heading" className="pb-hero__title">
              Let's build something
              <span className="pb-gradient-text"> amazing together</span>
            </h2>
            
            <p className="pb-hero__description">
              Full-stack developer specializing in web and mobile applications. 
              I transform ideas into performant, scalable digital experiences 
              with clean code and intuitive interfaces.
            </p>
            
            <div className="pb-hero__actions">
              <a href="#contact" className="pb-hero__cta pb-hero__cta--primary">
                <Mail size={20} aria-hidden="true" />
                <span>Get in touch</span>
                <ArrowUpRight size={20} className="pb-hero__cta-arrow" aria-hidden="true" />
              </a>
              
              <a href="#projects" className="pb-hero__cta pb-hero__cta--secondary">
                <Monitor size={20} aria-hidden="true" />
                <span>View my work</span>
                <ExternalLink size={16} className="pb-hero__cta-external" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="pb-hero__visual">
            <div className="pb-visual__card">
              <div className="pb-card__header">
                <div className="pb-card__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="pb-card__tabs">
                  <span className="pb-active">index.tsx</span>
                  <span>styles.css</span>
                  <span>package.json</span>
                </div>
              </div>
              <div className="pb-card__content">
                <div className="pb-code__lines">
                  <div className="pb-code__line"></div>
                  <div className="pb-code__line pb-code__line--short"></div>
                  <div className="pb-code__line"></div>
                  <div className="pb-code__line pb-code__line--short"></div>
                  <div className="pb-code__line"></div>
                  <div className="pb-code__line"></div>
                  <div className="pb-code__line pb-code__line--short"></div>
                </div>
                <div className="pb-tech__stack">
                  {techStack.slice(0, 4).map((tech, index) => (
                    <div key={index} className="pb-tech__item">
                      <tech.icon size={14} aria-hidden="true" />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pb-footer__links">
          <div className="pb-links__group">
            <h3 className="pb-links__title">
              <Globe size={20} aria-hidden="true" />
              Navigation
            </h3>
            <ul className="pb-links__list">
              {navigationLinks.map((link, index) => (
                <li key={index} className="pb-links__item">
                  <a href={link.href} className="pb-nav__link">
                    <link.icon size={16} aria-hidden="true" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-links__group">
            <h3 className="pb-links__title">
              <Cpu size={20} aria-hidden="true" />
              Tech Stack
            </h3>
            <ul className="pb-links__list">
              {techStack.map((tech, index) => (
                <li key={index} className="pb-links__item">
                  <div className="pb-tech__link">
                    <tech.icon size={16} aria-hidden="true" />
                    <div>
                      <span className="pb-tech__name">{tech.name}</span>
                      <span className="pb-tech__description">{tech.description}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-links__group pb-links__group--connect">
            <h3 className="pb-links__title">
              <Heart size={20} aria-hidden="true" />
              Connect
            </h3>
            <div className="pb-social__grid">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pb-social__link ${hoveredSocial === index ? 'pb-hovered' : ''}`}
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  aria-label={`Connect with me on ${social.name}`}
                >
                  <div className="pb-social__icon-wrapper">
                    <social.icon size={20} aria-hidden="true" />
                  </div>
                  <div className="pb-social__info">
                    <span className="pb-social__name">{social.name}</span>
                  </div>
                  <ArrowUpRight size={16} className="pb-social__arrow" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-footer__bottom">
          <div className="pb-footer__info">
            <div className="pb-brand__info">
              <div className="pb-brand__logo">
                <div className="pb-logo__icon">PB</div>
                <span className="pb-brand__name">Pritam Brar</span>
              </div>
              <p className="pb-brand__tagline">
                Full-stack developer crafting digital experiences
              </p>
            </div>
            
            <div className="pb-footer__meta">
              <div className="pb-meta__item">
                <span className="pb-meta__label">Built with</span>
                <Heart size={14} className="pb-meta__heart" aria-hidden="true" />
                <span className="pb-meta__value">& React</span>
              </div>
              <div className="pb-meta__divider">•</div>
              <div className="pb-meta__item">
                <span>© {currentYear} All rights reserved</span>
              </div>
            </div>
          </div>

          <div className="pb-legal__links">
            <a href="#privacy" className="pb-legal__link">Privacy Policy</a>
            <a href="#terms" className="pb-legal__link">Terms of Service</a>
            <a href="#cookies" className="pb-legal__link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;