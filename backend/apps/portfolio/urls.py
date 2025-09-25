# ========== apps/portfolio/urls.py ==========
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/featured/', views.featured_projects, name='featured-projects'),
    path('categories/', views.project_categories, name='categories'),
    path('technologies/', views.technologies, name='technologies'),
]
