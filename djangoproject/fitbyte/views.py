from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from fitbyte.settings import API_CONFIG

import urlparse
import oauth2 as oauth
import httplib2
import urllib
import os
import time
import pprint
import json

# necessary globals
consumer = oauth.Consumer(API_CONFIG['FITBIT']['CONSUMER_KEY'],
                          API_CONFIG['FITBIT']['CONSUMER_SECRET'])
request_token = dict()

session_access_token = dict()

def home(request):
	context = {'message': 'You gotta authorize me to use your fitbit account.'}
	return render(request, 'home.html', context)

def authorize_fitbit(request):
    # Step 1: Get a request token. This is a temporary token that is used for 
    # having the user authorize an access token and to sign the request to obtain 
    # said access token.

    client = oauth.Client(consumer)

    request_token_url = API_CONFIG['FITBIT']['REQUEST_TOKEN_URL']
    request_body = urllib.urlencode({
        'oauth_callback': API_CONFIG['FITBIT']['OAUTH_CALLBACK']
    })

    resp, content = client.request(request_token_url,
                                   "POST", body=request_body)

    if resp['status'] != '200':
        raise Exception("Invalid response %s." % resp['status'])

    global request_token
    request_token = dict(urlparse.parse_qsl(content))

    print "Request Token:"
    print "    - oauth_token        = %s" % request_token['oauth_token']
    print "    - oauth_token_secret = %s" % request_token['oauth_token_secret']
    print 

    # Step 2: Redirect to the provider. Since this is a CLI script we do not 
    # redirect. In a web application you would redirect the user to the URL
    # below.

    return HttpResponseRedirect(
        "%s?oauth_token=%s" % 
        (API_CONFIG['FITBIT']['AUTHORIZE_URL'], request_token['oauth_token'])
    )

def authorize_fitbit_complete(request):
    # Step 3: Once the consumer has redirected the user back to the oauth_callback
    # URL you can request the access token the user has approved. You use the 
    # request token to sign this request. After this is done you throw away the
    # request token and use the access token returned. You should store this 
    # access token somewhere safe, like a database, for future use.
    token = oauth.Token(request_token['oauth_token'],
                        request_token['oauth_token_secret'])
    token.set_verifier(request.GET['oauth_verifier'])
    client = oauth.Client(consumer, token)

    resp, content = client.request(API_CONFIG['FITBIT']['ACCESS_TOKEN_URL'], "POST")
    access_token = dict(urlparse.parse_qsl(content))

    global session_access_token
    session_access_token = access_token


    print "Access Token:"
    print "    - oauth_token        = %s" % access_token['oauth_token']
    print "    - oauth_token_secret = %s" % access_token['oauth_token_secret']
    print
    print "You may now access protected resources using the access tokens above." 
    print

    context = {'message': 'OAuth handshaking complete.'}
    return render(request, 'home.html', context)

def first_api_call(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    resp, content = make_api_call(url)

    pp = pprint.PrettyPrinter()

    print pp.pprint(resp)
    print pp.pprint(content)

    context = content
    return render(request, 'first_api_call.html', context)


def make_api_call(url):
    # Set the base oauth_* parameters along with any other parameters required
    # for the API call.
    params = {
        'oauth_version': "1.0",
        'oauth_nonce': oauth.generate_nonce(),
        'oauth_timestamp': int(time.time()),
    }

    access_token = session_access_token

    consumer_key = API_CONFIG['FITBIT']['CONSUMER_KEY']
    consumer_secret = API_CONFIG['FITBIT']['CONSUMER_SECRET']

    # Set up instances of our Token and Consumer. The Consumer.key and 
    # Consumer.secret are given to you by the API provider. The Token.key and
    # Token.secret is given to you after a three-legged authentication.
    token = oauth.Token(key=access_token['oauth_token'],
                        secret=access_token['oauth_token_secret'])
    consumer_after_auth = oauth.Consumer(key=consumer_key,
                                         secret=consumer_secret)

    # Set our token/key parameters
    params['oauth_token'] = token.key
    params['oauth_consumer_key'] = consumer_after_auth.key

    # Create our request. Change method, etc. accordingly.
    req = oauth.Request(method="GET", url=url, parameters=params)

    # Sign the request.
    signature_method = oauth.SignatureMethod_HMAC_SHA1()
    req.sign_request(signature_method, consumer_after_auth, token) 

    h = httplib2.Http()
    resp, content = h.request(url, 'GET', headers=req.to_header())

    content = json.loads(content)

    return resp, content
