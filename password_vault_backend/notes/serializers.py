from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer notes body

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """
    class Meta:
        model = Note
        fields = ('id', 'title', 'text')
