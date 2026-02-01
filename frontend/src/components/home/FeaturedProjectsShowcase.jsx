import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PROJECTS } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FeaturedProjectsShowcase = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();
    const [hoveredProject, setHoveredProject] = useState(null);

    const featuredProjects = FEATURED_PROJECTS.filter(p => p.featured);

    return (
        <section ref={targetRef} className="py-24 bg-bg-dark relative overflow-hidden">
            {/* Lignes de structure */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="h-full w-[1px] bg-white absolute right-[10%]" />
                <div className="h-full w-[1px] bg-white absolute right-[30%]" />
            </div>

            <div className="container-custom relative z-10">
                <div className={`mb-20 grid md:grid-cols-[1fr_auto] gap-8 items-end transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div>
                        <div className="font-mono text-[10px] text-primary-400 uppercase tracking-[0.4em] mb-4">Selected Works</div>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-text-primary">
                            FEATURED <span className="text-primary-500 italic">PROJECTS</span>
                        </h2>
                    </div>
                    <Link to="/projects" className="group flex items-center space-x-4 text-xs font-mono tracking-widest text-text-secondary hover:text-white transition-colors pb-2">
                        <span>VIEW_ALL_REPOSITORIES</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1px bg-white/5 border border-white/5">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative aspect-video overflow-hidden bg-bg-card transform transition-all duration-1000 ${hasIntersected ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Image de fond */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/1200x800/050505/ffffff?text=${encodeURIComponent(project.title)}`;
                                }}
                            />

                            {/* Overlay de contenu asymétrique */}
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:from-black group-hover:via-black/60 group-hover:to-black/20 transition-all duration-500">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-primary-400">
                                        {project.category.toUpperCase()}
                                    </span>
                                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 transition-colors">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                        <Link to={`/projects/${project.id}`} className="p-2 bg-primary-500 hover:bg-primary-600 transition-colors">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors drop-shadow-lg">
                                        {project.title}
                                    </h3>
                                    <p className="text-text-muted text-sm max-w-md line-clamp-2 font-light opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.techStack.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[9px] font-mono text-text-secondary uppercase tracking-widest border border-white/10 px-2 py-1 bg-black/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Barre de progression tech décorative */}
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-hover:w-full transition-all duration-700" />
                        </div>
                    ))}
                </div>

                {/* Footer décoratif */}
                <div className="mt-12 flex justify-between items-center opacity-20 font-mono text-[9px] tracking-[0.5em] text-white overflow-hidden">
                    <span className="whitespace-nowrap">CODE_FLOW // PRECISION_SYSTEM // ARCHITECT_MODE // CODE_FLOW // PRECISION_SYSTEM // ARCHITECT_MODE</span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsShowcase;
