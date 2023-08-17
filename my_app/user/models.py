from django.db import models
from social_account.models import Users
from datetime import timedelta
from django.utils import timezone

class BaseModel(models.Model):
    modify_date = models.DateTimeField(auto_now=True)
    create_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        abstract = True

class Help_post(BaseModel):
    date_time = models.DateTimeField()
    address = models.CharField(max_length=100)
    content = models.CharField(max_length=500)
    user = models.ForeignKey(Users, on_delete=models.CASCADE,
                               related_name="user",
                               null=True)
    helper_user = models.ForeignKey(Users,
                               related_name="helper", on_delete=models.SET_NULL,
                               null=True)
    time_over = models.BooleanField(default=False)
    objects = models.Manager()
    CATEGORY = (
        ('eCommerce', '이커머스'),
        ('NFT', '블록체인'),
        ('public_service', '공공 서비스'),)
    category = models.CharField(verbose_name='category', max_length=20, choices=CATEGORY)
