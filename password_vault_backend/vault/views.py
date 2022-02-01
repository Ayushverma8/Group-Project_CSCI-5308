from rest_framework import viewsets
import vault.serializers as serializers
import vault.models as models


class TestView(viewsets.ModelViewSet):
    """
    Test view created to test various rest framework functionalities
    """

    queryset = models.TestModel.objects.all()
    serializer_class = serializers.TestSerializer
