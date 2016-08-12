from factory.django import DjangoModelFactory, ImageField
from api_v1.models import Image, ThumbnailImage, ThumbnailFilter, Folder
from datetime import datetime
from faker import Faker
from django.contrib.auth.models import User
fake = Faker()
test_user = User.objects.create(username='fake', password='foobar')
test_folder = Folder.objects.create(
    folder_name='testing', created_by=test_user)

class ImageFactory(DjangoModelFactory):
    class Meta:
        model = Image

    original_image = ImageField()
    filtered_image = ImageField()
    fake.seed(1738)
    created_by = test_user
    filter_name = 'NONE'
    folder = test_folder
    fake.seed(1738)
    image_name = fake.word()
    fake.seed(1738)
    date_created = datetime(2016, 6, 12, 9, 30, tzinfo=None)
    fake.seed(1738)
    date_modified = datetime(2016, 6, 12, 9, 30, tzinfo=None)


class ThumbnailImageFactory(DjangoModelFactory):
    class Meta:
        model = ThumbnailImage

    thumbnail = ImageField(color='blue')

class ThumbnailFilterFactory(DjangoModelFactory):
    class Meta:
        model = ThumbnailFilter

    filtered_thumbnail = ImageField(color='blue')
    original_thumbnail = ThumbnailImageFactory()
    filter_name = 'BLUR'
