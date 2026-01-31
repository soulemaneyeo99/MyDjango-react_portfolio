import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

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
                            className={`group text-center transform transition-all duration-1000 hover:scale-110 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
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

export default ImpactSection;
