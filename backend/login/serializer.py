from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from login.models import Usuario
from rest_framework.views import APIView


class UsuarioSerializer(ModelSerializer):
    n_seguidores = serializers.SerializerMethodField()
    n_seguindo = serializers.SerializerMethodField()
    seguindo = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ['username', 'nickname', 'foto', 'n_seguidores', 'n_seguindo', 'seguindo']


    def get_n_seguidores(self, obj):
        return obj.seguidores.count()

    def get_n_seguindo(self, obj):
        return obj.seguindo.count()

    def get_seguindo(self, obj):
        return self.context['request'].user.seguindo.filter(id=obj.id).exists()


class EditarUsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nickname', 'foto']


class AlterarSenhaSerializer(serializers.Serializer):
    senha_atual = serializers.CharField()
    senha_nova = serializers.CharField()

    def validate_senha_atual(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError('Senha atual incorreta.')

        return value

    def validate_senha_nova(self, value):
        if self.context['request'].user.check_password(value):
            raise serializers.ValidationError('A nova senha deve ser diferente da senha atual.')

        return value



class CadastroSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'password']
