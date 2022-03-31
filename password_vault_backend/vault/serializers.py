from rest_framework import serializers
from tldextract import extract

from .models import Vault
from .utils import password_encrypt
from action_serializer import ModelActionSerializer
from vault import choices


class VaultSerializer(ModelActionSerializer):
    """
    Validate the data provided, encrypt the password and store it into the vault.
    """

    logo_url = serializers.CharField(required=False)

    class Meta:
        model = Vault
        exclude = ("created_by", "created_at", "modified_at",
                   "encrypted_ciphertext", "encrypted_remainder")
        action_fields = {
            'list': {'fields': ('id', 'website_url', 'website_name' , 'logo_url')},
        }

    def create(self, validated_data):
        """
        Creates new instance of the vault model and saved encrypted password.

        author: Pooja Anandani <pooja.anandani@dal.ca>
        """

        user = self.context['request'].user
        validated_data['created_by'] = user
        password, cypher, remainder = password_encrypt(validated_data['password'])
        validated_data['password'] = password
        validated_data['encrypted_ciphertext'] = cypher
        validated_data['encrypted_remainder'] = remainder

        return super(VaultSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        """
        Updates the instance of the vault model

        author: Pooja Anandani <pooja.anandani@dal.ca>
        """

        password, cypher, remainder = password_encrypt(validated_data['password'])
        instance.password = password
        instance.encrypted_ciphertext = cypher
        instance.encrypted_remainder = remainder
        instance.save()

        return instance
