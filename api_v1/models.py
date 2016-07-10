from __future__ import unicode_literals  # pragma: no cover
from django.db import models  # pragma: no cover

FILTERS = (
    ('none', 'NONE'),
    ('blur', 'BLUR'),
    ('contour', 'CONTOUR'),
    ('detail', 'DETAIL'),
    ('enhance', 'EDGE_ENHANCE'),
    ('emboss', 'EMBOSS'),
    ('smoothen', 'SMOOTH'),
    ('sharpen', 'SHARPEN'),
    ('flip', 'FLIP'),
    ('grayscale', 'GRAYSCALE '),
    ('find edges', 'FIND_EDGES'),
)
    

class Image(models.Model):
    """Model for the Image file."""

    image_file = models.ImageField(upload_to='images/', blank=False)
    image_url = models.URLField(max_length=250)
    created_by = models.CharField(max_length=100, blank=True, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    image_name = models.CharField(max_length=100, blank=True, default='')
    folder_name = models.CharField(max_length=100, blank=True, default='')


class FilteredImage(models.Model):
    """Model for filtered images."""

    original_image = models.ForeignKey(Image, on_delete=models.CASCADE,
                                       related_name="filtered_images")
    filter_name = models.CharField(max_length=100, choices=FILTERS)
    image_file = models.ImageField(upload_to='images/', blank=False)


class ThumbnailImage(FilteredImage):
    """Model for the filter thumbnails."""
    pass
