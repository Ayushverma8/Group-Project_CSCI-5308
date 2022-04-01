This directory is responsible for the overall management of to-do lists including its creation, retrieval, updation,
deletion, API calls and Model formations.

Description of working of each of the Classes and Methods in this directory is provided as below:

1) class TodoConfig(AppConfig):
   The class initializes a todo model for the Application Configuration Object.

2) class ToDo(BaseModel):
   This class is responsible for determining the fields for the database model formation of the MySQL table
   responsible for storing the todo lists of the users along with specifying the priorities of lists.

3) class ToDoSerializer(serializers.ModelSerializer):
   This class is responsible for validating todo lists and returning todo instances to users.
   It has following methods to perform the tasks:
   a)def validate_title(self, value): It will take input a value to validate it.
   b)def create(self, validated_data): It will take validated data as input to return instance of todo object.

4) class ToDoSerializerTest(TestCase):
   This class is responsible for performing method level testing on the operations of the todo lists.

5) class ToDoViewSet(AuthRequiredView, viewsets.ModelViewSet):
   It is responsible for making the API calls required to perform operations for the todo lists.
   It has following method to perform the tasks:
   a)def get_queryset(self):
   It retrieves todo lists to display based on the Id of the user as well as its priority.
