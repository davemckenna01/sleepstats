import os
from django.conf import settings

API_CONFIG = {
	'API_NAME': 'fitbit',

    'REQUEST_TOKEN_URL': 'http://api.fitbit.com/oauth/request_token',
    'ACCESS_TOKEN_URL': 'http://api.fitbit.com/oauth/access_token',
    'AUTHORIZE_URL': 'http://www.fitbit.com/oauth/authorize',

    'OAUTH_CALLBACK': settings.OAUTH_CALLBACK_BASE_URL + '/fitbit/authorizeComplete',

    'CONSUMER_KEY': os.environ['FITBIT_CONSUMER_KEY'],
    'CONSUMER_SECRET': os.environ['FITBIT_CONSUMER_SECRET']
}
