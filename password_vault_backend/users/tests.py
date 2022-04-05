from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import UserMpin, ContactUs
from .serializers import UserProfileAbstractSerializer, SignUpSerializer, \
    LoginSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from .utils import get_hash

instantiated_profile_class = UserProfileAbstractSerializer()
instantiated_signup_class = SignUpSerializer()
instantiated_login_class = LoginSerializer()
instantiated_forget_password_class = ForgotPasswordSerializer()
instantiated_reset_password_class = ResetPasswordSerializer()
instantiated_user_profile_class = ResetPasswordSerializer()
AYUSH_VERMA = "Ayush Verma"
AYUSH_EMAIL = "ayush.verma@dal.ca"
TEST_PASS = "Qwertyu@1234"


class UserProfileAbstractSerializerTestCase(TestCase):
    """
    Testing the common serializer to verify the input data

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_name_with_correct_arguments(self):
        t = instantiated_profile_class.validate_name(AYUSH_VERMA)
        self.assertEqual(t, "Ayush Verma")

    def test_validate_name_with_incorrect_arguments(self):
        t = instantiated_profile_class.validate_name(
            AYUSH_VERMA + "@$%&*($*#^#&$")
        self.assertNotEqual(t, AYUSH_VERMA)

    def test_validate_first_name_with_correct_argument(self):
        t = instantiated_profile_class.validate_first_name("Ayush")
        self.assertEqual(t, "Ayush")

    def test_validate_first_name_with_incorrect_argument(self):
        t = instantiated_profile_class.validate_first_name("Ayush@")
        self.assertNotEqual(t, "Ayush")

    def test_validate_last_name_with_correct_argument(self):
        t = instantiated_profile_class.validate_last_name("Verma")
        self.assertEqual(t, "Verma")

    def test_validate_last_name_with_incorrect_argument(self):
        t = instantiated_profile_class.validate_last_name("Verma@")
        self.assertNotEqual(t, "Verma")

    def test_validate_email_if_email_does_not_exist(self):
        t = instantiated_profile_class.validate_email(AYUSH_EMAIL)
        self.assertEqual(t, AYUSH_EMAIL)

    def test_validate_email_if_email_exist(self):
        instantiated_profile_class.validate_email = \
            MagicMock(side_effect=ValidationError('Account with this email '
                                                  'already exists'))
        self.assertRaises(ValidationError,
                          instantiated_profile_class.validate_email,
                          "dp974154@dal.ca")


class SignUpSerializerTest(TestCase):
    """
    Testing Serializer for Signup methods

    @author:Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_if_password_is_correct(self):
        serializer_object = ({
            'password': TEST_PASS,
            'confirm_password': TEST_PASS
        })

        self.assertEqual(instantiated_signup_class.validate(serializer_object),
                         serializer_object)

    def test_validate_if_password_is_incorrect(self):
        serializer_object = ({
            'password': TEST_PASS,
            'confirm_password': TEST_PASS + "23"
        })

        instantiated_signup_class.validate = MagicMock(
            side_effect=ValidationError('This should be same as password'))
        self.assertRaises(ValidationError, instantiated_signup_class.validate,
                          serializer_object)

    def test_create_user_success(self):
        serializer_object = ({
            'first_name': 'Ayush',
            'last_name': 'Verma',
            'email': AYUSH_EMAIL,
            'password': TEST_PASS
        })
        serializer_object_returned = {'password': TEST_PASS,
                                      'confirm_password': TEST_PASS}
        instantiated_signup_class.create = MagicMock(
            return_value=serializer_object_returned)
        self.assertEqual(instantiated_signup_class.create(serializer_object),
                         serializer_object_returned)

    def test_create_user_failure(self):
        serializer_object = ({
            'first_name': 'Ayush',
            'email': AYUSH_EMAIL,
            'password': TEST_PASS
        })
        instantiated_signup_class.create = MagicMock(
            side_effect=ValidationError('No last_name key present'))
        self.assertRaises(ValidationError, instantiated_signup_class.create,
                          serializer_object)


