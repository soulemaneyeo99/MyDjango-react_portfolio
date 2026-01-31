import React from 'react';

const Badge = ({
    children,
    variant = 'default',
    className = ''
}) => {
    const variants = {
        default: 'bg-white/5 text-text-secondary border border-white/10',
        primary: 'bg-primary-500/10 text-primary-500 border border-primary-500/20',
        success: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
        warning: 'bg-accent-orange/10 text-accent-orange border border-accent-orange/20',
        danger: 'bg-accent-red/10 text-accent-red border border-accent-red/20',
        purple: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20',
        tech: 'bg-bg-elevated text-text-secondary border border-border-default hover:border-white/20 hover:text-text-primary transition-colors',
    };

    return (
        <span className={`
      inline-flex items-center px-3 py-1 rounded-full
      text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;
