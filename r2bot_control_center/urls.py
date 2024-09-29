from django.urls import path
from navigation import views

urlpatterns = [
    path('', views.home, name='home'),
    path('control/', views.control, name='control'),
    path('map/', views.map_view, name='map'),
    path('api/move/<str:direction>/', views.move_robot, name='move_robot'),
    path('api/start-mapping/', views.start_mapping, name='start_mapping'),
]
