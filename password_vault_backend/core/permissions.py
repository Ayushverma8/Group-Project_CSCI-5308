from re import I
from xml.dom import ValidationErr
from django.forms import ValidationError
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.exceptions import APIException
from rest_framework.status import *

import users.models

class MpinAuthenticated(BasePermission):
    """
    Custom class to authenticate user only if he has entered correct MPIN for
    current session

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    def has_permission(self, request, view):
        """
        Checks MPIN object of current user is authenticated or not.
        """

        is_authenticated = super().has_permission(request, view)

        if not is_authenticated:
            return False

        mpin_instance = users.models.UserMpin.objects.get(user=request.user)
        return mpin_instance.is_authenticated
