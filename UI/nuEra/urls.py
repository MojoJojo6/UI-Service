from django.urls import path
from django.conf.urls import url,include
from .views import *
from . import views

urlpatterns = [
    path('', views.login),
    path('register/',register.as_view()),
    path('home/',homepage.as_view())

]
