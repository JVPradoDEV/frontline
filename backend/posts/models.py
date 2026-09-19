from login.models import Usuario
from django.db import models


class Post(models.Model):
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='posts')
    conteudo = models.CharField(max_length=280, null=False, blank=False)
    likes = models.ManyToManyField(Usuario, blank=True, related_name='posts_curtidos')


class Comentario(models.Model):
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='comentarios')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likes = models.ManyToManyField(Usuario, blank=True)