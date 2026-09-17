from login.models import Usuario
from login.serializer import UsuarioSerializer, CadastroSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class UsuarioView(APIView):
    """
    View para ver o Usuário logado
    Métodos - GET
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data, status=200)


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