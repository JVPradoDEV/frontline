from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    username = models.CharField(max_length=15, blank=False, null=False, unique=True)
    nickname =  models.CharField(max_length=35, blank=False, null=False, unique=False)
    foto = models.ImageField()
    seguidores = models.ManyToManyField('self', symmetrical=False, related_name='seguindo', blank=True)

    def __str__(self):
        return self.username