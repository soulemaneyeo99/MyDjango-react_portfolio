#!/usr/bin/env python3
"""
Seed script to add the FormaAssist IA project to the Django database.
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
    category_name = "IA & Enterprise"
    category, created = ProjectCategory.objects.get_or_create(
        name=category_name,
        defaults={
            "slug": "ia-enterprise",
            "description": "Plateforme d'IA conversationnelle d'entreprise production-ready."
        }
    )
    if created:
        print(f"✅ Created category: {category_name}")
    else:
        print(f"ℹ️  Category '{category_name}' already exists.")

    # 2. Create or get technologies
    tech_data = [
        {"name": "FastAPI",       "color": "#009688"},
        {"name": "Next.js 15",    "color": "#000000"},
        {"name": "PydanticAI",    "color": "#e92063"},
        {"name": "Gemini 2.5",    "color": "#4285f4"},
        {"name": "Qdrant",        "color": "#6366f1"},
        {"name": "PostgreSQL",    "color": "#336791"},
        {"name": "Redis",         "color": "#dc2626"},
        {"name": "Celery",        "color": "#37b24d"},
        {"name": "Docker",        "color": "#2496ed"},
        {"name": "TypeScript",    "color": "#3178c6"},
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
    detailed_desc = """FormaAssist IA est une plateforme complète d'assistant IA destinée aux entreprises, conçue pour être déployée en production. Elle permet à n'importe quel collaborateur d'interroger l'ensemble du patrimoine informationnel de l'entreprise en langage naturel.

🎯 **Le Problème Résolu** :
Les entreprises accumulent des connaissances dispersées : PDF, Word, spreadsheets, vidéos de formation, bases de données SQL. Les employés perdent un temps considérable à chercher l'information. FormaAssist centralise tout et répond en langage naturel.

🚀 **Ce que fait l'application** :
L'utilisateur ouvre un chat et pose une question. L'agent IA comprend l'intention, choisit les bons outils automatiquement, cherche dans les documents via recherche sémantique, interroge les bases de données en générant du SQL, et streame la réponse token par token avec sources citées (nom de fichier, page).

🧠 **Intelligence Artificielle** :
- **Google Gemini 2.5 Flash** — modèle de génération (LLM)
- **gemini-embedding-001** (3 072 dimensions) — embeddings sémantiques
- **Pipeline RAG complet** : chunking récursif/markdown, BM25 hybride, Reciprocal Rank Fusion, reranking
- **Gemini File API** — traitement vidéo et audio (transcription/description)
- **Gemini Vision** — OCR et description d'images

⚙️ **Architecture Technique** :
- **Backend** : FastAPI + PydanticAI (Python 3.12), JWT + API Key auth, RBAC, SQLAlchemy async + Alembic
- **Frontend** : Next.js 15 (App Router, React 19, TypeScript strict), Tailwind CSS v4, Zustand + TanStack Query v5, next-intl (EN/FR)
- **Bases vectorielles** : Qdrant (vectors) + BM25 hybride
- **Infrastructure** : Docker Compose (7 services), Traefik + Nginx, Celery + Redis, Flower (monitoring)

📊 **Fonctionnalités Clés** :
- **Chat IA en streaming temps réel** : WebSocket bidirectionnel avec PydanticAI Events, tool calls visibles en temps réel
- **RAG Multiformat** : PDF, DOCX, XLSX, CSV, JPG, PNG, MP4, MOV, MP3, WAV, et 10+ autres formats (20+ total)
- **SQL en langage naturel** : connexion à PostgreSQL/MySQL/SQLite/MSSQL externes, cache du schéma, logs complets
- **Sync sources automatique** : dossier local, Google Drive, S3/MinIO avec Celery Beat incrémental
- **Partage de conversations** : lien unique avec expiration optionnelle
- **Dashboard admin** : analytics évaluations 👍/👎, gestion utilisateurs, logs SQL, export CSV/JSON

📈 **Métriques** : 12 modèles ORM, 35+ endpoints REST, 20+ formats supportés, 26+ composants UI, 7 services Docker, 2 langues (EN/FR)

🏗️ **Architecture en couches** : Routes → Services → Repositories. Session auto-commit, injection de dépendances via Annotated aliases, exceptions métier centralisées, chiffrement Fernet, health checks Kubernetes-ready."""

    project_title = "FormaAssist IA"
    project, created_proj = Project.objects.get_or_create(
        title=project_title,
        defaults={
            "slug": "formaassist",
            "description": "Plateforme d'IA conversationnelle d'entreprise : chat en temps réel avec streaming, RAG multiformat, SQL en langage naturel et dashboard d'administration.",
            "detailed_description": detailed_desc.strip(),
            "featured_image": "projects/featured/formaassist_hero.png",
            "demo_url": "#",
            "source_url": "#",
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
