from allauth.account.forms import SignupForm
from django import forms
from allauth.account.utils import user_email, user_field
from social_account.models import Users
class MyCustomSignupForm(SignupForm):
    name = forms.CharField(max_length=150)
    helper_check = forms.BooleanField(required=False, initial=False)
    phone_num = forms.IntegerField()
    def save(self, request):
        user = super(MyCustomSignupForm, self).save(request)
        if user is None:
            return
        user.name = self.cleaned_data.get('name')
        user.helper_check = self.cleaned_data.get('helper_check')
        user.phone_num = self.cleaned_data.get('phone_num')
        user.save()
        return user