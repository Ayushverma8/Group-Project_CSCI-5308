from rest_framework import serializers

from todo.models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        exclude = ("created_by", "created_at", "modified_at")

    def create(self, validated_data):
        """

        @param validated_data: Data validate by the serializer
        @return: instance of todo object

        author: Pooja Anandani <pooja.anandani@dal.ca>
        """

        user = self.context['request'].user
        validated_data['created_by'] = user

        return super(ToDoSerializer, self).create(validated_data)
