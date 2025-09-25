# ========== apps/blog/views.py ==========
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import BlogPost, BlogCategory, Tag
from .serializers import (BlogPostListSerializer, BlogPostDetailSerializer,
                         BlogPostCreateSerializer, BlogCategorySerializer,
                         TagSerializer, CommentSerializer)

class BlogPostListCreateView(generics.ListCreateAPIView):
    """Liste et création d'articles"""
    queryset = BlogPost.objects.filter(status='published').order_by('-featured', '-published_at')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogPostCreateSerializer
        return BlogPostListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Détail, modification et suppression d'un article"""
    queryset = BlogPost.objects.filter(status='published')
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return BlogPostCreateSerializer
        return BlogPostDetailSerializer
    
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
def featured_posts(request):
    """Articles mis en avant"""
    posts = BlogPost.objects.filter(status='published', featured=True)[:3]
    serializer = BlogPostListSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def blog_categories(request):
    """Liste des catégories blog"""
    categories = BlogCategory.objects.all()
    serializer = BlogCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def blog_tags(request):
    """Liste des tags"""
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_comment(request, slug):
    """Ajouter un commentaire à un article"""
    post = get_object_or_404(BlogPost, slug=slug, status='published')
    serializer = CommentSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(post=post, email=request.data.get('email'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)