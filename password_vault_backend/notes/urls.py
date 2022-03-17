from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter

import note.views as views

router = DefaultRouter()

# rest_framework's ViewSet items will be set like this.
# router.register()

# views which are inheriting AbstractBaseAPIView, will have urls like this
url_patterns = [
    url(r'add/$', views.NoteListAndCreate.as_view(), name='add_and_get_note'),
    path(r'update/<uuid:id>/', views.NoteDetail.as_view(),name='update_and_delete_note'),
]

url_patterns += router.urls
