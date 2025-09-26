# ========== backend/apps/portfolio/serializers.py (Amélioré) ==========
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
    """Serializer optimisé pour la liste des projets"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = (
            'id', 'title', 'slug', 'description', 'featured_image', 
            'category', 'technologies', 'demo_url', 'source_url', 
            'featured', 'view_count', 'created_at', 'status'
        )

class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer complet pour le détail d'un projet"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    owner = serializers.StringRelatedField(read_only=True)
    
    # Champs calculés
    tech_count = serializers.SerializerMethodField()
    is_recent = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = (
            'id', 'title', 'slug', 'description', 'detailed_description',
            'featured_image', 'category', 'technologies', 'images',
            'demo_url', 'source_url', 'owner', 'featured', 'view_count',
            'created_at', 'updated_at', 'status', 'tech_count', 'is_recent'
        )
    
    def get_tech_count(self, obj):
        """Nombre de technologies utilisées"""
        return obj.technologies.count()
    
    def get_is_recent(self, obj):
        """Vérifie si le projet est récent (moins de 6 mois)"""
        from datetime import datetime, timedelta
        return obj.created_at > datetime.now() - timedelta(days=180)

class ProjectCreateSerializer(serializers.ModelSerializer):
    """Serializer pour créer/modifier un projet"""
    
    class Meta:
        model = Project
        fields = (
            'title', 'description', 'detailed_description', 
            'featured_image', 'category', 'technologies',
            'demo_url', 'source_url', 'featured', 'status'
        )
    
    def validate_title(self, value):
        """Validation personnalisée du titre"""
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Le titre doit contenir au moins 3 caractères."
            )
        return value.strip()
    
    def validate(self, data):
        """Validation globale"""
        if not data.get('demo_url') and not data.get('source_url'):
            raise serializers.ValidationError(
                "Au moins un lien (démo ou code source) doit être fourni."
            )
        return data