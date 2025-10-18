# Create your models here.

from django.db import models


class ChatConversation(models.Model):
    title = models.CharField(max_length=128)


class ChatMessage(models.Model):
    message = models.CharField(max_length=8192)
    conversation = models.ForeignKey(ChatConversation, on_delete=models.CASCADE)
    is_response = models.BooleanField()
