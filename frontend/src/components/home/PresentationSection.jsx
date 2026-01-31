import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const PresentationSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();

    return (
        <section ref={targetRef} className="py-24 bg-[#050505] relative overflow-hidden border-y border-white/5">
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">

                    {/* Colonne Texte */}
                    <div className={`space-y-12 transform transition-all duration-1000 ${hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                        <div className="space-y-6">
                            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-indigo-400 tracking-[0.3em]">MANUAL_OVERRIDE</div>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
                                ENGINEERING <span className="text-indigo-500 italic">MEANINGFUL</span>
                                <br />DIGITAL EXPERIENCES
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-light">
                                Je ne me contente pas de coder. Je construis des <span className="text-white font-medium">systèmes</span>.
                                Mon approche fusionne la rigueur mathématique du backend avec la fluidité créative du frontend.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: '01. Vision Produit', desc: 'Compréhension profonde des enjeux business pour des solutions sur mesure.' },
                                { title: '02. Code Craftmanship', desc: 'Architecture propre, scalable et documentée selon les standards industriels.' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-3 p-6 border border-white/5 bg-white/[0.02]">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">{item.title}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="inline-flex items-center space-x-4 group text-xs font-mono tracking-widest text-indigo-400 hover:text-white transition-colors"
                        >
                            <span className="w-12 h-[1px] bg-indigo-500 group-hover:w-20 transition-all" />
                            <span>DEEP_DIVE_INTO_PROFILE</span>
                        </Link>
                    </div>

                    {/* Visualisation Architecturale */}
                    <div className={`relative transform transition-all duration-1000 delay-300 ${hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                        <div className="aspect-square relative p-8 border border-white/5 bg-white/[0.01]">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <div className="w-[80%] h-[80%] border border-dashed border-white rounded-full animate-spin-slow" />
                                <div className="absolute w-[60%] h-[60%] border border-dashed border-white rounded-full animate-spin-reverse" />
                            </div>

                            <div className="relative h-full w-full grid grid-cols-2 gap-4">
                                {[
                                    { label: 'ARCHITECTURE', val: 'ROBUST', color: 'indigo-500' },
                                    { label: 'INTERFACE', val: 'PRECISE', color: 'blue-500' },
                                    { label: 'AUTOMATION', val: 'FLUID', color: 'purple-500' },
                                    { label: 'INTELLIGENCE', val: 'NEURAL', color: 'slate-500' },
                                ].map((node, i) => (
                                    <div key={i} className="border border-white/10 p-6 flex flex-col justify-between group hover:bg-white/[0.03] transition-colors">
                                        <div className={`w-8 h-1 bg-${node.color} mb-4`} />
                                        <div>
                                            <div className="text-[9px] font-mono text-slate-500 mb-1 tracking-widest">{node.label}</div>
                                            <div className="text-xl font-bold text-white tracking-tighter">{node.val}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Accents flottants décoratifs */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500 flex items-center justify-center font-mono text-black font-bold text-xs shadow-2xl">
                                AI
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-reverse {
                    animation: spin-reverse 15s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default PresentationSection;
