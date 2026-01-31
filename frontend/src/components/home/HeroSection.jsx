import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const HeroSection = ({ displayedText, isTyping }) => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    return (
        <section
            ref={targetRef}
            className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg-dark"
        >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

                    {/* Content */}
                    <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        {/* Status Badge */}
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
                            <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-primary-400">Disponible pour de nouveaux projets</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-text-primary">
                            <span className="block">ENGINEERING</span>
                            <span className="text-primary-500 block">MEANINGFUL</span>
                            <span className="block">EXPERIENCES</span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light">
                            Full-Stack Developer • {displayedText}
                            <span className={`inline-block w-0.5 h-6 bg-primary-500 ml-1 ${isTyping ? 'opacity-100' : 'animate-pulse'}`} />
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Voir mes projets
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 border-2 border-border-default text-text-primary font-semibold rounded-lg hover:border-primary-500 hover:text-primary-500 transition-all duration-300"
                            >
                                Me contacter
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className={`relative transform transition-all duration-1000 delay-200 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="relative group">
                            {/* Decorative Background */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-purple rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl border border-border-default">
                                <img
                                    src={PERSONAL_INFO.profileImage}
                                    alt={PERSONAL_INFO.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=800&background=0a0a0a&color=3b82f6`;
                                    }}
                                />
                            </div>

                            {/* Info Badge */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-bg-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-border-default">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-text-primary">{PERSONAL_INFO.name}</p>
                                        <p className="text-sm text-text-secondary">📍 Abidjan, Côte d'Ivoire</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        {PERSONAL_INFO.social.github && (
                                            <a
                                                href={PERSONAL_INFO.social.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-bg-elevated rounded-full flex items-center justify-center hover:bg-bg-dark hover:text-white transition-colors border border-transparent hover:border-border-default"
                                            >
                                                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        )}
                                        {PERSONAL_INFO.social.linkedin && (
                                            <a
                                                href={PERSONAL_INFO.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-bg-elevated rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors border border-transparent hover:border-border-default"
                                            >
                                                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                        )}
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

export default HeroSection;
