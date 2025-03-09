from django.shortcuts import render
from rest_framework import viewsets
from recipes.models import Recipe
from .serializers import Recipe_serializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class RecipeListView(APIView):
    def get(self, request):
        recipes = Recipe.objects.all()
        serializer = Recipe_serializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = Recipe_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

