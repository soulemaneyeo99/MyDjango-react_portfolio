import React, { useState } from 'react';
import { SKILLS } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// Fonction helper pour les descriptions de compétences
const getSkillDescription = (category) => {
    const descriptions = {
        backend: [
            "Architecture robuste avec Python et Django pour des applications scalables",
            "APIs haute performance avec FastAPI et documentation automatique",
            "Gestion avancée des bases de données PostgreSQL et optimisation des requêtes",
            "Intégration d'APIs tierces et services externes"
        ],
        frontend: [
            "Interfaces modernes et ultra-rapides avec Next.js (SSR/SSG)",
            "Développement de composants React réutilisables et performants",
            "Styling avancé avec Tailwind CSS pour un rendu premium",
            "Expérience utilisateur fluide et responsive design"
        ],
        automation: [
            "Automatisation de workflows complexes via n8n",
            "Création d'agents IA intelligents et autonomes",
            "Optimisation des processus métiers avec des pipelines IA",
            "Collaboration Git/GitHub et déploiement Docker"
        ],
        data: [
            "Modèles de Machine Learning (ML) pour l'analyse prédictive",
            "Deep Learning (DL) avec TensorFlow et PyTorch",
            "Traitement et analyse de données avec NumPy et Pandas",
            "Environnement de développement Linux maîtrisé"
        ]
    };

    return descriptions[category] || [];
};

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
            title: 'Frontend Next.js',
            icon: '⚛️',
            gradient: 'from-purple-500 to-pink-600',
            skills: SKILLS.frontend
        },
        automation: {
            title: 'Automatisation & IA',
            icon: '🤖',
            gradient: 'from-green-500 to-teal-600',
            skills: SKILLS.automation
        },
        data: {
            title: 'ML & Deep Learning',
            icon: '🧠',
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
                                className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === key
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
                                className={`absolute inset-0 transition-all duration-500 ${activeCategory === key
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

export default InteractiveSkillsSection;
