# KHALI
A photo editing application.

[![Build Status](https://travis-ci.org/andela-akiura/khali.svg?branch=feature-review)](https://travis-ci.org/andela-akiura/khali)
[![Coverage Status](https://coveralls.io/repos/github/andela-akiura/khali/badge.svg?branch=feature-review)](https://coveralls.io/github/andela-akiura/khali?branch=feature-review)

## What is it?

An App that helps a user upload, edit, save and share their favorite photos.

Khali edits photos by applying filters to images. Available filters include:

* BLUR
* CONTOUR
* DETAIL
* EDGE_ENHANCE
* SMOOTH_MORE
* SMOOTH
* SHARPEN
* GRAYSCALE
* FIND_EDGES
* COMPRESS
* FLIP

You can test the app [here](http://khali.herokuapp.com)
## The Latest Version
This app Version 1.0 (the first version).

## Documentation
Documentation is available [here](http://khali.herokuapp.com/docs/)

## Project Plan
You can check the project plan [here](https://github.com/andela-akiura/khali/blob/feature-review/assets/PROJECTPLAN.md)

## Installation
Clone the repo
```
git clone https://github.com/andela-akiura/khali.git
```

Navigate to the root folder
```
cd khali
```
Install the necessary packages
```
pip install -r requirements.txt
```
Setup the database:
* Install PgAdmin
* Create a database with a user called `heavy_machinery`

Perform migrations by running:
* `python manage.py makemigrations`
* `python manage.py migrate`

Setup a Facebook app for authorization:
* Create a Facebook app and get the Id and Secret key [here](https://developers.facebook.com/apps/)

Setup an Amazon s3 account for storage
* [Create a bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/CreatingaBucket.html)
* Create a new user [here](https://console.aws.amazon.com/iam/home?#users).
* Click "Manage access keys".
* Download the credentials for the access key created.
* Create a bucket policy for your newly created bucket.

Create a .env.yml in the root directory to hold the environment variables.
```
AWS_S3_SECRET_ACCESS_KEY:
  "Your Amazon S3 Secret Key"
AWS_S3_ACCESS_KEY_ID:
  "Your Amazon S3 Access Key ID"
AWS_STORAGE_BUCKET_NAME:
  "Your bucket name"
FB_KEY:
  "Your Facebook app ID"
FB_SECRET:
  "Your Facebook Secret Key"
```

Start the development server by running `python manage.py runserver`


## Testing
To run the tests for the app, and see the coverage, run
```
python manage.py test
```


## Technologies used
[Django](https://www.djangoproject.com/) |
[Django REST](http://www.django-rest-framework.org/) |
[React](https://facebook.github.io/react/)


## Author
[![Alex Kiura](http://0.gravatar.com/avatar/ea50741579447e4a8dcd743e10c25fd7?s=144)](https://github.com/andela-akiura)


## License

### The MIT License (MIT)

Copyright (c) 2016 Alex Kiura <kiuraalex@gmail.com>

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
