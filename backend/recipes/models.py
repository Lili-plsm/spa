from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length=255, default="govno")


    def __str__(self):
        return self.name 