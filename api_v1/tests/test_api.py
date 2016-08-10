# from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
import os

class UserRegister(APITestCase):

    def test_user_register(self):
        response = self.client.post('/api/v1/auth/register/',
            {'username': 'mr_nganya', 'email': 'mrnganya@gmail.com',
             'first_name': 'Mr', 'last_name': 'Nganya',
             'password': 'foobar', 'confirm_password': 'foobar'
             })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_no_matching_passwords(self):
        response = self.client.post('/api/v1/auth/register/',
                                    {'username': 'mr_nganya',
                                     'email': 'mrnganya@gmail.com',
                                     'first_name': 'Mr',
                                     'last_name': 'Nganya',
                                     'password': 'foobar',
                                     'confirm_password': 'foobars'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_fields(self):
        response = self.client.post('/api/v1/auth/register/',
                                    {'username': 'mr_nganya',
                                     'email': 'mrnganya@gmail.com',
                                     'last_name': 'Nganya',
                                     'password': 'foobar',
                                     'confirm_password': 'foobar'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class ImageActions(APITestCase):
    def setUp(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'mr_nganya',
                          'email': 'mrnganya@gmail.com',
                          'first_name': 'Mr',
                          'last_name': 'Nganya',
                          'password': 'foobar',
                          'confirm_password': 'foobar'})
        loginResponse = self.client.post('/api/v1/auth/login/',
                                    {'username': 'mr_nganya',
                                     'password': 'foobar', })
        self.authToken = loginResponse.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        with open('static/images/test_image.png') as image:
            self.imageResponse = self.client.post('/api/v1/images/',
                                                  {'folder_name': 'Test',
                                                   'original_image': image},
                                        format='multipart').data

    def test_image_upload(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        with open('static/images/test_image.png') as image:
            response = self.client.post('/api/v1/images/',
                                        {'folder_name': 'test Images',
                                         'original_image': image},
                                        format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_image_filter(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        response = self.client.put('/api/v1/images/' +
                                   str(self.imageResponse.get('id', 1)) + '/',
                                   {'filter_name': 'BLUR',
                                    'save_changes': 0})
        self.assertEqual(response.data['filter_name'], 'BLUR')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_save_image_filter(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        # Apply the filter
        self.client.put('/api/v1/images/' +
                        str(self.imageResponse.get('id', 1)) + '/',
                        {'filter_name': 'GRAYSCALE',
                         'save_changes': 0})
        response = self.client.put('/api/v1/images/' +
                                   str(self.imageResponse.get('id', 1)) + '/',
                                   {'save_changes': 1})
        self.assertEqual(response.data['filter_name'], 'NONE')
        self.assertEqual(response.data['filtered_image'], None)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_image_delete(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        response = self.client.delete('/api/v1/images/' +
                                   str(self.imageResponse.get('id', 1)) + '/',)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


    def test_unauthorised_access(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'khalwale',
                          'email': 'khalwale@gmail.com',
                          'first_name': 'Mr',
                          'last_name': 'khalwale',
                          'password': 'foobar',
                          'confirm_password': 'foobar'})
        loginResponse = self.client.post('/api/v1/auth/login/',
                                    {'username': 'khalwale',
                                     'password': 'foobar', })
        self.client.credentials(
            HTTP_AUTHORIZATION='JWT ' + loginResponse.data['token'])
        response = self.client.get('/api/v1/images/' +
                                   str(self.imageResponse.get('id', 1)) + '/',)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ThumnnailCreation(APITestCase):
    def setUp(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'mr_nganya',
                          'email': 'mrnganya@gmail.com',
                          'first_name': 'Mr',
                          'last_name': 'Nganya',
                          'password': 'foobar',
                          'confirm_password': 'foobar'})
        loginResponse = self.client.post('/api/v1/auth/login/',
                                    {'username': 'mr_nganya',
                                     'password': 'foobar', })
        self.authToken = loginResponse.data['token']

    def test_thumbnail_upload(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        with open('static/images/test_image.png') as thumb:
            response = self.client.post('/api/v1/thumbnails/',
                                        {'folder_name': 'test Images',
                                         'thumbnail': thumb},
                                        format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_empty_upload(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.authToken)
        response = self.client.post('/api/v1/thumbnails/',
                                    {'folder_name': 'test Images'},
                                    format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
