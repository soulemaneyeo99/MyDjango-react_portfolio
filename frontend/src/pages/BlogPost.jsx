
// ========== frontend/src/pages/BlogPost.jsx ==========
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { formatDate } from '../utils/helpers';

const BlogPost = () => {
  const { slug } = useParams();
  
  // Post simulé (remplacer par API call plus tard)
  const post = {
    id: 1,
    title: 'Comment j\'ai créé OpportuCI avec Django et React',
    slug: 'creation-opportunci-django-react',
    excerpt: 'Retour d\'expérience sur le développement de ma plateforme d\'opportunités pour étudiants ivoiriens.',
    content: `
      <h2>Introduction</h2>
      <p>Dans cet article, je partage mon expérience de développement d'OpportuCI, une plateforme destinée à centraliser les opportunités académiques pour les étudiants ivoiriens.</p>
      
      <h2>Le problème à résoudre</h2>
      <p>Les étudiants ivoiriens ont souvent du mal à trouver des informations centralisées sur les bourses, concours, stages et formations disponibles. L'information est dispersée sur différents sites et réseaux sociaux.</p>
      
      <h2>La solution technique</h2>
      <p>J'ai choisi une architecture moderne avec Django pour le backend et React pour le frontend, permettant une séparation claire des responsabilités.</p>
      
      <h2>Défis rencontrés</h2>
      <p>L'intégration de l'IA pour la recommandation personnalisée a été l'un des plus grands défis techniques du projet.</p>
    `,
    author: 'Souleymane Yeo',
    publishedAt: '2025-01-15',
    readingTime: 8,
    category: 'Développement',
    tags: ['Django', 'React', 'Python', 'PostgreSQL'],
    image: '/images/blog/opportunci-development.jpg'
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-primary-600 hover:text-primary-700">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={['blog', ...post.tags]}
      />

      <article className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                <Link to="/" className="hover:text-primary-600">Accueil</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-primary-600">Blog</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">{post.title}</span>
              </nav>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime} min de lecture</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-xl shadow-large mb-12"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x400/3b82f6/ffffff?text=${encodeURIComponent(post.title)}`;
                  }}
                />
              )}

              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Retour au blog</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;