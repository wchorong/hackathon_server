from datetime import timedelta

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import redirect
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import status, renderers
from social_account.models import Users
from .models import Help_post
from django.utils import timezone
from .serializer import EditSerializer, PostSerializer,EditPostSerializer
from .tasks import reservation_state_change

class ReservationCheck(APIView):
    def get(self, request):
        reservation_state_change(repeat=600)
        return Response(status=status.HTTP_302_FOUND)

class Main_site(LoginRequiredMixin, APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        if request.user.helper_check:  #  도우미 페이지 이동
            return redirect('user:helper_main')
        else:
            try:
                post_time = Help_post.objects.get(user=request.user)  # 도움 요청이 있을 때
            except:
                return Response(status=status.HTTP_200_OK, template_name='main/nanmain.html')
            if post_time.time_over or post_time.date_time < timezone.now():  # 시간이 넘었을 때
                if post_time.helper_user is None:  #  수락자가 없을 때
                    return Response(status=status.HTTP_200_OK, template_name='main/none_helper.html')
                else:  # 수락자가 있을 때
                    return Response(status=status.HTTP_200_OK, template_name='main/reviewpage.html')
            else:  # 시간을 안넘었을 때
                return Response(status=status.HTTP_200_OK, template_name='main/nanmain.html')


class Mypage(LoginRequiredMixin, APIView):  #  마이 페이지
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        user = request.user
        try:  # 유저 정보
            post = Help_post.objects.get(user=request.user)  # 요청 내역
            datetimeSet = post.date_time - timedelta(hours=3)
            if post.helper_user:    # 수락자가 있는 경우
                helper_set = True
                date_set = False
            else:   # 수락자가 없는 경우
                if datetimeSet > timezone.now():   # 현재시간과 비교하여 3시간이 안지났을 경우
                    date_set = True
                else:    # 지났을 경우
                    date_set = False
                helper_set = False
        except:
            post = False
            helper_set = False
            date_set = False
        if request.user.helper_check:
            helper_check = True
        else:
            helper_check = False
        helper_post = Help_post.objects.filter(helper_user=user)
        helper_time = timezone.now() + timedelta(hours=3)
        name = user.name  # 이름
        phone_num = user.phone_num  # 핸드폰 번호
        email_adress = user.email  # 이메일
        return Response(status=status.HTTP_200_OK, template_name='main/myPage.html', data={'name': name,
                                                                                           'helper_set': helper_set,
                                                                                           'helper_check': helper_check,
                                                                                            'phone_num': phone_num,
                                                                                            'email_adress': email_adress,
                                                                                            'post': post,
                                                                                            'helper_post': helper_post,
                                                                                            'date_set': date_set,
                                                                                            'helper_time': helper_time})


class Edit_Member(LoginRequiredMixin, APIView):  # 회원정보 수정
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        form = EditSerializer(instance=request.user)
        return Response(status=status.HTTP_200_OK, template_name='main/imf_edit.html', data={'form': form})

    def post(self, request):
        form = EditSerializer(request.user, data=request.data)
        if form.is_valid():
            form.save()
            return redirect('user:mypage')
        return Response(status=status.HTTP_200_OK, template_name='main/imf_edit.html', data={'form': form})


class Delete_Account(LoginRequiredMixin, APIView):  # 회원 탈퇴
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        user = Users.objects.get(email=request.user)
        user.is_active = False
        user.save()
        return redirect('user:main_site')

class Delete_Post(LoginRequiredMixin, APIView):  # 리뷰 페이지에서 '예'를 했을 경우
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        try:
            post = Help_post.objects.get(user=request.user)
            user = Users.objects.get(email=request.user)
            user.post_limit = False
            user.save()
            post.delete()
            return redirect('user:main_site')
        except:
            return redirect('user:main_site')

class Delete_Post_Negative(LoginRequiredMixin, APIView):  # 리뷰 페이지에서 '아니요'를 했을 경우
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        try:
            post = Help_post.objects.get(user=request.user)
            user = Users.objects.get(email=post.helper_user)
            user.negative_point += 1
            user.post_limit = False
            post.delete()
            user.save()
            return redirect('user:main_site')
        except:
            return redirect('user:main_site')

class Helper_main(LoginRequiredMixin, APIView):  # 도우미 메인페이지
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        if not request.user.helper_check:
            return redirect('user:main_site')
        return Response(status=status.HTTP_200_OK, template_name='main/helperMain_set.html')

class Post_make(LoginRequiredMixin, APIView):  # 요청 페이지
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        return Response(status=status.HTTP_200_OK, template_name='main/nan.html')

    def post(self, request):
        form = PostSerializer(data=request.data, context={'request': request})
        if form.is_valid():
            form.save(context={'request': request})
            return redirect('user:main_site')
        return Response(status=status.HTTP_200_OK, template_name='main/nan.html', data={'form': form})


class Edit_post(LoginRequiredMixin, APIView):  # 요청 수정
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        post = Help_post.objects.get(user=request.user)
        edit_set = 1
        content = post.content
        address = post.address
        return Response(status=status.HTTP_200_OK, template_name='main/nan.html', data={
                                                                                        'content': content,
                                                                                        'address' : address,
                                                                                        'edit_set': edit_set})

    def post(self, request):
        post = Help_post.objects.get(user=request.user)
        form = EditPostSerializer(post, data=request.data)
        if form.is_valid():
            form.save()
            return redirect('user:main_site')
        else:
            edit_set = 1
        return Response(status=status.HTTP_200_OK, template_name='main/nan.html', data={'form': form,
                                                                                        'edit_set': edit_set})
class Accept_helper(LoginRequiredMixin, APIView):  # 도우미 수락
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request, pk):
        if request.user.name == '':
            return redirect('account:name_check')
        post = Help_post.objects.get(id=pk)
        post.helper_user = request.user
        post.save()
        return Response(status=status.HTTP_200_OK, template_name='main/accept_success.html')

