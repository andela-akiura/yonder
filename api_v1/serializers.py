from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from models import Image, ThumbnailImage, ThumbnailFilter



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

    class Meta:
        model = Image
        fields = ('id', 'save_changes', 'filter_name', 'original_image',
                  'filtered_image', 'created_by', 'folder_name', 'image_name')

class ThumbnailFilterSerializer(serializers.ModelSerializer):
    filtered = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)

    filter_name = serializers.EmailField(max_length=100, required=True)

    class Meta:
        model = ThumbnailFilter
        fields = ('filtered', 'filter_name', 'original')


class ThumbnailImageSerializer(serializers.ModelSerializer):
    filters = ThumbnailFilterSerializer(many=True, read_only=True)
    thumbnail = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True)

    class Meta:
        model = ThumbnailImage
        fields = ('id', 'thumbnail', 'filters')
