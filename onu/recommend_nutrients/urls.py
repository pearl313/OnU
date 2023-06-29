from django.urls import path, include
from . import views

app_name = 'recommend_nutrients'

urlpatterns = [
    path('', views.nutrients_all, name='nutrients_all'),
]