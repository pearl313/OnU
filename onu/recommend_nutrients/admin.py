from django.contrib import admin
from .models import Nutrient, Nutrient_type

# Register your models here.
admin.site.register(Nutrient)
admin.site.register(Nutrient_type)