class LoginSerializerTest(TestCase):
    """
    Testing the Login serializer to verify the Login methods

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_unsuccessful_no_account(self):
        serializer_object = ({
            'email': 'Ayush',
            'password': 'john.doe@dal.ca',
            'token': TEST_PASS,
            'confirm_password': AYUSH_EMAIL
        })
        instantiated_login_class.validate = MagicMock(
            side_effect=ValidationError('this account does not exists'))
        with self.assertRaises(ValidationError):
            instantiated_login_class.validate(serializer_object)

    def test_validate_unsuccessful_wrong_password(self):
        serializer_object = ({
            'email': 'john.doe@dal.ca',
            'password': TEST_PASS,
            'token': 'ffnrfnfnn4nttnti5ntinfnnffnvvs',
            'confirm_password': 'eQwerty@1234'
        })
        instantiated_login_class.validate = MagicMock(
            side_effect=ValidationError('Please check your password'))
        with self.assertRaises(ValidationError):
            instantiated_login_class.validate(serializer_object)

    def test_validate_on_successful_login(self):
        serializer_object = ({
            'email': AYUSH_EMAIL,
            'password': TEST_PASS,
            'token': 'ffnrfnfnn4nttnti5ntinfnnffnvvs',
            'confirm_password': TEST_PASS
        })
        instantiated_login_class.validate = MagicMock(
            return_value=serializer_object)
        self.assertEqual(instantiated_login_class.validate(serializer_object),
                         serializer_object)


class ForgotPasswordSerializerTest(TestCase):
    """
    Testing Serializer for Signup methods

    @author:Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_email_unsuccess_email_does_not_exist(self):
        instantiated_forget_password_class.validate_email = MagicMock(
            side_effect=ValidationError(
                'Account with this email does not exists'))
        self.assertRaises(ValidationError,
                          instantiated_forget_password_class.validate_email,
                          AYUSH_EMAIL)

    def test_validate_email_success(self):
        valid_email = AYUSH_EMAIL
        instantiated_forget_password_class.validate_email = MagicMock(
            return_value=valid_email)
        self.assertEqual(
            instantiated_forget_password_class.validate_email(valid_email),
            valid_email)


class ResetPasswordSerializerTest(TestCase):
    """
    Testing Serializer for Signup methods

    @author:Ayush Verma <ayush.verma@dal.ca>
    """

    def test_validate_unsuccessful_no_otp(self):
        serializer_object = ({
            'user__email': AYUSH_EMAIL,
            'email': AYUSH_EMAIL,
            'token': 'ffnrfnfnn4nttnti5ntinfnnffnvvs',
            'confirm_password': TEST_PASS,
            'otp': 343333,
        })
        instantiated_reset_password_class.validate = MagicMock(
            side_effect=ValidationError('No record found'))
        self.assertRaises(ValidationError,
                          instantiated_reset_password_class.validate,
                          serializer_object)

    def test_validate_successful_reset_password(self):
        serializer_object = ({
            'user__email': AYUSH_EMAIL,
            'email': AYUSH_EMAIL,
            'token': 'ffnrfnfnn4nttnti5ntinfnnffnvvs',
            'confirm_password': TEST_PASS,
            'otp': 343333,
        })
        instantiated_reset_password_class.validate = MagicMock(
            return_value=serializer_object)
        self.assertEqual(
            instantiated_reset_password_class.validate(serializer_object),
            serializer_object)


class UtilTest(TestCase):
    """
    Testing the utilities  functionalities

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_get_random_number(self):
        # Check if method generates sufficient r
        t = get_hash([4, 4, 3, 5, 5, 2, 2, 4, 2332, 443])
        self.assertTrue(t)

    def test_get_hash(self):
        # Test the hash structure to verify if it's actually a SHA string
        t = get_hash("Hello from the other side")
        self.assertTrue(t)


class VerifyInformationTest(TestCase):
    """
    Testing the MPin functionality

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_UserMpin(self):
        # Verify the generated the MPin
        UserMpin.check_mpin = MagicMock(
            return_value=True)
        self.assertEqual(UserMpin.check_mpin("1234"), True)

    def test_save(self):
        saved_object = ({"name": "ayush verma", "mpin": 1234})
        UserMpin.save = MagicMock(
            return_value=saved_object)
        self.assertEqual(UserMpin.save(), saved_object)


class ContactUsTestCase(TestCase):
    """
    Testing the ContactUs functionality

    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_save(self):
        context_object = {'first_name': 'Ayush', 'last_name': 'Verma', 'email': 'ayush.verma@dal.ca',
                          'message': 'Hello from the other side'}
        ContactUs.save = MagicMock(
            return_value=True)
        self.assertEqual(ContactUs.save(context_object), True)
