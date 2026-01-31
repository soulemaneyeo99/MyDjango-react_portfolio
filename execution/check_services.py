#!/usr/bin/env python3
"""
Health check script for portfolio development services.
Verifies that backend API and frontend dev server are running and accessible.
"""

import requests
import sys
from typing import Tuple

# Service endpoints
BACKEND_URL = "http://localhost:8000/api/"
FRONTEND_URL = "http://localhost:5173"

def check_service(url: str, name: str, timeout: int = 5) -> Tuple[bool, str]:
    """
    Check if a service is accessible.
    
    Args:
        url: Service URL to check
        name: Human-readable service name
        timeout: Request timeout in seconds
        
    Returns:
        Tuple of (success: bool, message: str)
    """
    try:
        response = requests.get(url, timeout=timeout)
        if response.status_code < 500:
            return True, f"✅ {name} is running ({response.status_code})"
        else:
            return False, f"❌ {name} returned error {response.status_code}"
    except requests.exceptions.ConnectionError:
        return False, f"❌ {name} is not accessible (connection refused)"
    except requests.exceptions.Timeout:
        return False, f"❌ {name} timed out after {timeout}s"
    except Exception as e:
        return False, f"❌ {name} check failed: {str(e)}"

def main():
    """Run health checks on all services."""
    print("🔍 Checking portfolio services...\n")
    
    all_healthy = True
    
    # Check backend
    backend_ok, backend_msg = check_service(BACKEND_URL, "Backend API")
    print(backend_msg)
    if not backend_ok:
        all_healthy = False
        print("   💡 Start with: cd backend && python manage.py runserver")
    
    # Check frontend
    frontend_ok, frontend_msg = check_service(FRONTEND_URL, "Frontend Dev Server")
    print(frontend_msg)
    if not frontend_ok:
        all_healthy = False
        print("   💡 Start with: cd frontend && npm run dev")
    
    print()
    
    if all_healthy:
        print("✨ All services are healthy!")
        return 0
    else:
        print("⚠️  Some services are not running. See messages above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
