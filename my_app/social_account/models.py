from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractUser


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, name, first_name, password, **other_fields)

    def create_user(self, email, name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, name=name,
                          first_name = first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class Users(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('이메일'), unique=True)  # 이메일
    name = models.CharField(max_length=150, blank=True)  # 본명
    start = models.DateTimeField(default=timezone.now)  # 생성 날짜
    first_name = models.CharField(max_length=180, blank=True)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    phone_num = models.CharField(blank=True, max_length=50)  # 핸드폰 번호
    helper_check = models.BooleanField(default=False)  # 도우미 체크 여부
    post_limit = models.BooleanField(default=False)  # 도움 요청 제한
    negative_point = models.IntegerField(default=0)



    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'first_name']

    def __str__(self):
        return self.email