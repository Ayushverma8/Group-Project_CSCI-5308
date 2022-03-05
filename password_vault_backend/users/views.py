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

from .models import Verification


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

        core.helpers.send_email("signup.html", context,
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
        res = {'message': 'success', 'token': token.key}

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
        otp = Verification.objects.filter(email=request.data.get("email"))\
            .order_by('-created_at').first()
        context = {
            "otp": otp.verification_code
        }
        core.helpers.send_email('reset_password.html', context,
                                "Reset password request", otp.email)
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
        res = {'message': 'success'}
        return Response(res, HTTP_200_OK)


class LogOutView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    """
    Code to be run upon `post` request on this resource.It logs the user out.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post"]
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        """
        Removes token from the dababase and logout the user
        """

        Token.objects.filter(user=request.user).delete()
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
