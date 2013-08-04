from apps.fitbit.config import API_CONFIG
import oauth1_utils
import time

import pprint

api_url = "http://api.fitbit.com/1/user/-/"

def sleep_by_date(request, date):
    time.sleep(1)
    url = api_url + "sleep/date/" + date + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def sleep_awakenings(request, start, end):
    time.sleep(1)
    url = api_url + "sleep/awakeningsCount/date/" + start + "/" + end + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def sleep_time_to_sleep(request, start, end):
    time.sleep(1)
    url = api_url + "sleep/minutesToFallAsleep/date/" + start + "/" + end + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def sleep_time_in_bed(request, start, end):
    time.sleep(1)
    url = api_url + "sleep/timeInBed/date/" + start + "/" + end + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def sleep_start_time(request, start, end):
    time.sleep(1)
    url = api_url + "sleep/startTime/date/" + start + "/" + end + ".json"

    return oauth1_utils.make_api_call(url, request, API_CONFIG)

def authorize(request):
    return oauth1_utils.authorize(request, API_CONFIG)

def authorize_complete(request):
    return oauth1_utils.authorize_complete(request, API_CONFIG, 'home')