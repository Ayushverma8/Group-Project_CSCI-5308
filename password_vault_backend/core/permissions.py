import users.models
from rest_framework.permissions import IsAuthenticated


class MpinAuthenticated(IsAuthenticated):
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
        print(mpin_instance)
        return mpin_instance.is_authenticated
