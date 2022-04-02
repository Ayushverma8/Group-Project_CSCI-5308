This directory is responsible for the overall management of notes feature including its creation, retrieval, updation,
deletion, API calls and Model formations.

Description of working of each of the Classes and Methods in this directory is provided as below:

1) class NotesConfig(AppConfig):
   The class initializes a notes model for the Application Configuration Object.

2) class Note(BaseModel):
   This class is responsible for determining the fields for the database model formation of the MySQL table
   responsible for storing the notes of the users.

3) class NoteSerializer(serializers.ModelSerializer):
   This class is responsible for validating notes and returning notes instances to users.
   a)def create(self, validated_data): It will take parameters to perform validation and return notes.

4) class NoteSerializerTest(TestCase):
   This class is responsible for performing method level testing on the Notes feature.

5) class NotesViewSet(AuthRequiredView, viewsets.ModelViewSet):
   It is responsible for making the API calls required to perform operations on the user's notes.
   It has following method to perform the tasks:
   a)def get_queryset(self): It retrieves notes to display based on the Id of the user.