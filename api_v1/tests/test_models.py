
from django.db import models
from django.test import TestCase
from factories import ImageFactory
from faker import Faker
fake = Faker()


class UserModelTest(TestCase):
    pass

class ImageModelTest(TestCase):
    def setUp(self):
        self.image = ImageFactory()

    def test_image_name(self):
        fake.seed(1738)
        self.assertEqual(self.image.image_name, fake.word())

class ThuImageModelTest(TestCase):
    pass
