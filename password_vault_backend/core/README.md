This directory includes low level code of the application here.
This directory acts as a basic building block upon which code from features is added to achieve required functionality.

Description of working of each of the Classes and Methods in this directory(along with file helpers.py) is provided as below:

1) class CoreConfig(AppConfig):
   This class initializes the core model for the Application Configuration Object.

2) class BaseModel(models.Model):
   This class is responsible for appending the fields created_at and modified_at in the database model
   formation of the MySQL table for added features.

3) class HelperMethodsTest(TestCase):
   This class is responsible for performing method level testing on the helper methods to send email and get site url.

4) class MpinAuthenticated(BasePermission):
   This class is responsible for ensuring that the user in the current session is whom the account belongs to.
   It has following methods to perform the tasks:
   a)def has_permission(self, request, view): This method checks MPIN to authenticate user.

5) class AuthRequiredView(object):
   This class is the primary class responsible to authenticate a user based upon which multiple functionalities
   can be implemented.

6) class AbstractBaseAPIView(views.APIView):
   This class performs validation of request body to eliminate code duplication in individual features.
   It has following methods to perform the tasks:
   a)def validate_request_data(self, request, **kwargs): This method validates requests from
   serializer class and forwards it to serializer.
   b)def post(self, request, **kwargs): This method validates the payload received from serializer request for POST API call.
   c)def patch(self, request, **kwargs): This method validates the payload received from serializer request for PATCH API call.

7) File helpers.py
   This file is responsible for performing the add-on tasks such as sending emails and retrieving hosted server url.
   It has following methods to perform the tasks:
   a)def send_email(template_name, context, subject, to_email): This method sends an email to authenticate user.
   b)def get_site_url(): This method retrieves the hosted server url for the current dev/staging/prod environment.
    


