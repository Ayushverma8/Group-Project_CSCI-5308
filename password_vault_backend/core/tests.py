from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .helpers import get_site_url


class HelperMethodsTest(TestCase):
    """
    Testing the core helper methods

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_send_email_functionality_success(self):
        email_address_to = "ayush.verma@dal.ca"
        subject = "Hello from other side"
        template_name = "test_template"
        context = {"name": "Ayush Verma", "subject": "ASDC", "type": "Project"}
        send_email = MagicMock(return_value=True)
        send_test_email = send_email(template_name, context, subject,
                                     email_address_to)
        self.assertEqual(send_test_email, True)

    def test_send_email_functionality_failure(self):
        send_email = MagicMock(
            side_effect=ValidationError('Template name not provided '
                                        'with send email'))
        self.assertRaises(ValidationError, send_email)

    def test_get_site_url_on_localhost(self):
        # Check for localhost environment
        self.assertEqual(get_site_url(), 'http://localhost:8000')

    def test_get_site_url_on_prod_machine(self):
        ROOT_URL = "13.2.3.2"
        # Check for localhost environment
        get_site_url = MagicMock(return_value=ROOT_URL)
        self.assertEqual(get_site_url(), ROOT_URL)
