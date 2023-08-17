from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import status, renderers
from .serializer import NameSerializer

class Name_check(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]
    def get(self, request):
        form = NameSerializer(instance=request.user)
        return Response(status=status.HTTP_200_OK, template_name='main/name_check.html', data={'form': form})

    def post(self, request):
        form = NameSerializer(request.user, data=request.data)
        if form.is_valid():
            form.save()
            return redirect('user:main_site')
        return Response(status=status.HTTP_200_OK, template_name='main/name_check.html', data={'form': form})

