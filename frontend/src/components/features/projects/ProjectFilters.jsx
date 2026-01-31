import React from 'react';
import Button from '../../ui/Button';

const ProjectFilters = ({ currentFilter, onFilterChange, categories = [] }) => {
    const allCategories = ['All', ...categories];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allCategories.map((category) => {
                const isActive = currentFilter.toLowerCase() === category.toLowerCase() || (category === 'All' && currentFilter === 'all');

                return (
                    <Button
                        key={category}
                        variant={isActive ? 'primary' : 'ghost'}
                        onClick={() => onFilterChange(category === 'All' ? 'all' : category)}
                        className={`rounded-full px-6 transition-all duration-300 ${isActive ? 'shadow-glow' : 'border border-border-default bg-bg-card hover:bg-bg-elevated'}`}
                    >
                        {category}
                    </Button>
                );
            })}
        </div>
    );
};

export default ProjectFilters;
