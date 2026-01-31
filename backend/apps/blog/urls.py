# ========== backend/apps/blog/urls.py (CORRIGÉ) ==========
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    # IMPORTANT: Featured AVANT le slug générique
    path('posts/featured/', views.featured_posts, name='featured-posts'),
    
    # Liste des articles
    path('posts/', views.BlogPostListCreateView.as_view(), name='post-list'),
    
    # Détail d'un article
    path('posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='post-detail'),
    
    # Commentaires
    path('posts/<slug:slug>/comments/', views.add_comment, name='add-comment'),
    
    # Métadonnées
    path('categories/', views.blog_categories, name='categories'),
    path('tags/', views.blog_tags, name='tags'),
]