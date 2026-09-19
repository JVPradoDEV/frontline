from django.contrib import admin
from posts.models import Post, Comentario


class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'autor', 'conteudo')
    list_display_links = ('id', 'autor')


admin.site.register(Post, PostAdmin)