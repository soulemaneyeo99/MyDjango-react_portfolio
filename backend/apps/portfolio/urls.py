# ========== backend/apps/portfolio/urls.py (CORRIGÉ) ==========
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    # IMPORTANT: L'ordre compte ! Featured AVANT le slug générique
    path('projects/featured/', views.featured_projects, name='featured-projects'),
    
    # Liste et création de projets
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list'),
    
    # Détail d'un projet par slug
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    
    # Métadonnées
    path('categories/', views.project_categories, name='categories'),
    path('technologies/', views.technologies, name='technologies'),
]
