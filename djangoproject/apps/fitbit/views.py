from apps.fitbit.config import API_CONFIG
import oauth1_utils

import pprint

api_url = "http://api.fitbit.com/1/user/-/"

def sleep_by_date(request, date):
    url = api_url + "sleep/date/" + date + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def sleep_stats(request, start, end):
    url = api_url + "sleep/awakeningsCount/date/" + start + "/" + end + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)


def authorize(request):
    return oauth1_utils.authorize(request, API_CONFIG)

def authorize_complete(request):
    return oauth1_utils.authorize_complete(request, API_CONFIG, 'home')