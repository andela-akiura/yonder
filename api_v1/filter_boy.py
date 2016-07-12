"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter, ImageEnhance


class Filter():
    """Collection of methods to filter images."""

    def __init__(self):
        pass

    @staticmethod
    def blur(photo, name):
        """Apply the BLUR filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.BLUR)
        image.save(name)
        return photo

    @staticmethod
    def smooth(photo, name):
        """Apply the SMOOTH filter."""
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
        """Apply the DETAIL filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.DETAIL)
        image.save(name)
        return photo

    @staticmethod
    def contour(photo, name):
        """Apply the CONTOUR filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.CONTOUR)
        image.save(name)
        return photo

    @staticmethod
    def emboss(photo, name):
        """Apply the EMBOSS filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.EMBOSS)
        image.save(name)
        return photo

    @staticmethod
    def sharpen(photo, name):
        """Apply the SHARPEN filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.SHARPEN)
        image.save(name)
        return photo

    @staticmethod
    def find_edges(photo, name):
        """Apply the FIND_EDGES filter."""
        image = Image.open(photo)
        image = image.filter(ImageFilter.FIND_EDGES)
        image.save(name)
        return photo
