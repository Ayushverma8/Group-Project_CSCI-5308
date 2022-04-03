from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel
import users.utils


class VerifyInformation(BaseModel):
    """
    Model to store the OTP verification upon forgot password

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verification_code = models.IntegerField()


class UserMpin(BaseModel):
    """
    Model to store the mpin

    @author: Manasvi Sharma <mn838732@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mpin = models.CharField(max_length=255, null=False, blank=False)
    is_authenticated = models.BooleanField(default=True)

    def check_mpin(self, data):
        """
        checks current mpin is same as given data string or not.

        @author: Deep Adeshra<dp974154@dal.ca>
        """

        hash = users.utils.get_hash(data)

        return hash == self.mpin

    def save(self, *args, **kwargs):
        """
        Override default save method to encrypt the user's MPIN

        @author: Manasvi Sharma <mn838732@dal.ca>
        """
        mpin_changed = False

        if self.id:
            db_obj = UserMpin.objects.get(id=self.id)
            mpin_changed = db_obj.mpin != self.mpin

        if mpin_changed or not self.id:
            self.mpin = users.utils.get_hash(self.mpin)

        return super().save(*args, **kwargs)


class ContactUs(BaseModel):
    """
    Model to store the details of users who contacted us.

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
