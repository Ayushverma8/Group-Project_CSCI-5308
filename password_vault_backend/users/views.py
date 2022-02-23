from django.contrib.auth import logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import *
from django.conf import settings
import mailchimp_marketing as MailchimpMarketing


import core.views
import users.serializers as serializers


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
        token = self.serializer.validated_data
        res = {'message': 'success', 'token': token}
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
        mailchimp = MailchimpMarketing.Client.set_config(settings.MAIL_CHIMP_API_KEY, settings.MAIL_CHIMP_SERVER_PREFIX)


class ResetPasswordView(core.views.AbstractBaseAPIView):
    """
           ViewSet to perform reset password action on user. Allows only post method.

           @author: Pooja Anandani <pooja.anandani@dal.ca>

       """
    http_method_names = ["post"]
    permission_classes = [AllowAny]
    serializer_class = serializers.ForgotPasswordSerializer

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



