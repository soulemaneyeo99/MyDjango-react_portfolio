# ========== backend/portfolio_backend/urls.py (CORRIGÉ CRITIQUE) ==========
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Health check pour Railway
def health_check(request):
    return JsonResponse({
        'status': 'healthy', 
        'message': 'Portfolio Backend API is running',
        'debug': settings.DEBUG,
        'allowed_hosts': settings.ALLOWED_HOSTS
    })

# API Root endpoint
@csrf_exempt
def api_root(request):
    return JsonResponse({
        'message': 'Portfolio API v1.0',
        'endpoints': {
            'auth': '/api/auth/',
            'portfolio': '/api/portfolio/',
            'blog': '/api/blog/',
            'admin': '/admin/',
            'health': '/health/'
        },
        'cors_origins': getattr(settings, 'CORS_ALLOWED_ORIGINS', []),
        'debug': settings.DEBUG
    })

urlpatterns = [
    # Health check pour Railway
    path('health/', health_check, name='health'),
    
    # API Root
    path('api/', api_root, name='api-root'),
    
    # Admin
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/auth/', include('apps.authentication.urls')),
    path('api/portfolio/', include('apps.portfolio.urls')),
    path('api/blog/', include('apps.blog.urls')),
]

# Servir les fichiers media et static
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # En production, servir les media files via Django (pas optimal mais nécessaire pour Railway)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
