import json

from django.test import Client, TestCase, override_settings

from .api import router
from users.models import User


@override_settings(STATIC_API_TOKEN="test_token")
class TestSignUp(TestCase):
    def setUp(self):
        self.client = Client(router)
        user = User.objects.create(username="test_existing_user")
        user.set_password("Test1234!")
        user.save()

    def test_should_be_able_to_signup(self):
        data = {
            "username": "test_user",
            "password": "Test1234!",
            "confirmPassword": "Test1234!",
        }
        response = self.client.post(
            "/api/signup", json.dumps(data), content_type="application/json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"id": 2, "username": "test_user"})

        with self.subTest("Should throw an error if existing username is submitted"):
            data = {
                "username": "test_user",
                "password": "Test1234!",
                "confirmPassword": "Test1234!",
            }
            response = self.client.post(
                "/api/signup", json.dumps(data), content_type="application/json"
            )
            self.assertEqual(response.status_code, 422)

    def test_signup_should_fail_if_passwords_dont_match(self):
        data = {
            "username": "test_user",
            "password": "Test1234!",
            "confirmPassword": "Test1234",
        }
        response = self.client.post(
            "/api/signup", json.dumps(data), content_type="application/json"
        )

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.json(), {"detail": "Passwords should match."})

    def test_should_login(self):
        data = {
            "username": "test_existing_user",
            "password": "Test1234!",
        }
        response = self.client.post(
            "/api/token/pair", json.dumps(data), content_type="application/json"
        )
        self.assertEqual(response.json()["username"], "test_existing_user")

        with self.subTest("Should be able to fetch user data"):
            access_token = response.json()["access"]
            response = self.client.get(
                "/api/me",
                headers={
                    "Authorization": f"Bearer {access_token}"
                }
            )
            self.assertEqual(response.json()["username"], "test_existing_user")

    def test_should_fail_login(self):
        data = {
            "username": "test_existing_user",
            "password": "Test1234",
        }
        response = self.client.post(
            "/api/token/pair", json.dumps(data), content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()["detail"], "No active account found with the given credentials")

