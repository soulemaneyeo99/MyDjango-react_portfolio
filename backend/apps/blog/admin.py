# ========== apps/blog/admin.py ==========
from django.contrib import admin
from .models import BlogPost, BlogCategory, Tag, Comment

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    readonly_fields = ['name', 'email', 'created_at']
    fields = ['name', 'email', 'content', 'approved', 'created_at']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'featured', 
                   'view_count', 'reading_time', 'created_at']
    list_filter = ['status', 'category', 'featured', 'tags', 'created_at']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    inlines = [CommentInline]
    
    fieldsets = (
        ('Contenu', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Classification', {
            'fields': ('category', 'tags', 'status', 'featured')
        }),
        ('Statistiques', {
            'fields': ('view_count', 'reading_time'),
            'classes': ('collapse',)
        }),
        ('Dates', {
            'fields': ('published_at',),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si c'est une création
            obj.author = request.user
        super().save_model(request, obj, form, change)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'post', 'approved', 'created_at']
    list_filter = ['approved', 'created_at']
    search_fields = ['name', 'email', 'content']
    actions = ['approve_comments', 'disapprove_comments']
    
    def approve_comments(self, request, queryset):
        queryset.update(approved=True)
    approve_comments.short_description = "Approuver les commentaires sélectionnés"
    
    def disapprove_comments(self, request, queryset):
        queryset.update(approved=False)
    disapprove_comments.short_description = "Désapprouver les commentaires sélectionnés"
