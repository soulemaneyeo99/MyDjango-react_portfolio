import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

const ProjectCard = ({ project, hasIntersected = true, delay = 0 }) => {
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Complété': return 'success';
            case 'En développement': return 'warning';
            case 'En ligne': return 'primary';
            default: return 'default';
        }
    };

    return (
        <Card
            glow
            hover
            className={`p-0 overflow-hidden h-full flex flex-col transform transition-all duration-500 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="relative aspect-video overflow-hidden group">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/0a0a0a/333333?text=${encodeURIComponent(project.title)}`;
                    }}
                />
                <div className="absolute top-4 right-4">
                    <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                    </Badge>
                </div>
                {/* Overlay - Strengthens on hover to maintain contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="mb-4 flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2 group-hover:text-primary-500 transition-colors drop-shadow-md break-words">
                        {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="tech">
                                {tech}
                            </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="text-xs text-text-muted self-center ml-1">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border-default">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            {project.demoUrl && project.demoUrl !== '#' && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-500 hover:text-primary-400 text-sm font-medium transition-colors py-2 min-h-[44px] flex items-center"
                                >
                                    Live Demo
                                </a>
                            )}
                            {project.sourceUrl && project.sourceUrl !== '#' && (
                                <a
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-white text-sm font-medium transition-colors py-2 min-h-[44px] flex items-center"
                                >
                                    Code
                                </a>
                            )}
                        </div>

                        <Link to={`/projects/${project.id}`}>
                            <Button variant="ghost" size="sm" className="group min-h-[44px] flex items-center">
                                Détails <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
