from hashlib import md5

from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.views import View
from django.shortcuts import render

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.authtoken.models import Token

import core.helpers
import core.views
import users.serializers as serializers
import users.utils

from .models import VerifyInformation, UserMpin
from vault.utils import password_encrypt


class SignUpView(core.views.AbstractBaseAPIView):
    """
    ViewSet to perform signup action on user. Allows only post method.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    http_method_names = ["post"]
    permission_classes = [AllowAny]
    serializer_class = serializers.SignUpSerializer

    def post(self, request, **kwargs):
        """
        Code to be run upon `post` request on this resource.
        Returns authentication token for the new user in response.
        """

        super(SignUpView, self).post(request, **kwargs)
        token = self.serializer.save()
        context = {
            "user": token.user,
            "url": "%s/confirm_email?token=%s" %
                   (core.helpers.get_site_url(), token.key)
        }
        core.helpers.send_email("email.html", context,
                                "Welcome to password vault", token.user.email)

        return Response({'message': 'success', 'token': token.key},
                        HTTP_201_CREATED)


class LoginView(core.views.AbstractBaseAPIView):
    """
    ViewSet to perform signup action on user. Allows only post method.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post"]
    permission_classes = [AllowAny]
    serializer_class = serializers.LoginSerializer

    def post(self, request, **kwargs):
        """
        Code to be run upon `post` request on this resource.
        Returns authentication token for the user that logged in.
        """

        super(LoginView, self).post(request, **kwargs)
        user = User.objects.get(email=request.data.get('email'))
        token, _ = Token.objects.get_or_create(user=user)

        res = {
            'message': 'success',
            'token': token.key,
            'user': {
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }

        return Response(res, HTTP_200_OK)


class ForgotPasswordView(core.views.AbstractBaseAPIView):
    """
    ViewSet to perform forgot password action on user. Allows only post method.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post"]
    permission_classes = [AllowAny]
    serializer_class = serializers.ForgotPasswordSerializer

    def post(self, request, **kwargs):
        """
        Code to be run upon `post` request on this resource.
        Send email to the specific user.
        """

        super(ForgotPasswordView, self).post(request, **kwargs)
        otp = VerifyInformation.objects.filter(
            user__email=request.data.get("email")).order_by('-created_at').first()
        context = {
            "otp": otp.verification_code,
            "user": otp.user
        }
        core.helpers.send_email('reset_password.html', context,
                                "Reset password request", otp.user.email)
        res = {"message": "success"}

        return Response(res, HTTP_200_OK)


class ResetPasswordView(core.views.AbstractBaseAPIView):
    """
    ViewSet to perform reset password action on user. Allows only post method.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post"]
    permission_classes = [AllowAny]
    serializer_class = serializers.ResetPasswordSerializer

    def post(self, request, **kwargs):
        """
        Code to be run upon `post` request on this resource.
        Returns authentication token for the user that logged in.
        """

        super(ResetPasswordView, self).post(request, **kwargs)

        user = User.objects.get(email=request.data.get('email'))
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        res = {'message': 'success', 'token': token.key}
        return Response(res, HTTP_200_OK)


class LogOutView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    """
    Code to be run upon `post` request on this resource.It logs the user out.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post"]

    def post(self, request, **kwargs):
        """
        Removes token from the dababase and logout the user
        """

        UserMpin.objects.filter(user=request.user)\
            .update(is_authenticated=False)
        Token.objects.filter(user=request.user).delete()
        UserMpin.objects.filter(user=request.user)
        logout(request)

        return Response({"message": "success"}, HTTP_200_OK)


class EmailConfirmationView(View):
    """
    View to confirm email after signup

    @author: Deep Adeshra <dp974154@gmail.com>
    """

    http_method_names = ["get"]

    def get(self, request, *args, **kwargs):
        """
        Validates token from the url and make the user account active
        """

        key = request.GET.get('token')
        validated = False

        token = Token.objects.filter(key=key).first()

        if token:
            user = token.user
            user.is_active = True
            user.save()
            validated = True

        context = {
            "validated": validated
        }

        return render(request, 'confirm_email.html', context)


class MPINValidationView(core.views.AbstractBaseAPIView):
    """
    View to validate the MPIN

    @author: Deep Adeshra <dp974154@gmail.com>
    """

    http_method_names = ["post", "get", "patch"]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MPINValidateSerializer

    def post(self, request, *args, **kwargs):
        """
        Validates the user's mpin
        """

        super().post(request, *args, **kwargs)
        mpin_instance = UserMpin.objects.get(user=request.user)
        mpin_instance.is_authenticated = True
        mpin_instance.save(update_fields=['is_authenticated'])

        return Response({"message": "success"}, HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        """
        Returns true if current user has validated his mPIn
        """

        user = request.user
        mpin_instance = UserMpin.objects.filter(user=user).first()

        response = {
            "validated": mpin_instance and mpin_instance.is_authenticated
        }

        return Response(response, HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Responsible for sending MPIN in email upon requested from `forgot mpin`
        """

        user = request.user
        mpin = users.utils.get_random_number(4)
        mpin_instance = UserMpin.objects.get(user=user)
        mpin_instance.mpin = str(mpin)
        mpin_instance.save()

        context = {
            "mpin": mpin,
            "user": user
        }
        core.helpers.send_email('reset_mpin.html', context,
                                "Reset MPIN request", user.email)

        return Response({"Message": "Kindly check your email"}, HTTP_200_OK)


class UserProfileView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    """
    View to get and update the user profile after logging in.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    http_method_names = ["get", "patch"]
    serializer_class = serializers.UserProfileSerializer

    def get(self, request, *args, **kwargs):
        """
        Returns user profile of requested user
        """

        user = request.user

        data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'id': user.id
        }

        return Response(data, HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Responsible for updating user profile
        """

        super(UserProfileView, self).patch(request, *args, **kwargs)
        user = request.user
        validated_data = self.serializer.validated_data
        email_changed = False
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']

        if user.email != validated_data['email']:
            # user.is_active = False
            user.email = validated_data['email']
            email_changed = True

        if validated_data.get('password'):
            user.set_password(validated_data['password'])

        user.save()

        if email_changed:
            token, _ = Token.objects.get_or_create(user=user)

            context = {
                "user": token.user,
                "url": "%s/confirm_email?token=%s" %
                       (core.helpers.get_site_url(), token.key),
                "email_changed": True
            }

            core.helpers.send_email("signup.html", context,
                                    "Please confirm your email",
                                    token.user.email)
        response_data = {
            "message": "success",
            "email_changed": email_changed
        }

        return Response(response_data, HTTP_200_OK)
