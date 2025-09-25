# ========== apps/portfolio/views.py ==========
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Project, ProjectCategory, Technology
from .serializers import (ProjectListSerializer, ProjectDetailSerializer, 
                         ProjectCreateSerializer, ProjectCategorySerializer, 
                         TechnologySerializer)

class ProjectListCreateView(generics.ListCreateAPIView):
    """Liste et création de projets"""
    queryset = Project.objects.filter(status='published').order_by('-featured', '-created_at')
    
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
    queryset = Project.objects.all()
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
        # Incrémenter le compteur de vues
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def featured_projects(request):
    """Projets mis en avant"""
    projects = Project.objects.filter(status='published', featured=True)[:3]
    serializer = ProjectListSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def project_categories(request):
    """Liste des catégories"""
    categories = ProjectCategory.objects.all()
    serializer = ProjectCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def technologies(request):
    """Liste des technologies"""
    techs = Technology.objects.all()
    serializer = TechnologySerializer(techs, many=True)
    return Response(serializer.data)