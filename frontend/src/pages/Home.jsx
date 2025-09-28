// ========== src/pages/Home.jsx (Version Ultra-Moderne) ==========
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { PERSONAL_INFO, TYPING_MESSAGES, SKILLS, FEATURED_PROJECTS } from '../utils/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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

      {/* Hero Section Ultra-Moderne */}
      <HeroSection 
        displayedText={displayedText} 
        isTyping={isTyping}
        mousePosition={mousePosition}
      />

      {/* Section Présentation Dynamique */}
      <PresentationSection />

      {/* Section Compétences Interactive */}
      <InteractiveSkillsSection />

      {/* Projets Phares avec Animations */}
      <FeaturedProjectsShowcase />

      {/* Section Parcours Timeline */}
      <TimelineSection />

      {/* Section Impact & Statistiques */}
      <ImpactSection />

      {/* Call to Action Final */}
      <FinalCTASection />
    </>
  );
};

// Hero Section avec Effets Visuels Avancés
const HeroSection = ({ displayedText, isTyping, mousePosition }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section 
      ref={targetRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
    >
      {/* Background animé avec effet de parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particules animées */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Effet de mouse suiveur */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Photo de profil avec effet glassmorphism */}
          <div className={`mb-12 transform transition-all duration-1500 ${hasIntersected ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
            <div className="relative inline-block">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden ring-4 ring-white/30 backdrop-blur-sm shadow-2xl border-2 border-white/20 relative">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=200&background=3b82f6&color=ffffff`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </div>
              
              {/* Badge Côte d'Ivoire avec animation */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400 via-white to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
                <span className="text-2xl font-bold">🇨🇮</span>
              </div>
              
              {/* Badge statut en ligne */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping" />
              </div>
            </div>
          </div>

          {/* Contenu principal avec animations échelonnées */}
          <div className={`transform transition-all duration-1500 delay-300 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {/* Titre principal avec gradient animé */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-white mb-4">Salut, je suis</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                {PERSONAL_INFO.name.split(' ')[0]}
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-300 mt-4 font-light">
                Yeo Souleymane
              </span>
            </h1>

            {/* Animation typing améliorée */}
            <div className="mb-12 h-20 md:h-24 flex items-center justify-center">
              <div className="text-2xl md:text-4xl font-semibold text-blue-300">
                <span className="text-gray-300">Je suis </span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {displayedText}
                  </span>
                  <span className={`absolute -right-3 top-0 h-full w-1 bg-blue-400 ${isTyping ? 'animate-pulse' : 'animate-ping'}`} />
                </span>
              </div>
            </div>

            {/* Description avec animation */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 opacity-90">
              🚀 <strong className="text-white">Créateur d'OpportuCI</strong> • Développeur passionné spécialisé en 
              <span className="text-blue-400 font-semibold"> Python/Django</span>, 
              <span className="text-green-400 font-semibold"> FastAPI</span> et 
              <span className="text-purple-400 font-semibold"> React</span>. 
              Basé en <span className="text-orange-400 font-semibold">Côte d'Ivoire</span> 🇨🇮
            </p>

            {/* Boutons CTA avec effets avancés */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-500/25 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center space-x-2">
                  <span>Découvrir mes projets</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/contact"
                className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Parlons ensemble</span>
                </span>
              </Link>
            </div>

            {/* Statistiques impressionnantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Projets réalisés', value: '15+', icon: '💼' },
                { label: 'Lignes de code', value: '50k+', icon: '💻' },
                { label: 'Tasses de café', value: '∞', icon: '☕' },
                { label: 'Heures codées', value: '2000+', icon: '⏰' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-1000 delay-${500 + index * 100} ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll avec animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
        <div className="text-white/60 text-xs mt-2 text-center">Scroll</div>
      </div>
    </section>
  );
};

// Section Présentation Moderne avec Animations
const PresentationSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contenu textuel */}
            <div className={`space-y-8 transform transition-all duration-1000 ${hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Transforme tes
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> idées</span>
                  <br />en solutions digitales
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="text-blue-600">Passionné par la création</strong>, je développe des applications web robustes et modernes. 
                  Ma spécialité ? Transformer des besoins complexes en solutions simples et efficaces.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '🎯', title: 'Vision Claire', desc: 'Je comprends vos besoins et les traduis en solutions techniques' },
                    { icon: '⚡', title: 'Performance', desc: 'Code optimisé, architecture scalable, expérience utilisateur fluide' },
                    { icon: '🚀', title: 'Innovation', desc: 'Toujours à la pointe des dernières technologies et tendances' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group"
              >
                <span>En savoir plus sur mon parcours</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Visualisation interactive des compétences */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                {/* Cercles de compétences avec animations */}
                <div className="relative w-96 h-96 mx-auto">
                  {[
                    { name: 'Python', level: 90, color: '#3776ab', x: 50, y: 20 },
                    { name: 'Django', level: 85, color: '#092e20', x: 80, y: 40 },
                    { name: 'FastAPI', level: 75, color: '#009688', x: 70, y: 70 },
                    { name: 'React', level: 70, color: '#61dafb', x: 30, y: 60 },
                    { name: 'PostgreSQL', level: 70, color: '#336791', x: 20, y: 30 }
                  ].map((skill, index) => (
                    <div
                      key={skill.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${skill.x}%`,
                        top: `${skill.y}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-2xl hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: skill.color }}
                      >
                        {skill.level}%
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          {skill.name}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Lignes de connexion animées */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    {/* Lignes connectant les compétences */}
                    <path
                      d="M 192 76 Q 240 120 270 160 T 200 270 T 100 200 T 80 120 Z"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Compétences Interactive Ultra-Moderne
const InteractiveSkillsSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState('backend');

  const categories = {
    backend: { 
      title: 'Backend Expert', 
      icon: '🔧', 
      gradient: 'from-blue-500 to-indigo-600',
      skills: SKILLS.backend 
    },
    frontend: { 
      title: 'Frontend Modern', 
      icon: '🎨', 
      gradient: 'from-purple-500 to-pink-600',
      skills: SKILLS.frontend 
    },
    tools: { 
      title: 'Outils & DevOps', 
      icon: '⚙️', 
      gradient: 'from-green-500 to-teal-600',
      skills: SKILLS.tools 
    },
    data: { 
      title: 'Data & IA', 
      icon: '🤖', 
      gradient: 'from-orange-500 to-red-600',
      skills: SKILLS.data 
    }
  };

  return (
    <section ref={targetRef} className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ma Stack
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Technique</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies que je maîtrise pour créer des solutions robustes et modernes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Navigation des catégories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-2xl scale-105`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.title}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Affichage des compétences */}
          <div className="relative min-h-[400px]">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                className={`absolute inset-0 transition-all duration-500 ${
                  activeCategory === key 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Graphique circulaire des compétences */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-6">
                      {category.skills.map((skill, index) => (
                        <div key={skill.name} className="text-center">
                          <div className="relative w-24 h-24 mx-auto mb-4">
                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke={skill.color}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2.51 * skill.level} 251.2`}
                                strokeLinecap="round"
                                className="animate-pulse"
                                style={{
                                  animation: `drawCircle 2s ease-in-out ${index * 0.2}s both`
                                }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold">{skill.level}%</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-white">{skill.name}</h3>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description et détails */}
                  <div className="space-y-6">
                    <div className={`text-6xl bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        {category.title}
                      </h3>
                      <div className="space-y-4">
                        {getSkillDescription(key).map((desc, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 251.2;
          }
        }
      `}</style>
    </section>
  );
};

// Showcase des Projets Phares avec Animations 3D
const FeaturedProjectsShowcase = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();
  const [hoveredProject, setHoveredProject] = useState(null);

  const featuredProjects = FEATURED_PROJECTS.filter(p => p.featured);

  return (
    <section ref={targetRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mes Créations
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Phares</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Découvrez mes projets les plus significatifs, de la conception à la réalisation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Grille de projets avec effets 3D */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                hasIntersected 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                {/* Image avec effet parallax */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  
                  {/* Badge de statut flottant */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                      project.status === 'En développement' 
                        ? 'bg-yellow-500 text-yellow-900'
                        : project.status === 'En ligne'
                        ? 'bg-green-500 text-green-900'
                        : 'bg-blue-500 text-blue-900'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Overlay avec boutons d'action */}
                  <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center space-x-4 z-20 transition-all duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Voir en live</span>
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Détails</span>
                    </Link>
                  </div>
                </div>

                {/* Contenu du projet */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies avec animations */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 transform transition-all duration-300 hover:scale-110"
                        style={{
                          animationDelay: `${techIndex * 100}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Statistiques du projet */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{project.view_count || 0} vues</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 10h6m-9 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <span>{project.category}</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1 group"
                    >
                      <span>Explorer</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA vers tous les projets */}
        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span>Découvrir tous mes projets</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Timeline Section Interactive
const TimelineSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const timelineData = [
    {
      year: '2025',
      title: 'Lancement d\'OpportuCI',
      description: 'Création de la plateforme révolutionnaire pour les étudiants ivoiriens',
      icon: '🚀',
      color: 'from-green-500 to-emerald-600',
      achievements: ['Architecture IA intégrée', 'Plus de 1000 opportunités centralisées', 'Interface utilisateur moderne']
    },
    {
      year: '2024',
      title: 'Spécialisation Full-Stack',
      description: 'Maîtrise complète de React et modernisation de mes compétences frontend',
      icon: '⚛️',
      color: 'from-blue-500 to-cyan-600',
      achievements: ['React avancé maîtrisé', '5 projets e-commerce développés', 'Architecture microservices']
    },
    {
      year: '2023',
      title: 'Expert Django & FastAPI',
      description: 'Consolidation expertise backend et premiers projets clients',
      icon: '🐍',
      color: 'from-purple-500 to-indigo-600',
      achievements: ['Django REST Framework expert', 'FastAPI haute performance', 'Premiers clients freelance']
    },
    {
      year: '2023',
      title: 'Début Université UVCI',
      description: 'Entrée en Licence Informatique spécialité DAS',
      icon: '🎓',
      color: 'from-orange-500 to-red-600',
      achievements: ['Formation informatique structurée', 'Projets académiques en équipe', 'Bases théoriques solides']
    }
  ];

  return (
    <section ref={targetRef} className="py-20 bg-gradient-to-br from-gray-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mon
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Parcours</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            L'évolution de ma passion pour le développement web et l'innovation
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Ligne de timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative mb-16 transform transition-all duration-1000 ${
                hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Contenu */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`text-2xl p-3 rounded-full bg-gradient-to-r ${item.color}`}>
                        {item.icon}
                      </span>
                      <div>
                        <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.year}
                        </span>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                    
                    <div className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-400 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Icône centrale */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-2xl border-4 border-white/20`}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

// Section Impact & Statistiques
const ImpactSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();
  
  const stats = [
    { 
      number: '15+', 
      label: 'Projets Réalisés', 
      description: 'Applications web complètes développées',
      icon: '💼',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      number: '50k+', 
      label: 'Lignes de Code', 
      description: 'Code Python, JavaScript et plus',
      icon: '💻',
      color: 'from-green-500 to-green-600'
    },
    { 
      number: '2000+', 
      label: 'Heures de Code', 
      description: 'Temps dédié au développement',
      icon: '⏰',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      number: '100%', 
      label: 'Satisfaction Client', 
      description: 'Projets livrés avec succès',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section ref={targetRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Impact &
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Réalisations</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Quelques chiffres qui illustrent mon engagement et ma passion pour le développement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center transform transition-all duration-1000 hover:scale-110 ${
                hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50">
                {/* Icône avec effet de flottement */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.color} text-white text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                {/* Nombre avec animation compteur */}
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Citation personnelle */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <blockquote className="relative max-w-4xl mx-auto">
            <div className="text-6xl text-blue-200 dark:text-blue-800 mb-4">"</div>
            <p className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
              Chaque ligne de code que j'écris est une step vers la création de solutions qui ont un impact réel sur la vie des gens.
            </p>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              - Souleymane Yeo, Créateur d'OpportuCI
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

// Call to Action Final Spectaculaire
const FinalCTASection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} className="py-20 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
          {/* Titre accrocheur */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Prêt à créer
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              du magie ensemble ?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            Que vous ayez une idée révolutionnaire, un projet complexe ou simplement l'envie de discuter tech, 
            je suis là pour transformer vos rêves en réalité digitale.
          </p>

          {/* Boutons CTA spectaculaires */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/contact"
              className="group relative px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-3">
                <span>Démarrons votre projet</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group px-10 py-5 border-2 border-white/50 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center space-x-3">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Écrivez-moi directement</span>
              </span>
            </a>
          </div>

          {/* Informations de contact rapide */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-2 text-white/80">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <span className="font-medium">Abidjan, Côte d'Ivoire</span>
              <span className="text-sm text-gray-300">Disponible à distance</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 text-white/80">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">Réponse sous 24h</span>
              <span className="text-sm text-gray-300">Toujours disponible</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 text-white/80">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">Consultation gratuite</span>
              <span className="text-sm text-gray-300">Discutons de votre idée</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

// Fonction helper pour les descriptions de compétences
const getSkillDescription = (category) => {
  const descriptions = {
    backend: [
      "Architecture robuste avec Python et Django pour des applications scalables",
      "APIs haute performance avec FastAPI et documentation automatique",
      "Gestion avancée des bases de données PostgreSQL et optimisation des requêtes",
      "Authentification sécurisée et gestion des permissions"
    ],
    frontend: [
      "Interfaces utilisateur modernes et responsives avec React",
      "Styling avancé avec Tailwind CSS et animations fluides",
      "État global optimisé et composants réutilisables",
      "Intégration parfaite avec les APIs REST"
    ],
    tools: [
      "Workflow de développement optimisé avec Git et GitHub",
      "Containerisation et déploiement avec Docker",
      "Environnement de développement Linux/WSL maîtrisé",
      "Tests et debugging avec les meilleurs outils"
    ],
    data: [
      "Analyse de données avancée avec NumPy et Pandas",
      "Machine Learning pratique avec Scikit-learn",
      "Visualisation de données avec Matplotlib",
      "Applications IA intégrées dans les projets web"
    ]
  };
  
  return descriptions[category] || [];
};

export default Home;