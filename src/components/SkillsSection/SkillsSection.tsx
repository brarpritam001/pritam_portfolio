import { motion } from 'framer-motion';
import './SkillsSection.css';

const SkillsSection = () => {
const skills = [
  // Languages
  "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript",

  // Frontend
  "React", "Next.js", "Angular", "Tailwind CSS", "Material UI", "Bootstrap",

  // Mobile
  "React Native (Expo)", "Android SDK",

  // DevOps/Tools
  "Git", "GitHub", "Docker", "VS Code",

  // Cloud
  "Firebase Auth", "Firebase Firestore", "Firebase Hosting", "Firebase Functions"
];
const skillIcons: Record<string, string> = {
  // Languages
  "HTML5": "🌐",
  "CSS3": "🎨",
  "JavaScript (ES6+)": "🚀",
  "TypeScript": "📘",

  // Frontend
  "React": "⚛️",
  "Next.js": "⏭️",
  "Angular": "🅰️",
  "Tailwind CSS": "🌬️",
  "Material UI": "🧱",
  "Bootstrap": "🅱️",

  // Mobile
  "React Native (Expo)": "📱",
  "Android SDK": "🤖",

  // DevOps/Tools
  "Git": "🔀",
  "GitHub": "🐙",
  "Docker": "🐳",
  "VS Code": "🖊️",

  // Cloud
  "Firebase Auth": "🔐",
  "Firebase Firestore": "🔥",
  "Firebase Hosting": "🌍",
  "Firebase Functions": "⚙️"
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
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
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">MY SKILLS</h2>
        
        <motion.div
          className="skills-grid"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill}
              className="skill-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="skill-icon">{skillIcons[skill] || "✨"}</span>
              <span className="skill-name">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;