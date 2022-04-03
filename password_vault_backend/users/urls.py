from django.conf.urls import url
from rest_framework.routers import DefaultRouter

import users.views as views

router = DefaultRouter()


# rest_framework's ViewSet items will be set like this.
router.register(viewset=views.ContactUsView, prefix='contact-us')

# views which are inheriting AbstractBaseAPIView, will have urls like this
url_patterns = [
    url(r'signup/$', views.SignUpView.as_view(), name='signup-view'),
    url(r'login/$', views.LoginView.as_view(), name='login-view'),
    url(r'forgot_password/$', views.ForgotPasswordView.as_view(), name='forgot_password'),
    url(r'reset_password/$', views.ResetPasswordView.as_view(), name='reset_password'),
    url(r'confirm_email/$', views.EmailConfirmationView.as_view(), name='confirm-email'),
    url(r'logout/$', views.LogOutView.as_view(), name='logout'),
    url(r'user_profile/$', views.UserProfileView.as_view(), name='logout'),
    url(r'validate_mpin/$', views.MPINValidationView.as_view(), name='mpin-validation'),
]

url_patterns += router.urls
