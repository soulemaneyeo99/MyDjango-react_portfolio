
# ========== backend/apps/blog/serializers.py (Amélioré) ==========
from rest_framework import serializers
from .models import BlogPost, BlogCategory, Tag, Comment
from django.utils import timezone
from datetime import timedelta

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('id', 'name', 'slug', 'description', 'color')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'name', 'content', 'created_at')
        read_only_fields = ('id', 'created_at')
    
    def validate_name(self, value):
        """Validation du nom"""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Le nom doit contenir au moins 2 caractères.")
        return value.strip()
    
    def validate_content(self, value):
        """Validation du contenu"""
        content = value.strip()
        if len(content) < 10:
            raise serializers.ValidationError("Le commentaire doit contenir au moins 10 caractères.")
        if len(content) > 1000:
            raise serializers.ValidationError("Le commentaire ne peut pas dépasser 1000 caractères.")
        return content

class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer optimisé pour la liste des articles"""
    author = serializers.StringRelatedField()
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = (
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'author', 'category', 'tags', 'featured', 'view_count',
            'reading_time', 'created_at', 'published_at', 'comments_count'
        )
    
    def get_comments_count(self, obj):
        """Nombre de commentaires approuvés"""
        return obj.comments.filter(approved=True).count()

class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer complet pour le détail d'un article"""
    author = serializers.StringRelatedField()
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    
    # Champs calculés
    comments_count = serializers.SerializerMethodField()
    is_recent = serializers.SerializerMethodField()
    estimated_read_time = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = (
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'meta_title', 'meta_description', 'author', 'category', 'tags',
            'comments', 'featured', 'view_count', 'reading_time',
            'created_at', 'updated_at', 'published_at', 'comments_count',
            'is_recent', 'estimated_read_time'
        )
    
    def get_comments(self, obj):
        """Commentaires approuvés uniquement"""
        approved_comments = obj.comments.filter(approved=True).order_by('-created_at')
        return CommentSerializer(approved_comments, many=True).data
    
    def get_comments_count(self, obj):
        """Nombre de commentaires approuvés"""
        return obj.comments.filter(approved=True).count()
    
    def get_is_recent(self, obj):
        """Vérifie si l'article est récent (moins de 30 jours)"""
        if obj.published_at:
            return obj.published_at > timezone.now() - timedelta(days=30)
        return obj.created_at > timezone.now() - timedelta(days=30)
    
    def get_estimated_read_time(self, obj):
        """Temps de lecture estimé basé sur le contenu"""
        if obj.reading_time:
            return obj.reading_time
        
        # Calcul approximatif : 200 mots par minute
        word_count = len(obj.content.split())
        read_time = max(1, round(word_count / 200))
        return read_time

class BlogPostCreateSerializer(serializers.ModelSerializer):
    """Serializer pour créer/modifier un article"""
    
    class Meta:
        model = BlogPost
        fields = (
            'title', 'excerpt', 'content', 'featured_image',
            'meta_title', 'meta_description', 'category', 'tags',
            'featured', 'status'
        )
    
    def validate_title(self, value):
        """Validation du titre"""
        title = value.strip()
        if len(title) < 5:
            raise serializers.ValidationError("Le titre doit contenir au moins 5 caractères.")
        if len(title) > 200:
            raise serializers.ValidationError("Le titre ne peut pas dépasser 200 caractères.")
        return title
    
    def validate_excerpt(self, value):
        """Validation de l'extrait"""
        excerpt = value.strip()
        if len(excerpt) < 20:
            raise serializers.ValidationError("L'extrait doit contenir au moins 20 caractères.")
        if len(excerpt) > 300:
            raise serializers.ValidationError("L'extrait ne peut pas dépasser 300 caractères.")
        return excerpt
    
    def validate_content(self, value):
        """Validation du contenu"""
        content = value.strip()
        if len(content) < 100:
            raise serializers.ValidationError("Le contenu doit contenir au moins 100 caractères.")
        return content
    
    def validate(self, data):
        """Validation globale"""
        # Auto-génération du meta_title si vide
        if not data.get('meta_title'):
            data['meta_title'] = data.get('title', '')[:60]
        
        # Auto-génération de la meta_description si vide
        if not data.get('meta_description'):
            data['meta_description'] = data.get('excerpt', '')[:160]
        
        return data