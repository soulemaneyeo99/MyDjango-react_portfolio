#!/usr/bin/env python3
"""
Seed script to add the AssurAI project to the Django database.
Run this script AFTER creating at least one user (e.g. a superuser).
"""

import os
import sys
import django

# Add backend to path and setup Django
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.portfolio.models import Project, ProjectCategory, Technology

def seed_project():
    User = get_user_model()
    owner = User.objects.first()
    
    if not owner:
        print("❌ Error: No users found in the database.")
        print("   Please create a superuser first by running:")
        print("   python backend/manage.py createsuperuser")
        sys.exit(1)
        
    print(f"ℹ️  Using owner: {owner.username} (ID: {owner.id})")
    
    # 1. Create or get category
    category_name = "IA & Assurance / IoT"
    category, created = ProjectCategory.objects.get_or_create(
        name=category_name,
        defaults={
            "slug": "ia-assurance-iot",
            "description": "Plateforme de prévention des risques connectée et prédictive."
        }
    )
    if created:
        print(f"✅ Created category: {category_name}")
    else:
        print(f"ℹ️  Category '{category_name}' already exists.")

    # 2. Create or get technologies
    tech_data = [
        {"name": "FastAPI", "color": "#009688"},
        {"name": "Django", "color": "#092e20"},
        {"name": "React", "color": "#61dafb"},
        {"name": "Flutter", "color": "#02569B"},
        {"name": "Phi-3", "color": "#8b5cf6"},
        {"name": "Ollama", "color": "#000000"},
        {"name": "PostgreSQL", "color": "#336791"},
        {"name": "IoT", "color": "#ef4444"},
        {"name": "Tailwind CSS", "color": "#06b6d4"}
    ]
    
    techs = []
    for tech_item in tech_data:
        tech, created_tech = Technology.objects.get_or_create(
            name=tech_item["name"],
            defaults={"color": tech_item["color"]}
        )
        techs.append(tech)
        if created_tech:
            print(f"✅ Created technology: {tech_item['name']}")

    # 3. Create project
    detailed_desc = """AssurAI est une plateforme intelligente de prévention des risques et d'assurance prédictive basée sur l'IA, ayant remporté le **1er Prix du RARM Challenge 2025** lors des Rencontres Africaines du Risk Management à Abidjan.

🎯 **Contexte & Mission** :
Développée dans le cadre du RARM Challenge sous le thème *« Risques, durabilité et données : l'intelligence artificielle au service des industries extractives et énergétiques africaines »*, notre mission était de concevoir une solution capable d'utiliser l'IA pour améliorer la gestion des risques dans les secteurs énergétiques et extractifs africains.

🚀 **Le Problème Résolu** :
Dans de nombreuses entreprises industrielles africaines, les risques sont identifiés trop tard, causant des pertes financières majeures, des accidents corporels, des pollutions environnementales et des interruptions d'activité. Les responsables HSE manquent d'outils d'anticipation et les données terrain ne sont pas exploitées en temps réel.

⚙️ **La Solution AssurAI** :
AssurAI combine l'Intelligence Artificielle, l'IoT (capteurs connectés) et l'analyse prédictive pour passer d'une logique curative (réagir après incident) à une logique préventive (anticiper avant l'incident).

📊 **Fonctionnalités Principales** :
- **Surveillance IoT & Détection Précoce** : Analyse en temps réel de la température, fumée et anomalies par capteurs (ex: Arduino) pour identifier les risques d'incendie ou de surchauffe.
- **Alertes en Temps Réel** : Notifications push instantanées (web/mobile) pour une intervention rapide des équipes HSE.
- **Chatbot IA Spécialisé** : Dialogue en langage naturel pour expliquer les risques et fournir des conseils de sécurité.
- **Analyse Prédictive** : Calcul de score de risque et recommandations basées sur l'historique et les données de capteurs.
- **Dashboard Décisionnel** : Plateforme web de visualisation de statistiques et d'indicateurs clés.

🛠️ **Architecture de la Solution** :
- **Application Mobile** : Développée en *Flutter* pour la réception des alertes et le chatbot IA.
- **Plateforme Web** : Développée en *React* (Frontend) et *Django* (Backend) pour la gestion et l'administration.
- **API IA** : Développée en *FastAPI* pour l'orchestration des échanges IA et du chatbot.
- **Modèle de Langage (LLM)** : Modèle *Phi-3* de Microsoft exécuté localement (via *Ollama*) pour garantir la confidentialité et réduire les coûts.

👨‍💻 **Ma Contribution Personnelle** :
- **Backend FastAPI** : Développement de l'API d'authentification, de gestion de données et d'orchestration IA pour l'application mobile.
- **Intégration LLM** : Déploiement et configuration locale du chatbot avec Phi-3.
- **Frontend React & Backend Django** : Développement du dashboard web interactif, des visualisations de données et de l'interface d'administration."""

    project_title = "AssurAI"
    project, created_proj = Project.objects.get_or_create(
        title=project_title,
        defaults={
            "slug": "assurai",
            "description": "Plateforme intelligente de prévention des risques et d'assurance prédictive basée sur l'IA.",
            "detailed_description": detailed_desc.strip(),
            "featured_image": "projects/featured/assurai_hero.png",  # Relative to MEDIA_ROOT
            "demo_url": "https://www.linkedin.com/posts/sande-fatola-crm-arm-1489ab1a_assurai-rarm2025-riskmanagement-activity-7343598110360694784-j9I9",
            "source_url": "https://github.com/soulemaneyeo99/AssurAI",
            "status": "published",
            "featured": True,
            "owner": owner,
            "category": category
        }
    )
    
    # Save tech stack relations
    project.technologies.set(techs)
    project.save()

    if created_proj:
        print(f"🎉 Successfully created and seeded project: {project_title}!")
    else:
        print(f"ℹ️  Project '{project_title}' already exists in database. Updated relations.")

if __name__ == "__main__":
    seed_project()
