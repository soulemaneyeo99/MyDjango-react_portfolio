# Deploy to Production

## Goal
Deploy the portfolio application to production environments (Railway for backend, Vercel for frontend).

## Inputs
- Tested code in `main` or `production` branch
- Environment variables configured
- Database ready (PostgreSQL on Railway)

## Prerequisites
- Git repository pushed to GitHub
- Railway account and project created
- Vercel account and project linked
- Domain configured (optional)

## Tools/Scripts
- Git commands
- Railway CLI (optional)
- Vercel CLI (optional)

## Steps

### Phase 1: Pre-deployment Checks

#### 1.1 Run Tests
```bash
# Backend tests
cd backend
python manage.py test

# Frontend build test
cd frontend
npm run build
```

#### 1.2 Check Environment Variables
Verify all required variables are set:

**Backend (.env):**
- `SECRET_KEY` (generate new for production!)
- `DEBUG=False`
- `ALLOWED_HOSTS` (production domains)
- `DATABASE_URL` (Railway PostgreSQL)
- `FRONTEND_URL` (Vercel URL)

**Frontend (.env):**
- `VITE_API_URL` (Railway backend URL)
- `VITE_MEDIA_URL` (Railway backend URL + /media)

#### 1.3 Security Audit
```bash
# Check for exposed secrets
grep -r "SECRET_KEY\|API_KEY" backend/ --include="*.py" | grep -v ".env"

# Verify DEBUG is False
grep "DEBUG" backend/portfolio_backend/settings.py
```

### Phase 2: Backend Deployment (Railway)

#### 2.1 Prepare Backend
```bash
cd backend

# Ensure requirements.txt is up to date
pip freeze > requirements.txt

# Verify Procfile exists
cat Procfile
# Should contain:
# web: gunicorn portfolio_backend.wsgi:application
# release: python manage.py migrate
```

#### 2.2 Configure Railway
1. Go to Railway dashboard
2. Create new project from GitHub repo
3. Select `backend` directory as root
4. Add environment variables:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS`
   - Add PostgreSQL plugin (auto-creates DATABASE_URL)

#### 2.3 Deploy Backend
```bash
# Push to GitHub (Railway auto-deploys)
git add .
git commit -m "chore: prepare backend for production"
git push origin main

# Or use Railway CLI
railway up
```

#### 2.4 Run Migrations
```bash
# Via Railway CLI
railway run python manage.py migrate

# Or add to Procfile release command (already done)
```

#### 2.5 Create Superuser
```bash
railway run python manage.py createsuperuser
```

#### 2.6 Collect Static Files
```bash
railway run python manage.py collectstatic --noinput
```

### Phase 3: Frontend Deployment (Vercel)

#### 3.1 Prepare Frontend
```bash
cd frontend

# Update API URLs in .env.production
echo "VITE_API_URL=https://your-backend.railway.app/api" > .env.production
echo "VITE_MEDIA_URL=https://your-backend.railway.app/media" >> .env.production

# Test production build
npm run build
npm run preview
```

#### 3.2 Configure Vercel
1. Go to Vercel dashboard
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variables from `.env.production`
5. Build command: `npm run build`
6. Output directory: `dist`

#### 3.3 Deploy Frontend
```bash
# Push to GitHub (Vercel auto-deploys)
git add .
git commit -m "chore: prepare frontend for production"
git push origin main

# Or use Vercel CLI
cd frontend
vercel --prod
```

### Phase 4: Post-Deployment

#### 4.1 Verify Deployment
```bash
# Check backend
curl https://your-backend.railway.app/api/

# Check frontend
curl https://your-portfolio.vercel.app/
```

#### 4.2 Test Critical Paths
1. Visit frontend URL
2. Navigate to all pages (Home, About, Projects, Blog, Contact)
3. Test API calls (check browser console)
4. Submit contact form
5. Check admin panel: `https://your-backend.railway.app/admin/`

#### 4.3 Configure Domain (Optional)
**Vercel:**
- Add custom domain in Vercel settings
- Update DNS records (CNAME to Vercel)

**Railway:**
- Add custom domain in Railway settings
- Update DNS records (CNAME to Railway)

#### 4.4 Update CORS Settings
In `backend/portfolio_backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'https://your-portfolio.vercel.app',
    'https://your-custom-domain.com',
]
```

Redeploy backend after this change.

### Phase 5: Monitoring

#### 5.1 Set Up Error Tracking
```bash
# Install Sentry (optional)
pip install sentry-sdk
```

Add to `settings.py`:
```python
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

#### 5.2 Monitor Logs
```bash
# Railway logs
railway logs

# Vercel logs
vercel logs
```

## Outputs
- Backend deployed to Railway: `https://your-backend.railway.app`
- Frontend deployed to Vercel: `https://your-portfolio.vercel.app`
- Database migrated and running
- Static files served correctly
- CORS configured properly

## Edge Cases

### CORS errors after deployment
- Verify `CORS_ALLOWED_ORIGINS` includes production URLs
- Check `ALLOWED_HOSTS` includes backend domain
- Ensure no trailing slashes mismatch

### Static files not loading
- Run `collectstatic` again
- Check `STATIC_URL` and `STATIC_ROOT` in settings
- Verify Railway serves static files (use WhiteNoise)

### Database connection errors
- Check `DATABASE_URL` environment variable
- Verify PostgreSQL plugin is active
- Check database credentials

### Build fails on Vercel
- Check build logs for errors
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `package.json`
- Check Node version compatibility

### Environment variables not working
- Restart deployments after adding variables
- Verify variable names match code
- Check for typos in .env files

## Success Criteria
- [ ] Backend accessible at production URL
- [ ] Frontend accessible at production URL
- [ ] API calls work from frontend to backend
- [ ] No CORS errors
- [ ] Images load correctly
- [ ] Admin panel accessible
- [ ] Contact form works
- [ ] Database persists data
- [ ] SSL/HTTPS enabled on both
- [ ] No console errors on frontend

## Rollback Plan

### Rollback Backend
```bash
# Via Railway dashboard
# Go to Deployments > Select previous deployment > Redeploy

# Or via CLI
railway rollback
```

### Rollback Frontend
```bash
# Via Vercel dashboard
# Go to Deployments > Select previous deployment > Promote to Production

# Or via CLI
vercel rollback
```

## Notes
- Always test on staging before production
- Keep environment variables in password manager
- Document any manual configuration steps
- Set up automated backups for database
- Monitor performance and errors post-deployment

## References
- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- Django Deployment Checklist: https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/
