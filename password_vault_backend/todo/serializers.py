from datetime import date
import re
from rest_framework import serializers
from django.utils.timezone import datetime

from todo.models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    end_date = serializers.DateField(format=None, input_formats=['%Y-%m-%d'],
                                     required=False)

    class Meta:
        model = ToDo
        exclude = ("created_by", "created_at", "modified_at")

    def validate_title(self, value):
        return value.strip()

    def create(self, validated_data):
        """

        @param validated_data: Data validate by the serializer
        @return: instance of todo object

        author: Pooja Anandani <pooja.anandani@dal.ca>
        """

        user = self.context['request'].user
        validated_data['created_by'] = user

        return super(ToDoSerializer, self).create(validated_data)
