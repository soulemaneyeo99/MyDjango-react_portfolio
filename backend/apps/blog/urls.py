# ========== apps/blog/urls.py ==========
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('posts/', views.BlogPostListCreateView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='post-detail'),
    path('posts/<slug:slug>/comments/', views.add_comment, name='add-comment'),
    path('posts/featured/', views.featured_posts, name='featured-posts'),
    path('categories/', views.blog_categories, name='categories'),
    path('tags/', views.blog_tags, name='tags'),
]
