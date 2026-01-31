import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

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
                            className={`relative mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
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

export default TimelineSection;
