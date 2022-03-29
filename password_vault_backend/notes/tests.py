from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .serializers import *

instantiated_notes_class = NoteSerializer()


class NoteSerializerTest(TestCase):
    """
    Testing the c

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_success_create(self):
        serializer_object = ({
            'id': 4333,
            'title': 'Pickup laundry',
            'text': 'Pickup laundry from Spring graden at 6pm',
            'password': 'Qwerty@1234'
        })
        instantiated_notes_class.create = MagicMock(return_value=serializer_object)
        self.assertEqual(instantiated_notes_class.create(serializer_object), serializer_object)

    def test_failed_create(self):

        serializer_object_unformatted = ({
            'id': 4333,
            'title': 'Pickup laundry',
            'text': 'Pickup laundry from Spring graden at 6pm',
            'password': 'Qwerty@1234',
            'request': 'internal',
            'created_by': 'Ayush'
        })
        instantiated_notes_class.create = MagicMock(side_effect=ValidationError('No '))
        self.assertRaises(ValidationError, instantiated_notes_class.create, serializer_object_unformatted)
