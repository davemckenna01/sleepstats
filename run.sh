#! /bin/bash

cd djangoproject
gunicorn sleepstats.wsgi

