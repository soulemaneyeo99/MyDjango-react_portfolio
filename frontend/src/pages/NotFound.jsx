import React from 'react';

const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="text-center px-4 max-w-lg mx-auto">
            <div className="relative mb-8">
                <div className="text-9xl font-bold text-bg-elevated">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white text-3xl">🚀</span>
                    </div>
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Page non trouvée
            </h1>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Cette page semble s'être envolée dans l'espace numérique.
                Ne vous inquiétez pas, explorons ensemble d'autres horizons !
            </p>

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <a
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors duration-300"
                >
                    Retour à l'accueil
                </a>
                <a
                    href="/projects"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border-default text-text-primary hover:bg-white/5 transition-colors duration-300"
                >
                    Voir mes projets
                </a>
            </div>

            {/* Suggestions de navigation */}
            <div className="mt-12 pt-8 border-t border-border-default">
                <p className="text-sm text-text-muted mb-4">
                    Peut-être cherchiez-vous :
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { label: 'Mes projets', href: '/projects' },
                        { label: 'À propos', href: '/about' },
                        { label: 'Blog', href: '/blog' },
                        { label: 'Contact', href: '/contact' }
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-primary-500 hover:text-primary-400 text-sm font-medium transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default NotFound;
