from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from models import Image, ThumbnailImage, ThumbnailFilter, Folder



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100, required=True)
    username = serializers.CharField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=100,
                                     style={'input_type': 'password'},
                                     required=True, write_only=True)
    confirm_password = serializers.CharField(max_length=100,
                                             style={'input_type': 'password'},
                                             required=True, write_only=True)

    def validate(self, data):
        try:
            validate_email(data['email'])
            return data
        except ValidationError:
            raise serializers.ValidationError('The email is invalid.')

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password',
                  'confirm_password')


class SocialUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',)


class ImageSerializer(serializers.ModelSerializer):
    original_image = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)
    filtered_image = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)
    save_changes = serializers.IntegerField(max_value=1, min_value=0,
                                            required=False)
    created_by = SocialUserSerializer(required=True)

    class Meta:
        model = Image
        fields = ('id', 'save_changes', 'filter_name', 'date_created',
                  'date_modified', 'original_image', 'filtered_image',
                  'created_by', 'image_size', 'image_name')


class FolderSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    created_by = SocialUserSerializer(required=True)

    class Meta:
        model = Folder
        fields = ('id', 'folder_name', 'created_by', 'images',)


class ThumbnailFilterSerializer(serializers.ModelSerializer):
    filtered_thumbnail = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)

    filter_name = serializers.EmailField(max_length=100, required=True)

    class Meta:
        model = ThumbnailFilter
        fields = ('filtered_thumbnail', 'filter_name', 'original_thumbnail')


class ThumbnailImageSerializer(serializers.ModelSerializer):
    filters = ThumbnailFilterSerializer(many=True, read_only=True)
    thumbnail = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)

    class Meta:
        model = ThumbnailImage
        fields = ('id', 'thumbnail', 'filters')
