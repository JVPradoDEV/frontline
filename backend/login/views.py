from login.models import Usuario
from login.serializer import UsuarioSerializer, CadastroSerializer
from posts.models import Post, Comentario
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters


class CadastroView(APIView):
    """
    View para cadastrar usuários.
    Métodos - POST
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CadastroSerializer(data=request.data)

        if serializer.is_valid():
            Usuario.objects.create_user(
                username=serializer.validated_data['username'],
                nickname=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
            )

            return Response({'status': 'Usuário criado.'}, status=201)

        return Response(serializer.errors, status=400)


class UsuarioView(APIView):
    """
    View para ver um Usuário passado na URL
    Métodos - GET
    Argumentos - username do usuário
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        usuario = Usuario.objects.get(username=self.kwargs['username'])
        serializer = UsuarioSerializer(usuario)

        return Response(serializer.data, status=200)


class SeguirView(APIView):
    """
    View para seguir alguém
    Métodos - POST
    Argumentos - username do usuario e username do usuario a seguir
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario_alvo = Usuario.objects.get(username=request.data["alvo"])

        if usuario_alvo != request.user:
            usuario_alvo.seguidores.add(request.user)

            return Response(status=200)

    def delete(self, request):
        usuario_alvo = Usuario.objects.get(username=request.data["alvo"])
        usuario_alvo.seguidores.remove(request.user)
        print(usuario_alvo.seguidores.all())
    
        return Response(status=200)


class LikeView(APIView):
    """
    View para dar like em post ou comentário
    Métodos - POST
    Argumentos - username do usuario e id do post ou comentário
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        tipo = request.data['tipo']
        id = request.data['id']

        if tipo == "post":
            post_alvo = Post.objects.get(id=id)
            post_alvo.likes.add(request.user)

            return Response(status=200)

        if tipo == "comentario":
            comentario_alvo = Comentario.objects.get(id=id)
            comentario_alvo.likes.add(request.user)


            return Response(status=200)

    # def delete(self, request):
    #     usuario_alvo = Usuario.objects.get(username=request.data["alvo"])
    #     usuario_alvo.seguidores.remove(request.user)
    #     print(usuario_alvo.seguidores.all())
    
    #     return Response(status=200)


class ListaSeguidores(ListAPIView):
    """
    View para listar seguidores de um usuário
    Métodos - GET
    Argumentos - username do usuário
    """

    permission_classes = [IsAuthenticated]

    serializer_class = UsuarioSerializer

    def get_queryset(self):
        return Usuario.objects.get(
            username=self.kwargs['username']
        ).seguidores.all()


class ListaSeguindo(ListAPIView):
    """
    View para listar os usuários que um usuário segue
    Métodos - GET
    Argumentos - username do usuário na URL
    """

    permission_classes = [IsAuthenticated]

    serializer_class = UsuarioSerializer

    def get_queryset(self):
        return Usuario.objects.get(
            username=self.kwargs['username']
        ).seguindo.all()


class UsuarioClienteView(RetrieveAPIView):
    """
    View pra acessar as informações do usuário logado
    Métodos - GET
    """

    serializer_class = UsuarioSerializer

    def get_queryset(self):
        return Usuario.objects.all()

    def get_object(self):
        return self.request.user


class BuscarUsuarioView(ListAPIView):
    """
    View para buscar um usuário pelo username ou nickname
    Métodos - GET
    """

    permission_classes = [IsAuthenticated]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'nickname']