"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter


class Filter():
    """Collection of methods to filter images."""

    def __init__(self):
        pass

    def blur(self, filter_name, photo):
        """Return a blurred image."""
        image = Image.open(photo)
        name = image.filename
        image.filter(ImageFilter.BLUR)
        image.save(name)
        return photo
