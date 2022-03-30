from rest_framework import serializers
from .models import Vault
from .utils import password_encrypt


class VaultSerializer(serializers.ModelSerializer):
    """
    Validate the data provided, encrypt the password and store it into the vault.

    author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    class Meta:
        model = Vault
        exclude = ("created_by", "created_at", "modified_at",
                   "encrypted_ciphertext", "encrypted_remainder")

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['created_by'] = user
        password, cypher, remainder = password_encrypt(validated_data['password'])
        validated_data['password'] = password
        validated_data['encrypted_ciphertext'] = cypher
        validated_data['encrypted_remainder'] = remainder

        return super(VaultSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        password, cypher, remainder = password_encrypt(validated_data['password'])
        instance.password = password
        instance.encrypted_ciphertext = cypher
        instance.encrypted_remainder = remainder
        instance.save()

        return instance
