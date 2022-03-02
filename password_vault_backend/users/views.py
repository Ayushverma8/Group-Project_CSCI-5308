from django.contrib.auth import logout
from django.contrib.auth.models import User

from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import *
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authtoken.models import Token

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
        res = {'message': 'success', 'token': token.key}
        # html_message = render_to_string('welcome.html')
        # plain_message = strip_tags(html_message)
        # send_mail('Welcome To Password Vault', plain_message, settings.EMAIL_HOST_USER,
        #           ["poojaa358@gmail.com"], html_message=html_message)

        return Response(res, HTTP_201_CREATED)


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
        token = Token.objects.get_or_create(user=user)[0]
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
        otp = Verification.objects.get(email=request.data.get("email"))
        html_message = render_to_string('reset_password.html', context={
            "site_name": "password_vault",
            "otp": otp.verification_code
        })
        plain_message = strip_tags(html_message)
        send_mail('Reset Password Request', plain_message, settings.EMAIL_HOST_USER,
                  [otp.email], html_message=html_message)
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
        logout(request)
        return Response("User Logged out successfully")
