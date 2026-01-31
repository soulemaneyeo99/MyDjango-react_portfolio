// Design system tokens - Source of truth
export const DESIGN_TOKENS = {
    colors: {
        // Primary Palette (Modern Blue)
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            900: '#1e3a8a',
        },

        // Backgrounds
        bg: {
            dark: '#0a0a0a',     // Main background
            darker: '#050505',   // Alternating sections
            card: '#151515',     // Cards/containers
            elevated: '#1a1a1a', // Elevated elements
        },

        // Text
        text: {
            primary: '#ffffff',
            secondary: '#a1a1aa', // Zinc-400
            muted: '#71717a',     // Zinc-500
            inverse: '#0a0a0a',
        },

        // Accents
        accent: {
            purple: '#8b5cf6',
            green: '#10b981',
            orange: '#f59e0b',
            red: '#ef4444',
        },

        // Borders
        border: {
            subtle: 'rgba(255, 255, 255, 0.05)',
            default: 'rgba(255, 255, 255, 0.1)',
            strong: 'rgba(255, 255, 255, 0.2)',
        },
    },

    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['Fira Code', 'monospace'],
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '3.75rem',
        },
    },

    borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
    },

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    },
};
