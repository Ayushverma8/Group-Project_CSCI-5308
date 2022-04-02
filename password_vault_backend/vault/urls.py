from rest_framework.routers import DefaultRouter
from django.conf.urls import url
import vault.views as view

router = DefaultRouter()
router.register(viewset=view.VaultViewSet, prefix='vault')

# ViewSet items will be set like this.

url_patterns = [
    url(r'users/', view.SharableUserView.as_view(), name='users'),
    url(r'export/$', view.ExportViewSet.as_view(), name='export'),
]

url_patterns += router.urls
