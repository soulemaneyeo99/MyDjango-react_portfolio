# 🎨 Portfolio Professionnel - Guide Complet

## 📋 Vue d'ensemble

Ce projet est un portfolio professionnel moderne développé avec **Django REST Framework** pour le backend et **React + Vite** pour le frontend. Il inclut un système de gestion de projets, un blog, une authentification JWT et une interface d'administration complète.

## 🚀 Fonctionnalités

### ✨ Frontend (React)
- **Interface moderne** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **SEO optimisé** avec React Helmet
- **Responsive design** pour tous les écrans
- **Lazy loading** pour optimiser les performances
- **Gestion d'état** avec Context API
- **Notifications** avec React Hot Toast

### 🔧 Backend (Django)
- **API REST** avec Django REST Framework
- **Authentification JWT** sécurisée
- **Upload et optimisation d'images**
- **Interface d'administration** Django
- **Pagination automatique**
- **Gestion des permissions**
- **Support PostgreSQL**

### 📱 Fonctionnalités métier
- **Portfolio de projets** avec images et détails
- **Blog** avec commentaires et catégories
- **Système d'authentification** complet
- **Profil utilisateur** personnalisable
- **Compteur de vues** pour projets et articles
- **Tags et catégories** pour l'organisation
- **Meta tags SEO** automatiques

## 🛠️ Stack Technique

### Backend
- **Python 3.9+**
- **Django 5.0**
- **Django REST Framework 3.14**
- **SimpleJWT** pour l'authentification
- **PostgreSQL** pour la base de données
- **Pillow** pour le traitement d'images

### Frontend
- **React 18**
- **Vite** comme bundler
- **Tailwind CSS** pour le styling
- **Axios** pour les requêtes HTTP
- **React Router** pour la navigation
- **Framer Motion** pour les animations
- **React Helmet** pour le SEO

## 📦 Installation

### Prérequis
- Python 3.9+
- Node.js 18+
- PostgreSQL
- Git

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd portfolio-project
```

### 2. Configuration Backend
```bash
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate    # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer le fichier .env avec vos paramètres

# Migrations de base de données
python manage.py makemigrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Démarrer le serveur
python manage.py runserver
```

### 3. Configuration Frontend
```bash
cd ../frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer le fichier .env

# Démarrer le serveur de développement
npm run dev
```

## 🌐 URLs et Endpoints

### Backend API (http://localhost:8000/api/)

#### Authentification
- `POST /auth/register/` - Inscription
- `POST /auth/login/` - Connexion
- `POST /auth/token/refresh/` - Refresh token
- `GET /auth/profile/` - Profil utilisateur
- `PUT /auth/profile/` - Mise à jour du profil

#### Portfolio
- `GET /portfolio/projects/` - Liste des projets
- `POST /portfolio/projects/` - Créer un projet
- `GET /portfolio/projects/{slug}/` - Détail d'un projet
- `PUT /portfolio/projects/{slug}/` - Modifier un projet
- `DELETE /portfolio/projects/{slug}/` - Supprimer un projet
- `GET /portfolio/projects/featured/` - Projets mis en avant
- `GET /portfolio/categories/` - Catégories de projets
- `GET /portfolio/technologies/` - Technologies

#### Blog
- `GET /blog/posts/` - Liste des articles
- `POST /blog/posts/` - Créer un article
- `GET /blog/posts/{slug}/` - Détail d'un article
- `PUT /blog/posts/{slug}/` - Modifier un article
- `DELETE /blog/posts/{slug}/` - Supprimer un article
- `POST /blog/posts/{slug}/comments/` - Ajouter un commentaire
- `GET /blog/posts/featured/` - Articles mis en avant
- `GET /blog/categories/` - Catégories de blog
- `GET /blog/tags/` - Tags

### Frontend Routes (http://localhost:5173/)
- `/` - Page d'accueil
- `/about` - À propos
- `/projects` - Liste des projets
- `/projects/:slug` - Détail d'un projet
- `/blog` - Liste du blog
- `/blog/:slug` - Article de blog
- `/contact` - Page de contact

## 🔧 Configuration

### Variables d'environnement Backend (.env)
```env
SECRET_KEY=your-super-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True

FRONTEND_URL=http://localhost:5173
```

### Variables d'environnement Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_MEDIA_URL=http://localhost:8000/media
VITE_APP_NAME=Portfolio
VITE_APP_DESCRIPTION=Portfolio professionnel développé avec React et Django
VITE_CONTACT_EMAIL=contact@monportfolio.com
```

