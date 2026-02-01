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

// ... (imports remain)
const InteractiveSkillsSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();
    const [activeCategory, setActiveCategory] = useState('backend');

    const categories = {
        backend: {
            title: 'CORE BACKEND',
            icon: '🔧',
            gradient: 'from-primary-500 to-blue-600',
            skills: SKILLS.backend
        },
        frontend: {
            title: 'MODERN FRONTEND',
            icon: '⚛️',
            gradient: 'from-blue-400 to-primary-500',
            skills: SKILLS.frontend
        },
        automation: {
            title: 'AI & AUTOMATION',
            icon: '🤖',
            gradient: 'from-primary-600 to-accent-purple',
            skills: SKILLS.automation
        },
        data: {
            title: 'DATA INTELLIGENCE',
            icon: '🧠',
            gradient: 'from-accent-purple to-primary-500',
            skills: SKILLS.data
        }
    };

    return (
        <section ref={targetRef} className="py-24 bg-bg-dark relative overflow-hidden">
            {/* Arrière-plan Tech */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container-custom relative z-10">
                <div className={`mb-20 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-text-primary">
                        TECHNICAL <span className="text-primary-500 italic">STACK</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary-500" />
                </div>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
                    {/* Navigation and Integrated Mobile Content */}
                    <div className="flex flex-col space-y-2">
                        {Object.entries(categories).map(([key, category]) => (
                            <div key={key} className="flex flex-col">
                                <button
                                    onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                                    className={`relative px-6 py-6 text-left group transition-all duration-300 border-l-2 ${activeCategory === key
                                        ? 'border-primary-500 bg-primary-500/5'
                                        : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }`}
                                >
                                    <span className={`block font-mono text-[10px] tracking-[0.2em] mb-1 ${activeCategory === key ? 'text-primary-400' : 'text-text-secondary'}`}>0{Object.keys(categories).indexOf(key) + 1}</span>
                                    <span className={`text-sm font-bold tracking-wider uppercase ${activeCategory === key ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'}`}>
                                        {category.title}
                                    </span>
                                    {activeCategory === key && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-500 font-bold lg:block hidden">→</div>
                                    )}
                                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-primary-500 transition-transform duration-300 lg:hidden ${activeCategory === key ? 'rotate-90' : ''}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Mobile Content (Accordion) */}
                                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeCategory === key ? 'max-h-[2000px] opacity-100 py-8 border-l-2 border-primary-500 bg-primary-500/5 px-6' : 'max-h-0 opacity-0'}`}>
                                    <SkillContent categoryKey={key} category={category} hasIntersected={hasIntersected} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View (Side-by-Side) */}
                    <div className="hidden lg:block relative min-h-[500px] border border-border-default bg-bg-card/[0.02] p-8 md:p-12">
                        {Object.entries(categories).map(([key, category]) => (
                            <div
                                key={key}
                                className={`transition-all duration-500 ${activeCategory === key
                                    ? 'opacity-100 translate-y-0 relative z-10'
                                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                                    }`}
                            >
                                <SkillContent categoryKey={key} category={category} hasIntersected={hasIntersected} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Extracted Content Component for Reusability
const SkillContent = ({ categoryKey, category, hasIntersected }) => (
    <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{category.title}</h3>
                <p className="text-text-muted max-w-md text-sm md:text-base">Solutions robustes conçues avec précision technique et vision produit.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2 group">
                        <div className="flex justify-between items-end">
                            <span className="text-xs md:text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors uppercase tracking-widest">{skill.name}</span>
                            <span className="text-[10px] md:text-xs font-mono text-primary-400">{skill.level}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-primary-500 transition-all duration-1000 ease-out"
                                style={{ width: hasIntersected ? `${skill.level}%` : '0%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-8 bg-black/40 p-6 md:p-8 border border-white/5">
            <div className="font-mono text-[8px] md:text-[10px] text-primary-400/50 uppercase tracking-[0.3em]">Spécialisations</div>
            <div className="space-y-4">
                {getSkillDescription(categoryKey).map((desc, index) => (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4">
                        <span className="text-primary-500 font-mono mt-1 text-xs md:text-sm">/</span>
                        <p className="text-text-muted text-xs md:text-sm leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            <div className="pt-6 md:pt-8 border-t border-white/5">
                <div className="flex items-center space-x-4 opacity-30">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] md:text-xs">🚀</div>
                    <div className="text-[8px] md:text-[10px] font-mono tracking-tighter italic text-text-primary">READY_FOR_DEPLOYMENT_PROD</div>
                </div>
            </div>
        </div>
    </div>
);
            </div >
        </section >
    );
};

export default InteractiveSkillsSection;
