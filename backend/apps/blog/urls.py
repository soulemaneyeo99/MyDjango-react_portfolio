# ========== backend/apps/portfolio/urls.py (Corrigé) ==========
from django.urls import path
from . import views

# Dans votre backend/apps/blog/urls.py
urlpatterns = [
    # Liste des articles avec filtrage
    path('posts/', views.BlogPostListCreateView.as_view(), name='post-list'),
    
    # Articles en vedette (IMPORTANT: avant le slug)
    path('posts/featured/', views.featured_posts, name='featured-posts'),
    
    # Détail d'un article
    path('posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='post-detail'),
    
    # Commentaires
    path('posts/<slug:slug>/comments/', views.add_comment, name='add-comment'),
    
    # Métadonnées
    path('categories/', views.blog_categories, name='categories'),
    path('tags/', views.blog_tags, name='tags'),
]