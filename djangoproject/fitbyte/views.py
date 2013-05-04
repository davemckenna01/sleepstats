from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

import urlparse
import oauth2 as oauth
import httplib2
import urllib
import os
import time

request_token_url = 'http://api.fitbit.com/oauth/request_token'
access_token_url = 'http://api.fitbit.com/oauth/access_token'
authorize_url = 'http://www.fitbit.com/oauth/authorize'

oauth_callback = 'http://localhost:8000/authorize-fitbit-complete'

consumer_key = os.environ['FITBIT_CONSUMER_KEY']
consumer_secret = os.environ['FITBIT_CONSUMER_SECRET']

# two necessary globals
consumer = oauth.Consumer(consumer_key, consumer_secret)
request_token = dict()

def home(request):
	context = {'greeting': 'Shut Up.'}
	return render(request, 'home.html', context)

def authorize_fitbit(request):
    # Step 1: Get a request token. This is a temporary token that is used for 
    # having the user authorize an access token and to sign the request to obtain 
    # said access token.

    client = oauth.Client(consumer)

    resp, content = client.request(request_token_url, "POST",
                    body=urllib.urlencode({'oauth_callback':oauth_callback}))
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

    return HttpResponseRedirect("%s?oauth_token=%s" % 
                                (authorize_url, request_token['oauth_token']))

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

    resp, content = client.request(access_token_url, "POST")
    access_token = dict(urlparse.parse_qsl(content))

    print "Access Token:"
    print "    - oauth_token        = %s" % access_token['oauth_token']
    print "    - oauth_token_secret = %s" % access_token['oauth_token_secret']
    print
    print "You may now access protected resources using the access tokens above." 
    print


    # Set the API endpoint 
    url = "http://api.fitbit.com/1/user/davemckenna01/body/date/2013-05-03.json"

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
    resp, content = h.request(req.to_url(), 'GET', headers=req.to_header())

    print resp
    print content

    # # !!!!!!!!!!!!!!!!
    # # there's gotta be a better way to do the below crap... isn't this in the
    # # oauth2 lib?!?!

    # h = httplib2.Http()
    # resp, content = h.request(url, 'GET',
    #     headers = {
    #         'Authorization': "OAuth",
    #         'oauth_consumer_key': req['oauth_consumer_key'],
    #         'oauth_token': req['oauth_token'],
    #         'oauth_nonce': req['oauth_nonce'],
    #         'oauth_signature': req['oauth_signature'],
    #         'oauth_signature_method': req['oauth_signature_method'],
    #         # 'oauth_timestamp': req['oauth_timestamp'],
    #         # 'oauth_version': req['oauth_version'],
    #     }
    # )

    # print resp
    # print content

    context = {}
    return render(request, 'get_token.html', context)
