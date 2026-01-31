
// ========== Composant de test des images ==========
// frontend/src/components/debug/ImageDebug.jsx

import React from 'react';

const ImageDebug = () => {
  const testImages = [
    '/images/moi2.jpg',
    '/images/OpotuCI.png',
    '/images/Fastapiecommerce.jpeg',
    '/images/react_todo.jpeg',
    '/images/fashionStoreashborard.jpeg'
  ];

  return (
    <div className="fixed top-4 right-4 bg-white p-4 shadow-lg rounded-lg z-50 max-w-xs">
      <h3 className="font-bold mb-2">Test Images</h3>
      {testImages.map((src, index) => (
        <div key={index} className="mb-2">
          <p className="text-xs text-gray-600">{src}</p>
          <img 
            src={src} 
            alt={`Test ${index}`}
            className="w-16 h-16 object-cover border"
            onLoad={() => console.log(`✅ Image loaded: ${src}`)}
            onError={() => console.log(`❌ Image failed: ${src}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDebug;

// ========== Actions à faire MAINTENANT ==========

/*
1. VÉRIFIEZ ces fichiers existent dans public/images/ :
   - moi2.jpg ✓ (confirmé)
   - OpotuCI.png ✓ (confirmé)  
   - Fastapiecommerce.jpeg ✓ (confirmé)
   - react_todo.jpeg ✓ (confirmé)
   - fashionStoreashborard.jpeg ✓ (confirmé)

2. VÉRIFIEZ le dossier portfolio/ :
   ls public/images/portfolio/

3. AJOUTEZ le composant debug temporairement dans App.jsx :
   import ImageDebug from './components/debug/ImageDebug';
   // Dans le return, ajoutez : <ImageDebug />

4. REBUILD et redéployez :
   npm run build
   
5. VÉRIFIEZ dans la console du navigateur les logs de getMediaUrl
*/