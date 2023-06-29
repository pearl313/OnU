from django.db import models


# Create your models here.
class Nutrient_type(models.Model):
    nutrient_type_id = models.IntegerField(primary_key = True)
    nutrient_type = models.CharField(max_length=255)

    class Meta:
        db_table = 'nutrient_type'


class Nutrient(models.Model):
    nutrient_id = models.BigIntegerField(primary_key = True)
    nutrient_name = models.TextField()
    nutrient_image_url = models.TextField()
    nutrient_brand = models.TextField()
    nutrient_intake = models.TextField()
    nutrient_caution = models.TextField()
    nutrient_expiration = models.TextField()
    nutrient_material = models.TextField()
    nutrient_pregnant = models.BooleanField()
    nutrient_child = models.BooleanField()
    nutrient_gender = models.IntegerField()
    nutrient_type = models.ForeignKey(Nutrient_type, on_delete=models.CASCADE)

    class Meta:
        db_table = 'nutrient'


class Auth(models.Model):
    auth_id = models.BigIntegerField(primary_key= True)
    user_phone_number = models.TextField()
    user_provider = models.TextField()
    user_provider_id = models.TextField()

    class Meta:
        db_table = 'auth'


class User(models.Model):
    user_id = models.BigIntegerField(primary_key= True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    user_age = models.IntegerField()
    user_gender = models.TextField()
    user_nickname = models.TextField()
    user_auth = models.ForeignKey(Auth, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user'


class Taking_Nutrient(models.Model):
    taking_nutrient_id = models.IntegerField(primary_key= True)
    nutrient = models.ForeignKey(Nutrient, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'taking_nutrient'
