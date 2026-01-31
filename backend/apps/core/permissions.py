# ========== apps/core/permissions.py ==========
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée pour permettre aux propriétaires d'un objet
    de le modifier, et aux autres de seulement le lire.
    """
    
    def has_object_permission(self, request, view, obj):
        # Permissions de lecture pour toutes les requêtes
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Permissions d'écriture uniquement pour le propriétaire
        return obj.owner == request.user or obj.author == request.user

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Permission pour les articles de blog
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.author == request.user