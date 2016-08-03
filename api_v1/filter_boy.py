"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter, ImageEnhance


class Filter():
    """Collection of methods to filter images."""

    def __init__(self):
        pass

    @staticmethod
    def blur(old_photo, new_photo):
        """Apply the BLUR filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.BLUR)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def compress(old_photo, new_photo):
        """Apply the BLUR filter."""
        image = Image.open(old_photo)
        image.save(new_photo, "JPEG", optimize=True, quality=40)
        return new_photo

    @staticmethod
    def smooth(old_photo, new_photo):
        """Apply the SMOOTH filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.SMOOTH)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def grayscale(old_photo, new_photo):
        """Return a black & white image."""
        image = Image.open(old_photo)
        enhancer = ImageEnhance.Color(image)
        image = enhancer.enhance(0.0)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def detail(old_photo, new_photo):
        """Apply the DETAIL filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.DETAIL)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def contour(old_photo, new_photo):
        """Apply the CONTOUR filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.CONTOUR)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def emboss(old_photo, new_photo):
        """Apply the EMBOSS filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.EMBOSS)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def sharpen(old_photo, new_photo):
        """Apply the SHARPEN filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.SHARPEN)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def find_edges(old_photo, new_photo):
        """Apply the FIND_EDGES filter."""
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.FIND_EDGES)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def edge_enhance(old_old_photo, new_photo):
        """Apply the EDGE_ENHANCE filter."""
        image = Image.open(old_old_photo)
        image = image.filter(ImageFilter.EDGE_ENHANCE)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def flip(old_old_photo, new_photo):
        """Flip the photo by 180 degrees."""
        image = Image.open(old_old_photo)
        image = image.transpose(Image.ROTATE_180)
        image.save(new_photo, "JPEG")
        return new_photo

filters = {
    'BLUR': Filter.blur,
    'CONTOUR': Filter.contour,
    'DETAIL': Filter.detail,
    'EDGE_ENHANCE': Filter.edge_enhance,
    'EMBOSS': Filter.emboss,
    'SMOOTH': Filter.smooth,
    'SHARPEN': Filter.sharpen,
    'GRAYSCALE': Filter.grayscale,
    'FIND_EDGES': Filter.find_edges,
    'COMPRESS': Filter.compress,
    'FLIP': Filter.flip,
}

filter_names = ['BLUR', 'CONTOUR', 'DETAIL', 'EDGE_ENHANCE', 'EMBOSS',
                'SMOOTH', 'SHARPEN', 'GRAYSCALE', 'FIND_EDGES', 'COMPRESS',
                'FLIP']
