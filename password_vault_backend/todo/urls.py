from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter

import todo.views as views

router = DefaultRouter()

# rest_framework's ViewSet items will be set like this.
router.register(viewset=views.ToDoViewSet, prefix='todo')

# views which are inheriting AbstractBaseAPIView, will have urls like this
url_patterns = []

url_patterns += router.urls
