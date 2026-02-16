import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FinalCTASection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    return (
        <section ref={targetRef} className="py-32 bg-bg-dark relative overflow-hidden">
            {/* Arrière-plan Tech Minimaliste */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <div className="h-full w-[1px] bg-white absolute left-[10%]" />
                <div className="h-full w-[1px] bg-white absolute left-[90%]" />
                <div className="w-full h-[1px] bg-white absolute top-[20%]" />
                <div className="w-full h-[1px] bg-white absolute bottom-[20%]" />
            </div>

            <div className="container-custom relative z-10 text-center">
                <div className={`max-w-5xl mx-auto transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-primary-500/10 border border-primary-500/20 mb-12">
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-primary-400">READY_FOR_ENGAGEMENT</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-text-primary mb-8 md:mb-12 tracking-tighter leading-[0.9] md:leading-[0.85]">
                        LET'S BUILD <span className="text-white/20 block">THE FUTURE</span>
                        <span className="text-primary-500 italic block">OF YOUR TECH</span>
                    </h2>

                    <p className="text-base md:text-xl lg:text-2xl text-text-secondary mb-12 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
                        Que vous ayez une vision complexe ou un besoin précis, je traduis vos objectifs en
                        <span className="text-white font-medium"> code haute fidélité</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center px-4 md:px-0">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-primary-500 hover:text-white transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] text-center min-h-[44px] flex items-center justify-center"
                        >
                            INIT_CONVERSATION
                        </Link>

                        <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 border border-white/10 text-text-primary font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:border-primary-500 transition-all duration-500 group text-center min-h-[44px] flex items-center justify-center"
                        >
                            <span className="flex items-center space-x-4">
                                <span>DIRECT_EMAIL</span>
                                <span className="text-primary-500 group-hover:translate-x-2 transition-transform">→</span>
                            </span>
                        </a>
                    </div>

                    {/* Footer Stats/Info */}
                    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20">
                        {[
                            { label: 'STATUS', val: 'AVAILABLE' },
                            { label: 'TZ', val: 'GMT+0' },
                            { label: 'MODE', val: 'REMOTE' },
                            { label: 'VER', val: '2025.01' },
                        ].map((item, i) => (
                            <div key={i} className="font-mono text-center">
                                <p className="text-[10px] text-text-primary uppercase tracking-widest mb-1">{item.label}</p>
                                <p className="text-lg font-bold text-text-primary tracking-tighter">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTASection;
