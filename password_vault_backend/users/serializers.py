import re

from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers


class SignUpSerializer(serializers.Serializer):
    """
    Serializer for signup body

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)
    confirm_password = serializers.CharField(min_length=6)

    def validate(self, data):
        """
        This method validates entire JSON body.
        """

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': "This should be same as password"
            })

        return data

    def validate_name(self, value):
        """
        validates name of user. Name should be alpha-numaric only.
        """

        regex = "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"

        if re.fullmatch(re.compile(regex), value):
            raise serializers.ValidationError("Please enter only alpha "
                                              "numerical names")

        return value

    def validate_first_name(self, value):
        return self.validate_name(value)

    def validate_last_name(self, value):
        return self.validate_name(value)

    def validate_email(self, email):
        """
        validates if there is any existing account with the passed email or not.
        """

        user_exists = User.objects.filter(email=email).exists()

        if user_exists:
            raise serializers.ValidationError("Account with this email "
                                              "already exists")

        return email

    @transaction.atomic()
    def create(self, validated_data):
        """
        Creates the User instance based on passed data.
        """

        # TODO: by default create the users inactive and send the email to
        #  verify them

        user = User()
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.username = validated_data['email']
        user.email = validated_data['email']
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)

        return token


class LoginSerializer(serializers.Serializer):
    pass


class LogOutSerializer(serializers.Serializer):
    pass