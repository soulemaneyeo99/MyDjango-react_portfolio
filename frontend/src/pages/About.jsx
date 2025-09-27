
// ========== frontend/src/pages/About.jsx ==========
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Code, Brain, Rocket, Award, Download } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

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
      title: "Développeur Python / Django Freelance",
      period: "2023 - Présent",
      location: "Abidjan, Côte d'Ivoire (à distance)",
      tasks: [
        "Développement d'applications web avec Django, FastAPI et PostgreSQL",
        "Intégration d'APIs, systèmes d'authentification, et gestion de base de données",
        "Création de solutions automatisées pour des besoins métiers (facturation, notifications, scrapping)"
      ]
    },
    {
      title: "Fondateur du projet OpportuCI",
      period: "Depuis 2025 (en cours)",
      location: "Projet personnel",
      tasks: [
        "Conception et développement d'une plateforme éducative pour centraliser les opportunités académiques en Côte d'Ivoire",
        "Stack : Django, FastAPI, React, IA. En cours de réalisation",
        "Gestion de la base de données, du backend, du frontend et de l'architecture globale du projet"
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
        title="À propos - Souleymane Yeo"
        description="Développeur backend passionné basé en Côte d'Ivoire. Découvrez mon parcours, mes compétences et mon expérience en développement Python/Django."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                À propos de moi
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Salut, moi c'est <strong>Souleymane Yeo</strong>, développeur backend passionné, 
                  basé en <strong>Côte d'Ivoire</strong> 🇨🇮. Je travaille principalement avec 
                  <strong> Python</strong> 🐍, <strong>Django</strong> et <strong>FastAPI</strong>.
                </p>
                <p>
                  Je m'intéresse particulièrement à l'<strong>intelligence artificielle</strong> 🤖, 
                  au <strong>machine learning</strong> et aux <strong>LLMs</strong> (modèles de langage), 
                  avec un fort intérêt pour les <strong>LMS</strong> (systèmes intelligents de gestion d'apprentissage).
                </p>
                <p>
                  Mon objectif : créer des solutions tech à fort impact éducatif 🌍.
                </p>
              </div>
              
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2" size={20} />
                  Abidjan, Côte d'Ivoire
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="mr-2" size={20} />
                  Étudiant L3 Informatique
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src="/images/me2.jpg"
                  alt="Souleymane Yeo"
                  className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=Souleymane+Yeo&size=320&background=3b82f6&color=white&bold=true`;
                  }}
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Code className="text-white" size={32} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Formation</h2>
            <p className="text-xl text-gray-600">
              Mon parcours académique et d'apprentissage autodidacte
            </p>
          </motion.div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{edu.title}</h3>
                  <div className="flex items-center text-blue-600 mt-2 md:mt-0">
                    <Calendar className="mr-2" size={16} />
                    <span className="font-medium">{edu.period}</span>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">{edu.institution}</p>
                {edu.location && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="mr-2" size={16} />
                    <span>{edu.location}</span>
                  </div>
                )}
                {edu.specialty && (
                  <p className="text-blue-600 font-medium mb-3">Spécialité: {edu.specialty}</p>
                )}
                <p className="text-gray-600">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expérience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expérience</h2>
            <p className="text-xl text-gray-600">
              Mon parcours professionnel et mes projets
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{exp.title}</h3>
                  <div className="flex items-center text-blue-600 mt-2 md:mt-0">
                    <Calendar className="mr-2" size={16} />
                    <span className="font-medium">{exp.period}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="mr-2" size={16} />
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {exp.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compétences</h2>
            <p className="text-xl text-gray-600">
              Technologies et outils que j'utilise régulièrement
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
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 ${skillGroup.color} rounded-full flex items-center justify-center mr-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{skillGroup.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                          <span className="text-gray-600 font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${skillGroup.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certificats</h2>
            <p className="text-xl text-gray-600">
              Certificats obtenus à travers mes formations et projets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{cert.date}</p>
                <p className="text-gray-600 mb-6">{cert.description}</p>
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Voir le certificat
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Ma Vision</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                En ce moment, je développe <em className="font-semibold text-blue-600">OpportuCI</em>, 
                une plateforme professionnelle dédiée aux étudiants ivoiriens. Elle centralise les 
                meilleures opportunités : bourses, concours, stages, formations et plus encore.
              </p>
              <p>
                Côté frontend, je suis en pleine montée en compétences avec <strong>React</strong>. 
                L'idée ? Devenir un véritable <strong>développeur full-stack</strong>, capable de 
                passer sans transition du backend robuste à une interface utilisateur moderne et réactive.
              </p>
              <p>
                Bref, j'écris du code, je résous des problèmes, je construis avec passion… et je vise l'excellence.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Envie de collaborer, d'échanger sur un projet ou de discuter tech ? 
                N'hésitez pas à me contacter, je suis toujours partant pour partager, apprendre et créer ensemble.
              </p>
            </div>
            
            <div className="mt-12">
              <a
                href="/documents/MoncvYEO.pdf"
                download
                className="btn btn-primary btn-lg mr-4"
              >
                <Download className="mr-2" size={20} />
                Télécharger mon CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
