from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .serializers import *

instantianted_todo_class = ToDoSerializer()


class ToDoSerializerTest(TestCase):
    """
    Testing ToDo serializer to verify the task generation

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_title_correct(self):
        actual = instantianted_todo_class.validate_title("  Hello Hoomans   ")
        expexted = "Hello Hoomans"
        self.assertEqual(actual, expexted)

    def test_create_success(self):
        serializer_object = ({
            'first_name': 'Ayush',
            'last_name': 'Verma',
            'request': 'ayush.verma@dal.ca',
            'created_by': 'Ayush'
        })
        instantianted_todo_class.create = MagicMock(return_value=serializer_object)
        self.assertEqual(instantianted_todo_class.create(serializer_object), serializer_object)

    def test_create_failure(self):
        serializer_object = ({
            'first_name': 'Ayush',
            'last_name': 'Verma',
            'request': 'ayush.verma@dal.ca',
            'created_by': 'Ayush'
        })
        instantianted_todo_class.create = MagicMock(side_effect=ValidationError('Task not created successfully'))
        self.assertRaises(ValidationError, instantianted_todo_class.create, serializer_object)
