from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import viewsets, generics
import os
import pandas as pd
import pdfkit
from datetime import datetime

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .models import Vault
from .utils import password_decrypt, generate_secure_output

from core.views import AuthRequiredView
from core.helpers import send_email


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

        
class ExportViewSet(AuthRequiredView, APIView):
    """
    Generating encrypted file with user password details.

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """
    def get(self, request, *args, **kwargs):
        config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
        data = pd.DataFrame(columns=['website_url', 'website_username', 'password'])
        qs = Vault.objects.filter(created_by=self.request.user)
        for q in range(0, len(qs)):
            password = password_decrypt(qs[q].password, qs[q].encrypted_ciphertext, qs[q].encrypted_remainder)
            data.loc[q] = [qs[q].website_url, qs[q].website_username, password]
        filename = self.request.user.last_name + str(datetime.now()) + ".html"
        pdf_filename = self.request.user.last_name + str(datetime.now()) + ".pdf"
        df = pd.DataFrame(data)
        df.to_html(filename)
        pdfkit.from_file(filename, pdf_filename, configuration=config)
        pdf_pass, byte_string = generate_secure_output(pdf_filename)
        os.remove(filename)
        context = {
            "user": self.request.user,
            "password": pdf_pass

        }

        send_email("file_password.html", context, "Secure File Password", self.request.user.email)
        return Response({'message': 'success', 'file': byte_string})
