import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// ... (imports remain)
const ImpactSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    const stats = [
        { number: '3+', label: 'Years Experience', description: 'Learning and building', tag: 'EXP' },
        { number: '10+', label: 'Projects Built', description: 'Full-stack applications', tag: 'PRJ' },
        { number: '100%', label: 'Commitment', description: 'To code quality', tag: 'QUAL' },
        { number: '24/7', label: 'Availability', description: 'For global teams', tag: 'TIME' }
    ];

    return (
        <section ref={targetRef} className="py-24 bg-bg-dark relative overflow-hidden border-t border-border-default">
            <div className="container-custom relative z-10">
                <div className={`mb-20 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-end transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div>
                        <div className="font-mono text-[10px] text-primary-400 uppercase tracking-[0.4em] mb-4">Metrics_&_Data</div>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-text-primary">
                            MEASURABLE <span className="text-primary-500 italic">IMPACT</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-white/5 border border-white/5 mb-24">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-10 bg-black/40 group hover:bg-white/[0.03] transition-all duration-500 transform ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <span className="font-mono text-[9px] text-primary-500/50 tracking-widest uppercase">{stat.tag}</span>
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                            </div>

                            <div className="space-y-4">
                                <div className="text-5xl md:text-6xl font-black text-white tracking-tighter font-outfit">
                                    {stat.number}
                                </div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">{stat.label}</h3>
                                <p className="text-text-secondary text-[11px] leading-relaxed font-light">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Industrial Quote Section */}
                <div className={`relative p-12 md:p-24 border border-border-default bg-white/[0.01] overflow-hidden transform transition-all duration-1000 delay-500 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                    <div className="absolute top-0 right-0 p-8 font-mono text-[8px] text-white/5 tracking-[0.8em] pointer-events-none select-none">
                        AUTH_VERIFIED // SECURE_ACCESS // AUTH_VERIFIED // SECURE_ACCESS
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="font-mono text-primary-400 text-4xl leading-none select-none">"</div>
                        <p className="text-2xl md:text-4xl font-light text-text-primary leading-tight tracking-tight">
                            Chaque ligne de code que j'écris est une <span className="text-primary-500 italic font-medium">brique</span> vers la création de systèmes qui transcendent le simple besoin pour devenir des <span className="text-primary-500 font-medium">solutions durables</span>.
                        </p>
                        <div className="flex items-center space-x-6">
                            <div className="h-[1px] w-12 bg-primary-500" />
                            <div className="space-y-1">
                                <div className="text-sm font-bold text-text-primary tracking-widest uppercase">Souleymane Yeo</div>
                                <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Lead Architect @ OpportuCI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
