from __future__ import unicode_literals  # pragma: no cover
from django.db import models  # pragma: no cover


class Image(models.Model):
    """Model for the Image file."""

    image_file = models.ImageField(upload_to='images/', blank=False)
    image_url = models.URLField(max_length=250)
    created_by = models.CharField(max_length=100, blank=True, default='')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    image_name = models.CharField(max_length=100, blank=True, default='')
    folder_name = models.CharField(max_length=100, blank=True, default='')
