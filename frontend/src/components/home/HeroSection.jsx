import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const HeroSection = ({ displayedText, isTyping, mousePosition }) => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    return (
        <section
            ref={targetRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
        >
            {/* Arrière-plan Tech Minimaliste */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
                <div className="absolute top-1/4 left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />

                {/* Lignes de structure tech */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="h-full w-[1px] bg-white absolute left-[10%]" />
                    <div className="h-full w-[1px] bg-white absolute left-[30%]" />
                    <div className="h-full w-[1px] bg-white absolute left-[50%]" />
                    <div className="h-full w-[1px] bg-white absolute left-[70%]" />
                    <div className="h-full w-[1px] bg-white absolute left-[90%]" />
                </div>
            </div>

            <div className="container-custom relative z-10 w-full">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                    {/* Contenu Texte - Alignement Gauche Asymétrique */}
                    <div className={`transform transition-all duration-1000 ${hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-indigo-500/10 border border-indigo-500/20 mb-8">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-indigo-400">Disponible pour de nouveaux défis</span>
                        </div>

                        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] mb-8">
                            <span className="text-white block">ENGINEERING</span>
                            <span className="text-indigo-500 italic block">MEANINGFUL</span>
                            <span className="text-white block">DIGITAL</span>
                            <span className="text-white block">EXPERIENCES</span>
                        </h1>

                        <div className="max-w-xl">
                            <div className="text-xl md:text-2xl font-light text-slate-400 mb-8 min-h-[1.6em]">
                                Je suis <span className="text-white font-medium italic border-b-2 border-indigo-500/50">{displayedText}</span>
                                <span className={`inline-block translate-y-1 w-[2px] h-[0.8em] bg-indigo-500 ml-1 ${isTyping ? 'opacity-100' : 'animate-pulse'}`} />
                            </div>

                            <p className="text-slate-500 text-lg leading-relaxed mb-12 border-l-2 border-slate-800 pl-6">
                                Basé en <span className="text-white">Côte d'Ivoire</span>, je fusionne l'ingénierie backend robuste
                                avec des interfaces frontend de haute précision pour créer des expériences digitales
                                <span className="text-indigo-400 font-mono text-sm ml-2">// mémorables.</span>
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                <Link
                                    to="/projects"
                                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300"
                                >
                                    Consulter mes travaux
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 border border-white/10 text-white font-medium uppercase tracking-wider text-sm hover:border-indigo-500 transition-all duration-300"
                                >
                                    Me contacter
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Visuel - Layout Breakage */}
                    <div className={`relative hidden lg:block transform transition-all duration-1000 delay-300 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <div className="relative group">
                            {/* Cadre décoratif asymétrique */}
                            <div className="absolute -inset-4 border border-white/5 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />

                            <div className="relative aspect-[3/4] w-full max-w-[400px] mx-auto overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-slate-900 border border-white/10">
                                <img
                                    src={PERSONAL_INFO.profileImage}
                                    alt={PERSONAL_INFO.name}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL_INFO.name)}&size=800&background=050505&color=ffffff`;
                                    }}
                                />
                                {/* Overlay Tech */}
                                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="font-mono text-[10px] text-white/50 space-y-1">
                                        <p>DEV_NAME: {PERSONAL_INFO.name.toUpperCase()}</p>
                                        <p>LOCATION: ABIDJAN, CI</p>
                                        <p>STATUS: ACTIVE_MODE</p>
                                    </div>
                                </div>
                            </div>

                            {/* Accents flottants */}
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-indigo-500/20 flex items-center justify-center backdrop-blur-sm bg-black/50">
                                <span className="text-3xl">🇨🇮</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Barre Latérale ou Fond */}
            <div className="absolute bottom-0 right-0 p-12 hidden md:block opacity-30 group">
                <div className="flex space-x-12">
                    {[
                        { label: 'Projets', value: '15+' },
                        { label: 'Expérience', value: '3 ans' },
                    ].map((stat, i) => (
                        <div key={i} className="font-mono">
                            <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes reveal {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-reveal {
                    animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1);
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
