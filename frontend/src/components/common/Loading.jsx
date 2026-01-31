
// ========== frontend/src/components/common/Loading.jsx ==========
import React from 'react';

const Loading = ({ size = 'medium', text = 'Chargement...', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className="w-full h-full text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m8.49 8.49l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m8.49-8.49l2.83-2.83"
          />
        </svg>
      </div>
      {text && (
        <p className={`text-gray-600 dark:text-gray-400 ${textSizes[size]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Loading Skeleton Component
export const LoadingSkeleton = ({ className = '', lines = 3 }) => (
  <div className={`animate-pulse ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`bg-gray-300 dark:bg-gray-700 rounded h-4 mb-3 ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);

// Loading Card Component
export const LoadingCard = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 animate-pulse ${className}`}>
    <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 mb-4" />
    <div className="bg-gray-300 dark:bg-gray-700 rounded h-6 mb-2" />
    <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-3/4 mb-2" />
    <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-1/2" />
  </div>
);

export default Loading;