import { useEffect, useState } from 'react';
import './MouseFollower.css';

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);
    const [sparklePositions, setSparklePositions] = useState<Array<{
        x: number, 
        y: number, 
        size: number, 
        opacity: number,
        color: string,
        velocity: { x: number, y: number },
        life: number
    }>>([]);
    const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            
            // Add to trail
            setTrailPositions(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY }]);
            
            // Generate more sparkles with varied properties
            if (Math.random() > 0.5) {
                const sparkleCount = Math.floor(Math.random() * 3) + 1;
                const newSparkles = Array(sparkleCount).fill(0).map(() => ({
                    x: e.clientX + (Math.random() * 30 - 15),
                    y: e.clientY + (Math.random() * 30 - 15),
                    size: Math.random() * 5 + 2,
                    opacity: 0.8 + Math.random() * 0.2,
                    color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
                    velocity: {
                        x: (Math.random() - 0.5) * 2,
                        y: -Math.random() * 3 - 1
                    },
                    life: 1
                }));
                setSparklePositions(prev => [...prev, ...newSparkles].slice(-50));
            }
            
            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.classList.contains('btn') || 
                target.classList.contains('hover-effect') ||
                target.onclick !== null ||
                target.hasAttribute('data-clickable');
            
            setIsHoveringClickable(isInteractive);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('hover-effect') || 
                target.classList.contains('hover-target')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setIsHoveringClickable(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter as EventListener);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Animation loop
        const animationInterval = setInterval(() => {
            // Update sparkles
            setSparklePositions(prev => 
                prev.map(sparkle => ({
                    ...sparkle,
                    x: sparkle.x + sparkle.velocity.x,
                    y: sparkle.y + sparkle.velocity.y,
                    opacity: sparkle.opacity - 0.02,
                    life: sparkle.life - 0.02,
                    size: sparkle.size * 0.99
                })).filter(sparkle => sparkle.life > 0)
            );
            
            // Update trail (fade out)
            setTrailPositions(prev => prev.length > 0 ? prev.slice(1) : []);
        }, 16); // ~60fps

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter as EventListener);
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearInterval(animationInterval);
        };
    }, []);

    return (
        <>
            {/* Trail effect */}
            {trailPositions.map((pos, index) => (
                <div 
                    key={`trail-${index}`}
                    className="mouse-follower-trail"
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                        opacity: index / trailPositions.length * 0.6
                    }}
                />
            ))}
            
            {/* Main follower */}
            <div 
                className={`mouse-follower ${isHovering ? 'hovering' : ''} ${isHoveringClickable ? 'clickable' : ''}`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            >
                <div className="mouse-follower-glow" />
                <div className="mouse-follower-pulse" />
                <div className="mouse-follower-inner" />
            </div>
            
            {/* Center dot */}
            <div 
                className="mouse-follower-dot"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            />
            
            {/* Sparkles */}
            {sparklePositions.map((sparkle, index) => (
                <div 
                    key={`sparkle-${index}`}
                    className="mouse-follower-sparkle"
                    style={{
                        transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`,
                        opacity: sparkle.opacity,
                        background: sparkle.color,
                        boxShadow: `0 0 ${sparkle.size}px ${sparkle.size/2}px ${sparkle.color}`
                    }}
                />
            ))}
        </>
    );
};

export default MouseFollower;