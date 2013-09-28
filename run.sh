#! /bin/bash

cd djangoproject
gunicorn sleepstats.wsgi
cd ../sleepstats_ng
grunt

