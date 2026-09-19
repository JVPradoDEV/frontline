from login.models import Usuario
from login.serializer import UsuarioSerializer, CadastroSerializer
from posts.models import Post, Comentario
from posts.serializer import PostSerializer, ComentarioSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from posts.permissions import IsOwnerOrAdmin


class PostViewSet(ModelViewSet):
    """
    Uma ViewSet para ler, adicionar, deletar, e alterar um Post
    Método - GET, POST, DELETE, PATCH
    """

    serializer_class = PostSerializer
    queryset = Post.objects.all()


    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]

        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


class ComentarioViewSet(ModelViewSet):
    """
    Uma ViewSet para ler, adicionar, deletar, e alterar um comentário
    Método - GET, POST, DELETE, PATCH
    """

    serializer_class = ComentarioSerializer
    queryset = Comentario.objects.all()

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]

        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


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


class ListaComentariosPost(ListAPIView):
    """
    View para listar todos os comentários de um post pelo id
    Métodos - GET
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ComentarioSerializer

    def get_queryset(self):
        return Comentario.objects.filter(post=self.kwargs['postid'])


class ListaPostsUsuarioCliente(ListAPIView):
    """
    View para listar todos os posts do usuário cliente
    Métodos - GET
    """

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(autor=self.request.user)


class ListaPostsUsuario(ListAPIView):
    """
    View para listar todos os posts de um usuário através do username
    Métodos - GET
    """

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(autor=self.kwargs['usuario'])