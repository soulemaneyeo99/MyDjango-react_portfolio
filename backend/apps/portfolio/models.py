# ========== apps/portfolio/models.py ==========
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from PIL import Image
import os

User = get_user_model()

class Technology(models.Model):
    """Technologies utilisées dans les projets"""
    name = models.CharField(max_length=50, unique=True)
    icon = models.ImageField(upload_to='technologies/', blank=True, null=True)
    color = models.CharField(max_length=7, default='#000000', help_text='Code couleur hex')
    
    class Meta:
        verbose_name = 'Technologie'
        verbose_name_plural = 'Technologies'
        ordering = ['name']
    
    def __str__(self):
        return self.name

class ProjectCategory(models.Model):
    """Catégories de projets"""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name

class Project(models.Model):
    """Modèle pour les projets du portfolio"""
    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('published', 'Publié'),
        ('archived', 'Archivé'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    
    # Images
    featured_image = models.ImageField(upload_to='projects/featured/')
    
    # Links
    demo_url = models.URLField(blank=True, help_text='Lien vers la démo')
    source_url = models.URLField(blank=True, help_text='Lien vers le code source')
    
    # Relationships
    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True)
    technologies = models.ManyToManyField(Technology, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    
    # Metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    featured = models.BooleanField(default=False, help_text='Projet mis en avant')
    view_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
        # Redimensionner l'image featured
        if self.featured_image:
            img = Image.open(self.featured_image.path)
            if img.height > 600 or img.width > 800:
                img.thumbnail((800, 600))
                img.save(self.featured_image.path)
    
    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    """Images supplémentaires pour les projets"""
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Image de projet'
        verbose_name_plural = 'Images de projet'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Redimensionner l'image
        if self.image:
            img = Image.open(self.image.path)
            if img.height > 800 or img.width > 1200:
                img.thumbnail((1200, 800))
                img.save(self.image.path)