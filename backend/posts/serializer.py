from rest_framework.serializers import ModelSerializer
from posts.models import Post, Comentario
from rest_framework.views import APIView


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['conteudo', 'autor']


class ComentarioSerializer(ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['conteudo']