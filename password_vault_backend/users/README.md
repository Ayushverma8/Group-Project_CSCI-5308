This directory is responsible for managing the workflow of User Management including registration,
login, editing profile and sign out.

Description of working of each of the Classes and Methods in this directory (along with file utils.py) is provided as below:

1) class UsersConfig(AppConfig):
   The class initializes a users model for the Application Configuration Object.

2) class VerifyInformation(BaseModel):
   This class is used to create a model to store OTP verification when user requests forgot password.

3) class UserMpin(BaseModel):
   This class is used to create a model to store MPin of user.
   It has following methods to perform the tasks:
   a)def check_mpin(self, data):  This method is used to verify the user's mpin.
   b)def save(self, *args, **kwargs): This method is used to encrypt the user's mpin.

4) class UserProfileAbstractSerializer(serializers.Serializer):
   This class acts as a common serializer for validating user information.
   It has following methods to perform the tasks:
   a)def validate_name(self, value): This method is used to validate the user name.
   b)def validate_first_name(self, value): This method is used to validate the user first name.
   c)def validate_last_name(self, value): This method is used to validate the user last name.
   d)def validate_email(self, email): This method is used to validate the user email.

5) class SignUpSerializer(UserProfileAbstractSerializer):
   This class acts as a serializer for user sign up.
   It has following methods to perform the tasks:
   a)def validate(self, data):  This method validates the JSON body.
   b)def validate_mpin(self, pin): This method validates the JSON MPin.
   c)def create(self, validated_data): This method creates a user instance based on the value of parameters.

6) class LoginSerializer(serializers.Serializer):
   This class acts as a serializer for user login.
   It has following methods to perform the tasks:
   a)def validate(self, data): This method is used to authenticate the user.

7) class ForgotPasswordSerializer(serializers.Serializer):
   This class acts as a serializer for forgot password.
   It has following methods to perform the tasks:
   a)def validate_email(self, email): This method will validate the user's email to ensure authenticity.

8) class ResetPasswordSerializer(serializers.Serializer):
   This class acts as a serializer for resetting password.
   It has following methods to perform the tasks:
   a)def validate(self, data): This method will perform the otp validation.

9) class UserProfileSerializer(UserProfileAbstractSerializer):
   This class acts as a serializer for updating/fetching the user's profile.

10) class MPINValidateSerializer(serializers.Serializer):
    This class acts as a serializer to validate the user's MPin.
    It has following methods to perform the tasks:
    a)def validate_mpin(self, data): This method validates the user's MPin and returns bad request if not validated.

11) class UserProfileAbstractSerializerTestCase(TestCase):
    This class acts as a common serializer to test input data.

12) class SignUpSerializerTest(TestCase):
    This class acts as a serializer to test signup methods.

13) class LoginSerializerTest(TestCase):
    This class acts as a serializer to test login methods.

14) class ForgotPasswordSerializerTest(TestCase):
    This class acts as a serializer to test signup methods.

15) class ResetPasswordSerializerTest(TestCase):
    This class acts as a serializer to test signup methods.

16) class utilTest(TestCase):
    This class is used to test utilities functionalities.

17) class SignUpView(core.views.AbstractBaseAPIView):
    This class is responsible for making the API calls required to perform operations for signup.
    It has the following methods to perform the tasks:
    a)def post(self, request, **kwargs): This method returns authentication token for the new user.

18) class LoginView(core.views.AbstractBaseAPIView):
    This class is responsible for making the API calls required to perform operations for login.
    It has the following methods to perform the tasks:
    a)def post(self, request, **kwargs): This method returns authentication token for the user logged in.

19) class ForgotPasswordView(core.views.AbstractBaseAPIView):
    This class acts as a viewset to perform forgot password action on user.
    It has the following methods to perform the tasks:
    a)def post(self, request, **kwargs):  This method sends an email to the user for forgot password.

20) class ResetPasswordView(core.views.AbstractBaseAPIView):
    This class acts as a viewset to perform reset password action on user.
    It has the following methods to perform the tasks:
    a)def post(self, request, **kwargs): This method returns authentication token for the user that is logged in.

21) class LogOutView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    This class acts as a viewset to perform reset password action on user.
    It has the following methods to perform the tasks:
    a)def post(self, request, **kwargs): This method logs the user out.

22) class EmailConfirmationView(View):
    This class acts as a viewset to confirm email after sign up.
    It has the following methods to perform the tasks:
    a)def get(self, request, *args, **kwargs): This method validates token from the url to make the user account active.

23) class MPINValidationView(core.views.AbstractBaseAPIView):
    This class acts as a viewset to validate and perform operations on MPin.
    It has the following methods to perform the tasks:
    a)def post(self, request, *args, **kwargs): This method is used to validate the user's MPin.
    b)def get(self, request, *args, **kwargs): This method is used to confirm if the user validated MPin.
    c)def patch(self, request, *args, **kwargs): This method is used to send MPin in email.

24) class UserProfileView(core.views.AuthRequiredView, core.views.AbstractBaseAPIView):
    This class acts as a viewset to retrieve and update the user profile.
    It has the following methods to perform the tasks:
    a)def get(self, request, *args, **kwargs): This method is used to return requested user profile.
    b)def patch(self, request, *args, **kwargs): This method is used to update user profile.

25) File utils.py:
    This file is responsible for providing random and hash values.
    It has the following methods to perform the tasks:
    a)def get_random_number(digits): This method is used to return a random number based on the input.
    b)def get_hash(data): This method is used to return a hash for given data string.
