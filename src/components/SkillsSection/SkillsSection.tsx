import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useMotionValue, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillsSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'mobile' | 'devops' | 'cloud';
  icon: string;
  proficiency?: number; // 1-5 scale
}

const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(skillsRef, { once: false, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const cursorRotate = useMotionValue(0);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const categoryCardsRef = useRef<HTMLDivElement[]>([]);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);

  const skills: Skill[] = [
    // Languages
    { name: "HTML5", category: 'languages', icon: '🌐', proficiency: 5 },
    { name: "CSS3", category: 'languages', icon: '🎨', proficiency: 5 },
    { name: "JavaScript (ES6+)", category: 'languages', icon: '🚀', proficiency: 5 },
    { name: "TypeScript", category: 'languages', icon: '📘', proficiency: 5 },
    
    // Frontend
    { name: "React", category: 'frontend', icon: '⚛️', proficiency: 5 },
    { name: "Next.js", category: 'frontend', icon: '⏭️', proficiency: 4 },
    { name: "Angular", category: 'frontend', icon: '🅰️', proficiency: 4 },
    { name: "Tailwind CSS", category: 'frontend', icon: '🌬️', proficiency: 5 },
    { name: "Material UI", category: 'frontend', icon: '🧩', proficiency: 4 },
    { name: "Bootstrap", category: 'frontend', icon: '🎀', proficiency: 4 },
    
    // Mobile
    { name: "React Native (Expo)", category: 'mobile', icon: '📱', proficiency: 4 },
    { name: "Android SDK", category: 'mobile', icon: '🤖', proficiency: 3 },
    { name: "Android Studio", category: 'mobile', icon: '🛠️', proficiency: 4 },
    
    // DevOps/Tools
    { name: "Git", category: 'devops', icon: '🔀', proficiency: 5 },
    { name: "GitHub", category: 'devops', icon: '🐙', proficiency: 5 },
    { name: "Docker", category: 'devops', icon: '🐳', proficiency: 3 },
    { name: "VS Code", category: 'devops', icon: '💻', proficiency: 5 },
    
    // Cloud
    { name: "Firebase Auth", category: 'cloud', icon: '🔐', proficiency: 4 },
    { name: "Firestore", category: 'cloud', icon: '🗄️', proficiency: 4 },
    { name: "Firebase Hosting", category: 'cloud', icon: '🚀', proficiency: 4 },
    { name: "Cloud Functions", category: 'cloud', icon: '⚡', proficiency: 3 },
  ];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryTitles = {
    languages: { text: 'Languages', darkColor: '#e0e7ff', lightColor: '#1e293b' },
    frontend: { text: 'Frontend', darkColor: '#d1fae5', lightColor: '#064e3b' },
    mobile: { text: 'Mobile', darkColor: '#fef3c7', lightColor: '#92400e' },
    devops: { text: 'DevOps/Tools', darkColor: '#ede9fe', lightColor: '#5b21b6' },
    cloud: { text: 'Cloud', darkColor: '#fce7f3', lightColor: '#9d174d' },
  };

  // GSAP Animations
  useEffect(() => {
    if (!skillsRef.current) return;

    // Floating elements animation
    floatingElementsRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 0.08,
          y: 0,
          x: 0,
          duration: 2,
          delay: index * 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Category cards animation
    categoryCardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Hover animation
      gsap.to(card, {
        rotationY: 5,
        rotationX: 2,
        scale: 1.02,
        duration: 0.3,
        paused: true,
        ease: "power1.out"
      });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { rotationY: 5, rotationX: 2, scale: 1.02, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.3 });
      });
    });

    // Skill items animation
    skillItemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: Math.floor(index / 4) * 0.1 + (index % 4) * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Hover animation
      gsap.to(item, {
        y: -5,
        duration: 0.2,
        paused: true
      });

      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -5, duration: 0.2 });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { y: 0, duration: 0.2 });
      });
    });

    // Header animation
    const header = skillsRef.current.querySelector('.skills-header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Scroll hint animation
    const scrollHint = skillsRef.current.querySelector('.scroll-hint');
    if (scrollHint) {
      gsap.to(scrollHint, {
        opacity: 0.6,
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top bottom",
          toggleActions: "play none none none"
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      animate(cursorOpacity, 1, { duration: 0.5 });
    } else {
      controls.start("hidden");
      animate(cursorOpacity, 0, { duration: 0.3 });
    }
  }, [isInView, controls, cursorOpacity]);

  // Mouse move handler for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over scroll container
      if (scrollContainerRef.current?.contains(e.target as Node)) {
        animate(cursorScale, 0.8, { duration: 0.2 });
        animate(cursorRotate, isDragging ? 15 : 0, { duration: 0.3 });
      } else {
        animate(cursorScale, 1, { duration: 0.2 });
        animate(cursorRotate, 0, { duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, cursorScale, cursorRotate, isDragging]);

  // Drag to scroll functionality
  const startDrag = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const duringDrag = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    },
    hover: {
      rotateY: 5,
      rotateX: 2,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      languages: '#6366f1',
      frontend: '#10b981',
      mobile: '#f59e0b',
      devops: '#8b5cf6',
      cloud: '#ec4899',
    };
    return colors[category as keyof typeof colors] || '#6366f1';
  };

  const getProficiencyWidth = (proficiency: number) => {
    return `${(proficiency / 5) * 100}%`;
  };

  const getProficiencyColor = (proficiency: number, category: string) => {
    return `color-mix(in srgb, ${getCategoryColor(category)}, white ${100 - (proficiency * 20)}%)`;
  };

  // Add elements to ref arrays
  const addToFloatingElements = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  const addToCategoryCards = (el: HTMLDivElement | null, index: number) => {
    if (el && !categoryCardsRef.current.includes(el)) {
      categoryCardsRef.current[index] = el;
    }
  };

  const addToSkillItems = (el: HTMLDivElement | null, index: number) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current[index] = el;
    }
  };

  return (
    <section id="skills" className="skills-section" ref={skillsRef}>
      {/* Custom hand cursor */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          scale: cursorScale,
          rotate: cursorRotate
        }}
      />

      <div className="skills-container">
        {/* 3D floating elements with reduced scale */}
        <motion.div
          ref={addToFloatingElements}
          className="floating-element languages-element"
          initial={{ x: -100, y: -100, opacity: 0, rotateZ: 15 }}
          animate={controls}
          variants={{
            visible: {
              x: 0,
              y: 0,
              opacity: 0.08,
              rotateZ: 5,
              transition: { delay: 0.2, duration: 1.5 }
            }
          }}
        />

        <motion.div
          ref={addToFloatingElements}
          className="floating-element frontend-element"
          initial={{ x: 100, y: -50, opacity: 0, rotateZ: -10 }}
          animate={controls}
          variants={{
            visible: {
              x: 0,
              y: 0,
              opacity: 0.08,
              rotateZ: -5,
              transition: { delay: 0.4, duration: 1.5 }
            }
          }}
        />

        <motion.div
          ref={addToFloatingElements}
          className="floating-element mobile-element"
          initial={{ x: -50, y: 100, opacity: 0, rotateZ: 20 }}
          animate={controls}
          variants={{
            visible: {
              x: 0,
              y: 0,
              opacity: 0.08,
              rotateZ: 10,
              transition: { delay: 0.6, duration: 1.5 }
            }
          }}
        />

        {/* 3D grid background with reduced opacity */}
        <motion.div
          className="grid-bg"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 0.02,
              transition: { delay: 0.8, duration: 1 }
            }
          }}
        />

        <motion.div
          className="skills-header"
          initial="hidden"
          animate={controls}
          variants={headerVariants}
        >
          <h2 className="skills-title">
            <span className="title-decorator">//</span> Skills & Expertise
          </h2>
          <p className="skills-subtitle">
            Technologies I work with and my proficiency levels
          </p>
        </motion.div>

        {/* Horizontal scrollable container with drag functionality */}
        <div
          className="skills-scroll-container"
          ref={scrollContainerRef}
          onMouseDown={startDrag}
          onMouseMove={duringDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          <motion.div
            className="skills-scroll-grid"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                className="skill-category"
                ref={(el) => addToCategoryCards(el, categoryIndex)}
                variants={categoryVariants}
                whileHover="hover"
                style={{
                  borderTopColor: getCategoryColor(category),
                  transformStyle: 'preserve-3d',
                  minWidth: '260px',
                  perspective: '1000px'
                }}
              >
                {/* 3D depth effect */}
                <div className="category-depth" style={{
                  background: `linear-gradient(135deg, ${getCategoryColor(category)} 0%, transparent 100%)`,
                  opacity: 0.08
                }} />

                <div className="category-glow" style={{
                  background: `radial-gradient(circle at center, ${getCategoryColor(category)} 0%, transparent 70%)`,
                  opacity: 0.1
                }} />

                <div className="category-header">
                  <h3 className="category-title" data-category={category}>
                    {categoryTitles[category as keyof typeof categoryTitles].text}
                  </h3>
                  <div className="category-underline" style={{ backgroundColor: getCategoryColor(category) }} />
                </div>

                <div className="skills-list">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      ref={(el) => addToSkillItems(el, skillIndex)}
                      variants={itemVariants}
                      whileHover="hover"
                      initial="hidden"
                      animate="visible"
                    >
                      <div
                        className="skill-icon-container"
                        style={{
                          background: `linear-gradient(135deg, ${getCategoryColor(category)} 0%, ${getProficiencyColor(skill.proficiency || 3, category)} 100%)`,
                          boxShadow: `0 4px 15px ${getCategoryColor(category)}40`
                        }}
                      >
                        <div className="skill-icon">{skill.icon}</div>
                      </div>
                      <div className="skill-details">
                        <span className="skill-name">{skill.name}</span>
                        {skill.proficiency && (
                          <div className="skill-proficiency">
                            <div
                              className="proficiency-bar"
                              style={{
                                width: getProficiencyWidth(skill.proficiency),
                                background: `linear-gradient(90deg, ${getCategoryColor(category)}, ${getProficiencyColor(skill.proficiency, category)})`,
                                boxShadow: `0 0 8px ${getCategoryColor(category)}80`
                              }}
                            />
                            <span className="proficiency-value">{skill.proficiency}/5</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint for mobile */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: { delay: 1.2 }
            }
          }}
        >
          <span>← Scroll →</span>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;