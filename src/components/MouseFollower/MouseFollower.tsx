import { useEffect } from 'react';
import './MouseFollower.css';

const MouseFollower = () => {
    // All state related to cursor position and effects has been removed
    
    useEffect(() => {
        // No mouse movement tracking needed
        
        // Check if hovering over interactive elements (if you still need this functionality)
        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('hover-effect') || 
                target.classList.contains('hover-target')) {
                // Handle hover state if needed
            }
        };

        const handleMouseLeave = () => {
            // Handle hover state if needed
        };

        document.addEventListener('mouseenter', handleMouseEnter as EventListener);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseenter', handleMouseEnter as EventListener);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return null; // Returns nothing since we don't want any cursor effects
};

export default MouseFollower;