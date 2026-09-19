from django.contrib import admin
from rest_framework.routers import DefaultRouter
from login.views import UsuarioView, CadastroView, ListaSeguidores, ListaSeguindo, SeguirView, UsuarioClienteView
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
#router.register('posts', PostsViewset, basename='posts')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    path('', include(router.urls)),
    
    path('cadastro/', CadastroView.as_view(), name='cadastro'),

    path('seguir/', SeguirView.as_view(), name='seguir'),

    path('usuariocliente/', UsuarioClienteView.as_view(), name='usuario_cliente'),
    path('usuario/<str:username>/', UsuarioView.as_view(), name='usuarios'),
    path('usuario/<str:username>/seguidores/', ListaSeguidores.as_view()),
    path('usuario/<str:username>/seguindo/', ListaSeguindo.as_view()),

    #JWT
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]