from apps.fitbit.config import API_CONFIG
import oauth1_utils

import pprint

def index(request):
    pass

def weight(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def bmi(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)


def authorize(request):
    return oauth1_utils.authorize(request, API_CONFIG)

def authorize_complete(request):
    return oauth1_utils.authorize_complete(request, API_CONFIG, 'home')