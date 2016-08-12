"""Modifies the django file saving mechanism."""

from django.conf import settings  # pragma: no cover
from storages.backends.s3boto import S3BotoStorage  # pragma: no cover
from boto import connect_s3  # pragma: no cover
import mimetypes  # pragma: no cover


class MediaStorage(S3BotoStorage): # pragma: no cover
    """Override default storage to use cloudfront instead of Amazon S3 urls."""

    def __init__(self, *args, **kwargs):
        kwargs['custom_domain'] = settings.AWS_CLOUDFRONT_DOMAIN
        super(MediaStorage, self).__init__(*args, **kwargs)


class AmazonStorage:
    """Class with helper methods to manage file manipulation on AWS S3."""

    def __init__(self): # pragma: no cover
        pass  # pragma: no cover

    @staticmethod
    def upload_to_amazons3(path, data_file):
        """Upload data file to key <path>."""
        try:
            conn = connect_s3(settings.AWS_S3_ACCESS_KEY_ID,
                                   settings.AWS_S3_SECRET_ACCESS_KEY)
            bucket = conn.get_bucket(settings.AWS_STORAGE_BUCKET_NAME,
                                     validate=False)
            node = bucket.new_key(path)
            content_type = mimetypes.guess_type(path)[0]
            node.set_metadata('Content-Type', content_type)
            node.set_contents_from_string(data_file.getvalue())
            node.set_acl("public-read")
            return {'status': 'Success'}
        except Exception as e:
            return {'status': 'Failure',
                    'error': e.message}
