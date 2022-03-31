import re

from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers

<<<<<<< HEAD
from users.models import UserMpin, VerifyInformation
import users.utils
=======
from users.models import VerifyInformation, Media
>>>>>>> 86bad92 (profile-picture-upload)


class UserProfileAbstractSerializer(serializers.Serializer):
    """
    Common serializer used for the validating user profile related data

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    class Meta:
        abstract = True

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

        if not self.context.get('request'):
            user_exists = User.objects.filter(email=email).exists()
        else:
            user_exists = User.objects.filter(email=email) \
                .exclude(id=self.context['request'].user.id).exists()

        if user_exists:
            raise serializers.ValidationError("Account with this email "
                                              "already exists")

        return email


class SignUpSerializer(UserProfileAbstractSerializer):
    """
    Serializer for signup body

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)
    confirm_password = serializers.CharField(min_length=6)
    mpin = serializers.IntegerField()

    def validate(self, data):
        """
        This method validates entire JSON body.
        """

<<<<<<< HEAD
=======
        if not data['mpin']:
            raise serializers.ValidationError({
                "message": "Please enter mpin"
            })
>>>>>>> 86bad92 (profile-picture-upload)
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': "This should be same as password"
            })

        return data

    def validate_mpin(self, pin):
        if len(str(pin)) != 4:
            raise serializers.ValidationError("Make sure it is of 4 digits")

        return pin

    @transaction.atomic
    def create(self, validated_data):
        """
        Creates the User instance based on passed data.
        """

        user = User()
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.username = validated_data['email']
        user.email = validated_data['email']
        user.is_active = False
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
        mpin_instance = UserMpin(mpin=validated_data["mpin"],
                                 user=token.user)
        mpin_instance.save()

        return token


class LoginSerializer(serializers.Serializer):
    """
    Serializer for signin body

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = User,
        fields = ('email', 'password')
        read_only_fields = ['token']

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = User.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError({
                "email": "this account does not exists"
            })

        is_valid = user.check_password(password)

        if not is_valid:
            raise serializers.ValidationError({
                "password": "Please check your password."
            })

        return data


class ForgotPasswordSerializer(serializers.Serializer):
    """
    Serializer for Forgot Password

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    email = serializers.EmailField()

    def validate_email(self, email):
        """
        validates if there is any existing account with the passed email or not.
        """

        user = User.objects.filter(email=email).last()

        if user:
            one_time_verification = users.utils.get_random_number(6)
            data = VerifyInformation(user=user, verification_code=one_time_verification)
            data.save()
        else:
            raise serializers.ValidationError("Account with this email "
                                              "does not exists")

        return email


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for Resetting the password

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    email = serializers.EmailField()
    otp = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        """
        validates if there is any existing account with the passed email or not.
        """

        try:
<<<<<<< HEAD
            user_otp = VerifyInformation.objects.filter(user__email=data.get('email'))\
=======
            user_otp = Verification.objects.filter(user__email=data.get('email')) \
>>>>>>> 86bad92 (profile-picture-upload)
                .order_by('-created_at').first()

            if user_otp.verification_code == data.get('otp'):
                user = User.objects.get(email=data.get('email'))
                user.set_password(data.get('password'))
                user.save()
                user_otp.delete()
            else:
                raise serializers.ValidationError({"otp": "No record found"})
        except:
            raise serializers.ValidationError({"otp": "No record found"})

        return data


class UserProfileSerializer(UserProfileAbstractSerializer):
    """
    Serializer that is resposible for updating/fetching user profile

    @author: Deep Adeshra<dp974154@dal.ca>
    """

    first_name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=25)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, required=False)


class MPINValidateSerializer(serializers.Serializer):
    """
    Serializer to validate the MPIN

    @author: Deep Adeshra<dp974154@dal.ca>
    """

    mpin = serializers.CharField()

    def validate_mpin(self, data):
        """
        Validates the mpin and returns bad request if not validated
        """

        if len(data) != 4:
            raise serializers.ValidationError("Make sure it is of 4 length only")

        user = self.context['request'].user
        mpin_instance = UserMpin.objects.get(user=user)

        if not mpin_instance.check_mpin(data):
            raise serializers.ValidationError("Make sure it is correct one")

        return data
    media = serializers.URLField()


class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        exclude = ("user", "created_at", "modified_at")

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super(UserMediaSerializer, self).create(validated_data)
