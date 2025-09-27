// ========== src/components/common/SafeImage.jsx (NOUVEAU COMPOSANT) ==========
import React, { useState, useRef } from 'react';
import { getMediaUrl, createLocalPlaceholder } from '../../utils/media';

const SafeImage = ({ 
  src, 
  alt, 
  title,
  className = '', 
  fallback = null,
  showLoader = true,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef(null);

  // Générer l'URL sécurisée
  React.useEffect(() => {
    if (src) {
      const safeUrl = getMediaUrl(src, { title: title || alt });
      setCurrentSrc(safeUrl);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, title, alt]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.warn('[SafeImage] Image failed to load:', currentSrc);
    setIsLoading(false);
    setHasError(true);
    
    // Utiliser le fallback ou créer un placeholder local
    const fallbackUrl = fallback || createLocalPlaceholder(title || alt || 'Image');
    setCurrentSrc(fallbackUrl);
    
    if (onError) onError();
  };

  const Loader = () => (
    <div className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center`}>
      <div className="text-gray-400 dark:text-gray-600 text-sm">
        Chargement...
      </div>
    </div>
  );

  const ErrorPlaceholder = () => (
    <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-center p-4`}>
      <div>
        <div className="text-lg mb-1">📷</div>
        <div className="text-sm">{title || alt || 'Image'}</div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && showLoader && <Loader />}
      
      {hasError && !currentSrc.startsWith('data:') ? (
        <ErrorPlaceholder />
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </>
  );
};

export default SafeImage;