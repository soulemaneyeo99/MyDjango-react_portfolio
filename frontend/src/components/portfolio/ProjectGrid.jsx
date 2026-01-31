
// ========== src/components/portfolio/ProjectGrid.jsx ==========
const ProjectGrid = ({ projects, loading, variant = 'default' }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} variant="card" />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Aucun projet trouvé
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  const gridClass = variant === 'featured' 
    ? 'grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
    : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className={gridClass}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id || project.slug}
          project={project}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
};

export { ProjectCard, ProjectFilter, ProjectGrid };