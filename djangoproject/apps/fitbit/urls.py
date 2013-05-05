from django.conf.urls import patterns, url

from apps.fitbit import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),

    url(r'^weight$',
        views.weight,
        name='fitbit-weight'),

    url(r'^bmi$',
        views.bmi,
        name='fitbit-bmi'),

    url(r'^authorize$', views.authorize,
    					name='authorize-fitbit'),

    url(r'^authorize-complete$',
    	views.authorize_complete,
    	name='authorize-complete-fitbit'),
    
    # url(r'^(?P<poll_id>\d+)/$', views.detail, name='detail'),
    # url(r'^(?P<poll_id>\d+)/results/$', views.results, name='results'),
    # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)