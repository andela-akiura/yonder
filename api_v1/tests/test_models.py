from django.test import TestCase
from factories import ImageFactory, ThumbnailImageFactory, ThumbnailFilterFactory
from faker import Faker
from django.contrib.auth.models import User
fake = Faker()


class UserModelTest(TestCase):
    pass

class ImageModelTest(TestCase):
    def setUp(self):
        self.image = ImageFactory()

    def test_image_name(self):
        fake.seed(1738)
        self.assertEqual(self.image.image_name, fake.word())

    def test_filter_name_is_none(self):
        fake.seed(1738)
        self.assertEqual(self.image.filter_name, 'NONE')

    def test_created_by(self):
        self.assertEqual(self.image.created_by,
                         User.objects.get(username='fake'))


class ThumbImageModelTest(TestCase):
    def setUp(self):
        self.thumb = ThumbnailImageFactory()

    def test_thumbnail_name(self):
        self.assertEqual(
            self.thumb.thumbnail.name, 'images/thumbnails/example.jpg')


class ThumbFilterTest(TestCase):
    def setUp(self):
        self.thumb_filter = ThumbnailFilterFactory()

    def test_thumbnail_name(self):
        self.assertEqual(
            self.thumb_filter.filtered_thumbnail.name,
            'images/thumbnails/example.jpg')

    def test_filter_name(self):
        self.assertEqual(
            self.thumb_filter.filter_name, 'BLUR')
