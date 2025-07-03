import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ProjectsSection.css';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    type: 'web' | 'mobile' | 'design';
    client?: string;
    technologies?: string[];
    previewLink?: string;
}

const CircularProjectsSlider = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'design'>('all');
    const [rotation, setRotation] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const circleRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    const projects: Project[] = [
        {
            id: 1,
            title: "Business Websites",
            description: "Designed and developed responsive websites for small/local businesses, optimized for SEO and mobile experience.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'web',
            client: "Multiple Clients",
            technologies: ["HTML", "CSS", "JavaScript", "TypeScript"]
        },
        {
            id: 2,
            title: "HR Management Mobile App",
            description: "Built an HR app with employee records, attendance, and department filters using Firebase for authentication and real-time updates.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'mobile',
            client: "Corporate Solutions Inc.",
            technologies: ["React Native (Expo)", "Firebase"]
        },
        {
            id: 3,
            title: "E-Commerce Mobile App",
            description: "Developed a full-featured e-commerce app with cart, login, and Stripe payment integration.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'mobile',
            client: "ShopEasy Retail",
            technologies: ["React Native (Expo)", "Firebase", "Stripe"]
        },
        {
            id: 4,
            title: "E-Commerce Website",
            description: "Responsive online store built using Next.js and Tailwind, optimized for performance and scalability.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'web',
            client: "UrbanStyle Fashion",
            technologies: ["Next.js", "Tailwind"]
        },
        {
            id: 5,
            title: "Job Finder Mobile App",
            description: "Mobile app to browse job listings, filter by location/role, and apply with a single tap. Firebase handles auth and data.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'mobile',
            client: "CareerConnect",
            technologies: ["React Native (Expo)", "Firebase"]
        }, {
            id: 6,
            title: "HR Management Mobile App",
            description: "Built an HR app with employee records, attendance, and department filters using Firebase for authentication and real-time updates.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            previewLink: "#preview",
            type: 'mobile',
            client: "Corporate Solutions Inc.",
            technologies: ["React Native (Expo)", "Firebase"]
        },
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.type === activeFilter);

    const getProjectTypeColor = (type: string) => {
        switch (type) {
            case 'web': return 'circular-web-badge';
            case 'mobile': return 'circular-mobile-badge';
            case 'design': return 'circular-design-badge';
            default: return 'circular-default-badge';
        }
    };

    useEffect(() => {
        if (!circleRef.current || projectsRef.current.length === 0) return;

        const cardWidth = 130;
        const minGap = 130;
        const circumference = (cardWidth + minGap) * filteredProjects.length;
        const radius = circumference / (2 * Math.PI);
        
        const angleIncrement = (2 * Math.PI) / filteredProjects.length;

        projectsRef.current.forEach((projectEl, index) => {
            if (!projectEl) return;

            const angle = angleIncrement * index + rotation + Math.PI/2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            gsap.to(projectEl, {
                x: x,
                y: y,
                zIndex: index === activeIndex ? 10 : 1,
                opacity: index === activeIndex ? 1 : 0.8,
                duration: 1,
                ease: "power3.out"
            });

            const rotationAngle = (angle * 180) / Math.PI;
            gsap.to(projectEl.querySelector('.circular-project-card'), {
                rotation: rotationAngle,
                duration: 1,
                ease: "power3.out"
            });
        });

        if (contentRef.current && filteredProjects[activeIndex]) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    }, [rotation, activeIndex, filteredProjects]);

    const handleFilterChange = (filter: 'all' | 'web' | 'mobile' | 'design') => {
        gsap.to(projectsRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setActiveFilter(filter);
                setActiveIndex(0);
                setRotation(0);
            }
        });
    };

    const rotateLeft = () => {
        const newRotation = rotation + (2 * Math.PI) / filteredProjects.length;
        setRotation(newRotation);
        setActiveIndex((prevIndex) => 
            (prevIndex + 1) % filteredProjects.length
        );
    };

    const rotateRight = () => {
        const newRotation = rotation - (2 * Math.PI) / filteredProjects.length;
        setRotation(newRotation);
        setActiveIndex((prevIndex) => 
            (prevIndex - 1 + filteredProjects.length) % filteredProjects.length
        );
    };

    const goToProject = (index: number) => {
        const angleIncrement = (2 * Math.PI) / filteredProjects.length;
        const currentAngle = rotation % (2 * Math.PI);
        const targetAngle = angleIncrement * index;
        
        let angleDiff = targetAngle - currentAngle;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        setRotation(rotation + angleDiff);
        setActiveIndex(index);
    };

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !projectsRef.current.includes(el)) {
            projectsRef.current[index] = el;
        }
    };

    return (
        <section className="circular-projects-section">
            <div className="circular-section-container">
                <div className="circular-section-header">
                    <h2 className="circular-section-title">
                        Our Projects
                    </h2>
                    <p className="circular-section-subtitle">
                        Professional solutions tailored to your business needs
                    </p>
                </div>

                <div className="circular-project-filters">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`circular-filter-btn ${activeFilter === 'all' ? 'circular-filter-active' : ''}`}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => handleFilterChange('web')}
                        className={`circular-filter-btn ${activeFilter === 'web' ? 'circular-filter-active' : ''}`}
                    >
                        Web Solutions
                    </button>
                    <button
                        onClick={() => handleFilterChange('mobile')}
                        className={`circular-filter-btn ${activeFilter === 'mobile' ? 'circular-filter-active' : ''}`}
                    >
                        Mobile Apps
                    </button>
                    <button
                        onClick={() => handleFilterChange('design')}
                        className={`circular-filter-btn ${activeFilter === 'design' ? 'circular-filter-active' : ''}`}
                    >
                        Design
                    </button>
                </div>

                <div className="circular-projects-content-wrapper">
                    <div className="circular-project-content-container" ref={contentRef}>
                        {filteredProjects.length > 0 && (
                            <>                            
                                <div className="circular-project-details">
                                    <h3 className="circular-project-title">{filteredProjects[activeIndex].title}</h3>
                                    <p className="circular-project-client">{filteredProjects[activeIndex].client}</p>
                                    <p className="circular-project-description">{filteredProjects[activeIndex].description}</p>
                                    
                                    {filteredProjects[activeIndex].technologies && (
                                        <div className="circular-project-technologies">
                                            {filteredProjects[activeIndex].technologies?.map((tech, techIndex) => (
                                                <span key={techIndex} className="circular-tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="circular-project-buttons">
                                        {filteredProjects[activeIndex].previewLink && (
                                            <a 
                                                href={filteredProjects[activeIndex].previewLink} 
                                                className="circular-project-preview-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Live Preview
                                                <svg className="circular-link-icon" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        <a 
                                            href={filteredProjects[activeIndex].link} 
                                            className="circular-project-link"
                                        >
                                            View Details
                                            <svg className="circular-link-icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="circular-slider-container">
                        <div className="circular-circle" ref={circleRef}>
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="circular-project-container"
                                    ref={(el) => addToRefs(el, index)}
                                    onClick={() => goToProject(index)}
                                    tabIndex={-1}
                                >
                                    <div className="circular-project-card">
                                        <div className="circular-project-image-container">
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="circular-project-image"
                                            />
                                            <span className={`circular-project-type-badge ${getProjectTypeColor(project.type)}`}>
                                                {project.type.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="circular-slider-controls">
                            <button className="circular-control-btn circular-prev-btn" onClick={rotateRight} title="Previous Project" aria-label="Previous Project" tabIndex={0}>
                                <span className="circular-sr-only"></span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="circular-control-btn circular-next-btn" onClick={rotateLeft} title="Next Project" aria-label="Next Project" tabIndex={0}>
                                <span className="circular-sr-only"></span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CircularProjectsSlider;