from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import viewsets, generics

from . import serializers
from .models import Vault
from core.views import AuthRequiredView


class VaultViewSet(AuthRequiredView, viewsets.ModelViewSet):
    """
    ViewSet to perform operations related to the vault.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post", "get", "patch", "delete"]
    serializer_class = serializers.VaultSerializer
    queryset = Vault.objects.all()

    def get_queryset(self):
        """
        Returns current user's passwords only
        """

        user = self.request.user
        qs = super(VaultViewSet, self).get_queryset()

        if self.request.method == 'GET':
            return qs.filter(Q(created_by=user) |
                             Q(shared_with=user))
        else:
            return qs.filter(created_by=user)

    def create(self, request, *args, **kwargs):
        """
        Responsible for creating new object in DB.
        """

        response = super().create(request, *args, **kwargs)
        response.data['password'] = None

        return response


class SharableUserView(AuthRequiredView, generics.ListAPIView):
    """
    View to get shareable users on the platform.
    """

    http_method_names = ["get"]
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    
    def get_queryset(self):
        """
        Returns users based on the query parameters passed.
        """

        query = self.request.GET.get('query')
        qs = super(SharableUserView, self).get_queryset()\
            .exclude(id=self.request.user.id)

        if '@' in query:
            filters = Q(email__istartswith=query)
        elif ' ' in query:
            first_name = query.split(' ')[0]
            last_name = query.split(' ', 1)[1]

            filters = Q(first_name__istartswith=first_name,
                        last_name__istartswith=last_name)
        else:
            filters = Q(Q(first_name__istartswith=query) |
                        Q(last_name__istartswith=query))

        return qs.filter(filters)
