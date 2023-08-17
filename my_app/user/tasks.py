from background_task import background

from user.models import Help_post
from django.utils import timezone

@background(schedule=600)
def reservation_state_change():
    expired_data = Help_post.objects.filter(time_over=False, date_time__lt=timezone.now())
    print("DATABASE UPDATE")
    for item in expired_data:
        item.time_over = True
        item.save()