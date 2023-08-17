from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import status, renderers
from social_account.models import Users