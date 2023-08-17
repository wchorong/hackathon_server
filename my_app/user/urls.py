from django.urls import path
from .views import Main_site, ReservationCheck, Mypage, Edit_Member, Delete_Account, \
    Delete_Post, Delete_Post_Negative, Helper_main, Post_make, Edit_post, Accept_helper,\
    Tutorial_start, Tutorial_signup, Tutorial_main, Tutorial_make, Helper_disconnect, MyPage_del, MyPage_edit, \
    Category_Set
app_name = 'user'

urlpatterns = [
    path('main_site/', Main_site.as_view(), name='main_site'),  # 메인 페이지 도우미와 유저로 나눠질 예정
    path('states/', ReservationCheck.as_view()), # reservation 상태 체크
    path('mypage/', Mypage.as_view(), name='mypage'),  # 마이페이지
    path('edit_member/', Edit_Member.as_view(), name='edit_member'),  # 마이페이지 정보 수정
    path('delete_account/', Delete_Account.as_view(), name='delete_account'),  # 회원 탈퇴
    path('delete_post/', Delete_Post.as_view(), name='delete_post'),  # 리뷰 후 게시물 삭제 (예)
    path('delete_post_negative/', Delete_Post_Negative.as_view(), name='delete_post_negative'),  # 리뷰 후 게시물 삭제 (아니요)
    path('helper_main/', Helper_main.as_view(), name='helper_main'),    # 도우미 메인페이지
    path('post_make/', Post_make.as_view(), name='post_make'),  # 요청 게시글 작성
    path('edit_post/', Edit_post.as_view(), name='edit_post'),  # 요청 게시글 수정
    path('<int:pk>/accept_helper/', Accept_helper.as_view(), name='accept_helper'),  # 도우미 수락
    path('tutorial_start/', Tutorial_start.as_view(), name='tutorial_start'),  # 튜토리얼 로그인
    path('tutorial_signup/', Tutorial_signup.as_view(), name='tutorial_signup'),  # 튜토리얼 회원가입
    path('tutorial_main/', Tutorial_main.as_view(), name='tutorial_main'),  # 튜토리얼 메인
    path('tutorial_make/', Tutorial_make.as_view(), name='tutorial_make'),  # 튜토리얼 요청
    path('helper_disconnect/<int:pk>/', Helper_disconnect.as_view(), name='helper_disconnect'),  # 수락자 요청페이지 연결 끊기
    path('MyPage_del/', MyPage_del.as_view(), name='MyPage_del'),  # 수락자 요청페이지 연결 끊기
    path('MyPage_edit/', MyPage_edit.as_view(), name='MyPage_edit'),  # 수락자 요청페이지 연결 끊기
    path('category_set/', Category_Set.as_view(), name='category_set'),
    path('states/', ReservationCheck.as_view()) # reservation 상태 체크

]