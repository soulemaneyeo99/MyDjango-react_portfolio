# Database Migrations - Django

## Goal
Safely create and apply Django database migrations for the portfolio backend.

## Inputs
- Model changes in Django apps (`backend/apps/*/models.py`)
- Existing migration files

## Prerequisites
- PostgreSQL running and accessible
- Virtual environment activated
- Database credentials in `.env`

## Tools/Scripts
- Django management commands
- `execution/backup_database.py` - Create DB backup before migrations

## Steps

### 1. Review Model Changes
```bash
cd backend

# Check which models have changed
python manage.py makemigrations --dry-run --verbosity 3
```

### 2. Create Backup (Production Only)
```bash
# For production, always backup first
python ../execution/backup_database.py

# Verify backup created
ls -lh .tmp/backups/
```

### 3. Generate Migrations
```bash
# Create migration files
python manage.py makemigrations

# Review generated migration files
cat apps/*/migrations/00XX_*.py
```

**What to check:**
- Field types are correct
- No accidental deletions
- Dependencies are in order

### 4. Check Migration Plan
```bash
# See what SQL will be executed
python manage.py sqlmigrate <app_name> <migration_number>

# Example:
python manage.py sqlmigrate portfolio 0002
```

### 5. Apply Migrations
```bash
# Apply all pending migrations
python manage.py migrate

# Or apply specific app
python manage.py migrate portfolio
```

### 6. Verify Database State
```bash
# Check migration status
python manage.py showmigrations

# Test in Django shell
python manage.py shell
>>> from apps.portfolio.models import Project
>>> Project.objects.count()
```

## Outputs
- New migration files in `apps/*/migrations/`
- Updated database schema
- Migration history in `django_migrations` table

## Edge Cases

### Migration conflicts
```bash
# If you see "conflicting migrations"
python manage.py makemigrations --merge
```

### Fake migrations (when schema already matches)
```bash
# Mark migration as applied without running
python manage.py migrate --fake <app_name> <migration_number>
```

### Reset migrations (DESTRUCTIVE)
```bash
# Delete all data and start fresh
python manage.py flush
python manage.py migrate
```

### Rollback migration
```bash
# Rollback to specific migration
python manage.py migrate <app_name> <migration_number>

# Example: rollback portfolio to 0001
python manage.py migrate portfolio 0001
```

### Data migrations
For complex data transformations, create empty migration:
```bash
python manage.py makemigrations --empty <app_name>
```

Then edit the migration file to add `RunPython` operations.

## Success Criteria
- [ ] `makemigrations` creates expected migration files
- [ ] `showmigrations` shows all migrations applied
- [ ] No errors during `migrate`
- [ ] Models can be imported and queried in shell
- [ ] Admin interface works correctly

## Common Errors

### "No changes detected"
- Check model files are saved
- Ensure app is in `INSTALLED_APPS`
- Try `python manage.py makemigrations <app_name>` explicitly

### "Relation already exists"
- Schema and migrations out of sync
- Use `--fake-initial` flag: `python manage.py migrate --fake-initial`

### "Cannot add NOT NULL column"
- Add `default=` or `null=True` to new fields
- Or create data migration to populate values first

## Notes
- Always review migration files before applying
- In production, test migrations on staging first
- Keep migrations small and focused
- Don't edit applied migrations (create new ones)
- Backup database before major schema changes
