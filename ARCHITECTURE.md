# 3-Layer Architecture

This project uses a 3-layer architecture to separate concerns and maximize reliability:

## Directory Structure

```
myPortfolio/
├── directives/          # Layer 1: What to do (SOPs in Markdown)
├── execution/           # Layer 3: Doing the work (Python scripts)
├── .tmp/               # Intermediate files (not committed)
├── backend/            # Django REST API
├── frontend/           # React + Vite application
└── .env                # Environment variables
```

## The 3 Layers

### Layer 1: Directives (What to do)
Markdown SOPs that define goals, inputs, tools, outputs, and edge cases. Think of these as instructions you'd give to a mid-level employee.

**Available directives:**
- `start_dev_servers.md` - Start backend + frontend for development
- `fix_design_system.md` - Unify visual identity and design tokens
- `database_migrations.md` - Django database migration workflow
- `optimize_images.md` - Image optimization for web delivery
- `deploy_production.md` - Production deployment to Railway + Vercel

### Layer 2: Orchestration (Decision making)
The AI agent reads directives, calls execution tools in the right order, handles errors, and updates directives with learnings.

### Layer 3: Execution (Doing the work)
Deterministic Python scripts that handle API calls, data processing, file operations, etc.

**Available scripts:**
- `check_services.py` - Health check for backend/frontend services
- `optimize_images.py` - Batch image optimization with WebP conversion

## Operating Principles

### 1. Check for tools first
Before writing a script, check `execution/` directory. Only create new scripts if none exist.

### 2. Self-anneal when things break
- Read error message and stack trace
- Fix the script and test it again
- Update the directive with what you learned
- System gets stronger over time

### 3. Update directives as you learn
Directives are living documents. When you discover API constraints, better approaches, or common errors—update the directive.

## File Organization

### Deliverables vs Intermediates
- **Deliverables**: Production code, deployed applications, cloud-based outputs
- **Intermediates**: Temporary files in `.tmp/` (can be deleted and regenerated)

### Key Principle
Local files in `.tmp/` are only for processing. Deliverables live in the codebase or cloud services.

## Usage Examples

### Starting development
```bash
# Read the directive
cat directives/start_dev_servers.md

# Use the health check script
python execution/check_services.py
```

### Optimizing images
```bash
# Read the directive
cat directives/optimize_images.md

# Run the optimization script
python execution/optimize_images.py --input frontend/public/images --output frontend/public/images/optimized
```

### Deploying to production
```bash
# Read the directive
cat directives/deploy_production.md

# Follow the steps for Railway + Vercel deployment
```

## Why This Works

Traditional approach: AI does everything → errors compound → 90% accuracy per step = 59% success over 5 steps

3-layer approach: AI focuses on decision-making → complexity pushed into deterministic code → much higher reliability

## Self-Annealing Loop

When something breaks:
1. Fix it
2. Update the tool
3. Test tool, make sure it works
4. Update directive to include new flow
5. System is now stronger

## Adding New Workflows

### 1. Create a directive
```bash
# Create new directive in directives/
touch directives/my_workflow.md
```

### 2. Follow the template
```markdown
# Workflow Name

## Goal
What this workflow accomplishes

## Inputs
What you need to start

## Tools/Scripts
Scripts or commands to use

## Steps
Detailed step-by-step instructions

## Outputs
What gets created

## Edge Cases
Common problems and solutions

## Success Criteria
How to verify it worked
```

### 3. Create execution script (if needed)
```bash
# Create new script in execution/
touch execution/my_script.py
chmod +x execution/my_script.py
```

### 4. Reference in directive
Link the script in the directive's "Tools/Scripts" section.

## Best Practices

- **Be pragmatic**: Use the simplest solution that works
- **Be reliable**: Test scripts thoroughly before committing
- **Self-anneal**: Learn from errors and update directives
- **Document learnings**: Add edge cases and solutions to directives
- **Keep intermediates separate**: Use `.tmp/` for temporary files

---

**Remember**: You sit between human intent (directives) and deterministic execution (Python scripts). Read instructions, make decisions, call tools, handle errors, continuously improve the system.
