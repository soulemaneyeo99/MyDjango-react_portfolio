// ========== src/components/common/ErrorBoundary.jsx ==========
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4" translate="no">
          <div className="max-w-md w-full text-center">
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto bg-primary-500/10 rounded-full flex items-center justify-center mb-6 border border-primary-500/20 shadow-glow/10">
                <AlertTriangle className="w-12 h-12 text-primary-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Oups, une erreur s'est produite
              </h1>
              <p className="text-text-secondary mb-8 text-lg font-light leading-relaxed">
                Le système a rencontré une interruption inattendue. Ne vous inquiétez pas, nous sommes sur le coup.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center space-x-3 bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-mono text-sm uppercase tracking-widest shadow-glow/20"
              >
                <RefreshCw className="w-5 h-5" />
                <span>RÉESSAYER_LE_SYSTÈME</span>
              </button>

              <button
                onClick={this.handleHome}
                className="w-full flex items-center justify-center space-x-3 border border-border-default text-text-secondary px-8 py-4 rounded-lg hover:bg-bg-elevated hover:text-white transition-all duration-300 font-mono text-sm uppercase tracking-widest"
              >
                <Home className="w-5 h-5" />
                <span>RETOUR_À_L_ACCUEIL</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Détails de l'erreur (développement)
                </summary>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-800 dark:text-gray-200 overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {this.state.error?.toString() || 'Aucune information d\'erreur disponible'}
                    {this.state.errorInfo?.componentStack || ''}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;