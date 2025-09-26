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
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1
    });
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oups, une erreur s'est produite
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Quelque chose s'est mal passé. Ne vous inquiétez pas, nous allons résoudre cela.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Réessayer</span>
              </button>
              
              <button
                onClick={this.handleHome}
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Retour à l'accueil</span>
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