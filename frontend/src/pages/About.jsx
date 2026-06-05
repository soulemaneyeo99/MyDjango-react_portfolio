// ========== frontend/src/pages/About.jsx ==========
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Code, Brain, Rocket, Award, Download, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/constants';
import SEOHead from '../components/common/SEOHead';
import Timeline from '../components/features/about/Timeline';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const About = () => {
  const education = [
    {
      title: "Licence en Informatique",
      institution: "Université Virtuelle de Côte d'Ivoire (UVCI)",
      period: "Depuis 2023 (en cours)",
      location: "Cocody, Abidjan",
      specialty: "Développement d'Application et e-Service (DAS)",
      description: "Formation en informatique avec un accent sur le développement web, la programmation orientée objet, et les bases de données."
    },
    {
      title: "Apprentissage Autodidacte",
      institution: "Formations en ligne et projets personnels",
      period: "Depuis 2023 (en cours)",
      description: "Apprentissage approfondi de Django, FastAPI, JavaScript, React, Git, GitHub, et des bases du Machine Learning avec scikit-learn et TensorFlow."
    }
  ];

  const experience = [
    {
      title: "Full-Stack Developer (AI & Automation)",
      organization: "Pront-ix",
      period: "2024 - Présent",
      location: "Full Remote",
      description: "Conception et développement de solutions basées sur l'intelligence artificielle et le web moderne au sein d'une entreprise tech innovante.",
      tasks: [
        "Conception et développement de chatbots intelligents basés sur des LLMs",
        "Implémentation de workflows IA avec LangChain (RAG, agents, automatisation)",
        "Développement de backends API robustes et intégration de modèles IA",
        "Optimisation et structuration de projets orientés scalabilité et maintenabilité"
      ]
    },
    {
      title: "Fullstack Web & AI Expert (Freelance)",
      period: "2023 - Présent",
      location: "Abidjan, Côte d'Ivoire (à distance)",
      tasks: [
        "Développement d'applications web avec Django, FastAPI et PostgreSQL",
        "Intégration d'APIs, systèmes d'authentification, et gestion de base de données",
        "Création de solutions automatisées pour des besoins métiers (facturation, notifications, scrapping)",
        "Développement d'applications mobiles sur mesure selon les besoins clients"
      ]
    },
    {
      title: "Créateur de Vision360 - Assistant Académique IA",
      organization: "Projet personnel (Beta / Prêt pour pilote)",
      period: "Depuis 2025",
      tasks: [
        "Conception et développement d'une plateforme EdTech centralisant les activités Moodle pour les étudiants de l'UVCI",
        "Stack : Next.js, FastAPI, Python, TypeScript, PostgreSQL, Docker, AES-256",
        "Implémentation d'un moteur de scraping intelligent, d'alertes push/email et d'un système communautaire Agora"
      ]
    }
  ];

  const skills = [
    {
      category: "Backend",
      icon: Code,
      color: "bg-blue-500",
      skills: [
        { name: "Python", level: 90 },
        { name: "Django / DRF", level: 85 },
        { name: "FastAPI", level: 75 },
        { name: "PostgreSQL, MySQL", level: 70 }
      ]
    },
    {
      category: "Frontend",
      icon: Brain,
      color: "bg-green-500",
      skills: [
        { name: "JavaScript (ES6+)", level: 70 },
        { name: "React (JSX)", level: 60 },
        { name: "HTML5, CSS3", level: 75 },
        { name: "Bootstrap, Tailwind", level: 70 }
      ]
    },
    {
      category: "Data & AI",
      icon: Rocket,
      color: "bg-purple-500",
      skills: [
        { name: "Machine Learning", level: 65 },
        { name: "NumPy, Pandas", level: 75 },
        { name: "scikit-learn, SciPy", level: 65 },
        { name: "Data Analysis", level: 70 }
      ]
    }
  ];

  const certificates = [
    {
      title: "Creativité, Innovation et Transformation",
      date: "Février 2025",
      description: "Maîtrise des méthodes de Design Thinking et d'innovation pour transformer des idées complexes en solutions concrètes et impactantes.",
      file: "/documents/Yeo_Yanougui_Souleymane_Creativity_Innovation_and_Transformation.pdf"
    },
    {
      title: "Apprendre à Apprendre (Learning How to Learn)",
      date: "Janvier 2025",
      description: "Utilisation des neurosciences pour optimiser l'apprentissage, la mémorisation et la maîtrise de sujets techniques complexes.",
      file: "/documents/Yeo_Yanougui_Souleymane_Learning_How_to_Learn.pdf"
    },
    {
      title: "Art Oratoire et Présentation Professionnelle",
      date: "Janvier 2025",
      description: "Développement de compétences en communication d'impact pour présenter des solutions techniques avec clarté et conviction.",
      file: "/documents/Yeo_Yanougui_Souleymane_Speaking_and_Presenting.pdf"
    },
    {
      title: "Introduction à la Data Science",
      date: "04 Mars 2025",
      description: "Certificat obtenu après une formation complète couvrant les bases de la data science : IA, Data, Visualisation, statistiques et premières notions de machine learning.",
      file: "/documents/CertificatIntrotoDataScienceUpdate20250403-28-1khjm7.pdf"
    },
    {
      title: "Entrepreneuriat Numérique & Leadership",
      date: "DigiFemme Program",
      description: "Formation axée sur la création de projet numérique, l'innovation, la gestion d'équipe et les bases de l'entrepreneuriat dans la tech.",
      file: "/documents/digifemmeCertificate_of_Entreprenariat.pdf"
    }
  ];

  return (
    <>
      <SEOHead
        title="À propos | Souleymane Yeo"
        description="Développeur backend passionné basé en Côte d'Ivoire. Découvrez mon parcours, mes compétences et mon expérience en développement Python/Django."
        keywords={['développeur', 'backend', 'python', 'django', 'côte d\'ivoire', 'éducation']}
      />

      <div className="min-h-screen bg-bg-dark text-text-primary overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="primary" className="mb-4">
                  HELLO WORLD 👋
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                  Je suis <span className="text-primary-500">Souleymane Yeo</span>
                </h1>
                <div className="text-lg text-text-secondary space-y-4 leading-relaxed font-light">
                  <p>
                    Expert <strong>Fullstack Web & IA</strong> basé à <strong>Abidjan, Côte d'Ivoire</strong> 🇨🇮.
                    Je conçois des solutions innovantes alliant architecture web (Python, Django, React),
                    <strong>Intelligence Artificielle</strong> et développement <strong>Mobile</strong>.
                  </p>
                  <p>
                    Fasciné par l'intersection entre le code et l'éducation, je m'intéresse
                    particulièrement à l'<strong>intelligence artificielle</strong> 🤖 et aux
                    systèmes éducatifs de demain.
                  </p>
                  <p className="font-medium text-text-primary border-l-4 border-primary-500 pl-4 italic">
                    "Mon objectif : créer des solutions tech à fort impact éducatif 🌍."
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-8">
                  <div className="flex items-center text-text-muted">
                    <MapPin className="mr-2 text-primary-500" size={20} />
                    Abidjan, Côte d'Ivoire
                  </div>
                  <div className="flex items-center text-text-muted">
                    <GraduationCap className="mr-2 text-primary-500" size={20} />
                    Étudiant L3 Informatique
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="/documents/MoncvYEO.pdf"
                    download
                    className="no-underline"
                  >
                    <Button variant="primary" size="lg" className="shadow-glow">
                      <Download className="mr-2" size={20} />
                      Télécharger CV
                    </Button>
                  </a>
                  <a href="mailto:soulemaneyeo99@gmail.com">
                    <Button variant="outline" size="lg">
                      Me contacter
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center relative"
              >
                <div className="relative">
                  {/* Image glow effect */}
                  <div className="absolute inset-0 bg-primary-500 blur-[60px] opacity-20 transform scale-90 rounded-full animate-pulse-slow"></div>

                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="relative z-10 w-80 h-80 rounded-2xl shadow-2xl object-cover border-2 border-white/10 ring-1 ring-white/20"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=320&background=0a0a0a&color=3b82f6&bold=true`;
                    }}
                  />

                  {/* Floating badges */}
                  <div className="absolute -bottom-6 -right-6 z-20 bg-bg-card border border-border-default rounded-xl p-4 shadow-xl flex items-center space-x-3 animate-float">
                    <div className="bg-primary-500/20 p-2 rounded-lg">
                      <Code className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase font-bold">Stack</div>
                      <div className="font-bold text-text-primary">Python / React</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-bg-elevated relative">
          <div className="container-custom">
            <Timeline
              items={experience}
              title="Expérience Professionnelle"
              icon={Briefcase}
            />
          </div>
        </section>

        {/* Formation Section */}
        <section className="py-20 bg-bg-dark">
          <div className="container-custom">
            <Timeline
              items={education}
              title="Formation & Éducation"
              icon={GraduationCap}
            />
          </div>
        </section>

        {/* Compétences Section */}
        <section className="py-20 bg-bg-elevated">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-4">Compétences Techniques</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Ma stack technique et les outils que je maîtrise pour construire des solutions modernes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => {
                const Icon = skillGroup.icon;
                return (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-bg-card border border-border-default rounded-xl p-8 hover:border-primary-500/30 transition-colors duration-300"
                  >
                    <div className="flex items-center mb-8">
                      <div className={`w-12 h-12 ${skillGroup.color}/10 rounded-xl flex items-center justify-center mr-4 border border-${skillGroup.color}/20`}>
                        <Icon className={skillGroup.color.replace('bg-', 'text-')} size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">{skillGroup.category}</h3>
                    </div>

                    <div className="space-y-6">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary font-medium text-sm">{skill.name}</span>
                            <span className="text-text-muted text-xs font-mono">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-bg-dark border border-white/5 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-full ${skillGroup.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + (skillIndex * 0.1) }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certificats Section */}
        <section className="py-20 bg-bg-dark border-t border-white/5">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Certifications</h2>
              <p className="text-text-secondary">
                Reconnaissance de mes acquis et de mon engagement professionnel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-bg-card border border-border-default rounded-xl p-8 hover:shadow-glow/20 transition-all duration-300 group"
                >
                  <div className="flex items-start">
                    <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                      <Award className="text-primary-500" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-500 transition-colors">{cert.title}</h3>
                      <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-text-muted mb-4 border border-white/10">
                        {cert.date}
                      </div>
                      <p className="text-text-secondary mb-6 text-sm leading-relaxed">{cert.description}</p>
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 font-medium text-sm hover:text-primary-400 flex items-center transition-colors"
                      >
                        <Download size={16} className="mr-2" />
                        Voir le certificat
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision CTA */}
        <section className="py-24 bg-gradient-to-br from-bg-elevated to-bg-dark relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold text-text-primary mb-8">Ma Vision</h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed font-light">
              Je co-construis l'avenir de l'éducation numérique en Afrique. <br className="hidden md:block" />
              Toujours ouvert aux opportunités, aux collaborations et aux défis techniques ambitieux.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:soulemaneyeo99@gmail.com">
                <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20">
                  Démarrer une collaboration
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
