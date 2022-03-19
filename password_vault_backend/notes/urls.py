from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter

import notes.views as views

router = DefaultRouter()

# rest_framework's ViewSet items will be set like this.
router.register(viewset=views.NotesViewSet, prefix='notes')

# views which are inheriting AbstractBaseAPIView, will have urls like this
url_patterns = []

url_patterns += router.urls
