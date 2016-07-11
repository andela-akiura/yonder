from __future__ import unicode_literals  # pragma: no cover
from django.db import models  # pragma: no cover

FILTERS = (
    ('NONE', 'none',),
    ('BLUR', 'blur',),
    ('CONTOUR', 'contour',),
    ('DETAIL', 'detail'),
    ('EDGE_ENHANCE', 'enhance'),
    ('EMBOSS', 'emboss'),
    ('SMOOTH', 'smoothen'),
    ('SHARPEN', 'sharpen'),
    ('FLIP', 'flip'),
    ('GRAYSCALE ', 'grayscale'),
    ('FIND_EDGES', 'find edges'),
)


class Image(models.Model):
    """Model for the Image file."""

    original_image = models.ImageField(upload_to='images/', blank=False)
    filtered_image = models.ImageField(upload_to='images/filtered/',
                                       blank=True)
    created_by = models.CharField(max_length=100, blank=True, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    filter_name = models.CharField(max_length=100, choices=FILTERS,
                                   default='NONE')
    folder_name = models.CharField(max_length=100, blank=True, default='')


class ThumbnailImage(models.Model):
    """Model for the filter thumbnails."""
    thumbnail = models.ImageField(upload_to='images/thumbnails/', blank=False)
