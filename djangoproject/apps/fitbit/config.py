import os

API_CONFIG = {
    'REQUEST_TOKEN_URL': 'http://api.fitbit.com/oauth/request_token',
    'ACCESS_TOKEN_URL': 'http://api.fitbit.com/oauth/access_token',
    'AUTHORIZE_URL': 'http://www.fitbit.com/oauth/authorize',

    'OAUTH_CALLBACK': 'http://localhost:8000/fitbit/authorize-fitbit-complete',

    'CONSUMER_KEY': os.environ['FITBIT_CONSUMER_KEY'],
    'CONSUMER_SECRET': os.environ['FITBIT_CONSUMER_SECRET']
}
