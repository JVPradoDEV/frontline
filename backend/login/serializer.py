from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from login.models import Usuario
from rest_framework.views import APIView


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'nickname', 'foto']


class CadastroSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'password']
