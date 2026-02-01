import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { useBlogPost } from '../hooks/useBlog';
import { formatDate } from '../utils/helpers';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loading from '../components/common/Loading';
import Card from '../components/ui/Card';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug);

  if (isLoading) return <Loading size="large" text="Chargement de l'article..." />;

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <Card className="max-w-md p-8 text-center border-border-default">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">Article non trouvé</h1>
          <p className="text-text-secondary mb-8">
            L'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link to="/blog">
            <Button variant="primary">Retour au blog</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog Tech`}
        description={post.excerpt}
        keywords={['blog', ...(post.tags || [])]}
        image={post.image}
      />

      <article className="min-h-screen bg-bg-dark pt-0">
        {/* Header Section */}
        <header className="py-24 relative overflow-hidden bg-bg-dark border-b border-white/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px]" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-xs font-mono mb-8 text-text-muted">
                <Link to="/" className="hover:text-primary-500 uppercase tracking-widest transition-colors">ACCUEIL</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-primary-500 uppercase tracking-widest transition-colors">BLOG</Link>
                <span>/</span>
                <span className="text-primary-500 uppercase tracking-widest truncate">{post.title}</span>
              </nav>

              <div className="mb-12">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted mb-6 uppercase tracking-[0.2em]">
                  <Badge variant="primary" className="px-3 py-1">{post.category}</Badge>
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
                    {post.readingTime} MIN DE LECTURE
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary mb-8 tracking-tight leading-[1.1]">
                  {post.title}
                </h1>

                <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-10 max-w-3xl">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, index) => (
                    <Badge key={index} variant="tech">#{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {post.image && (
                <div className="relative mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl skew-y-0 hover:skew-y-1 transition-transform duration-700">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/1200x600/0a0a0a/333333?text=${encodeURIComponent(post.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/20 to-transparent" />
                </div>
              )}

              <div
                className="prose prose-lg md:prose-xl prose-invert max-w-none 
                                prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
                                prose-p:text-text-secondary prose-p:leading-relaxed prose-p:font-light
                                prose-strong:text-primary-500 prose-strong:font-bold
                                prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                                prose-blockquote:border-l-primary-500 prose-blockquote:bg-bg-elevated/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                                prose-code:text-primary-400 prose-code:bg-primary-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-bg-card prose-pre:border prose-pre:border-border-default prose-pre:rounded-xl prose-pre:p-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500/20">
                    <img
                      src="https://ui-avatars.com/api/?name=Souleymane+Yeo&background=0a0a0a&color=3b82f6"
                      alt="Souleymane Yeo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">SOULEYMANE YEO</p>
                    <p className="text-xs text-text-muted uppercase tracking-widest">Auteur & Développeur</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    className="border border-white/5"
                  >
                    Partager
                  </Button>
                  <Link to="/blog">
                    <Button variant="primary" size="sm">
                      Autres articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;