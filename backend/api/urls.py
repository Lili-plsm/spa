from .views import RecipeListView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from djoser import views as djoser_views

urlpatterns = [
    # Путь для списка рецептов
    path('recipes/', RecipeListView.as_view(), name='recipe-list'),
    
    # Пути для аутентификации через Djoser
    path('auth/', include('djoser.urls')),  # Включаем базовые URL от Djoser для аутентификации
    path('auth/', include('djoser.urls.authtoken')),  # Включаем URL для аутентификации с использованием токенов
    
    # Путь для JWT-токенов
    path('auth/jwt/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Создание JWT токена
    path('auth/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Обновление JWT токена
]
