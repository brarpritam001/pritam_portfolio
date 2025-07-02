import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    type: 'web' | 'mobile' | 'design';
    client?: string;
    technologies?: string[];
}

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'design'>('all');
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const projectCardsRef = useRef<HTMLDivElement[]>([]);

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Mobile App",
            description: "A complete mobile shopping solution with product browsing, cart management, and secure checkout process.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "ShopEasy Retail",
            technologies: ["React Native", "Node.js", "MongoDB"]
        },
        {
            id: 2,
            title: "Gym Management Mobile App",
            description: "Comprehensive fitness app with workout tracking, class scheduling, and member management features.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "FitLife Gyms",
            technologies: ["Flutter", "Firebase", "Stripe"]
        },
        {
            id: 3,
            title: "HR Management Mobile App",
            description: "Employee management solution with attendance tracking, leave management, and performance evaluation.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "Corporate Solutions Inc.",
            technologies: ["React Native", "PostgreSQL", "AWS"]
        },
        {
            id: 4,
            title: "E-Commerce Website",
            description: "Responsive online store with product management, customer accounts, and payment processing.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'web',
            client: "UrbanStyle Fashion",
            technologies: ["React", "Node.js", "Shopify"]
        },
        {
            id: 5,
            title: "Company Website",
            description: "Corporate website with responsive design, service information, and contact management.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'web',
            client: "TechSolutions Ltd.",
            technologies: ["Next.js", "TypeScript", "Tailwind"]
        },
        {
            id: 6,
            title: "Shop Website",
            description: "Online retail platform with inventory management, customer reviews, and promotional features.",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'web',
            client: "HomeDecor Plus",
            technologies: ["Vue.js", "Express", "MySQL"]
        },
        {
            id: 7,
            title: "Brand Identity Design",
            description: "Complete brand identity package including logo design, color palette, and brand guidelines.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'design',
            client: "Startup Innovators",
            technologies: ["Adobe Illustrator", "Figma", "Adobe Photoshop"]
        },
        {
            id: 8,
            title: "UI/UX Design System",
            description: "Comprehensive design system with reusable components and design tokens for consistency.",
            image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'design',
            client: "Digital Agency Co.",
            technologies: ["Figma", "Sketch", "Principle"]
        }
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.type === activeFilter);

    const getProjectTypeColor = (type: string) => {
        switch (type) {
            case 'web': return 'bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
            case 'mobile': return 'bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300';
            case 'design': return 'bg-amber-500/10 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300';
            default: return 'bg-gray-500/10 text-gray-600 dark:bg-gray-700/30 dark:text-gray-300';
        }
    };

    // Initialize GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    once: true,
                }
            });

            // Header animations
            const sectionTitle = headerRef.current?.querySelector('.section-title');
            const sectionSubtitle = headerRef.current?.querySelector('.section-subtitle');
            const filterBtns = filtersRef.current?.querySelectorAll('.filter-btn');

            if (sectionTitle) {
                tl.from(sectionTitle, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }
            if (sectionSubtitle) {
                tl.from(sectionSubtitle, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");
            }
            if (filterBtns && filterBtns.length > 0) {
                tl.from(filterBtns, {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.3");
            }

            // Horizontal scroll animation
            const scrollTween = gsap.to(scrollContentRef.current, {
                x: () => -(scrollContentRef.current!.scrollWidth - scrollContainerRef.current!.clientWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: "top 20%",
                    end: () => `+=${scrollContentRef.current!.scrollWidth - scrollContainerRef.current!.clientWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Individual card animations
            projectCardsRef.current.forEach((card, index) => {
                if (card) {
                    // Card entrance animation
                    gsap.from(card, {
                        y: 100,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            once: true,
                        }
                    });

                    // Card hover effects
                    const cardImage = card.querySelector('.project-image');
                    const cardContent = card.querySelector('.project-content');
                    const cardBadge = card.querySelector('.project-type-badge');

                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -10,
                            rotationY: 2,
                            rotationX: 2,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                        
                        gsap.to(cardImage, {
                            scale: 1.05,
                            duration: 0.4,
                            ease: "power2.out"
                        });

                        gsap.to(cardBadge, {
                            scale: 1.1,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        gsap.to(cardContent, {
                            y: -5,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            rotationY: 0,
                            rotationX: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });

                        gsap.to(cardImage, {
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        });

                        gsap.to(cardBadge, {
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        gsap.to(cardContent, {
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    });
                }
            });

            return () => {
                scrollTween.kill();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, [filteredProjects]);

    // Filter change animation
    useEffect(() => {
        gsap.fromTo(projectCardsRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, [activeFilter]);

    const handleFilterChange = (filter: 'all' | 'web' | 'mobile' | 'design') => {
        // Animate out current cards
        gsap.to(projectCardsRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setActiveFilter(filter);
            }
        });
    };

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !projectCardsRef.current.includes(el)) {
            projectCardsRef.current.push(el);
        }
    };

    return (
        <section id="projects" className="projects-section" ref={sectionRef}>
            <div className="section-container">
                <div className="section-header" ref={headerRef}>
                    <h2 className="section-title">
                        Our Projects
                    </h2>
                    <p className="section-subtitle">
                        Professional solutions tailored to your business needs
                    </p>
                </div>

                <div className="project-filters" ref={filtersRef}>
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => handleFilterChange('web')}
                        className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                    >
                        Web Solutions
                    </button>
                    <button
                        onClick={() => handleFilterChange('mobile')}
                        className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                    >
                        Mobile Apps
                    </button>
                    <button
                        onClick={() => handleFilterChange('design')}
                        className={`filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
                    >
                        Design
                    </button>
                </div>

                <div className="projects-scroll-container" ref={scrollContainerRef}>
                    <div className="projects-scroll-content" ref={scrollContentRef}>
                        {filteredProjects.map((project,) => (
                            <div
                                key={project.id}
                                className="project-card-container"
                                ref={addToRefs}
                            >
                                <div className="project-card">
                                    <div className="project-image-container">
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="project-image"
                                        />
                                        <span className={`project-type-badge ${getProjectTypeColor(project.type)}`}>
                                            {project.type.toUpperCase()}
                                        </span>
                                        <div className="project-client">
                                            {project.client}
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        
                                        {project.technologies && (
                                            <div className="project-technologies">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="project-actions">
                                            <a 
                                                href={project.link} 
                                                className="project-link"
                                            >
                                                View Project
                                                <svg className="link-icon" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;