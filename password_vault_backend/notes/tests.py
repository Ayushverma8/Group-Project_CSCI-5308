from django.core.exceptions import ValidationError
from django.test import TestCase
from .serializers import *
from unittest.mock import MagicMock

instantiated_note_serializer = NoteSerializer()


class NoteSerializerTestCase(TestCase):

    def test_create_successful(self):
        serializer_object = ({
            'id': 43333,
            'title': 'Laundry at 6pm',
            'text': 'Get loonies and do the laundry at 6pm',
            'last_name' : 'Verma'
        })
        instantiated_note_serializer.create = MagicMock(side_effect=ValidationError("This should be same as password"))
        self.assertRaises(instantiated_note_serializer.create(), serializer_object)
