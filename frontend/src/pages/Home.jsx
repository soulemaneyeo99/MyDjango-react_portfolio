// ========== src/pages/Home.jsx (Version Modulaire Professionnelle) ==========
import React, { useState, useEffect } from 'react';
import SEOHead from '../components/common/SEOHead';
import { TYPING_MESSAGES } from '../utils/constants';

// Import des composants modulaires
import HeroSection from '../components/home/HeroSection';
import PresentationSection from '../components/home/PresentationSection';
import InteractiveSkillsSection from '../components/home/InteractiveSkillsSection';
import FeaturedProjectsShowcase from '../components/home/FeaturedProjectsShowcase';
import TimelineSection from '../components/home/TimelineSection';
import ImpactSection from '../components/home/ImpactSection';
import FinalCTASection from '../components/home/FinalCTASection';

const Home = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effet de souris pour les animations de fond
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation de typing effect améliorée
  useEffect(() => {
    const message = TYPING_MESSAGES[currentMessage];
    let currentIndex = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setDisplayedText(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        setTimeout(() => {
          setIsTyping(true);
          setCurrentMessage((prev) => (prev + 1) % TYPING_MESSAGES.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentMessage]);

  return (
    <>
      <SEOHead
        title="Accueil"
        description="Portfolio de Souleymane Yeo - Développeur Full-Stack Python/React spécialisé en Django, FastAPI et IA. Créateur d'OpportuCI. Basé en Côte d'Ivoire."
        keywords={['développeur', 'python', 'django', 'fastapi', 'react', 'côte d\'ivoire', 'full-stack', 'opportunci']}
      />

      <HeroSection
        displayedText={displayedText}
        isTyping={isTyping}
        mousePosition={mousePosition}
      />

      <PresentationSection />

      <InteractiveSkillsSection />

      <FeaturedProjectsShowcase />

      <TimelineSection />

      <ImpactSection />

      <FinalCTASection />
    </>
  );
};

export default Home;