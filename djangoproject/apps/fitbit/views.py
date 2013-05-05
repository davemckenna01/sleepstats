from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from apps.fitbit.config import API_CONFIG
import oauth1_utils

import pprint

def index(request):
    pass

def weight(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    access_token = request.session['access_token']
    resp, content = oauth1_utils.make_api_call(url, access_token, API_CONFIG)

    pp = pprint.PrettyPrinter()

    print pp.pprint(resp)
    print pp.pprint(content)

    context = content
    return render(request, 'fitbit-weight.html', context)

def bmi(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    access_token = request.session['access_token']
    resp, content = oauth1_utils.make_api_call(url, access_token, API_CONFIG)

    pp = pprint.PrettyPrinter()

    print pp.pprint(resp)
    print pp.pprint(content)

    context = content
    return render(request, 'fitbit-bmi.html', context)


def authorize(request):
    return oauth1_utils.authorize(request, API_CONFIG)

def authorize_complete(request):
    return oauth1_utils.authorize_complete(request, API_CONFIG, 'home')