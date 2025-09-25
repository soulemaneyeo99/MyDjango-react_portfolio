# ========== apps/portfolio/serializers.py ==========
from rest_framework import serializers
from .models import Project, ProjectCategory, Technology, ProjectImage

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id', 'name', 'icon', 'color')

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ('id', 'name', 'slug', 'description')

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ('id', 'image', 'caption', 'order')

class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer pour la liste des projets"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ('id', 'title', 'slug', 'description', 'featured_image', 
                 'category', 'technologies', 'demo_url', 'source_url', 
                 'featured', 'view_count', 'created_at')

class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer pour le détail d'un projet"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    owner = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Project
        fields = ('id', 'title', 'slug', 'description', 'detailed_description',
                 'featured_image', 'category', 'technologies', 'images',
                 'demo_url', 'source_url', 'owner', 'featured', 'view_count',
                 'created_at', 'updated_at')

class ProjectCreateSerializer(serializers.ModelSerializer):
    """Serializer pour créer/modifier un projet"""
    class Meta:
        model = Project
        fields = ('title', 'description', 'detailed_description', 
                 'featured_image', 'category', 'technologies',
                 'demo_url', 'source_url', 'featured', 'status')