## 🎨 Personnalisation

### Couleurs et Thème
Modifiez le fichier `frontend/tailwind.config.js` pour personnaliser les couleurs :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

### Logo et Branding
1. Remplacez le logo dans `frontend/public/favicon.ico`
2. Modifiez le composant Header pour votre logo
3. Personnalisez les métadonnées dans `constants.js`

### Contenu
1. **À propos** : Modifiez `frontend/src/pages/About.jsx`
2. **Page d'accueil** : Personnalisez `frontend/src/pages/Home.jsx`
3. **Footer** : Liens sociaux dans `frontend/src/components/common/Footer.jsx`

## 📊 Administration

### Interface Django Admin
Accédez à `http://localhost:8000/admin/` avec votre compte superutilisateur pour :
- Gérer les utilisateurs
- Créer/modifier les projets
- Gérer les articles de blog
- Administrer les catégories et tags
- Modérer les commentaires

### Gestion des médias
Les fichiers uploadés sont stockés dans :
- `backend/media/projects/` - Images de projets
- `backend/media/blog/` - Images d'articles
- `backend/media/profile/` - Photos de profil

## 🚀 Déploiement

### Production Backend
```bash
# Variables d'environnement
DEBUG=False
ALLOWED_HOSTS=votre-domaine.com

# Collecte des fichiers statiques
python manage.py collectstatic

# Serveur WSGI (Gunicorn recommandé)
pip install gunicorn
gunicorn portfolio_backend.wsgi:application
```

### Production Frontend
```bash
# Build de production
npm run build

# Les fichiers sont dans le dossier dist/
# À déployer sur votre CDN ou serveur web
```

### Recommandations de déploiement
- **Backend** : Railway, Heroku, DigitalOcean, AWS
- **Frontend** : Vercel, Netlify, GitHub Pages
- **Base de données** : PostgreSQL hébergée (AWS RDS, Railway)
- **Médias** : AWS S3, Cloudinary
- **CDN** : CloudFlare

## 🔒 Sécurité

### Bonnes pratiques implémentées
- ✅ Authentification JWT avec refresh tokens
- ✅ Validation des données côté serveur
- ✅ Protection CORS configurée
- ✅ Sanitisation des uploads d'images
- ✅ Rate limiting (à implémenter en production)
- ✅ HTTPS obligatoire en production
- ✅ Variables d'environnement sécurisées

### À implémenter en production
- Rate limiting avec django-ratelimit
- Monitoring avec Sentry
- Logs structurés
- Backup automatique de la DB
- SSL/TLS avec Let's Encrypt

## 🎯 SEO et Performance

### Optimisations SEO
- ✅ Meta tags dynamiques
- ✅ URLs SEO-friendly (slugs)
- ✅ Sitemap XML (à générer)
- ✅ Structured data (à implémenter)
- ✅ Temps de chargement optimisés

### Optimisations Performance
- ✅ Lazy loading des composants
- ✅ Optimisation des images
- ✅ Bundle splitting avec Vite
- ✅ Cache des requêtes API
- ✅ Compression gzip

## 🤝 Contribution

### Structure des commits
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactorisation
test: tests
chore: maintenance
```

### Processus de développement
1. Fork le projet
2. Créer une branche feature
3. Committer les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📚 Ressources

### Documentation
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Tutoriels recommandés
- Django REST Framework
- React Hooks avancés
- Tailwind CSS responsive design
- Optimisation des performances React

## 🐛 Dépannage

### Problèmes courants

#### Backend
```bash
# Problème de migration
python manage.py makemigrations --empty appname
python manage.py migrate --fake-initial

# Problème de dépendances
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

#### Frontend
```bash
# Cache Node.js
rm -rf node_modules package-lock.json
npm install

# Build échoue
rm -rf dist
npm run build
```

#### CORS
Vérifiez `CORS_ALLOWED_ORIGINS` dans `settings.py`

#### Base de données
```bash
# Reset complet (ATTENTION : efface toutes les données)
python manage.py flush
python manage.py migrate
```

## 📞 Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier les issues GitHub
3. Créer une nouvelle issue avec :
   - Description du problème
   - Étapes pour reproduire
   - Environnement (OS, versions)
   - Logs d'erreur

## 📝 License

MIT License - voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ et beaucoup de café ☕**