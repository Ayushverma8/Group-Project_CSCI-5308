from rest_framework import viewsets
from rest_framework.response import Response

from . import serializers
from .models import Vault
from .utils import password_decrypt
from core.views import AuthRequiredView


class VaultViewSet(AuthRequiredView, viewsets.ModelViewSet):
    """
    ViewSet to perform operations related to the vault.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    http_method_names = ["post", "get", "patch", "delete"]
    serializer_class = serializers.VaultSerializer
    queryset = Vault.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.password = password_decrypt(instance.password, instance.encrypted_ciphertext, instance.encrypted_remainder)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)