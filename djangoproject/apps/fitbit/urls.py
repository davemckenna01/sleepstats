from django.conf.urls import patterns, url

from apps.fitbit import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),

    url(r'^first-fitbit-api-call$',
        views.first_fitbit_api_call,
        name='first-fitbit-api-call'),

    url(r'^authorize-fitbit$', views.authorize_fitbit,
    					name='authorize-fitbit'),

    url(r'^authorize-fitbit-complete$',
    	views.authorize_fitbit_complete,
    	name='authorize-fitbit-complete'),
    
    # url(r'^(?P<poll_id>\d+)/$', views.detail, name='detail'),
    # url(r'^(?P<poll_id>\d+)/results/$', views.results, name='results'),
    # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)