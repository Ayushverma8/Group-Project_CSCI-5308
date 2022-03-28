from unittest.mock import Mock

from django.test import TestCase

from .serializers import *


class UserProfileAbstractSerializerTestCase(TestCase):
    """
    Testing the common serializer to verify the input data

    @author: Ayush Verma <ayush.verma@dal.ca>
    """


    def test_validate_name_with_correct_arguments(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_name("Ayush Verma")
        self.assertEqual(t, "Ayush Verma")

    def test_validate_name_with_incorrect_arguments(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_name("Ayush Verma@$%&*($*#^#&$")
        self.assertNotEqual(t, "Ayush Verma")

    def test_validate_first_name_with_correct_argument(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_first_name("Ayush")
        self.assertEqual(t, "Ayush")

    def test_validate_first_name_with_incorrect_argument(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_first_name("Ayush@")
        self.assertNotEqual(t, "Ayush")

    def test_validate_last_name_with_correct_argument(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_last_name("Verma")
        self.assertEqual(t, "Verma")

    def test_validate_last_name_with_incorrect_argument(self):
        instantiated_profile_class = UserProfileAbstractSerializer()
        t = instantiated_profile_class.validate_last_name("Verma@")
        self.assertNotEqual(t, "Verma")
