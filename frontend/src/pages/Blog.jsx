// ========== frontend/src/pages/Blog.jsx ==========
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { formatDate } from '../utils/helpers';

const Blog = () => {
  // Articles de blog simulés
  const [posts] = useState([
    {
      id: 1,
      title: 'Comment j\'ai créé OpportuCI avec Django et React',
      slug: 'creation-opportunci-django-react',
      excerpt: 'Retour d\'expérience sur le développement de ma plateforme d\'opportunités pour étudiants ivoiriens. Architecture, défis techniques et leçons apprises.',
      author: 'Souleymane Yeo',
      publishedAt: '2025-01-15',
      readingTime: 8,
      category: 'Développement',
      tags: ['Django', 'React', 'Python', 'PostgreSQL'],
      featured: true,
      image: '/images/blog/opportunci-development.jpg'
    },
    {
      id: 2,
      title: 'FastAPI vs Django REST Framework : Mon retour d\'expérience',
      slug: 'fastapi-vs-django-rest-framework',
      excerpt: 'Comparaison pratique entre FastAPI et Django REST Framework après avoir utilisé les deux sur plusieurs projets.',
      author: 'Souleymane Yeo',
      publishedAt: '2025-01-10',
      readingTime: 6,
      category: 'Backend',
      tags: ['FastAPI', 'Django', 'API REST', 'Python'],
      featured: false,
      image: '/images/blog/fastapi-django.jpg'
    },
    {
      id: 3,
      title: 'Débuter en Machine Learning avec Python',
      slug: 'debuter-machine-learning-python',
      excerpt: 'Guide pratique pour commencer le machine learning avec Python. De l\'installation à votre premier modèle prédictif.',
      author: 'Souleymane Yeo',
      publishedAt: '2025-01-05',
      readingTime: 12,
      category: 'IA & Data',
      tags: ['Machine Learning', 'Python', 'scikit-learn', 'Data Science'],
      featured: true,
      image: '/images/blog/ml-python.jpg'
    }
  ]);

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Développement', 'Backend', 'IA & Data'];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <>
      <SEOHead
        title="Blog Tech"
        description="Articles sur le développement web, Python, Django, FastAPI, React et mon parcours de développeur."
        keywords={['blog', 'développement', 'python', 'django', 'react', 'tutoriels']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Mon{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Blog Tech
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Retours d'expérience, tutoriels et réflexions sur le développement web et l'IA
              </p>
              
              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{posts.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{categories.length - 1}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Catégories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">2k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lectures</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Articles en vedette
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post, index) => (
                  <FeaturedPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {category === 'all' ? 'Tous les articles' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {selectedCategory === 'all' ? 'Tous les articles' : `Articles - ${selectedCategory}`}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Aucun article dans cette catégorie
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Essayez une autre catégorie ou consultez tous les articles
                  </p>
                  <button
                    onClick={() => handleCategoryFilter('all')}
                    className="bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors"
                  >
                    Voir tous les articles
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Restez informé
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Recevez une notification quand je publie du nouveau contenu
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Featured Post Card Component
const FeaturedPostCard = ({ post, index }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(post.title)}`;
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Vedette
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{post.category}</span>
            <span>{post.publishedAt}</span>
            <span>{post.readingTime} min</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ post }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(post.title)}`;
            }}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{post.category}</span>
            <span>{post.readingTime} min</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {post.publishedAt}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Blog;