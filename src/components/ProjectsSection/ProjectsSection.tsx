import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './ProjectsSection.css';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    type: 'web' | 'mobile' | 'design';
    client?: string;
}

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'design'>('all');
    const projectsRef = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const projectsControls = useAnimation();
    const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Mobile App",
            description: "A complete mobile shopping solution with product browsing, cart management, and secure checkout process.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "ShopEasy Retail"
        },
        {
            id: 2,
            title: "Gym Management Mobile App",
            description: "Comprehensive fitness app with workout tracking, class scheduling, and member management features.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "FitLife Gyms"
        },
        {
            id: 3,
            title: "HR Management Mobile App",
            description: "Employee management solution with attendance tracking, leave management, and performance evaluation.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'mobile',
            client: "Corporate Solutions Inc."
        },
        {
            id: 4,
            title: "E-Commerce Website",
            description: "Responsive online store with product management, customer accounts, and payment processing.",
            image: "https://api.backlinko.com/app/uploads/2025/01/ecommerce-website-examples-featured-image-960x538.webp",
            link: "#",
            type: 'web',
            client: "UrbanStyle Fashion"
        },
        {
            id: 5,
            title: "Company Website",
            description: "Corporate website with responsive design, service information, and contact management.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'web',
            client: "TechSolutions Ltd."
        },
        {
            id: 6,
            title: "Shop Website",
            description: "Online retail platform with inventory management, customer reviews, and promotional features.",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "#",
            type: 'web',
            client: "HomeDecor Plus"
        }
    ];

    // Duplicate projects for infinite scroll effect
    const duplicatedProjects = [...projects, ...projects];

    const filteredProjects = activeFilter === 'all'
        ? duplicatedProjects
        : duplicatedProjects.filter(project => project.type === activeFilter);

    const getProjectTypeColor = (type: string) => {
        switch (type) {
            case 'web': return 'bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
            case 'mobile': return 'bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300';
            case 'design': return 'bg-amber-500/10 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300';
            default: return 'bg-gray-500/10 text-gray-600 dark:bg-gray-700/30 dark:text-gray-300';
        }
    };

    useEffect(() => {
        if (isProjectsInView) projectsControls.start("visible");
    }, [isProjectsInView, projectsControls]);

    // Infinite scroll animation
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let speed = 1; // pixels per frame
        let position = 0;
        const maxScroll = scrollContainer.scrollWidth / 2;

        const animate = () => {
            position += speed;
            
            if (position >= maxScroll) {
                position = 0;
            }
            
            scrollContainer.scrollLeft = position;
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleHover = (isHovering: boolean) => {
            speed = isHovering ? 0.2 : 1;
        };

        scrollContainer.addEventListener('mouseenter', () => handleHover(true));
        scrollContainer.addEventListener('mouseleave', () => handleHover(false));

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollContainer.removeEventListener('mouseenter', () => handleHover(true));
            scrollContainer.removeEventListener('mouseleave', () => handleHover(false));
        };
    }, [activeFilter]);

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

    const cardHover = {
        initial: { 
            y: 0,
            rotateX: 0,
            rotateY: 0,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        hover: {
            y: -8,
            rotateX: 1.5,
            rotateY: 1.5,
            boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.3,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const imageHover = {
        initial: { scale: 1 },
        hover: { scale: 1.03 }
    };

    return (
        <section id="projects" className="projects-section" ref={projectsRef}>
            <div className="section-container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    animate={projectsControls}
                    variants={fadeIn}
                >
                    <h2 className="section-title">
                        <motion.span 
                            className="inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            Our Projects
                        </motion.span>
                    </h2>
                    <motion.p 
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Professional solutions tailored to your business needs
                    </motion.p>
                    <motion.div 
                        className="project-filters"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setActiveFilter('all')}
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-light)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            All Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setActiveFilter('web')}
                            className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-light)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            Web Solutions
                        </motion.button>
                        <motion.button
                            onClick={() => setActiveFilter('mobile')}
                            className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-light)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            Mobile Apps
                        </motion.button>
                    </motion.div>
                </motion.div>

                <div className="projects-scroll-container" ref={scrollContainerRef}>
                    <motion.div 
                        className="projects-scroll-content"
                        initial="hidden"
                        animate={projectsControls}
                        variants={staggerContainer}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={`${project.id}-${index}`}
                                className="project-card-container"
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                            >
                                <motion.div
                                    className="project-card"
                                    variants={cardHover}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div 
                                        className="project-image-container"
                                        variants={imageHover}
                                    >
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
                                    </motion.div>
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        <div className="project-actions">
                                            <motion.a 
                                                href={project.link} 
                                                className="project-link"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                            >
                                                View Project
                                                <svg className="link-icon" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;