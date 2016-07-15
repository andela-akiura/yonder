from __future__ import unicode_literals  # pragma: no cover
from django.db import models  # pragma: no cover
from custom_storage import CustomStorage

FILTERS = (
    ('NONE', 'none',),
    ('BLUR', 'blur',),
    ('CONTOUR', 'contour',),
    ('DETAIL', 'detail'),
    ('EDGE_ENHANCE', 'edge enhance'),
    ('EMBOSS', 'emboss'),
    ('SMOOTH', 'smoothen'),
    ('SHARPEN', 'sharpen'),
    ('FLIP', 'flip'),
    ('GRAYSCALE', 'grayscale'),
    ('FIND_EDGES', 'find edges'),
)
storage = CustomStorage()


class Image(models.Model):
    """Model for the Image file."""

    original_image = models.ImageField(upload_to='images/', blank=False)
    filtered_image = models.ImageField(upload_to='images/', blank=True)
    created_by = models.CharField(max_length=100, blank=True, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    filter_name = models.CharField(max_length=100, choices=FILTERS,
                                   default='NONE')
    folder_name = models.CharField(max_length=100, blank=True, default='')
    image_name = models.CharField(max_length=100, blank=True, default='')


class ThumbnailImage(models.Model):
    """Model for the parent thumbnails."""
    thumbnail = models.ImageField(upload_to='images/thumbnails/', blank=False)

class ThumbnailFilter(models.Model):
    """Model for the filtered thumbnails."""
    filtered = models.ImageField(upload_to='images/thumbnails/', blank=False)
    filter_name = models.CharField(max_length=100, choices=FILTERS,
                                   default='NONE')
    original = models.ForeignKey(ThumbnailImage, on_delete=models.CASCADE,
                                 related_name="filters")
