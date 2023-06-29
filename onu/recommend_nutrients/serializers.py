from rest_framework import serializers
from .models import Nutrient, User, Taking_Nutrient


# 전체 조회
class NutrientAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = ('nutrient_id', 'nutrient_name', 'nutrient_image_url', 'nutrient_brand')


class UserAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'user_age')


class TakingNutrientAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taking_Nutrient
        fields = ('taking_nutrient_id', 'user_id')
