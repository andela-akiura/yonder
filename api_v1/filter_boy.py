"""Helper module to apply filters to images."""

from PIL import Image, ImageFilter, ImageEnhance


class Filter():
    """Collection of methods to filter images."""

    def __init__(self):  # pragma: no cover
        """Empty init."""
        pass

    @staticmethod
    def blur(old_photo, new_photo):
        """Apply the the BLUR filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.BLUR)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def compress(old_photo, new_photo):
        """Compress an image.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    compressed image.

        Returns:
            new_photo: A file object of the compressed image.
        """
        image = Image.open(old_photo)
        image.save(new_photo, "JPEG", optimize=True, quality=40)
        return new_photo

    @staticmethod
    def smooth(old_photo, new_photo):
        """Apply the SMOOTH filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.SMOOTH)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def grayscale(old_photo, new_photo):
        """Create a black and white version of an image.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A black and white image.
        """
        image = Image.open(old_photo)
        enhancer = ImageEnhance.Color(image)
        image = enhancer.enhance(0.0)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def detail(old_photo, new_photo):
        """Apply the DETAIL filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.DETAIL)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def contour(old_photo, new_photo):
        """Apply the CONTOUR filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.CONTOUR)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def smooth_more(old_photo, new_photo):
        """Apply the SMOOTH_MORE filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.SMOOTH_MORE)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def sharpen(old_photo, new_photo):
        """Apply the SHARPEN filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.SHARPEN)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def find_edges(old_photo, new_photo):
        """Apply the FIND_EDGES filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_photo)
        image = image.filter(ImageFilter.FIND_EDGES)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def edge_enhance(old_old_photo, new_photo):
        """Apply the EDGE_ENHANCE filter.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    filtered image.

        Returns:
            new_photo: A file object of the filtered image.
        """
        image = Image.open(old_old_photo)
        image = image.filter(ImageFilter.EDGE_ENHANCE)
        image.save(new_photo, "JPEG")
        return new_photo

    @staticmethod
    def flip(old_old_photo, new_photo):
        """Rotate a photo by 180 degress.

        Args:
            old_photo (File): The uploaded photo.
            new_photo (StringIO): A file like object which stores the newly
                                    rotated image.

        Returns:
            new_photo: A file object of the rotated image.
        """
        image = Image.open(old_old_photo)
        image = image.transpose(Image.ROTATE_180)
        image.save(new_photo, "JPEG")
        return new_photo

filters = {
    'BLUR': Filter.blur,
    'CONTOUR': Filter.contour,
    'DETAIL': Filter.detail,
    'EDGE_ENHANCE': Filter.edge_enhance,
    'SMOOTH_MORE': Filter.smooth_more,
    'SMOOTH': Filter.smooth,
    'SHARPEN': Filter.sharpen,
    'GRAYSCALE': Filter.grayscale,
    'FIND_EDGES': Filter.find_edges,
    'COMPRESS': Filter.compress,
    'FLIP': Filter.flip,
}
