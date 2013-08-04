from django.conf.urls import patterns, url

from apps.fitbit import views

urlpatterns = patterns('',
    url(r'^sleepByDate/(\d{4}-\d{2}-\d{2})$',
        views.sleep_by_date,
        name='fitbit-sleep-by-date'),

    url(r'^sleepAwakenings/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$',
        views.sleep_awakenings,
        name='fitbit-sleep-awakenings'),

    url(r'^authorize$', views.authorize,
    					name='authorize-fitbit'),

    url(r'^authorize-complete$',
    	views.authorize_complete,
    	name='authorize-complete-fitbit'),
    
    # url(r'^(?P<poll_id>\d+)/$', views.detail, name='detail'),
    # url(r'^(?P<poll_id>\d+)/results/$', views.results, name='results'),
    # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)