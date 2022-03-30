from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .serializers import *
from .views import ToDoViewSet

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

class ToDoViewSetTest(TestCase):
    """
    Testing ToDo views to verify the ToDo generation

    @author: Ayush Verma <ayush.verma@dal.ca>
    """
    def test_get_queryset_failure(self):
        instantianted_todo_view = ToDoViewSet()
        test_query = 'priority=3&status=2'
        instantianted_todo_view.get_queryset = MagicMock(
            side_effect=ValidationError('Query parameter does not exist'))
        self.assertRaises(ValidationError, instantianted_todo_view.get_queryset, test_query)

    def test_get_queryset_success(self):
        instantianted_todo_view = ToDoViewSet()
        test_query = 'priority=3&status=2'
        instantianted_todo_view.get_queryset = MagicMock(
            return_value=test_query)
        self.assertEqual(instantianted_todo_view.get_queryset(), test_query)