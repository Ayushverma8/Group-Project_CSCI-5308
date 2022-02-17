from rest_framework import viewsets
import vault.serializers as serializers
import vault.models as models


class TestView(viewsets.ModelViewSet):
    """
    TODO: remove this
    Test view created to test various rest framework functionalities

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    queryset = models.TestModel.objects.all()
    serializer_class = serializers.TestSerializer
