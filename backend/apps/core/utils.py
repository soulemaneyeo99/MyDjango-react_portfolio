# ========== apps/core/utils.py ==========
from django.core.mail import send_mail
from django.conf import settings
import os
from PIL import Image

def optimize_image(image_path, max_width=1200, max_height=800, quality=85):
    """
    Optimise une image en la redimensionnant et en ajustant la qualité
    """
    try:
        with Image.open(image_path) as img:
            # Conversion en RGB si nécessaire
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Redimensionnement si nécessaire
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.LANCZOS)
            
            # Sauvegarde avec optimisation
            img.save(image_path, 'JPEG', optimize=True, quality=quality)
            
    except Exception as e:
        print(f"Erreur lors de l'optimisation de l'image {image_path}: {e}")

def send_contact_email(name, email, subject, message):
    """
    Envoie un email de contact
    """
    try:
        full_message = f"""
        Nouveau message de contact depuis le portfolio:
        
        Nom: {name}
        Email: {email}
        
        Message:
        {message}
        """
        
        send_mail(
            subject=f"[Portfolio] {subject}",
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email: {e}")
        return False

def generate_meta_description(content, max_length=160):
    """
    Génère une meta description à partir du contenu
    """
    # Nettoyer le contenu des balises HTML
    import re
    clean_content = re.sub(r'<[^>]+>', '', content)
    
    # Tronquer à la longueur maximale
    if len(clean_content) <= max_length:
        return clean_content
    
    # Trouver le dernier espace avant la limite
    truncated = clean_content[:max_length]
    last_space = truncated.rfind(' ')
    
    if last_space > 0:
        return truncated[:last_space] + '...'
    else:
        return truncated + '...'