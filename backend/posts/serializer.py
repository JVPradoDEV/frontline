from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from posts.models import Post, Comentario
from login.serializer import UsuarioSerializer
from rest_framework.views import APIView


class PostSerializer(ModelSerializer):
    n_likes = serializers.SerializerMethodField()
    n_comentarios = serializers.SerializerMethodField()
    autor = UsuarioSerializer(read_only=True)
    deu_like = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id','conteudo', 'n_likes', 'n_comentarios',  'autor', 'data_criacao', 'deu_like']

    def get_n_likes(self, obj):
        return obj.likes.count()

    def get_n_comentarios(self, obj):
        return obj.comentarios.count()

    def get_deu_like(self, obj):
        return obj.likes.filter(
            id=self.context['request'].user.id
        ).exists()


class ComentarioSerializer(ModelSerializer):
    n_likes = serializers.SerializerMethodField()
    autor = UsuarioSerializer(read_only=True)
    deu_like = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = ['id','conteudo', 'n_likes', 'post', 'autor', 'data_criacao', 'deu_like']

    def get_n_likes(self, obj):
        return obj.likes.count()

    def get_deu_like(self, obj):
            return obj.likes.filter(
                id=self.context['request'].user.id
            ).exists()