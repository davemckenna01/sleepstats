from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

def home(request):
    context = {
        'fitbitAuthorized': True if 'fitbit_access_token' in request.session else False
    }
    return render(request, 'index.html', context)

