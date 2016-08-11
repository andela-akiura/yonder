# khali
A photo editing application.

[![CircleCI](https://circleci.com/gh/andela-akiura/khali.svg?style=svg)](https://circleci.com/gh/andela-akiura/khali)
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
Documentation is available [here](http://khali..herokuapp.com/docs/)

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


## Perform migrations
```
python manage.py makemigrations
python manage.py migrate
```

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

Copyright (c) 2016 Alex Kiura <alex.kiura@andela.com>

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
