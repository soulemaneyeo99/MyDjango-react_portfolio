# ========== apps/portfolio/admin.py ==========
from django.contrib import admin
from .models import Project, ProjectCategory, Technology, ProjectImage

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'color']
    search_fields = ['name']
    list_per_page = 20

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'caption', 'order']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'featured', 'view_count', 'created_at']
    list_filter = ['status', 'category', 'featured', 'technologies', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    inlines = [ProjectImageInline]
    
    fieldsets = (
        ('Informations principales', {
            'fields': ('title', 'slug', 'description', 'detailed_description')
        }),
        ('Media', {
            'fields': ('featured_image',)
        }),
        ('Classification', {
            'fields': ('category', 'technologies', 'status', 'featured')
        }),
        ('Liens', {
            'fields': ('demo_url', 'source_url')
        }),
        ('Statistiques', {
            'fields': ('view_count',),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si c'est une création
            obj.owner = request.user
        super().save_model(request, obj, form, change)
