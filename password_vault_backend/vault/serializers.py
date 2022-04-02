from operator import is_
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Vault
from .utils import password_decrypt
from action_serializer import ModelActionSerializer


class UserSerializer(ModelActionSerializer):
    """
    Serializer for Many to many field `shared_with`. Sends user related data
    list in response.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        is_user = ""

        if instance == self.context['request'].user:
            is_user= "(You)"

        data['full_name'] = "%s %s %s" % (data['first_name'],
                                          data['last_name'], is_user)

        return data


class VaultSerializer(ModelActionSerializer):
    """
    Validate the data provided, encrypt the password and store it into the
    vault.
    """

    logo_url = serializers.CharField(required=False)
    password_pwned = serializers.BooleanField(required=False)
    shared_with = UserSerializer(many=True, required=False,
                                 read_only=True)
    shared_with_ids = serializers\
        .PrimaryKeyRelatedField(queryset=User.objects.all(),
                                write_only=True, many=True, required=False)
    owner = serializers.SerializerMethodField()

    class Meta:
        model = Vault
        exclude = ("created_by", "created_at", "modified_at",
                   "encrypted_ciphertext", "encrypted_remainder")
        action_fields = {
            'list': {'fields': ('id', 'website_url', 'website_name',
                                'logo_url', 'password_pwned')},
        }

    def create(self, validated_data):
        """
        Creates new instance of the vault model and saved encrypted password.

        @author: Pooja Anandani <pooja.anandani@dal.ca>
        """

        user = self.context['request'].user
        validated_data['created_by'] = user
        validated_data.pop('password_pwned', None)
        shared_with_users = validated_data.pop('shared_with_ids', [])
        instance = super(VaultSerializer, self).create(validated_data)
        instance = self.set_shared_with(instance, shared_with_users)

        return instance

    def update(self, instance, validated_data):
        """
        Updates the password vault instance. Override to change the M2M data
        `shared_with` objects.

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        shared_with_users = validated_data.pop('shared_with_ids', [])
        instance = super(VaultSerializer, self).update(instance, validated_data)
        instance = self.set_shared_with(instance, shared_with_users)

        return instance

    def set_shared_with(self, instance, shared_with_users):
        """
        Common method for setting `shared_with` objects. Used in creation and
        updation of the password vault instance.

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        user = self.context['request'].user
        shared_with_users = list(filter(lambda a: a.id != user.id,
                                        shared_with_users))
        instance.shared_with.set(shared_with_users)

        return instance

    def to_representation(self, instance):
        """
        Converts ORM data to JSON object to send in the response.

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        data = super().to_representation(instance)

        # Decrypt the password to send in response.
        password = password_decrypt(instance.password,
                                    instance.encrypted_ciphertext,
                                    instance.encrypted_remainder)

        data.update({
            'password': password
        })

        return data

    def get_owner(self, instance):
        """
        Returns true if the object is created by requested user otherwise false.
        """

        user = self.context['request'].user

        return instance.created_by == user
