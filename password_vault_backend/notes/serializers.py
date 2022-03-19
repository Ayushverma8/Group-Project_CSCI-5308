from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer not body

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """

    class Meta:
        model = Note
        fields = ('id', 'title', 'text')

    def create(self, validated_data):
        """

        @param validated_data: Data validate by the serializer
        @return: instance of notes object
        """

        user = self.context['request'].user
        validated_data['created_by'] = user

        return super(NoteSerializer, self).create(validated_data)
