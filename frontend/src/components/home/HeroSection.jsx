import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

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

export default HeroSection;
