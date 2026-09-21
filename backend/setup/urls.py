from django.contrib import admin
from rest_framework.routers import DefaultRouter
from login.views import UsuarioView, CadastroView, ListaSeguidores, ListaSeguindo, SeguirView, UsuarioClienteView, LikeView, BuscarUsuarioView, ListaUsuarios
from posts.views import FeedView, PostViewSet, ComentarioViewSet, ListaComentariosPost, ListaPostsUsuarioCliente, ListaPostsUsuario
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('comentarios', ComentarioViewSet, basename='comentarios')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    path('', include(router.urls)),
    
    path('cadastro/', CadastroView.as_view(), name='cadastro'),

    path('like/', LikeView.as_view(), name='gostar'),
    path('seguir/', SeguirView.as_view(), name='seguir'),

    path('feed/', FeedView.as_view(), name='feed'),

    path('post/<int:postid>/comentarios/', ListaComentariosPost.as_view()),

    path('usuariocliente/', UsuarioClienteView.as_view(), name='usuario_cliente'),
    path('usuario/<str:username>/', UsuarioView.as_view(), name='usuarios'),
    path('usuario/<str:username>/seguidores/', ListaSeguidores.as_view()),
    path('usuario/<str:username>/seguindo/', ListaSeguindo.as_view()),
    path('usuarios/', ListaUsuarios.as_view()),

    path('buscar/', BuscarUsuarioView.as_view(), name='buscar'),

    path('usuariocliente/posts/', ListaPostsUsuarioCliente.as_view()),
    path('<str:usuario>/posts/', ListaPostsUsuario.as_view()),

    #JWT
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]