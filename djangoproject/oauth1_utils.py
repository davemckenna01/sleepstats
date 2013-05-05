import oauth2 as oauth
import time
import httplib2
import json

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
