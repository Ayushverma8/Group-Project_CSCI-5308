from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class AuthRequiredView(object):
    """
    TODO: Add docstring
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

