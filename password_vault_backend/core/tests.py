from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

# Create your tests here.
from .helpers import *


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
        send_test_email = send_email(template_name, context, subject, email_address_to)
        self.assertEqual(send_test_email, True)

    def test_send_email_functionality_failure(self):
        email_address_to = "ayush.verma@dal.ca"
        subject = "Hello from other side"
        context = {"name": "Ayush Verma", "subject": "ASDC", "type": "Project"}
        send_email = MagicMock(side_effect=ValidationError('Template name not provided '
                                                           'with send email'))
        self.assertRaises(ValidationError, send_email)
