from rest_framework import serializers
from social_account.models import Users
from .models import Help_post
from rest_framework.exceptions import ValidationError
import datetime

class EditSerializer(serializers.ModelSerializer):
        class Meta:
            model = Users
            fields = ('phone_num', "name")

        def update(self, instance, validated_data):
            instance.phone_num = validated_data.get('phone_num', instance.phone_num)
            instance.name = validated_data.get('name', instance.name)
            instance.save()
            return instance

class PostSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    time = serializers.TimeField()
    class Meta:
        model = Help_post
        fields =("address", "content", "user", "time", "date", "category")

    def validate(self, data):
        user = self.context.get("request").user
        if user.post_limit == False:
            return data
        else:
            raise ValidationError("요청 게시판은 1개이상 만들 수 없습니다.")

    def create(self, validated_data):
        user = self.context.get("request").user
        users = Users.objects.get(email=user)
        users.post_limit = True
        users.save()
        combined_datetime = datetime.datetime.combine(validated_data['date'], validated_data['time'])
        bool = Help_post.objects.create(date_time=combined_datetime,
                                        address=validated_data['address'],
                                        content=validated_data['content'],
                                        user=user,
                                        category=validated_data['category'],
                                       )
        return bool

    def update(self, instance, validated_data):
        instance.start_detail = validated_data.get('date_time', instance.date_time)
        instance.end_detail = validated_data.get('address', instance.address)
        instance.time = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance

class EditPostSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    time = serializers.TimeField()

    class Meta:
        model = Help_post
        fields = ("address", "content", "user", "time", "date", "time_over", "category")


    def update(self, instance, validated_data):
        combined_datetime = datetime.datetime.combine(validated_data['date'], validated_data['time'])
        instance.date_time = combined_datetime
        instance.address = validated_data.get('address', instance.address)
        instance.content = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.time_over = False
        instance.save()
        return instance