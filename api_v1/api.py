"""Endpoints to allow for user creation, image upload & filtering."""
from custom_storage import AmazonStorage as store
from django.contrib.auth.models import User
from django.core.files.storage import default_storage as storage
from models import Image, ThumbnailImage, ThumbnailFilter
from random import randint
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from serializers import UserSerializer, ImageSerializer, \
    ThumbnailImageSerializer
from filter_boy import filters, filter_names
import cStringIO
import os


class UserCreateView(viewsets.ModelViewSet):
    """Create new users."""
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def create(self, request):
        data = request.data
        username, email = data.get('username'), data.get('email')
        password, confirm_password = data.get('password'),\
            data.get('confirm_password')
        if password == confirm_password:
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                User.objects.create_user(username=username, password=password,
                                         email=email)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            else:
                return Response({'error':
                                 'The email was not valid.'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'The passwords do not match'},
                            status=status.HTTP_400_BAD_REQUEST)


class ImageView(viewsets.ModelViewSet):
    """
    Upload and access images.

    URL:
        /api/v1/images/

    Methods:
        GET, PUT, POST
    """

    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        """Upload Images."""
        data = request.data
        folder_name, original_image = data.get('folder_name'), \
            data.get('original_image')
        created_by = request.user.username if request.user.username else ''
        if original_image:
            image = Image.objects.create(folder_name=folder_name,
                                         original_image=original_image,
                                         created_by=created_by)
            original = image.original_image
            file_name, extension = os.path.splitext(original.name)
            path = file_name + extension
            large_img = storage.open(original.name, 'r')
            small_img = cStringIO.StringIO()
            small_img = filters.get('COMPRESS')(large_img, small_img)
            store.upload_to_amazons3(path, small_img)
            small_img.close()
            image_name = 'images/' + os.path.basename(path)
            image.original_image = image_name
            image.image_name = os.path.basename(image.original_image.file.name)
            image.save()
            return Response({'id': image.id,
                             'image_url': image.original_image.url,
                             'image_name': image.image_name,
                             'folder_name': image.folder_name},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'error':
                             'Image file not uploaded.'},
                            status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        filter_name = request.data.get('filter_name', 'NONE')
        save_changes = request.data.get('save_changes', 0)
        image = Image.objects.get(pk=pk)
        image.filter_name = filter_name
        original, filtered = image.original_image, image.filtered_image
        name, extension = os.path.splitext(original.name)
        path = name + str(randint(0, 9)) + extension

        if int(save_changes) == 1:
            image.original_image = image.filtered_image
            image.filtered_image = None
            image.filter_name = 'NONE'
        else:
            old_image = storage.open(original.name, 'r')
            temp_image = cStringIO.StringIO()
            temp_image = filters.get(filter_name)(old_image, temp_image)
            store.upload_to_amazons3(path, temp_image)
            temp_image.close()
            old_image.close()
            image.filtered_image = 'images/' + os.path.basename(path)
            image.save()
        serializer = ImageSerializer(image)
        serializer = self.get_serializer(data=serializer.data)
        serializer.is_valid()
        return Response(serializer.data)

class ThumbnailView(viewsets.ModelViewSet):
    queryset = ThumbnailImage.objects.all()
    serializer_class = ThumbnailImageSerializer
    permissions_classes = (IsAuthenticated,)

    def create(self, request):
        """Upload image to generate thumbnails."""
        data = request.data
        thumbnail = data.get('thumbnail')
        if thumbnail:
            thumb_image = ThumbnailImage.objects.create(thumbnail=thumbnail)
            # create filters
            original = thumb_image.thumbnail
            for filter_name in filter_names:
                file_name, extension = os.path.splitext(original.name)
                path = file_name + filter_name + extension
                old_thumb = storage.open(original.name, 'r')
                temp_thumb = cStringIO.StringIO()
                temp_thumb = filters.get(filter_name)(old_thumb, temp_thumb)
                store.upload_to_amazons3(path, temp_thumb)
                temp_thumb.close()
                thumb_name = 'images/thumbnails/' + os.path.basename(path)
                ThumbnailFilter.objects.create(filtered=thumb_name,
                                               filter_name=filter_name,
                                               original=thumb_image)
                updated_thumb = ThumbnailImage.objects.get(pk=thumb_image.id)
                serializer = ThumbnailImageSerializer(updated_thumb)
                serializer = self.get_serializer(data=serializer.data)
                serializer.is_valid()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'error':
                             'Image file not uploaded.'},
                            status=status.HTTP_400_BAD_REQUEST)
