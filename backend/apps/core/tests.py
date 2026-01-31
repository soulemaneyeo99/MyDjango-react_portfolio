from django.test import TestCase, Client
from django.urls import reverse

class HealthCheckTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_health_check_endpoint(self):
        """Test that the health check endpoint returns 200"""
        response = self.client.get(reverse('health'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'healthy')

    def test_api_root_endpoint(self):
        """Test that the API root endpoint returns 200"""
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('endpoints', response.json())
