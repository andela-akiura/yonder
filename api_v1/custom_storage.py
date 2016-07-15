"""Modifies the django file saving mechanism."""

from boto.s3.key import Key
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import boto
import mimetypes

class CustomStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        return name


class AmazonStorage:
    """Class with helper methods to manage file manipulation on AWS S3."""
    def __init__(self):
        pass

    @staticmethod
    def upload_to_amazons3(path, data_file):
        """Upload data file to key <path>."""
        try:
            conn = boto.connect_s3(settings.AWS_S3_ACCESS_KEY_ID,
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
