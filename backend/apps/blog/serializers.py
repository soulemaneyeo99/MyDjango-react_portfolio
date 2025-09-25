# ========== apps/blog/serializers.py ==========
from rest_framework import serializers
from .models import BlogPost, BlogCategory, Tag, Comment

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

class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer pour la liste des articles"""
    author = serializers.StringRelatedField()
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'excerpt', 'featured_image',
                 'author', 'category', 'tags', 'featured', 'view_count',
                 'reading_time', 'created_at', 'published_at')

class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer pour le détail d'un article"""
    author = serializers.StringRelatedField()
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
                 'meta_title', 'meta_description', 'author', 'category', 'tags',
                 'comments', 'featured', 'view_count', 'reading_time',
                 'created_at', 'updated_at', 'published_at')

class BlogPostCreateSerializer(serializers.ModelSerializer):
    """Serializer pour créer/modifier un article"""
    class Meta:
        model = BlogPost
        fields = ('title', 'excerpt', 'content', 'featured_image',
                 'meta_title', 'meta_description', 'category', 'tags',
                 'featured', 'status')
