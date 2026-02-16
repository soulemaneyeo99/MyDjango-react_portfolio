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
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center min-h-[48px] flex items-center justify-center"
                            >
                                Voir mes projets
                            </Link>
                            <Link
                                to="/contact"
                                className="w-full sm:w-auto px-8 py-4 border-2 border-border-default text-text-primary font-semibold rounded-lg hover:border-primary-500 hover:text-primary-500 transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
                            >
                                Me contacter
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className={`relative transform transition-all duration-1000 delay-200 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="relative group">
                            {/* Architectural Blueprint Grid Backdrop */}
                            <div className="absolute inset-0 bg-blue-500/5 rotate-3 scale-110 rounded-2xl blur-sm" />

                            {/* Decorative Background Glow */}
                            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

                            {/* Image Container with Technical Styling */}
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl border border-white/10 group-hover:border-primary-500/30 transition-colors duration-500">
                                <img
                                    src={PERSONAL_INFO.profileImage}
                                    alt={PERSONAL_INFO.name}
                                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105 saturate-90"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=800&background=0a0a0a&color=3b82f6`;
                                    }}
                                />

                                {/* Technical HUD Overlay */}
                                <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10" />
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500/40 m-4" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500/40 m-4" />

                                {/* Scanning Line Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent h-1/2 w-full animate-pulse pointer-events-none" />
                            </div>

                            {/* Pro Info Badge - Cockpit Style */}
                            <div className="absolute -bottom-6 -right-4 p-5 bg-bg-dark/95 backdrop-blur-md rounded-lg shadow-2xl border border-primary-500/20 max-w-[280px]">
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="w-10 h-10 rounded bg-primary-500/10 border border-primary-500/20 flex items-center justify-center font-mono text-[10px] text-primary-400">
                                            Y.S
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-xs text-white tracking-widest uppercase">{PERSONAL_INFO.name}</p>
                                            <p className="text-[10px] text-primary-400 font-mono">SENIOR_ENGINEER</p>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[8px] font-mono text-text-muted">LOCATION: ABIDJAN_CI</span>
                                        <div className="flex space-x-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                                            <span className="text-[8px] font-mono text-accent-green uppercase">Authorized</span>
                                        </div>
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
