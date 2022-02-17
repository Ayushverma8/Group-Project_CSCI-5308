from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import views


class AuthRequiredView(object):
    """
    Base authentication class to be inherited in every view which required
    authenticated access.

    To access the resources which are inherited from this class, client needs
    to pass the authentication token in headers.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class AbstractBaseAPIView(views.APIView):
    """
    Base API view class to be inherited in entire application to remove the
    redundant code for validations of request body.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    class Meta:
        abstract = True

    def __init__(self, **kwargs):
        self.serializer = None
        super().__init__(**kwargs)

    def validate_request_data(self, request, **kwargs):
        """
        """

        if getattr(self, 'serializer_class') is None:
            return

        self.serializer = self.serializer_class(data=request.data)
        self.serializer.is_valid(raise_exception=True)

    def post(self, request, **kwargs):
        """
        """

        return self.validate_request_data(request, **kwargs)
