from django.conf.urls import patterns, url

from apps.fitbit import views

urlpatterns = patterns('',
    url(r'^sleepByDate/(\d{4}-\d{2}-\d{2})$',
        views.sleep_by_date,
        name='fitbit_sleep_by_date'),

    url(r'^sleepAwakenings/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$',
        views.sleep_awakenings,
        name='fitbit_sleep_awakenings'),

    url(r'^sleepTimeToSleep/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$',
        views.sleep_time_to_sleep,
        name='fitbit_sleep_timetosleep'),

    url(r'^sleepTimeInBed/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$',
        views.sleep_time_in_bed,
        name='fitbit_sleep_timeinbed'),

    url(r'^sleepStartTime/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$',
        views.sleep_start_time,
        name='fitbit_sleep_starttime'),

    url(r'^authorize$', views.authorize,
    					name='authorize_fitbit'),

    url(r'^authorizeComplete$',
    	views.authorize_complete,
    	name='authorize_complete_fitbit'),
    
    # url(r'^(?P<poll_id>\d+)/$', views.detail, name='detail'),
    # url(r'^(?P<poll_id>\d+)/results/$', views.results, name='results'),
    # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)