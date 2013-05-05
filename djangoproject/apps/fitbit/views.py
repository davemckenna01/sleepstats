from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from apps.fitbit.config import API_CONFIG
from oauth1_utils import make_api_call

import urlparse
import oauth2 as oauth
import urllib
import os
import pprint

def index(request):
    pass

def first_fitbit_api_call(request):
    url = "http://api.fitbit.com/1/user/-/body/date/2013-05-02.json"

    access_token = session_access_token
    resp, content = make_api_call(url, access_token, API_CONFIG)

    pp = pprint.PrettyPrinter()

    print pp.pprint(resp)
    print pp.pprint(content)

    context = content
    return render(request, 'first_api_call.html', context)


# necessary globals
request_token = dict()

session_access_token = dict()

def authorize_fitbit(request):
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
        (API_CONFIG['AUTHORIZE_URL'], request_token['oauth_token'])
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

    consumer = oauth.Consumer(API_CONFIG['CONSUMER_KEY'],
                              API_CONFIG['CONSUMER_SECRET'])
    
    client = oauth.Client(consumer, token)

    resp, content = client.request(API_CONFIG['ACCESS_TOKEN_URL'], "POST")
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
