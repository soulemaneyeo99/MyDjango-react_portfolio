import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

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

export default FinalCTASection;
