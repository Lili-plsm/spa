from rest_framework import serializers
from recipes.models import Recipe

class Recipe_serializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"

