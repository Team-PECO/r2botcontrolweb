from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'index.html')

def control(request):
    return render(request, 'control.html')

def map_view(request):
    return render(request, 'map.html')

def move_robot(request, direction):
    # Implement robot movement logic here
    return JsonResponse({'message': f'Robot moved {direction}'})

def start_mapping(request):
    # Implement mapping logic here
    return JsonResponse({'message': 'Mapping started'})
