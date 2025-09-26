# ========== backend/apps/blog/models.py (Corrigé et Complet) ==========
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import reverse
from django.utils import timezone
import readtime
import re

User = get_user_model()

class BlogCategory(models.Model):
    """Catégories d'articles de blog"""
    name = models.CharField(max_length=50, unique=True, verbose_name="Nom")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Description")
    color = models.CharField(
        max_length=7, 
        default='#3B82F6',
        verbose_name="Couleur",
        help_text="Code couleur hexadécimal (ex: #3B82F6)"
    )
    
    class Meta:
        verbose_name = 'Catégorie Blog'
        verbose_name_plural = 'Catégories Blog'
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    @property
    def post_count(self):
        """Nombre d'articles publiés dans cette catégorie"""
        return self.blogpost_set.filter(status='published').count()

class Tag(models.Model):
    """Tags pour les articles"""
    name = models.CharField(max_length=30, unique=True, verbose_name="Nom")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")
    
    class Meta:
        ordering = ['name']
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    @property
    def post_count(self):
        """Nombre d'articles publiés avec ce tag"""
        return self.blogpost_set.filter(status='published').count()

class BlogPost(models.Model):
    """Articles de blog"""
    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('published', 'Publié'),
        ('archived', 'Archivé'),
    ]
    
    # Contenu principal
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")
    excerpt = models.TextField(
        max_length=300, 
        verbose_name="Extrait",
        help_text='Résumé de l\'article (max 300 caractères)'
    )
    content = models.TextField(verbose_name="Contenu")
    featured_image = models.ImageField(
        upload_to='blog/featured/', 
        blank=True, 
        null=True,
        verbose_name="Image mise en avant"
    )
    
    # SEO
    meta_title = models.CharField(
        max_length=60, 
        blank=True,
        verbose_name="Meta titre",
        help_text="Titre pour les moteurs de recherche (max 60 caractères)"
    )
    meta_description = models.CharField(
        max_length=160, 
        blank=True,
        verbose_name="Meta description",
        help_text="Description pour les moteurs de recherche (max 160 caractères)"
    )
    
    # Relations
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        verbose_name="Auteur"
    )
    category = models.ForeignKey(
        BlogCategory, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name="Catégorie"
    )
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Tags")
    
    # Métadonnées
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='draft',
        verbose_name="Statut"
    )
    featured = models.BooleanField(
        default=False,
        verbose_name="Article en vedette"
    )
    view_count = models.PositiveIntegerField(
        default=0,
        verbose_name="Nombre de vues"
    )
    reading_time = models.PositiveIntegerField(
        default=0, 
        verbose_name="Temps de lecture",
        help_text='Temps de lecture en minutes (calculé automatiquement)'
    )
    
    # Dates
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Créé le"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Modifié le"
    )
    published_at = models.DateTimeField(
        null=True, 
        blank=True,
        verbose_name="Publié le"
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'
    
    def save(self, *args, **kwargs):
        # Générer le slug automatiquement
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        
        # Calcul automatique du temps de lecture
        if self.content:
            # Nettoyer le contenu des balises HTML pour le comptage
            clean_content = re.sub(r'<[^>]+>', '', self.content)
            word_count = len(clean_content.split())
            # Moyenne de 200 mots par minute
            self.reading_time = max(1, round(word_count / 200))
        
        # Auto-remplissage des meta tags si vides
        if not self.meta_title:
            self.meta_title = self.title[:60]
        if not self.meta_description:
            self.meta_description = self.excerpt[:160]
        
        # Définir la date de publication si l'article devient publié
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        elif self.status != 'published':
            self.published_at = None
            
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('blog:post-detail', kwargs={'slug': self.slug})
    
    def __str__(self):
        return self.title
    
    @property
    def comment_count(self):
        """Nombre de commentaires approuvés"""
        return self.comments.filter(approved=True).count()
    
    @property
    def is_recent(self):
        """Vérifie si l'article est récent (moins de 30 jours)"""
        from datetime import timedelta
        if self.published_at:
            return self.published_at > timezone.now() - timedelta(days=30)
        return self.created_at > timezone.now() - timedelta(days=30)
    
    @property
    def estimated_read_time(self):
        """Temps de lecture formaté"""
        return f"{self.reading_time} min de lecture"
    
    def get_related_posts(self, limit=3):
        """Articles similaires basés sur la catégorie et les tags"""
        related = BlogPost.objects.filter(
            status='published'
        ).exclude(pk=self.pk)
        
        if self.category:
            related = related.filter(category=self.category)
        
        if self.tags.exists():
            related = related.filter(tags__in=self.tags.all()).distinct()
        
        return related.order_by('-view_count', '-published_at')[:limit]

class Comment(models.Model):
    """Commentaires des articles"""
    post = models.ForeignKey(
        BlogPost, 
        related_name='comments', 
        on_delete=models.CASCADE,
        verbose_name="Article"
    )
    name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    content = models.TextField(verbose_name="Commentaire")
    approved = models.BooleanField(
        default=False,
        verbose_name="Approuvé",
        help_text="Les commentaires doivent être approuvés avant d'être visibles"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Créé le"
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Commentaire"
        verbose_name_plural = "Commentaires"
    
    def __str__(self):
        return f'Commentaire de {self.name} sur {self.post.title}'
    
    @property
    def is_recent(self):
        """Vérifie si le commentaire est récent (moins de 7 jours)"""
        from datetime import timedelta
        return self.created_at > timezone.now() - timedelta(days=7)
