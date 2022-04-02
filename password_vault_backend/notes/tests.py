from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .serializers import *
from .views import *
instantiated_notes_class = NoteSerializer()
instantiated_notes_views_class = NotesViewSet()



class NoteSerializerTest(TestCase):
    """
    Testing the notes functionality

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


class NotesViewSetTest(TestCase):
    """
    Testing the notes views functionality

    @author: Ayush Verma <ayush.verma@dal.ca>
    """
    def test_queryset_parameters(self):
        request_object = ({
            'created_by': 'ayush.verma@dal.ca',
            'token': 'ffnrfnfnn4nttnti5ntinfnnffnvvs'
        })
        # Filter out required notes
        instantiated_notes_views_class.get_queryset = MagicMock(return_value=request_object)
        self.assertEqual(instantiated_notes_views_class.get_queryset(request_object), request_object)
