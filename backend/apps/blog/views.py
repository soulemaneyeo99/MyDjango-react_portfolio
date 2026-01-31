# ========== backend/apps/blog/views.py (Version Complète Corrigée) ==========
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import F
from .models import BlogPost, BlogCategory, Tag, Comment
from .serializers import (
    BlogPostListSerializer, BlogPostDetailSerializer,
    BlogPostCreateSerializer, BlogCategorySerializer,
    TagSerializer, CommentSerializer
)

class BlogPostListCreateView(generics.ListCreateAPIView):
    """Liste et création d'articles de blog avec filtrage"""
    
    def get_queryset(self):
        queryset = BlogPost.objects.filter(status='published').order_by('-featured', '-published_at')
        
        # Filtrage par catégorie
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
            
        # Filtrage par tag
        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tags__slug=tag)
            
        # Recherche dans le titre et le contenu
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                excerpt__icontains=search
            )
            
        return queryset.distinct()
    
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
        # Incrémenter le compteur de vues de façon atomique
        BlogPost.objects.filter(id=instance.id).update(view_count=F('view_count') + 1)
        # Recharger l'instance avec la nouvelle valeur
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def featured_posts(request):
    """Articles mis en avant"""
    try:
        posts = BlogPost.objects.filter(
            status='published', 
            featured=True
        ).order_by('-published_at')[:6]  # Limite à 6 articles
        
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des articles'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def blog_categories(request):
    """Liste des catégories de blog avec comptage"""
    try:
        categories = BlogCategory.objects.all()
        # Ajouter le count d'articles pour chaque catégorie
        data = []
        for category in categories:
            category_data = BlogCategorySerializer(category).data
            category_data['post_count'] = BlogPost.objects.filter(
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
def blog_tags(request):
    """Liste des tags avec comptage"""
    try:
        tags = Tag.objects.all()
        # Ajouter le count d'articles pour chaque tag
        data = []
        for tag in tags:
            tag_data = TagSerializer(tag).data
            tag_data['post_count'] = BlogPost.objects.filter(
                tags=tag, 
                status='published'
            ).count()
            data.append(tag_data)
        
        return Response(data)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des tags'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_comment(request, slug):
    """Ajouter un commentaire à un article"""
    try:
        post = get_object_or_404(BlogPost, slug=slug, status='published')
        
        # Validation des données
        required_fields = ['name', 'email', 'content']
        for field in required_fields:
            if not request.data.get(field):
                return Response(
                    {'error': f'Le champ {field} est requis'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Validation de l'email
        import re
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, request.data.get('email')):
            return Response(
                {'error': 'Format d\'email invalide'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validation de la longueur du contenu
        content = request.data.get('content', '').strip()
        if len(content) < 10:
            return Response(
                {'error': 'Le commentaire doit contenir au moins 10 caractères'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Créer le commentaire
        comment_data = {
            'name': request.data.get('name').strip(),
            'email': request.data.get('email').strip().lower(),
            'content': content
        }
        
        serializer = CommentSerializer(data=comment_data)
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Article non trouvé'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de l\'ajout du commentaire'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def blog_stats(request):
    """Statistiques du blog"""
    try:
        stats = {
            'total_posts': BlogPost.objects.filter(status='published').count(),
            'total_categories': BlogCategory.objects.count(),
            'total_tags': Tag.objects.count(),
            'total_comments': Comment.objects.filter(approved=True).count(),
            'recent_posts': BlogPost.objects.filter(status='published').count()[:5],
        }
        return Response(stats)
    except Exception as e:
        return Response(
            {'error': 'Erreur lors de la récupération des statistiques'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
