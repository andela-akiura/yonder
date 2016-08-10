from factory import Factory, SubFactory
from factory.django import DjangoModelFactory, ImageField
from api_v1.models import Image, ThumbnailImage, ThumbnailFilter
from datetime import datetime
from faker import Faker
fake = Faker()
fake.seed(1738)


class ImageFactory(DjangoModelFactory):
    class Meta:
        model = Image

    original_image = ImageField()
    filtered_image = ImageField()
    created_by = fake.name()
    filter_name = 'NONE'
    folder_name = 'Testing'
    fake.seed(1738)
    image_name = fake.word()
    fake.seed(1738)
    date_created = fake.date_time()
    fake.seed(1738)
    date_modified = fake.date_time()


class ThumbnailImageFactory(DjangoModelFactory):
    class Meta:
        model = ThumbnailImage

    thumbnail = ImageField(color='blue')
