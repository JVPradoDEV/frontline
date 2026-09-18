from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from login.models import Usuario
from rest_framework.views import APIView


class UsuarioSerializer(ModelSerializer):
    n_seguidores = serializers.SerializerMethodField()
    n_seguindo = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ['username', 'nickname', 'foto', 'n_seguidores', 'n_seguindo']


    def get_n_seguidores(self, obj):
        return obj.seguidores.count()

    def get_n_seguindo(self, obj):
        return obj.seguindo.count()


class CadastroSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'password']
