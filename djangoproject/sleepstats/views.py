from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.conf import settings

def home(request):
    return HttpResponseRedirect(settings.HOME_PAGE)

