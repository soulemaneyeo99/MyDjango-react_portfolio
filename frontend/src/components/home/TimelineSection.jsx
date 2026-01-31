import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TimelineSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    const timelineData = [
        {
            year: '2025',
            title: 'OPPORTUCI_LAUNCH',
            description: "Pivot stratégique vers l'IA appliquée à l'éducation ivoirienne.",
            tag: 'PLATFORM_CORE',
            achievements: ['Integrated Neural Engine', 'Scalable Architecture', '1000+ Opportunities']
        },
        {
            year: '2024',
            title: 'FULLSTACK_EVOLUTION',
            description: 'Intégration des frameworks modernes pour des UI ultra-performantes.',
            tag: 'MODERN_STACK',
            achievements: ['React & Next.js Mastery', 'Performance Optimization', 'UX Engineering']
        },
        {
            year: '2023',
            title: 'BACKEND_SPECIALIZATION',
            description: "Consolidation de l'expertise en microservices et APIs.",
            tag: 'CORE_ENGINE',
            achievements: ['Django DRF Authority', 'FastAPI High-Speed', 'Relational DB Design']
        },
        {
            year: '2022',
            title: 'ACADEMIC_FOUNDATION',
            description: "Début du cursus académique en Développement d'Applications et Services.",
            tag: 'DAS_DEGREE',
            achievements: ['Computer Science Fundamentals', 'Algorithmic Rigor', 'Team Collaboration']
        }
    ];

    return (
        <section ref={targetRef} className="py-24 bg-bg-dark relative overflow-hidden">
            {/* Arrière-plan Tech */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute left-[10%] h-full w-[1px] bg-white" />
                <div className="absolute left-[30%] h-full w-[1px] bg-white" />
            </div>

            <div className="container-custom relative z-10">
                <div className={`mb-20 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="font-mono text-[10px] text-primary-400 uppercase tracking-[0.4em] mb-4">Chronology</div>
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-text-primary">
                        EXPERIENCE <span className="text-primary-500 italic">LOG</span>
                    </h2>
                </div>

                <div className="relative max-w-5xl">
                    {/* Ligne Centrale Tech */}
                    <div className="absolute left-[20px] md:left-[50px] top-0 bottom-0 w-[1px] bg-white/5" />

                    <div className="space-y-16">
                        {timelineData.map((item, index) => (
                            <div
                                key={index}
                                className={`relative pl-12 md:pl-24 group transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Node */}
                                <div className="absolute left-4 md:left-[44px] top-1 w-3 h-3 bg-bg-dark border border-white/20 group-hover:border-primary-500 transition-colors z-20">
                                    <div className="absolute inset-1 bg-white/10 group-hover:bg-primary-500 transition-colors" />
                                </div>

                                <div className="grid md:grid-cols-[100px_1fr] gap-8 items-start">
                                    <div className="font-mono text-xl font-bold text-text-muted group-hover:text-primary-400 transition-colors">
                                        {item.year}
                                    </div>

                                    <div className="p-8 border border-white/5 bg-bg-card/[0.02] group-hover:border-white/10 transition-all duration-500">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-text-primary tracking-widest">{item.title}</h3>
                                            <span className="text-[10px] font-mono text-primary-400/50 uppercase tracking-widest px-2 py-1 border border-primary-500/10">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-light max-w-2xl">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            {item.achievements.map((ach, i) => (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <span className="w-1 h-1 bg-primary-500/50 rounded-full" />
                                                    <span className="text-[10px] uppercase font-mono text-text-secondary tracking-wider font-medium">{ach}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
