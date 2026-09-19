from login.models import Usuario
from login.serializer import UsuarioSerializer, CadastroSerializer
from posts.models import Post, Comentario
from posts.serializer import PostSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class FeedView(ListAPIView):
    """
    View para listar posts de usuários que o usuário segue
    Métodos - GET
    """

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        usuarios_seguindo = self.request.user.seguindo.all()

        return Post.objects.filter(autor__in=usuarios_seguindo)

