from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

def home(request):
	context = {'message': ''}
	return render(request, 'home.html', context)

