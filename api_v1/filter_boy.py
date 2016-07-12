"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter, ImageEnhance


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

    @staticmethod
    def smooth(photo, name):
        """Return a smoothened image."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.SMOOTH)
        image.save(name)
        return photo

    @staticmethod
    def grayscale(photo, name):
        """Return a black & white image."""
        image = Image.open(photo)
        enhancer = ImageEnhance.Color(image)
        image = enhancer.enhance(0.0)
        image.save(name)
        return photo

    @staticmethod
    def detail(photo, name):
        """Enhance the detail on an image."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.DETAIL)
        image.save(name)
        return photo

    @staticmethod
    def contour(photo, name):
        """Enhance the detail on an image."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.CONTOUR)
        image.save(name)
        return photo
