import React from 'react';
import { DESIGN_TOKENS } from '../../styles/design-tokens';

// Icons for loading state or adds
import { Loader2 } from 'lucide-react';

const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    loading = false,
    disabled = false,
    className = '',
    asChild = false,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20',
        secondary: 'bg-bg-elevated hover:bg-white/10 text-white border border-border-default',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
        ghost: 'hover:bg-white/5 text-text-secondary hover:text-text-primary',
        danger: 'bg-accent-red hover:bg-red-600 text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-2',
    };

    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const Component = asChild ? React.Fragment : 'button';

    return (
        <Component
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {icon && !loading && icon}
            {children}
        </Component>
    );
};

export default Button;
