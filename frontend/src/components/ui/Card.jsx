import React from 'react';

const Card = ({
    children,
    hover = false,
    glow = false,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`
        bg-bg-card border border-border-default rounded-xl p-6
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : ''}
        ${glow ? 'hover:shadow-glow hover:border-primary-500/50' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
