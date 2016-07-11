"""Modifies the django file saving mechanism."""

from django.core.files.storage import FileSystemStorage


class CustomStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        return name
