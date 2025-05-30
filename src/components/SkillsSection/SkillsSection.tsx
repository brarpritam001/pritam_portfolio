import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './SkillsSection.css';

interface Skill {
    name: string;
    level: number;
    category: 'language' | 'framework' | 'tool' ;
    icon?: string;
}

const SkillsSection = () => {
    const skillsRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

    const skills: Skill[] = [
        { name: "JavaScript/TypeScript", level: 95, category: 'language', icon: '🚀' },
        { name: "React/Next.js", level: 90, category: 'framework', icon: '⚛️' },
        { name: "Node.js", level: 85, category: 'framework', icon: '🟢' },
        { name: "Python", level: 80, category: 'language', icon: '🐍' },
        { name: "GraphQL", level: 75, category: 'tool', icon: '📊' },
        { name: "Docker", level: 85, category: 'tool', icon: '🐳' },
        { name: "AWS", level: 75, category: 'tool', icon: '☁️' },      
        { name: "Git", level: 90, category: 'tool', icon: '🔀' },
        { name: "CSS/Tailwind", level: 85, category: 'language', icon: '🎨' },
        { name: "Redux", level: 80, category: 'framework', icon: '🔄' },
    ];

    const categories = [
        { id: 'language', name: 'Languages', icon: '💻' },
        { id: 'framework', name: 'Frameworks', icon: '🧩' },        
        { id: 'tool', name: 'Tools & Platforms', icon: '🛠️' },
    ];

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    const cardHover = {
        scale: 1.03,
        y: -5,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    };


    const getSkillGradient = (category: string) => {
        switch (category) {
            case 'language': return 'linear-gradient(135deg, var(--primary), var(--primary-light))';
            case 'framework': return 'linear-gradient(135deg, var(--accent), var(--accent-light))';
           
            case 'tool': return 'linear-gradient(135deg, var(--tertiary), var(--tertiary-light))';
            default: return 'linear-gradient(135deg, var(--primary), var(--primary-light))';
        }
    };

    return (
        <section id="skills" className="skills-section" ref={skillsRef}>
            <div className="section-container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: [0.16, 0.77, 0.47, 0.97]
                            }
                        }
                    }}
                >
                    <h2 className="section-title">
                        <span className="title-decorator">//</span> Technical Skills
                    </h2>
                    <p className="section-subtitle">
                        My <span className="highlight">toolkit</span> for building exceptional digital experiences
                    </p>
                </motion.div>

                <motion.div 
                    className="skills-container"
                    initial="hidden"
                    animate={controls}
                    variants={container}
                >
                    {categories.map((category) => (
                        <motion.div 
                            key={category.id}
                            className="skills-category"
                            variants={item}
                            whileHover={cardHover}
                        >
                            <div className="category-header">
                                <span className="category-icon">{category.icon}</span>
                                <h3 className="category-title">{category.name}</h3>
                                <div 
                                    className="category-decoration"
                                    style={{ background: getSkillGradient(category.id) }}
                                />
                            </div>
                            <div className="skills-list">
                                {skills
                                    .filter(skill => skill.category === category.id)
                                    .map((skill) => (
                                        <div key={skill.name} className="skill-item">
                                            <div className="skill-header">
                                                <div className="skill-name-container">
                                                    {skill.icon && (
                                                        <span className="skill-icon">{skill.icon}</span>
                                                    )}
                                                    <span className="skill-name">{skill.name}</span>
                                                </div>
                                                <span className="skill-level">{skill.level}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <motion.div 
                                                    className="progress-fill"
                                                    initial={{ width: 0 }}
                                                    animate={controls}
                                                    variants={{
                                                        visible: {
                                                            width: `${skill.level}%`,
                                                            transition: {
                                                                duration: 1.2,
                                                                delay: 0.3,
                                                                ease: [0.16, 0.77, 0.47, 0.97]
                                                            }
                                                        }
                                                    }}
                                                    style={{ background: getSkillGradient(category.id) }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    className="skills-3d-decoration"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 0.15,
                            scale: 1,
                            transition: {
                                delay: 0.5,
                                duration: 1.5,
                                ease: "easeOut"
                            }
                        }
                    }}
                />
            </div>
        </section>
    );
};

export default SkillsSection;