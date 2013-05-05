from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

import oauth2 as oauth
import time
import httplib2
import json
import urlparse
import urllib
import os

def authorize(request, API_CONFIG):
    # Step 1: Get a request token. This is a temporary token that is used for 
    # having the user authorize an access token and to sign the request to obtain 
    # said access token.

    consumer = oauth.Consumer(API_CONFIG['CONSUMER_KEY'],
                              API_CONFIG['CONSUMER_SECRET'])

    client = oauth.Client(consumer)

    request_token_url = API_CONFIG['REQUEST_TOKEN_URL']
    request_body = urllib.urlencode({
        'oauth_callback': API_CONFIG['OAUTH_CALLBACK']
    })

    resp, content = client.request(request_token_url,
                                   "POST", body=request_body)

    if resp['status'] != '200':
        raise Exception("Invalid response %s." % resp['status'])

    request_token_key = API_CONFIG['API_NAME'] + '_request_token'
    request.session[request_token_key] = dict(urlparse.parse_qsl(content))

    # Step 2: Redirect to the provider. Since this is a CLI script we do not 
    # redirect. In a web application you would redirect the user to the URL
    # below.

    return HttpResponseRedirect(
        "%s?oauth_token=%s" % 
        (API_CONFIG['AUTHORIZE_URL'],
         request.session[request_token_key]['oauth_token'])
    )


def authorize_complete(request, API_CONFIG, oauth_success_view):
    # Step 3: Once the consumer has redirected the user back to the oauth_callback
    # URL you can request the access token the user has approved. You use the 
    # request token to sign this request. After this is done you throw away the
    # request token and use the access token returned. You should store this 
    # access token somewhere safe, like a database, for future use.
    request_token = request.session[API_CONFIG['API_NAME'] + '_request_token']

    token = oauth.Token(request_token['oauth_token'],
                        request_token['oauth_token_secret'])
    token.set_verifier(request.GET['oauth_verifier'])

    consumer = oauth.Consumer(API_CONFIG['CONSUMER_KEY'],
                              API_CONFIG['CONSUMER_SECRET'])

    client = oauth.Client(consumer, token)

    resp, content = client.request(API_CONFIG['ACCESS_TOKEN_URL'], "POST")
    access_token = dict(urlparse.parse_qsl(content))

    request.session[API_CONFIG['API_NAME'] + '_access_token'] = access_token

    # throw away request token, we don't need it anymore
    del request.session[API_CONFIG['API_NAME'] + '_request_token']

    request.session[API_CONFIG['API_NAME'] + '_authorized'] = True

    return HttpResponseRedirect(reverse(oauth_success_view))


def make_api_call(resource, access_token, API_CONFIG):
    # Set the base oauth_* parameters along with any other parameters required
    # for the API call.
    params = {
        'oauth_version': "1.0",
        'oauth_nonce': oauth.generate_nonce(),
        'oauth_timestamp': int(time.time()),
    }

    # Set up instances of our Token and Consumer. The Consumer.key and 
    # Consumer.secret are given to you by the API provider. The Token.key and
    # Token.secret is given to you after a three-legged authentication.
    token = oauth.Token(key=access_token['oauth_token'],
                        secret=access_token['oauth_token_secret'])
    consumer = oauth.Consumer(key=API_CONFIG['CONSUMER_KEY'],
                              secret=API_CONFIG['CONSUMER_SECRET'])

    # Set our token/key parameters
    params['oauth_token'] = token.key
    params['oauth_consumer_key'] = consumer.key

    # Create our request. Change method, etc. accordingly.
    req = oauth.Request(method="GET", url=resource, parameters=params)

    # Sign the request.
    signature_method = oauth.SignatureMethod_HMAC_SHA1()
    req.sign_request(signature_method, consumer, token) 

    h = httplib2.Http()
    resp, content = h.request(resource, 'GET', headers=req.to_header())

    content = json.loads(content)

    return resp, content
