from rest_framework.routers import DefaultRouter
from django.conf.urls import url
import vault.views as view

router = DefaultRouter()
router.register(viewset=view.VaultViewSet, prefix='vault')

url_patterns = [
    url(r'users/', view.SharableUserView.as_view(), name='users')
]

url_patterns += router.urls
