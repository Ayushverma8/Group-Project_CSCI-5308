from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import *

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
    """

    http_method_names = ["post"]


class LogOutView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    """
    """

    http_method_names = ["post"]
