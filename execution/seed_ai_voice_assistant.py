#!/usr/bin/env python3
"""
Seed script to add the AI Voice Assistant project to the Django database.
Run AFTER creating at least one user: python backend/manage.py createsuperuser
"""

import os
import sys
import django

sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.portfolio.models import Project, ProjectCategory, Technology


def seed_project():
    User = get_user_model()
    owner = User.objects.first()

    if not owner:
        print("❌ Error: No users found.")
        print("   Run: python backend/manage.py createsuperuser")
        sys.exit(1)

    print(f"ℹ️  Using owner: {owner.username} (ID: {owner.id})")

    category, created = ProjectCategory.objects.get_or_create(
        name="IA & Voice",
        defaults={
            "slug": "ia-voice",
            "description": "Applications vocales et conversationnelles basées sur l'IA."
        }
    )
    print(f"{'✅ Created' if created else 'ℹ️  Found'} category: IA & Voice")

    tech_data = [
        {"name": "React 18",         "color": "#61dafb"},
        {"name": "FastAPI",          "color": "#009688"},
        {"name": "Gemini 2.5 Flash", "color": "#4285f4"},
        {"name": "Edge TTS",         "color": "#0078d4"},
        {"name": "Web Audio API",    "color": "#f97316"},
        {"name": "Python",           "color": "#3776ab"},
        {"name": "MediaRecorder API","color": "#8b5cf6"},
    ]

    techs = []
    for item in tech_data:
        tech, tech_created = Technology.objects.get_or_create(
            name=item["name"],
            defaults={"color": item["color"]}
        )
        techs.append(tech)
        if tech_created:
            print(f"✅ Created technology: {item['name']}")

    detailed_desc = """AI Voice Assistant est une application full-stack de conversation vocale temps réel, démontrant une pipeline STT → LLM → TTS optimisée au maximum avec des APIs gratuites.

🎯 **Le Problème Résolu** :
Les pipelines vocales classiques enchaînent 3 modèles distincts (Whisper → GPT → ElevenLabs), multipliant la latence et les coûts. Cette app réduit les 3 étapes à 1 seul appel IA, et remplace les TTS payants par une solution neurale gratuite.

🚀 **Architecture optimisée** :
L'audio WebM/Opus est encodé en base64 et envoyé inline à Gemini via `inlineData`. Gemini retourne directement `{user_text, reply}` en JSON typé (responseSchema). Edge TTS synthétise la réponse et retourne un MP3 en data URL, joué immédiatement dans le navigateur.

🧠 **Décisions Techniques Clés** :
- **STT + LLM en 1 appel** — Gemini 2.5 Flash reçoit l'audio encodé et retourne transcription + réponse en une seule requête, éliminant Whisper et réduisant la latence
- **thinkingBudget: 0** — Gemini 2.5 Flash consommait 982/1024 tokens en "thinking tokens" invisibles, tronquant le JSON. Désactiver le budget de réflexion + monter maxOutputTokens: 2048 a résolu le bug
- **Edge TTS vs alternatives** — ElevenLabs (payant), Chatterbox local (3 GB, 12s/requête) → Edge TTS Microsoft : voix neurales haute qualité, sans clé API

⚙️ **Stack Technique** :
- **Frontend** : React 18, Web Audio API, MediaRecorder API (WebM/Opus)
- **Backend** : FastAPI (Python), Uvicorn
- **IA** : Google Gemini 2.5 Flash (audio base64 + responseSchema JSON)
- **TTS** : Microsoft Edge TTS (fr-FR-DeniseNeural, en-US-JennyNeural)

📊 **Fonctionnalités** :
- Enregistrement micro avec détection de silence automatique
- Détection de langue automatique (FR/EN) → voix TTS correspondante
- Fallback Web Speech API si Edge TTS indisponible
- Personnalisation : nom, accent, langue, phrases fréquentes (localStorage)
- Design responsive mobile-first, dark mode

📈 **Métriques** : 1500 req/jour (Gemini free tier), latence <2s bout-en-bout, coût total = 0€"""

    project, created_proj = Project.objects.get_or_create(
        title="AI Voice Assistant",
        defaults={
            "slug": "ai-voice-assistant",
            "description": "Assistant vocal temps réel multilingue : transcription et IA en un seul appel Gemini 2.5 Flash, synthèse vocale neurale via Edge TTS, coût zéro.",
            "detailed_description": detailed_desc.strip(),
            "featured_image": "projects/featured/ai-voice-assistant_hero.png",
            "demo_url": "#",
            "source_url": "#",
            "status": "published",
            "featured": True,
            "owner": owner,
            "category": category,
        }
    )

    project.technologies.set(techs)
    project.save()

    if created_proj:
        print("🎉 Successfully created project: AI Voice Assistant!")
    else:
        print("ℹ️  Project 'AI Voice Assistant' already exists. Updated relations.")


if __name__ == "__main__":
    seed_project()
