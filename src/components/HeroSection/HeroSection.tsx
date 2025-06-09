import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView, useMotionValue, useTransform, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import './HeroSection.css'

type TechBubble = {
  name: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay: number;
  color: string;
  icon: string;
};

const TechSphere = ({ color, position }: { color: string; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const PritamHeroSection = () => {
    const [typedText, setTypedText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showCV, setShowCV] = useState(false);
    const [flipCard, setFlipCard] = useState(false);
    
    const pritamHeroRef = useRef<HTMLDivElement>(null);
    const pritamCardRef = useRef<HTMLDivElement>(null);
    const pritamVideoRef = useRef<HTMLVideoElement>(null);
    const heroControls = useAnimation();
    const isHeroInView = useInView(pritamHeroRef, { once: true });
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    const texts = useMemo(() => [
      "Web & mobile app developer",
      "Clean code, smooth UI",
      "User-first design mindset",
      "Building experiences that work",
      "UX/UI Designer", 
      "Web Developer", 
    ], []);

    useEffect(() => {
        if (isHeroInView) heroControls.start("visible");
    }, [isHeroInView, heroControls]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (pritamCardRef.current) {
                const rect = pritamCardRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const x = e.clientX - centerX;
                const y = e.clientY - centerY;
                
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const type = () => {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                setTypedText(currentText.substring(0, typedText.length - 1));
                setTypingSpeed(50);
            } else {
                setTypedText(currentText.substring(0, typedText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && typedText === currentText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setCurrentTextIndex((currentTextIndex + 1) % texts.length);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(type, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, currentTextIndex, isDeleting, typingSpeed, texts]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        flipped: {
            rotateY: 180,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

  const techBubbles: TechBubble[] = [
    { name: 'React', position: { top: '10%', left: '15%' }, delay: 0.6, color: '#61dafb', icon: '⚛️' },
    { name: 'TypeScript', position: { bottom: '30%', left: '5%' }, delay: 1.0, color: '#3178c6', icon: '📘' },
    { name: 'React Native', position: { bottom: '15%', right: '20%' }, delay: 1.2, color: '#02569B', icon: '📱' },
    { name: 'Tailwind CSS', position: { top: '5%', right: '25%' }, delay: 0.9, color: '#38B2AC', icon: '💨' },
    { name: 'Firebase', position: { top: '20%', right: '10%' }, delay: 0.8, color: '#FFCA28', icon: '🔥' },
    { name: 'GitHub', position: { top: '15%', left: '40%' }, delay: 0.85, color: '#181717', icon: '🐙' },
];

    const handleDownloadCV = () => {
        setShowCV(true);
    };

    const handleCloseCV = () => {
        setShowCV(false);
    };

    const handleFlipCard = () => {
        setFlipCard(!flipCard);
    };

    const handleVideoLoaded = () => {
        if (pritamVideoRef.current) {
            pritamVideoRef.current.play().catch(error => {
                console.error("Video play failed:", error);
            });
        }
    };

    return (
        <div className="pritam-hero-container">
            <div className="pritam-hero-background">
                <video
                    ref={pritamVideoRef}
                    className="pritam-galaxy-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={handleVideoLoaded}
                    poster="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                >
                    <source src="https://videos.pexels.com/video-files/2611250/2611250-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="pritam-three-canvas">
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <TechSphere color="#9d56f7" position={[-3, 1, 0]} />
                    <TechSphere color="#56a0f7" position={[3, -1, 0]} />
                    <TechSphere color="#f756a0" position={[0, 2, -2]} />
                    <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>

            <AnimatePresence>
                {showCV && (
                    <motion.div 
                        className="pritam-cv-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="pritam-cv-modal-content">
                            <button 
                                className="pritam-cv-modal-close"
                                onClick={handleCloseCV}
                                aria-label="Close CV modal"
                                title="Close"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <motion.img 
                                src="../assets/cv.jpg" 
                                alt="CV" 
                                className="pritam-cv-image"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            />
                        </div>
                    </motion.div>   
                )}
            </AnimatePresence>

            <section className="pritam-hero-section" ref={pritamHeroRef}>
                <motion.div 
                    className="pritam-hero-content"
                    initial="hidden"
                    animate={heroControls}
                    variants={containerVariants}
                >
                    <motion.div className="pritam-hero-text-section" variants={itemVariants}>
                        <motion.div className="pritam-hero-badge" variants={itemVariants}>
                            <span className="pritam-badge-dot"></span>
                            Available for opportunities
                        </motion.div>

                        <motion.h1 className="pritam-hero-title" variants={itemVariants}>
                            <span className="pritam-title-greeting">Hello, I'm</span>
                            <motion.span 
                                className="pritam-title-name"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Pritam
                            </motion.span>
                        </motion.h1>

                        <motion.h2 className="pritam-hero-subtitle" variants={itemVariants}>
                            <span className="pritam-typing-wrapper">
                                <span className="pritam-typing-text">{typedText}</span>
                                <span className="pritam-typing-cursor"></span>
                            </span>
                        </motion.h2>

                        <motion.p className="pritam-hero-description" variants={itemVariants}>
                            I craft intuitive digital experiences with user-centered design principles, 
                            seamless interactions, and pixel-perfect interfaces that delight users 
                            and drive business results.
                        </motion.p>

                        <motion.div className="pritam-hero-actions" variants={itemVariants}>
                            <motion.button 
                                className="pritam-btn-primary"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Portfolio</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.button>

                            <motion.button 
                                className="pritam-btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadCV}
                            >
                                <span>View CV</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 15V19A2 2 0 0119 21H5A2 2 0 013 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.button>
                        </motion.div>

                        <motion.div className="pritam-hero-stats" variants={itemVariants}>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">1.5+</span>
                                <span className="pritam-stat-label">Years Experience</span>
                            </div>
                            <div className="pritam-stat-divider"></div>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">70+</span>
                                <span className="pritam-stat-label">Projects Completed</span>
                            </div>
                            <div className="pritam-stat-divider"></div>
                            <div className="pritam-stat-item">
                                <span className="pritam-stat-number">100%</span>
                                <span className="pritam-stat-label">Happy Clients</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="pritam-hero-visual-section" variants={cardVariants}>
                        <motion.div 
                            className="pritam-hero-card"
                            ref={pritamCardRef}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                            animate={flipCard ? "flipped" : "visible"}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }}
                            onClick={handleFlipCard}
                        >
                            <div className="pritam-card-inner">
                                <div className="pritam-card-face pritam-card-front">
                                    <div className="pritam-profile-avatar">
                                        <div className="pritam-avatar-ring"></div>
                                        <div className="pritam-avatar-image"></div>
                                        <div className="pritam-avatar-status"></div>
                                    </div>
                                    
                                    <div className="pritam-card-content">
                                        <h3>Pritam</h3>
                                        <p>Senior UX Designer</p>
                                        <div className="pritam-skill-tags">
                                            <span>UX Research</span>
                                            <span>UI Design</span>
                                            <span>Prototyping</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pritam-card-face pritam-card-back">
                                    <div className="pritam-design-tools-grid">
                                        {techBubbles.map((tech, index) => (
                                            <motion.div 
                                                key={index}
                                                className="pritam-design-tool-item"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: tech.delay }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <div className={`pritam-tool-icon pritam-tool-icon-${tech.name.replace(/\s+/g, '').toLowerCase()}`}>
                                                    {tech.icon}
                                                </div>
                                                <span className="pritam-tool-name">{tech.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {techBubbles.map((bubble) => (
                                <motion.div
                                    key={bubble.name}
                                    className="pritam-floating-bubble"
                                    style={{
                                        position: 'absolute',
                                        ...bubble.position,
                                        backgroundColor: bubble.color
                                    } as HTMLMotionProps<'div'>['style']}
                                    initial={{ opacity: 0, scale: 0, y: 20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0,
                                        rotateZ: [0, 360]
                                    }}
                                    transition={{ 
                                        delay: bubble.delay,
                                        duration: 0.6,
                                        rotateZ: {
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }}
                                    whileHover={{ 
                                        scale: 1.2,
                                        y: -10,
                                        boxShadow: `0 15px 30px ${bubble.color}40`
                                    }}
                                >
                                    <span>{bubble.icon}</span>
                                    <span className="pritam-bubble-tooltip">{bubble.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="pritam-scroll-indicator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <div className="pritam-scroll-text">Scroll to explore</div>
                    <motion.div 
                        className="pritam-scroll-arrow"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default PritamHeroSection;