from django.db import models

class Robot(models.Model):
    current_location = models.CharField(max_length=100)
    status = models.CharField(max_length=50)

class NavigationPoint(models.Model):
    name = models.CharField(max_length=100)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()