class Tutorial_start(APIView):  # 로그인 튜토리얼
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        return Response(status=status.HTTP_200_OK, template_name='account/login.html', data={'tutorial': 1})

class Tutorial_signup(APIView):  # 튜토리얼 회원가입
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request):
        return Response(status=status.HTTP_200_OK, template_name='account/signup.html', data={'tutorial': 1})

class Tutorial_main(APIView):  # 튜토리얼 메인
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        if request.user.helper_check:  #  도우미 페이지 이동
            return redirect('user:helper_main')
        return Response(status=status.HTTP_200_OK, template_name='main/nanmain.html', data={'tutorial': 1})

class Tutorial_make(APIView):  # 튜토리얼 요청
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        return Response(status=status.HTTP_200_OK, template_name='main/nan.html', data={'tutorial': 1})

class Helper_disconnect(APIView):  # 도우미 연결 끊기
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.name == '':
            return redirect('account:name_check')
        post = Help_post.objects.get(id=pk)
        datetimeSet = post.date_time - timedelta(hours=3)
        if datetimeSet > timezone.now() and post.helper_user == request.user:
            post.helper_user = None
            post.save()
            return redirect('user:mypage')
        return redirect('user:mypage')

class MyPage_del(APIView):  # 요청 삭제(3시간전 수락자가 없을 시)
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        post = Help_post.objects.get(user=request.user)
        user = Users.objects.get(email=request.user)
        datetimeSet = post.date_time - timedelta(hours=3)
        if datetimeSet > timezone.now() and post.helper_user is None:
            user.post_limit = False
            post.delete()
            user.save()
            return redirect('user:mypage')
        return redirect('user:mypage')

class MyPage_edit(APIView):  # 요청 수정(3시간전 수락자가 없을 시)
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        post = Help_post.objects.get(user=request.user)
        datetimeSet = post.date_time - timedelta(hours=3)
        if datetimeSet > timezone.now() and post.helper_user is None:
            return redirect('user:edit_post')
        return redirect('user:mypage')

class Category_Set(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.name == '':
            return redirect('account:name_check')
        if not request.user.helper_check:
            return redirect('user:main_site')
        param1 = request.query_params.get('param1')
        post = Help_post.objects.filter(helper_user__isnull=True, time_over=False, category=param1)
        post = post.order_by('date_time')
        return Response(status=status.HTTP_200_OK, template_name='main/helperMain.html', data={'post': post})