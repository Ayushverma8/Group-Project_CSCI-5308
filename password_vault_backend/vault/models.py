import requests

from django.contrib.auth.models import User
from django.db import models
from tldextract import extract

from core.models import BaseModel
from vault import choices
from .utils import password_decrypt, password_encrypt
import users.utils


class Vault(BaseModel):
    """
    Model to store the website specific password created by the users

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    website_name = models.CharField(max_length=250, null=False, blank=False)
    website_url = models.URLField(max_length=250, null=False, blank=False)
    website_username = models.CharField(max_length=250, null=False,
                                        blank=False)
    password = models.TextField(blank=False, null=False)
    encrypted_ciphertext = models.CharField(max_length=255, null=True,
                                            blank=True)
    encrypted_remainder = models.IntegerField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    shared_with = models.ManyToManyField(User, related_name='shared_with')

    def logo_url(self):
        """
        Returns the logo of password's website by calling third party service

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        subdomain, domain, suffix = extract(self.website_url)
        request_url = "%s%s.%s" % (choices.LOGO_SERVICE_URL, domain, suffix)
        response = requests.get(request_url)

        if response.status_code == 404:
            return None

        return request_url

    def password_pwned(self):
        """
        Checks that the password is is pwned or not, so that we can suggest user
        to change the password

        @author: Deep Adeshra <do974154@dal.ca>
        """

        password = password_decrypt(self.password,
            self.encrypted_ciphertext, self.encrypted_remainder)
        hash = users.utils.get_hash(password)

        req_url = "%s%s" % (choices.PASSWORD_PWNED_API, hash[:5])

        response = requests.get(req_url)
        data = response.text.split('\n')

        for item in data:
            half_hash, occurance = item.split(':')
            full_hash = "%s%s" % (hash[:5], half_hash)

            if full_hash.upper() == hash.upper():
                return True

        return False

    def save(self, *args, **kwargs):
        """
        Override save method to add the ciphertect and remainder

        @author: Deep Adeshra <dp974154@dal.ca>
        """

        password, cypher, remainder = password_encrypt(self.password)
        self.password = password
        self.encrypted_ciphertext = cypher
        self.encrypted_remainder = remainder

        return super().save(*args, **kwargs)
