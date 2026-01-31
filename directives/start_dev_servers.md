# Start Development Servers

## Goal
Start both the Django backend API server and the React/Vite frontend development server for local development.

## Inputs
- None required (uses existing configuration)

## Prerequisites
- Python virtual environment activated (backend)
- Node.js and npm installed (frontend)
- PostgreSQL running (if using database)
- Environment variables configured (.env files)

## Tools/Scripts
- `execution/check_services.py` - Verify services are running
- Terminal commands for starting servers

## Steps

### 1. Check Prerequisites
```bash
# Verify Python version
python --version  # Should be 3.9+

# Verify Node version
node --version    # Should be 18+

# Check if PostgreSQL is running (if applicable)
pg_isready
```

### 2. Start Backend Server
```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Run migrations (if needed)
python manage.py migrate

# Start Django development server
python manage.py runserver
```

**Expected Output:**
- Server starts on `http://localhost:8000`
- No migration warnings
- API accessible at `http://localhost:8000/api/`

### 3. Start Frontend Server
```bash
cd frontend

# Install dependencies if needed
npm install

# Start Vite dev server
npm run dev
```

**Expected Output:**
- Server starts on `http://localhost:5173`
- Hot module replacement (HMR) enabled
- Opens browser automatically

### 4. Verify Services
```bash
# Run health check script
python execution/check_services.py
```

## Outputs
- Backend API running on port 8000
- Frontend dev server running on port 5173
- Both services accessible and responding

## Edge Cases

### Backend won't start
- **Database connection error**: Check PostgreSQL is running and .env credentials
- **Port already in use**: Kill process on port 8000 or use different port
- **Migration errors**: Run `python manage.py migrate --fake-initial`

### Frontend won't start
- **Port conflict**: Vite will auto-increment to 5174, 5175, etc.
- **Module not found**: Delete `node_modules` and `package-lock.json`, run `npm install`
- **CORS errors**: Check `vite.config.js` proxy settings

### Both services running but not communicating
- **CORS issues**: Verify `CORS_ALLOWED_ORIGINS` in Django settings
- **API URL mismatch**: Check `VITE_API_URL` in frontend .env
- **Proxy not working**: Ensure Vite proxy is configured for `/api` routes

## Success Criteria
- [ ] Backend responds to `http://localhost:8000/api/`
- [ ] Frontend loads at `http://localhost:5173`
- [ ] Frontend can fetch data from backend API
- [ ] No CORS errors in browser console
- [ ] Hot reload works on both frontend and backend

## Common Commands
```bash
# Stop servers
Ctrl+C in each terminal

# Restart backend with fresh DB
python manage.py flush
python manage.py migrate
python manage.py createsuperuser

# Clear frontend cache
rm -rf node_modules/.vite
npm run dev
```

## Notes
- Keep both terminals open while developing
- Backend changes auto-reload (Django dev server)
- Frontend changes trigger HMR (Vite)
- Check terminal output for errors
- Use `execution/check_services.py` for automated health checks
