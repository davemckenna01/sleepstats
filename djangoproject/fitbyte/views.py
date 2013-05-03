from django.http import HttpResponse
from django.shortcuts import render

def home(request):
	context = {'greeting': 'Shut Up.'}
	return render(request, 'home.html', context)	
