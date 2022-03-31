import re
from xml import dom
import requests

from django.contrib.auth.models import User
from django.db import models
from tldextract import extract

from core.models import BaseModel
from vault import choices


class Vault(BaseModel):
    """
    Model to store the website specific password created by the users

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    website_name = models.CharField(max_length=250, null=False, blank=False)
    website_url = models.URLField(max_length=250, null=False, blank=False)
    website_username = models.CharField(max_length=250, null=False, blank=False)
    password = models.TextField(blank=False, null=False)
    encrypted_ciphertext = models.CharField(max_length=255, null=True, blank=True)
    encrypted_remainder = models.IntegerField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def logo_url(self):
        """
        Returns the logo of password's website by calling third party service

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        subdomain, domain, suffix = extract(self.website_url)
        request_url = "%s%s.%s" %(choices.LOGO_SERVICE_URL, domain, suffix)
        response = requests.get(request_url)

        if response.status_code == 404:
            return None

        return request_url
