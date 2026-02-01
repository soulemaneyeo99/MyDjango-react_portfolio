import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { useBlogPosts } from '../hooks/useBlog';
import { formatDate } from '../utils/helpers';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loading from '../components/common/Loading';

const Blog = () => {
  const { data: posts, isLoading, error } = useBlogPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (posts) {
      if (selectedCategory === 'all') {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(posts.filter(post => post.category === selectedCategory));
      }
    }
  }, [posts, selectedCategory]);

  const categories = ['all', 'Développement', 'Backend', 'IA & Data'];

  if (isLoading) return <Loading />;

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const featuredPosts = posts?.filter(post => post.featured) || [];

  return (
    <>
      <SEOHead
        title="Blog Tech | Souleymane Yeo"
        description="Articles sur le développement web, Python, Django, FastAPI, React et mon parcours de développeur."
        keywords={['blog', 'développement', 'python', 'django', 'react', 'tutoriels']}
      />

      <div className="min-h-screen bg-bg-dark pt-0">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden bg-bg-dark">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent-purple/5 blur-[100px]" />

          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight">
              Mon <span className="text-primary-500 text-glow">Blog Tech</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Retours d'expérience, tutoriels et réflexions sur le développement web et l'IA.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 container-custom">
            <h2 className="text-2xl font-bold text-text-primary mb-12 flex items-center">
              <span className="w-8 h-[1px] bg-primary-500 mr-4"></span>
              Articles en vedette
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-12 bg-bg-elevated border-y border-white/5">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === category
                      ? 'bg-primary-500 text-white border-primary-500 shadow-glow'
                      : 'bg-bg-card text-text-secondary border-border-default hover:border-primary-500/50 hover:text-text-primary'
                    }`}
                >
                  {category === 'all' ? 'Tous les articles' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts Grid */}
        <section className="py-24 container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-12">
            {selectedCategory === 'all' ? 'Dernières publications' : `Articles : ${selectedCategory}`}
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bg-card border border-border-default rounded-2xl">
              <div className="text-5xl mb-6 opacity-20">📝</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-text-secondary mb-8">
                Essayez une autre catégorie.
              </p>
              <Button
                onClick={() => setSelectedCategory('all')}
                variant="primary"
              >
                Tout afficher
              </Button>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-bg-elevated border-t border-white/5">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-3xl font-bold text-text-primary mb-6">Restez connecté</h2>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                Recevez une notification par email dès qu'un nouvel article technique est publié.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-grow px-6 py-4 bg-bg-dark border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
                <Button variant="primary" size="lg" className="whitespace-nowrap shadow-glow">
                  S'abonner
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

const FeaturedPostCard = ({ post }) => (
  <Card hover glow className="p-0 overflow-hidden flex flex-col md:flex-row h-full group">
    <div className="md:w-2/5 relative overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/600x400/0a0a0a/333333?text=${encodeURIComponent(post.title)}`;
        }}
      />
      <div className="absolute top-4 left-4">
        <Badge variant="primary">Featured</Badge>
      </div>
    </div>
    <div className="p-8 md:w-3/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
          <span className="text-primary-400">{post.category}</span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary-500 transition-colors">
          {post.title}
        </h3>
        <p className="text-text-secondary line-clamp-3 mb-6 font-light">
          {post.excerpt}
        </p>
      </div>
      <Link to={`/blog/${post.slug || post.id}`}>
        <Button variant="ghost" size="sm" className="group/btn p-0 hover:bg-transparent text-primary-500">
          Lire l'article <span className="inline-block transition-transform group-hover/btn:translate-x-1 ml-2">→</span>
        </Button>
      </Link>
    </div>
  </Card>
);

const BlogPostCard = ({ post }) => (
  <Card hover className="p-0 overflow-hidden group h-full flex flex-col">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/400x300/0a0a0a/333333?text=${encodeURIComponent(post.title)}`;
        }}
      />
      <div className="absolute bottom-4 left-4">
        <Badge variant="tech" className="bg-bg-dark/80 backdrop-blur-sm">{post.category}</Badge>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="text-xs font-mono text-text-muted mb-3 uppercase tracking-widest">
        {formatDate(post.publishedAt)} • {post.readingTime} MIN
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-500 transition-colors">
        {post.title}
      </h3>
      <p className="text-text-secondary text-sm line-clamp-3 mb-6 flex-grow">
        {post.excerpt}
      </p>
      <Link to={`/blog/${post.slug || post.id}`} className="mt-auto">
        <Button variant="ghost" size="sm" className="w-full border-border-default hover:border-primary-500/50">
          Détails article
        </Button>
      </Link>
    </div>
  </Card>
);

export default Blog;