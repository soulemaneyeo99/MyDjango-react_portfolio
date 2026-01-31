// ========== test_api.js (SCRIPT DE TEST COMPLET) ==========

const API_BASE = 'https://mydjango-reactportfolio-production.up.railway.app';

const testEndpoints = [
  { name: 'Health Check', url: `${API_BASE}/health/` },
  { name: 'API Root', url: `${API_BASE}/api/` },
  { name: 'Projects List', url: `${API_BASE}/api/portfolio/projects/` },
  { name: 'Featured Projects', url: `${API_BASE}/api/portfolio/projects/featured/` },
  { name: 'Categories', url: `${API_BASE}/api/portfolio/categories/` },
  { name: 'Technologies', url: `${API_BASE}/api/portfolio/technologies/` },
  { name: 'Blog Posts', url: `${API_BASE}/api/blog/posts/` },
  { name: 'Featured Posts', url: `${API_BASE}/api/blog/posts/featured/` },
];

async function testAPI() {
  console.log('🚀 Testing Portfolio API...\n');
  
  for (const endpoint of testEndpoints) {
    try {
      console.log(`Testing: ${endpoint.name}`);
      
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log(`Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success - Data length: ${Array.isArray(data) ? data.length : Object.keys(data).length}`);
        
        // Log sample data for debugging
        if (Array.isArray(data) && data.length > 0) {
          console.log(`Sample item:`, Object.keys(data[0]));
        } else if (typeof data === 'object') {
          console.log(`Response keys:`, Object.keys(data));
        }
      } else {
        const errorText = await response.text();
        console.log(`❌ Error: ${errorText.substring(0, 200)}...`);
      }
      
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}`);
    }
    
    console.log('---\n');
  }
}

// Test CORS
async function testCORS() {
  console.log('🔒 Testing CORS...\n');
  
  try {
    const response = await fetch(`${API_BASE}/api/`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://portfolio-souleymaneyeo.vercel.app',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    
    console.log(`CORS Status: ${response.status}`);
    console.log('CORS Headers:');
    for (const [key, value] of response.headers.entries()) {
      if (key.includes('access-control')) {
        console.log(`  ${key}: ${value}`);
      }
    }
    
  } catch (error) {
    console.log(`❌ CORS Error: ${error.message}`);
  }
}

// Execute tests
if (typeof window !== 'undefined') {
  // Browser environment
  window.testPortfolioAPI = testAPI;
  window.testCORS = testCORS;
  console.log('Run testPortfolioAPI() to test the API');
  console.log('Run testCORS() to test CORS configuration');
} else {
  // Node.js environment
  testAPI().then(() => testCORS());
}