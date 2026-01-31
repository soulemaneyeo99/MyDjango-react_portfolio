import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

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

export default PresentationSection;
