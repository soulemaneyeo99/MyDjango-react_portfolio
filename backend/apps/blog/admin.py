# ========== backend/apps/blog/admin.py (Amélioré) ==========
from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost, BlogCategory, Tag, Comment

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color_display', 'post_count_display']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 20
    
    def color_display(self, obj):
        return format_html(
            '<span style="background-color: {}; padding: 5px 10px; color: white; border-radius: 3px;">{}</span>',
            obj.color,
            obj.color
        )
    color_display.short_description = 'Couleur'
    
    def post_count_display(self, obj):
        return obj.post_count
    post_count_display.short_description = 'Nombre d\'articles'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'post_count_display']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 20
    
    def post_count_display(self, obj):
        return obj.post_count
    post_count_display.short_description = 'Nombre d\'articles'

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    readonly_fields = ['name', 'email', 'created_at', 'is_recent']
    fields = ['name', 'email', 'content', 'approved', 'created_at']
    can_delete = True

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'author', 'category', 'status', 'featured', 
        'view_count', 'comment_count_display', 'reading_time', 
        'published_at', 'is_recent_display'
    ]
    list_filter = [
        'status', 'category', 'featured', 'tags', 
        'created_at', 'published_at', 'author'
    ]
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    inlines = [CommentInline]
    list_per_page = 20
    date_hierarchy = 'published_at'
    
    readonly_fields = ['view_count', 'reading_time', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Contenu Principal', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image'),
            'classes': ('wide',)
        }),
        ('SEO et Métadonnées', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',),
            'description': 'Optimisation pour les moteurs de recherche'
        }),
        ('Classification', {
            'fields': ('category', 'tags', 'status', 'featured'),
            'classes': ('wide',)
        }),
        ('Statistiques', {
            'fields': ('view_count', 'reading_time'),
            'classes': ('collapse',)
        }),
        ('Dates', {
            'fields': ('published_at', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si c'est une création
            obj.author = request.user
        super().save_model(request, obj, form, change)
    
    def comment_count_display(self, obj):
        approved = obj.comments.filter(approved=True).count()
        total = obj.comments.count()
        if total == 0:
            return "0"
        return format_html(
            '<span style="color: green;">{}</span> / {}',
            approved, total
        )
    comment_count_display.short_description = 'Commentaires (approuvés/total)'
    
    def is_recent_display(self, obj):
        if obj.is_recent:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Récent</span>'
            )
        return ""
    is_recent_display.short_description = 'Récent'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'post', 'approved', 'is_recent_display', 'created_at']
    list_filter = ['approved', 'created_at', 'post__category']
    search_fields = ['name', 'email', 'content', 'post__title']
    actions = ['approve_comments', 'disapprove_comments']
    list_per_page = 50
    date_hierarchy = 'created_at'
    
    readonly_fields = ['created_at']
    
    def approve_comments(self, request, queryset):
        updated = queryset.update(approved=True)
        self.message_user(
            request,
            f'{updated} commentaire(s) approuvé(s) avec succès.'
        )
    approve_comments.short_description = "Approuver les commentaires sélectionnés"
    
    def disapprove_comments(self, request, queryset):
        updated = queryset.update(approved=False)
        self.message_user(
            request,
            f'{updated} commentaire(s) désapprouvé(s) avec succès.'
        )
    disapprove_comments.short_description = "Désapprouver les commentaires sélectionnés"
    
    def is_recent_display(self, obj):
        if obj.is_recent:
            return format_html('<span style="color: green;">✓</span>')
        return ""
    is_recent_display.short_description = 'Récent'