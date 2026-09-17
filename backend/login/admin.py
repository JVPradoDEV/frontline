from django.contrib import admin
from login.models import Usuario


class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'nickname')
    list_display_links = ('id', 'username')


admin.site.register(Usuario, UsuarioAdmin)