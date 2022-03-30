from rest_framework.routers import DefaultRouter

import vault.views as view

router = DefaultRouter()
router.register(viewset=view.VaultViewSet, prefix='vault')


# ViewSet items will be set like this.

url_patterns = []

url_patterns += router.urls
