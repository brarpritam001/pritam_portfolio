import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './SkillsSection.css';

interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'design';
  icon: string;
}

const SkillsSection = () => {
  const skillsRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const iconsContentRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: "JavaScript", category: 'language', icon: '🚀' },
    { name: "TypeScript", category: 'language', icon: '📘' },
    { name: "React", category: 'framework', icon: '⚛️' },
    { name: "Node.js", category: 'framework', icon: '🟨' },
    { name: "HTML5", category: 'language', icon: '🌐' },
    { name: "CSS3", category: 'language', icon: '🎨' },
    { name: "Python", category: 'language', icon: '🐍' },
    { name: "Java", category: 'language', icon: '☕' },
    { name: "Angular", category: 'framework', icon: '🅰️' },
    { name: "Figma", category: 'design', icon: '✏️' },
    { name: "Photoshop", category: 'design', icon: '🖌️' },
    { name: "Git", category: 'tool', icon: '🔀' },
    { name: "Docker", category: 'platform', icon: '🐳' },
    { name: "AWS", category: 'platform', icon: '☁️' },
    { name: "Next.js", category: 'framework', icon: '⏭️' },
    { name: "GraphQL", category: 'tool', icon: '📊' },
    { name: "MongoDB", category: 'platform', icon: '🍃' },
    { name: "PostgreSQL", category: 'platform', icon: '🐘' },
    { name: "Redux", category: 'framework', icon: '🔄' },
    { name: "Sass", category: 'language', icon: '🎀' },
    { name: "Tailwind", category: 'framework', icon: '🌬️' },
    { name: "Vue", category: 'framework', icon: '🟩' },
    { name: "Swift", category: 'language', icon: '🐦' },
    { name: "Kotlin", category: 'language', icon: '🟪' },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }

    const animations: number[] = [];

    // Animation for the skill cards rows
    containerRefs.current.forEach((container, index) => {
      const content = contentRefs.current[index];
      if (!container || !content) return;

      let scrollAmount = 0;
      const speed = 0.5 + (index * 0.1);

      const animateScroll = () => {
        scrollAmount += speed;
        if (scrollAmount >= content.scrollWidth / 2) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollAmount;
        }
        animations.push(requestAnimationFrame(animateScroll));
      };

      animations.push(requestAnimationFrame(animateScroll));
    });

    // Animation for the icons carousel
    const iconsContainer = iconsContainerRef.current;
    const iconsContent = iconsContentRef.current;
    if (iconsContainer && iconsContent) {
      let iconsScrollAmount = 0;
      const iconsSpeed = 0.8;

      const animateIconsScroll = () => {
        iconsScrollAmount += iconsSpeed;
        if (iconsScrollAmount >= iconsContent.scrollWidth / 2) {
          iconsScrollAmount = 0;
          iconsContainer.scrollLeft = 0;
        } else {
          iconsContainer.scrollLeft = iconsScrollAmount;
        }
        animations.push(requestAnimationFrame(animateIconsScroll));
      };

      animations.push(requestAnimationFrame(animateIconsScroll));
    }

    return () => {
      animations.forEach(animationId => cancelAnimationFrame(animationId));
    };
  }, [isInView, controls]);

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
    hidden: { y: 10, opacity: 0 },
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'language': return '#6366f1';
      case 'framework': return '#10b981';
      case 'tool': return '#f59e0b';
      case 'platform': return '#8b5cf6';
      case 'design': return '#ec4899';
      default: return '#6366f1';
    }
  };

  // Split skills into 4 rows
  const rows = [
    skills.slice(0, 6),
    skills.slice(6, 12),
    skills.slice(12, 18),
    skills.slice(18, 24)
  ];

  return (
    <section id="skills" className="skills-section" ref={skillsRef}>
      <div className="skills-container">
        <motion.div 
          className="skills-header"
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
          <h2 className="skills-title">
            <span className="title-decorator">//</span> Skills & Technologies
          </h2>
          <p className="skills-subtitle">
            Technologies I <span className="highlight">work</span> with
          </p>
        </motion.div>

        <div className="skills-rows-container">
          {rows.map((row, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className="skills-scroll-container"
              ref={el => { containerRefs.current[rowIndex] = el; }}
            >
              <motion.div 
                className="skills-scroll-content"
                ref={el => { contentRefs.current[rowIndex] = el; }}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
              >
                {[...row, ...row].map((skill, index) => (
                  <motion.div 
                    key={`${skill.name}-${rowIndex}-${index}`}
                    className="skill-card"
                    variants={itemVariants}
                    style={{ 
                      backgroundColor: getSkillColor(skill.category),
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      zIndex: 1
                    }}
                  >
                    <div className="skill-content">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-glow" style={{ backgroundColor: getSkillColor(skill.category) }} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* New Icons Carousel Section */}
        <div className="skills-icons-section">
          <motion.div 
            className="skills-icons-header"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >          
          </motion.div>

          <div 
            className="skills-icons-container"
            ref={iconsContainerRef}
          >
            <motion.div 
              className="skills-icons-content"
              ref={iconsContentRef}
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            >
              {[...skills, ...skills].map((skill, index) => (
                <motion.div 
                  key={`icon-${skill.name}-${index}`}
                  className="skill-icon-item"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <div className="skill-icon-emoji">{skill.icon}</div>
                  <span className="skill-icon-name">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="skills-background-circle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 0.1,
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