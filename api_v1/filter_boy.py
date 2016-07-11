"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter


class Filter():
    """Collection of methods to filter images."""

    def __init__(self):
        pass

    @staticmethod
    def blur(photo, name):
        """Return a blurred image."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.BLUR)
        image.save(name)
        return photo
