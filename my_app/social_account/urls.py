from django.urls import path
from .views import Name_check
app_name = 'account'

urlpatterns = [
    path('name_check/', Name_check.as_view(), name='name_check'),
]