from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

import urlparse
import oauth2 as oauth
import urllib
import os

# consumer_key = os.environ['TWITTER_CONSUMER_KEY']
# consumer_secret = os.environ['TWITTER_CONSUMER_SECRET']

# request_token_url = 'http://api.twitter.com/oauth/request_token'
# access_token_url = 'http://api.twitter.com/oauth/access_token'
# authorize_url = 'http://api.twitter.com/oauth/authorize'

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

    context = {}
    return render(request, 'get_token.html', context)
