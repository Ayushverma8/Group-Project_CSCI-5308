from rest_framework import serializers
import vault.models


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = vault.models.TestModel
        fields = ('test_text', )
