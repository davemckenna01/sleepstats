#! /bin/bash

cd sleepstats_ng
npm install
grunt
cd ../djangoproject
gunicorn sleepstats.wsgi

