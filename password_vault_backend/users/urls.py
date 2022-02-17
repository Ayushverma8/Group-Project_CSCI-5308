from django.conf.urls import url
from rest_framework.routers import DefaultRouter

import users.views as views

router = DefaultRouter()


# rest_framework's ViewSet items will be set like this.
# router.register()

# views which are inheriting AbstractBaseAPIView, will have urls like this
url_patterns = [
    url(r'signup/$', views.SignUpView.as_view(), name='signup-view'),
]

url_patterns += router.urls
