// ========== debug_images.js (SCRIPT DE DEBUG COMPLET) ==========

// Fonction pour tester si une image se charge
function testImageLoad(url) {
  return new Promise((resolve) => {
    const img = new Image();
    const startTime = performance.now();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve({
        url,
        success: true,
        loadTime: Math.round(loadTime),
        size: { width: img.naturalWidth, height: img.naturalHeight }
      });
    };
    
    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      resolve({
        url,
        success: false,
        loadTime: Math.round(loadTime),
        error: 'Image failed to load'
      });
    };
    
    img.src = url;
  });
}

// Test complet des images du portfolio
async function debugPortfolioImages() {
  console.log('🔍 DIAGNOSTIC COMPLET DES IMAGES\n');
  
  // 1. Informations sur l'environnement
  console.log('📍 ENVIRONNEMENT:');
  console.log('URL actuelle:', window.location.href);
  console.log('Hostname:', window.location.hostname);
  console.log('Protocol:', window.location.protocol);
  console.log('User Agent:', navigator.userAgent.substring(0, 100));
  console.log('\n');
  
  // 2. Test des chemins d'images existants
  const imagesToTest = [
    // Images locales identifiées dans les logs
    '/images/moi2.jpg',
    '/images/OpotuCI.png',
    '/images/Fastapiecommerce.jpeg',
    '/images/react_todo.jpeg',
    '/images/fashionStoreashborard.jpeg',
    '/images/portfolio/e-comerceclienDjango.jpg',
    
    // Test avec base URL complète
    'https://portfolio-souleymaneyeo.vercel.app/images/moi2.jpg',
    'https://portfolio-souleymaneyeo.vercel.app/images/OpotuCI.png',
    
    // Test de l'API Django
    'https://mydjango-reactportfolio-production.up.railway.app/media/projects/test.jpg',
    
    // Test des services externes
    'https://picsum.photos/400/300',
  ];
  
  console.log('🖼️ TEST DES IMAGES:');
  
  for (const imagePath of imagesToTest) {
    try {
      const result = await testImageLoad(imagePath);
      if (result.success) {
        console.log(`✅ ${imagePath}`);
        console.log(`   Taille: ${result.size.width}x${result.size.height}`);
        console.log(`   Temps: ${result.loadTime}ms`);
      } else {
        console.log(`❌ ${imagePath}`);
        console.log(`   Erreur: ${result.error}`);
        console.log(`   Temps: ${result.loadTime}ms`);
      }
    } catch (error) {
      console.log(`💥 ${imagePath}`);
      console.log(`   Exception: ${error.message}`);
    }
    console.log('');
  }
  
  // 3. Test de connectivité réseau
  console.log('🌐 TEST DE CONNECTIVITÉ:');
  
  const connectivityTests = [
    'https://www.google.com/favicon.ico',
    'https://picsum.photos/100/100',
    'https://via.placeholder.com/100x100',
    'https://httpbin.org/status/200'
  ];
  
  for (const testUrl of connectivityTests) {
    try {
      const response = await fetch(testUrl, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      console.log(`✅ ${testUrl} - Accessible`);
    } catch (error) {
      console.log(`❌ ${testUrl} - ${error.message}`);
    }
  }
  
  // 4. Test du contenu du dossier public
  console.log('\n📁 TEST D\'ACCÈS AUX FICHIERS STATIQUES:');
  
  const staticFiles = [
    '/favicon.ico',
    '/robots.txt',
    '/index.html'
  ];
  
  for (const file of staticFiles) {
    try {
      const response = await fetch(file);
      if (response.ok) {
        console.log(`✅ ${file} - Accessible (${response.status})`);
      } else {
        console.log(`❌ ${file} - HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`💥 ${file} - ${error.message}`);
    }
  }
  
  // 5. Test de la fonction getMediaUrl si disponible
  if (typeof window.getMediaUrl === 'function') {
    console.log('\n🔧 TEST DE getMediaUrl():');
    
    const testPaths = [
      '/images/moi2.jpg',
      'images/moi2.jpg',
      'moi2.jpg',
      'media/projects/test.jpg',
      null,
      ''
    ];
    
    testPaths.forEach(path => {
      try {
        const result = window.getMediaUrl(path);
        console.log(`Input: ${path} → Output: ${result}`);
      } catch (error) {
        console.log(`Input: ${path} → Error: ${error.message}`);
      }
    });
  }
  
  // 6. Recommandations
  console.log('\n💡 RECOMMANDATIONS:');
  console.log('1. Vérifiez que vos images sont bien dans public/images/');
  console.log('2. Testez l\'accès direct aux images via URL');
  console.log('3. Vérifiez la configuration de Vercel');
  console.log('4. Considérez utiliser un CDN externe pour les images');
  
  console.log('\n✅ Diagnostic terminé !');
}

// Test rapide d'une image spécifique
window.testSingleImage = async function(imagePath) {
  console.log(`🧪 Test de: ${imagePath}`);
  const result = await testImageLoad(imagePath);
  console.log(result);
  return result;
};

// Fonction principale à exécuter
window.debugImages = debugPortfolioImages;

console.log('🚀 Script de debug chargé !');
console.log('Exécutez: debugImages() pour lancer le diagnostic complet');
console.log('Ou: testSingleImage("/images/moi2.jpg") pour tester une image');

// Auto-exécution si on est en développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🔄 Auto-exécution en mode développement...');
  debugPortfolioImages();
}