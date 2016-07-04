from factory import Factory, SubFactory
from api_v1.models import User
from datetime import datetime

class UserFactory(Factory):
    class Meta:
        model = User

    username = 'matwana'
    password = 'chachisha'
    email = 'mwatwana@gmail.com'
