"""Endpoints to allow for user creation, image upload & filtering."""
from django.contrib.auth.models import User
from django.views.generic.base import TemplateView
from models import Image
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from serializers import UserSerializer, ImageSerializer


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
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (AllowAny,)

    def create(self, request):
        data = request.data
        image_name, image_file = data.get('image_name'), data.get('image_file')
        created_by = request.user.username if request.user.username else ''
        if image_file:
            image = Image.objects.create(image_name=image_name,
                                         image_file=image_file,
                                         created_by=created_by)
            return Response({'id': image.id,
                             'image_url': image.image_file.url,
                             'image_name': image.image_name},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'error':
                             'Image file not uploaded.'},
                            status=status.HTTP_400_BAD_REQUEST)
