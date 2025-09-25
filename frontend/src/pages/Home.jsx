// ========== frontend/src/pages/Home.jsx ==========
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { PERSONAL_INFO, TYPING_MESSAGES, SKILLS, FEATURED_PROJECTS, CERTIFICATIONS } from '../utils/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Home = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Animation de typing effect
  useEffect(() => {
    const message = TYPING_MESSAGES[currentMessage];
    let currentIndex = 0;

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
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentMessage]);

  return (
    <>
      <SEOHead
        title="Accueil"
        description="Portfolio de Souleymane Yeo - Développeur Full-Stack Python/React spécialisé en Django, FastAPI et IA. Basé en Côte d'Ivoire."
        keywords={['développeur', 'python', 'django', 'fastapi', 'react', 'côte d\'ivoire', 'full-stack']}
      />

      {/* Hero Section */}
      <HeroSection displayedText={displayedText} isTyping={isTyping} />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Projects Section */}
      <FeaturedProjectsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Contact CTA Section */}
      <ContactCTASection />
    </>
  );
};

// Hero Section Component
const HeroSection = ({ displayedText, isTyping }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section 
      ref={targetRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary-500/10 rounded-full animate-pulse-slow" />
        <div className="absolute top-1/4 -left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-purple-500/20 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className={`mb-8 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-large border-4 border-white dark:border-gray-700">
                <img
                  src="/images/profile.jpg"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=200&background=3b82f6&color=ffffff`;
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800">
                <span className="text-2xl">🇨🇮</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <div className="mb-8">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                Je suis{' '}
                <span className="font-bold text-primary-600 dark:text-primary-400 min-h-[1.5em] inline-block">
                  {displayedText}
                  <span className={`border-r-2 border-primary-600 ml-1 ${isTyping ? 'animate-pulse' : ''}`} />
                </span>
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {PERSONAL_INFO.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#projects"
                className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-semibold shadow-colored transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Voir mes projets</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <a
                href="#contact"
                className="border-2 border-primary-500 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Discutons</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Projets réalisés', value: '15+' },
                { label: 'Technologies maîtrisées', value: '10+' },
                { label: 'Années d\'expérience', value: '2+' },
                { label: 'Cafés bus', value: '∞' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              À propos de{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                moi
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Salut, moi c'est <strong className="text-primary-600 dark:text-primary-400">Souleymane Yeo</strong>, 
                développeur backend passionné, basé en <strong>Côte d'Ivoire</strong> 🇨🇮. 
                Je travaille principalement avec <strong>Python</strong> 🐍, <strong>Django</strong> et <strong>FastAPI</strong>, 
                des outils puissants avec lesquels je construis des architectures solides, maintenables et orientées performance.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Je m'intéresse particulièrement à l'<strong className="text-purple-600">intelligence artificielle</strong> 🤖, 
                au <strong>machine learning</strong> et aux <strong>LLMs</strong> (modèles de langage), 
                avec un fort intérêt pour les <strong>LMS</strong> (systèmes intelligents de gestion d'apprentissage).
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                En ce moment, je développe <em className="text-primary-600 font-semibold">OpportuCI</em>, 
                une plateforme professionnelle dédiée aux étudiants ivoiriens. Elle centralise les meilleures opportunités : 
                bourses, concours, stages, formations et plus encore 🎯.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Côté frontend, je suis en pleine montée en compétences avec <strong>React</strong> ⚛️. 
                L'idée ? Devenir un véritable <strong className="text-green-600">développeur full-stack</strong>, 
                capable de passer sans transition du backend robuste à une interface utilisateur moderne et réactive 👨‍💻.
              </p>
            </div>

            <div className="space-y-6">
              {/* Education */}
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">🎓</span>
                  Formation
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Licence en Informatique</h4>
                    <p className="text-gray-600 dark:text-gray-300">Spécialité DAS - En cours</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{PERSONAL_INFO.university}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">⚡</span>
                  En quelques chiffres
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">2+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Années d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">90%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Python mastery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Projets réalisés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">∞</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Passion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mes{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Compétences
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies et outils que j'utilise pour créer des solutions innovantes
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Backend Skills */}
            <SkillCategory 
              title="Backend" 
              icon="🖥️" 
              skills={SKILLS.backend}
              delay="0"
            />

            {/* Frontend Skills */}
            <SkillCategory 
              title="Frontend" 
              icon="🎨" 
              skills={SKILLS.frontend}
              delay="200"
            />

            {/* Tools Skills */}
            <SkillCategory 
              title="Outils & DevOps" 
              icon="🛠️" 
              skills={SKILLS.tools}
              delay="400"
            />

            {/* Data Skills */}
            <SkillCategory 
              title="Data & IA" 
              icon="🤖" 
              skills={SKILLS.data}
              delay="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Skill Category Component
const SkillCategory = ({ title, icon, skills, delay }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <div 
      ref={targetRef}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 transform transition-all duration-1000 hover:shadow-medium hover:scale-105 ${
        hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: hasIntersected ? `${skill.level}%` : '0%',
                  backgroundColor: skill.color,
                  transitionDelay: `${parseInt(delay) + index * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Featured Projects Section Component
const FeaturedProjectsSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Projets{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Phares
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
              Découvrez quelques-uns de mes projets les plus significatifs
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {FEATURED_PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 200} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-semibold shadow-colored transform hover:scale-105"
            >
              <span>Voir tous les projets</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, delay }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complété': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'En développement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'En ligne': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div
      ref={targetRef}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden group transform ${
        hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
          e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex space-x-4">
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Demo</span>
            </a>
          )}
          {project.sourceUrl && project.sourceUrl !== '#' && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Experience Section Component  
const ExperienceSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const experiences = [
    {
      title: 'Développeur Python / Django Freelance',
      period: '2023 - Présent',
      location: 'Abidjan, Côte d\'Ivoire (à distance)',
      description: 'Développement d\'applications web avec Django, FastAPI et PostgreSQL',
      achievements: [
        'Intégration d\'APIs, systèmes d\'authentification JWT',
        'Gestion de base de données PostgreSQL et optimisation des performances',
        'Création de solutions automatisées (facturation, notifications, scrapping)',
      ],
      icon: '💼',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Fondateur du projet OpportuCI',
      period: 'Depuis 2025 (en cours)',
      location: 'Projet personnel',
      description: 'Conception et développement d\'une plateforme éducative pour les opportunités académiques',
      achievements: [
        'Stack : Django, FastAPI, React, IA',
        'Gestion complète du projet de A à Z',
        'Architecture scalable et moderne',
      ],
      icon: '🚀',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Étudiant en Informatique',
      period: 'Depuis 2023 (en cours)',
      location: 'UVCI, Cocody, Abidjan',
      description: 'Licence en Informatique - Spécialité Développement d\'Application et e-Service (DAS)',
      achievements: [
        'Formation en développement web et programmation orientée objet',
        'Apprentissage des bases de données et architectures logicielles',
        'Projets académiques en équipe',
      ],
      icon: '🎓',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section ref={targetRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mon{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Parcours
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Aperçu de mon parcours académique et professionnel
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500 transform md:-translate-x-1/2" />
              
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative mb-12 md:mb-16 transform transition-all duration-1000 ${
                    hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 hover:shadow-medium transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </p>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {exp.description}
                        </p>
                        
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} text-white flex items-center justify-center text-xl shadow-medium`}>
                        {exp.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Certifications Section Component
const CertificationsSection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mes{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Formations et certifications qui enrichissent mon expertise
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-soft p-6 hover:shadow-medium transition-all duration-500 border border-gray-100 dark:border-gray-700 transform ${
                  hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl flex-shrink-0">
                    {cert.badge}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {cert.issuer}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 10h6m-9 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {cert.description}
                    </p>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                      >
                        <span>Voir le certificat</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact CTA Section Component
const ContactCTASection = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={targetRef} id="contact" className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-bounce-slow" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à collaborer ?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            💬 Une collaboration ? Une question ? Une idée ? Ou juste un coucou ?
            <br />
            <strong>N'hésitez pas à me laisser un petit message sympa !</strong>
            <br />
            Je réponds toujours avec enthousiasme... ✨
          </p>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Localisation</h3>
              <p className="text-white/80">📍 {PERSONAL_INFO.location}</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Email</h3>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                📧 {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Téléphone</h3>
              <a 
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                📞 {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-large transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>📨 Envoyer un email</span>
            </a>
            
            <a
              href={PERSONAL_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-primary-600 transition-all duration-300 font-semibold inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;