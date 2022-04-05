import unittest
from unittest import mock

import requests


class SignUpFunctionality:
    def fetch_request_json(self, url):
        response = requests.get(url)
        return response.json()


def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            return self.json_data

    if args[0] == 'http://localhost:8000/signup/':
        return MockResponse({"action": "User Signup was successful"}, 200)
    elif args[0] == 'http://localhost:8000/login/':
        return MockResponse({"action": "User loggedIn successfully"}, 200)

    return MockResponse(None, 404)


# Our test case class
class SignUpFunctionalityTestCase(unittest.TestCase):

    # We patch 'requests.get' with our own method. The mock object is passed in to our test case method.
    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_signup_functionality(self, mock_get):
        # Assert requests.get calls
        mgc = SignUpFunctionality()
        json_data = mgc.fetch_request_json('http://localhost:8000/signup/')
        self.assertEqual(json_data, {"action": "User Signup was successful"})
        json_data = mgc.fetch_request_json('http://localhost:8000/not_found/')
        self.assertIsNone(json_data)

    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_login_functionality(self, mock_get):
        # Assert requests.get calls
        mgc = SignUpFunctionality()
        json_data = mgc.fetch_request_json('http://localhost:8000/login/')
        self.assertEqual(json_data, {"action": "User loggedIn successfully"})

    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_page_not_found_functionality(self, mock_get):
        # Assert requests.get calls
        mgc = SignUpFunctionality()
        json_data = mgc.fetch_request_json('http://localhost:8000/not_found/')
        self.assertIsNone(json_data)


if __name__ == '__main__':
    unittest.main()
