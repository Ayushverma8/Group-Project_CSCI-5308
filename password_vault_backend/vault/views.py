from rest_framework import viewsets

from django.db.models import Q
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
        return super(VaultViewSet, self).get_queryset()\
            .filter(Q(created_by=user) |
                    Q(shared_with=user))

    def create(self, request, *args, **kwargs):
        """
        Responsible for creating new object in DB.
        """
        
        response = super().create(request, *args, **kwargs)
        response.data['password'] = None

        return response
