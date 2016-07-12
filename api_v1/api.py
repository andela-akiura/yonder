"""Endpoints to allow for user creation, image upload & filtering."""
from django.contrib.auth.models import User
from django.views.generic.base import TemplateView
from django.core.files import File
from models import Image, ThumbnailImage
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from serializers import UserSerializer, ImageSerializer
from filter_boy import Filter
import os


class UserCreateView(viewsets.ModelViewSet):
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
    permission_classes = (AllowAny,)

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
            return Response({'id': image.id,
                             'image_url': image.original_image.url,
                             'folder_name': image.folder_name},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'error':
                             'Image file not uploaded.'},
                            status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        filter_name = request.data.get('filter_name', 'NONE')
        image = Image.objects.get(pk=pk)
        image.filter_name = filter_name
        original = image.original_image
        name, extension = ''.join(original.file.name.split('.')[0:-1]), \
            '.' + ''.join(original.file.name.split('.')[-1])
        path = name + 'f' + extension
        if filter_name == 'BLUR':
            photo = Filter.blur(image.original_image, path)
        elif filter_name == 'SMOOTH':
            photo = Filter.smooth(image.original_image, path)
        elif filter_name == 'GRAYSCALE':
            photo = Filter.grayscale(image.original_image, path)
        elif filter_name == 'DETAIL':
            photo = Filter.detail(image.original_image, path)
        elif filter_name == 'CONTOUR':
            photo = Filter.contour(image.original_image, path)
        elif filter_name == 'EMBOSS':
            photo = Filter.emboss(image.original_image, path)
        elif filter_name == 'SHARPEN':
            photo = Filter.sharpen(image.original_image, path)
        elif filter_name == 'FIND_EDGES':
            photo = Filter.find_edges(image.original_image, path)
        elif filter_name == 'EDGE_ENHANCE':
            photo = Filter.edge_enhance(image.original_image, path)
        path = path.split('pixlr')[-1]
        image.filtered_image = path
        image.save()
        serializer = ImageSerializer(image)
        serializer = self.get_serializer(data=serializer.data)
        serializer.is_valid()
        return Response(serializer.data)
