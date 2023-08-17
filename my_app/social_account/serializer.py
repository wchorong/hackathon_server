from rest_framework import serializers
from .models import Users

class NameSerializer(serializers.ModelSerializer):
        class Meta:
            model = Users
            fields = ('phone_num', "name", "helper_check")

        def update(self, instance, validated_data):
            instance.phone_num = validated_data.get('phone_num', instance.phone_num)
            instance.name = validated_data.get('name', instance.name)
            instance.helper_check = validated_data.get('helper_check', instance.helper_check)
            instance.save()
            return instance