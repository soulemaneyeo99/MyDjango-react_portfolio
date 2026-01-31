# ========== backend/apps/portfolio/views.py (Amélioré) ==========
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import F
from .models import Project, ProjectCategory, Technology
from .serializers import (ProjectListSerializer, ProjectDetailSerializer, 
                         ProjectCreateSerializer, ProjectCategorySerializer, 
                         TechnologySerializer)

class ProjectListCreateView(generics.ListCreateAPIView):
    """Liste et création de projets avec filtrage"""
    
    def get_queryset(self):
        queryset = Project.objects.filter(status='published').order_by('-featured', '-created_at')
        
        # Filtrage par catégorie
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
            
        # Filtrage par technologie
        tech = self.request.query_params.get('technology')
        if tech:
            queryset = queryset.filter(technologies__name__icontains=tech)
            
        return queryset
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProjectCreateSerializer
        return ProjectListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Détail, modification et suppression d'un projet"""
    queryset = Project.objects.filter(status='published')
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProjectCreateSerializer
        return ProjectDetailSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Incrémenter le compteur de vues de façon atomique
        Project.objects.filter(id=instance.id).update(view_count=F('view_count') + 1)
        # Recharger l'instance avec la nouvelle valeur
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def featured_projects(request):
    """Projets mis en avant"""
    try:
        projects = Project.objects.filter(
            status='published', 
            featured=True
        ).order_by('-created_at')[:6]  # Limite à 6 projets
        
        serializer = ProjectListSerializer(projects, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des projets'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def project_categories(request):
    """Liste des catégories avec comptage"""
    try:
        categories = ProjectCategory.objects.all()
        # Ajouter le count de projets pour chaque catégorie
        data = []
        for category in categories:
            category_data = ProjectCategorySerializer(category).data
            category_data['project_count'] = Project.objects.filter(
                category=category, 
                status='published'
            ).count()
            data.append(category_data)
        
        return Response(data)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des catégories'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def technologies(request):
    """Liste des technologies avec comptage"""
    try:
        techs = Technology.objects.all()
        # Ajouter le count de projets pour chaque technologie
        data = []
        for tech in techs:
            tech_data = TechnologySerializer(tech).data
            tech_data['project_count'] = Project.objects.filter(
                technologies=tech, 
                status='published'
            ).count()
            data.append(tech_data)
        
        return Response(data)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des technologies'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
